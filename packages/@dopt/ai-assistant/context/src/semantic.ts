import { SemanticContext } from '@dopt/ai-assistant-definition';
import { ContextGenerator } from './types';

type SemanticNode = {
  type: string;
  attributes: Record<string, string>;
  children: Array<SemanticNode | TextNode>;
};

type TextNode = {
  type: 'text';
  value: string;
};

function ellipsize(input: string, length: number) {
  if (input.length <= length) {
    return input;
  }

  return input.substring(0, length) + '...';
}

const INVALID_ELEMENTS = new Set([
  'iframe',
  'style',
  'script',
  'noscript',
  'meta',
  'canvas',
  'template',
  'audio',
  'embed',
  'video',
  'link',
  'map',
  'area',
  'slot',
  'source',
  'svg',
  'math',
  'object',
  'portal',
]);

const NONSEMANTIC_ELEMENTS = new Set([
  'label',
  'div',
  'pre',
  'abbr',
  'b',
  'bdi',
  'bdo',
  'br',
  'dfn',
  'em',
  'i',
  'kbd',
  'mark',
  'q',
  'rp',
  'rt',
  'ruby',
  's',
  'samp',
  'small',
  'span',
  'strong',
  'sub',
  'sup',
  'u',
  'var',
  'wbr',
]);

function stringify(node: SemanticNode): string {
  const content: string[] = [];

  function walk(current: SemanticNode | TextNode) {
    if (current.type === 'text') {
      current = current as TextNode;
      const text = `<text>${current.value}</text>`;
      content.push(text);
      return;
    }

    current = current as SemanticNode;

    const attributes = Object.entries(current.attributes)
      .map(([attribute, value]) => `${attribute}=${JSON.stringify(value)}`)
      .join(' ');

    const hasChildren = current.children.length > 0;

    const openTag = `<${current.type}${
      attributes.length > 0 ? ' ' + attributes : ''
    }${!hasChildren ? ' /' : ''}>`;

    content.push(openTag);

    if (hasChildren) {
      current.children.forEach((child) => walk(child));

      const closeTag = `</${current.type}>`;
      content.push(closeTag);
    }
  }

  walk(node);

  return content.join('').replace(/[ ]+/g, ' ');
}

function crawl(element: Element): string {
  if (!window || !document) {
    throw new Error(
      'Cannot generate semantic content in a headless environment'
    );
  }

  const component: SemanticNode = {
    type: 'component',
    attributes: {},
    children: [],
  };

  const queue: Array<{ parent: SemanticNode; child: ChildNode }> = [
    { parent: component, child: element },
  ];

  const labels: Map<string, string> = new Map();

  document.querySelectorAll('label').forEach((label) => {
    labels.set(label.htmlFor, label.innerText);
  });

  while (queue.length > 0) {
    const { parent, child } = queue.shift() as (typeof queue)[number];

    if (child.nodeType === Node.TEXT_NODE) {
      const value = child.nodeValue?.trim();

      if (value && value.length > 0) {
        parent.children.push({
          type: 'text',
          value: ellipsize(value, 100),
        });
      }
    }

    if (child.nodeType === Node.ELEMENT_NODE) {
      const element = child as HTMLElement;

      if (element.ariaHidden === 'true') {
        continue;
      }

      const tag = element.tagName.toLowerCase();

      if (INVALID_ELEMENTS.has(tag)) {
        continue;
      }

      const isSemantic = element.role != null || !NONSEMANTIC_ELEMENTS.has(tag);

      let semanticNode: SemanticNode | null = null;

      if (isSemantic) {
        const attributes: Record<string, string> = {};

        if (element.role) {
          attributes.role = element.role;
        }

        if (element.title && element.title.length > 0) {
          attributes.title = ellipsize(element.title, 25);
        }

        if (element.ariaLabel && element.ariaLabel.length > 0) {
          attributes.label = ellipsize(element.ariaLabel, 25);
        }

        const otherLabel = labels.get(element.id);

        if (otherLabel && otherLabel.length > 0) {
          attributes.label = ellipsize(otherLabel, 25);
        }

        const ariaLabelledBy = element.getAttribute('aria-labelledby');

        if (ariaLabelledBy && ariaLabelledBy.length > 0) {
          const labels: string[] = [];

          for (const id of ariaLabelledBy.split(' ')) {
            const element = document.getElementById(id);
            if (element) {
              labels.push(element.innerText);
            }
          }

          const label = ellipsize(labels.join(' '), 25);
          if (label.length > 0) {
            attributes.label = label;
          }
        }

        const ariaDescribedBy = element.getAttribute('aria-describedby');

        if (ariaDescribedBy && ariaDescribedBy.length > 0) {
          const descriptions: string[] = [];

          for (const id of ariaDescribedBy.split(' ')) {
            const element = document.getElementById(id);
            if (element) {
              descriptions.push(element.innerText);
            }
          }

          const description = ellipsize(descriptions.join(' '), 25);
          if (description.length > 0) {
            attributes.description = description;
          }
        }

        const href = element.getAttribute('href');

        if (href && href.length > 0) {
          attributes.href = ellipsize(href, 25);
        }

        const alt = element.getAttribute('alt');

        if (alt && alt.length > 0) {
          attributes.alt = ellipsize(alt, 25);
        }

        const staticValue = element.getAttribute('value');

        if (staticValue && staticValue.length > 0) {
          attributes.value = ellipsize(staticValue, 25);
        }

        if (element instanceof HTMLFormElement) {
          if (element.name.length > 0) {
            attributes.name = element.name;
          }

          if (element.method.length > 0) {
            attributes.method = element.method;
          }
        }

        if (element instanceof HTMLInputElement) {
          if (element.value && element.value.length > 0) {
            attributes.value = ellipsize(element.value, 25);
          }

          if (element.name.length > 0) {
            attributes.name = element.name;
          }

          attributes.checked = String(element.checked);

          if (!attributes.value && element.placeholder.length > 0) {
            attributes.value = ellipsize(element.placeholder, 25);
          }
        }

        if (element instanceof HTMLOptionElement) {
          attributes.selected = String(element.selected);
        }

        semanticNode = {
          type: tag,
          attributes,
          children: [],
        } as SemanticNode;

        parent.children.push(semanticNode);
      }

      child.childNodes.forEach((nextChild) => {
        queue.push({ parent: semanticNode ?? parent, child: nextChild });
      });
    }
  }

  return stringify(component);
}

export default {
  async generate({ element }: { element: Element }) {
    let leaf: HTMLElement | Element = element;

    while (
      leaf.parentElement &&
      leaf.parentElement.innerText ===
        (leaf instanceof HTMLElement ? leaf.innerText : '')
    ) {
      leaf = leaf.parentElement;
    }

    let parent: HTMLElement | Element = leaf;

    while (
      parent.parentElement &&
      parent.parentElement.innerText ===
        (parent instanceof HTMLElement ? parent.innerText : '')
    ) {
      parent = parent.parentElement;
    }

    return {
      type: 'semantic',
      value: {
        semanticContent: crawl(leaf),
        neighboringSemanticContent: crawl(parent),
      },
    };
  },
} satisfies ContextGenerator<SemanticContext>;
