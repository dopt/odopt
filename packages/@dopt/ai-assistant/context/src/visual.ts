import { VisualContext } from '@dopt/ai-assistant-definition';
import { toCanvas } from 'html-to-image-mod';
import { Logger } from '@dopt/logger';
import { ContextGenerator } from './types';

const CROPPED_DIMENSION = 1024; // the larger dimension (height / width) should be 1024px
const SCALED_DIMENSION = 512; // we want to scale the image down to 512px

const ELEMENT_STROKE_WIDTH = 4;
const ELEMENT_STROKE_COLOR = 'red';

export default {
  async generate({ element }: { element?: Element }, logger?: Logger) {
    if (!window || !document) {
      throw new Error(
        'Cannot generate visual context in a headless environment'
      );
    }

    const { height, width } = document.body.getBoundingClientRect();

    let croppedHeight: number, croppedWidth: number;

    if (height > width) {
      croppedHeight = Math.min(CROPPED_DIMENSION, height);
      croppedWidth = (croppedHeight * width) / height;
    } else {
      croppedWidth = Math.min(CROPPED_DIMENSION, width);
      croppedHeight = (croppedWidth * height) / width;
    }

    const scale = SCALED_DIMENSION / Math.max(croppedHeight, croppedWidth);

    const style: Partial<CSSStyleDeclaration> = {};
    const elementBounds = { x: 0, y: 0, width: 0, height: 0 };

    /**
     * Find the smallest translation
     * so that the specified element is
     * within the crop radius
     */
    if (element) {
      const {
        top,
        bottom,
        left,
        right,
        height: elementHeight,
        width: elementWidth,
      } = element.getBoundingClientRect();

      if (right < 0 || left > width || bottom < 0 || top > height) {
        /**
         * If we're outside of the view port, we likely can't render a faithful
         * interpretation of the element's bounding box via translations
         */
        //@ts-ignore
        element = undefined;
      } else {
        let translateX = 0;
        let translateY = 0;

        if (left <= 0) {
          translateX -= left;
        } else if (croppedWidth - right <= 0) {
          translateX -= -(croppedWidth - right);
        }

        if (top <= 0) {
          translateY -= top;
        } else if (croppedHeight - bottom <= 0) {
          translateY -= -(croppedHeight - bottom);
        }

        if (translateX !== 0 || translateY !== 0) {
          style.translate = `${translateX}px ${translateY}px`;
        }

        elementBounds.x = left + translateX;
        elementBounds.width = elementWidth;

        elementBounds.y = top + translateY;
        elementBounds.height = elementHeight;
      }
    }

    try {
      const canvas = await toCanvas(document.body, {
        skipFonts: true,
        filter: (node: Element) => {
          if (
            node.classList &&
            node.classList.contains('dopt-contextual-assistant__popover')
          ) {
            return false;
          }

          if (
            node.tagName &&
            ['video', 'img'].includes(node.tagName.toLowerCase())
          ) {
            return false;
          }

          return true;
        },
        height: croppedHeight,
        width: croppedWidth,
        pixelRatio: scale,
        style,
      });

      if (element) {
        const context = canvas.getContext('2d');
        if (context) {
          context.strokeStyle = ELEMENT_STROKE_COLOR;
          context.lineWidth = ELEMENT_STROKE_WIDTH;
          context.strokeRect(
            elementBounds.x * scale - ELEMENT_STROKE_WIDTH,
            elementBounds.y * scale - ELEMENT_STROKE_WIDTH,
            elementBounds.width * scale + 2 * ELEMENT_STROKE_WIDTH,
            elementBounds.height * scale + 2 * ELEMENT_STROKE_WIDTH
          );
        }
      }
      return {
        type: 'visual',
        value: canvas.toDataURL(),
      };
    } catch (err) {
      logger?.error(
        [
          'Failed to capture the page, returning null.',
          `Details: ${(err as Error).message}`,
          `Stack: ${(err as Error).stack}`,
        ].join('\n')
      );

      return null;
    }
  },
} satisfies ContextGenerator<VisualContext | null>;
