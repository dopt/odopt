import React from 'react';

import { render, RenderResult } from '@testing-library/react';

import Checklist from '../';
import * as ChecklistSdl from '@dopt/semantic-data-layer-checklist';

const ChecklistTest = (props: Partial<ChecklistSdl.Checklist>) => (
  <>
    <Checklist.Root>
      <Checklist.Header>
        <Checklist.Title>{props.title}</Checklist.Title>
        <Checklist.DismissIcon onClick={props.dismiss} />
      </Checklist.Header>
      <Checklist.Body>{props.body}</Checklist.Body>
      <Checklist.Progress
        value={props.count && props.count('done')}
        max={props.size}
      />
      <Checklist.Items>
        {(props.items || []).map((item, i) => (
          <Checklist.Item index={i} key={i}>
            <Checklist.ItemIcon>
              {item.completed ? (
                <Checklist.IconCompleted />
              ) : item.skipped ? (
                <Checklist.IconSkipped />
              ) : (
                <Checklist.IconActive />
              )}
            </Checklist.ItemIcon>
            <Checklist.ItemContent>
              <Checklist.ItemTitle disabled={item.done}>
                {item.title}
              </Checklist.ItemTitle>

              <Checklist.ItemBody disabled={item.done}>
                {item.body}
              </Checklist.ItemBody>

              {!item.done && (
                <Checklist.ItemCompleteButton onClick={item.complete}>
                  {item.completeLabel}
                </Checklist.ItemCompleteButton>
              )}
            </Checklist.ItemContent>
            {!item.done && <Checklist.ItemSkipIcon onClick={item.skip} />}
          </Checklist.Item>
        ))}
      </Checklist.Items>
    </Checklist.Root>
  </>
);

describe('@dopt/react-checklist', () => {
  let rendered: RenderResult;

  describe('checklist content and classes', () => {
    describe('visibility', () => {
      it('renders checklist correctly', () => {
        rendered = render(<ChecklistTest />);
        expect(
          rendered.container.querySelector('.dopt-checklist')
        ).not.toBeNull();
      });
    });

    describe('title field', () => {
      it('renders a title if non-null title is returned from API', () => {
        const checklist = render(<ChecklistTest title={'Checklist Title'} />);
        expect(checklist.queryByText('Checklist Title')).not.toBeNull();
      });
      it('adds the correct static class to the title element', () => {
        const checklist = render(<ChecklistTest title={'Checklist Title'} />);
        const title = checklist.getByText('Checklist Title');
        expect(title.classList.contains('dopt-checklist__title')).toBe(true);
      });
      it('does not render a title if title not provided', () => {
        const checklist = render(<ChecklistTest />);
        expect(checklist.queryByText('Checklist Title')).toBeNull();
      });
    });

    describe('body field', () => {
      it('renders a body if non-null body is returned from API', () => {
        const checklist = render(
          <ChecklistTest
            body={[
              {
                type: 'paragraph',
                children: [{ text: 'ChecklistBody' }],
              },
            ]}
          />
        );
        expect(checklist.queryByText('ChecklistBody')).not.toBeNull();
      });
      it('adds the correct static class to the body element', () => {
        const checklist = render(
          <ChecklistTest
            body={[
              {
                type: 'paragraph',
                children: [{ text: 'ChecklistBody' }],
              },
            ]}
          />
        );
        const body = checklist.container.parentNode as HTMLElement;
        expect(body.querySelector('.dopt-checklist__body')).not.toBeNull();
      });
      it('does not render a title if title text is null', () => {
        const checklist = render(<ChecklistTest />);
        expect(checklist.queryByText('ChecklistBody')).toBeNull();
        expect(
          checklist.container.querySelector('.dopt-checklist__body')
        ).toBeNull();
      });
    });
  });

  function getChecklistItem(
    i: number,
    item?: Partial<ChecklistSdl.ChecklistItem>
  ): ChecklistSdl.ChecklistItem {
    return {
      id: String(i),
      index: i,
      title: `checklist-item-title-${i}`,
      body: [
        {
          type: 'paragraph',
          children: [{ text: `checklist-item-body-${i}` }],
        },
      ],
      completeLabel: `checklist-item-complete-label-${i}`,
      done: false,
      active: true,
      skipped: false,
      completed: false,
      field: () => null,
      complete: () => {
        /* no-op */
      },
      skip: () => {
        /* no-op */
      },
      ...item,
    };
  }

  describe('checklist item content, classes, and actions', () => {
    describe('visibility', () => {
      it('renders checklist item correctly', () => {
        rendered = render(<ChecklistTest items={[getChecklistItem(0)]} />);
        expect(
          rendered.container.querySelector('.dopt-checklist__item')
        ).not.toBeNull();
      });
    });

    describe('title field', () => {
      it('renders a title if non-null title is returned from API', () => {
        rendered = render(<ChecklistTest items={[getChecklistItem(0)]} />);
        expect(rendered.queryByText('checklist-item-title-0')).not.toBeNull();
      });
      it('adds the correct static class to the title element', () => {
        rendered = render(<ChecklistTest items={[getChecklistItem(0)]} />);
        const title = rendered.getByText('checklist-item-title-0');
        expect(title.classList.contains('dopt-checklist__item-title')).toBe(
          true
        );
      });
      it('does not render a title if title not provided', () => {
        rendered = render(
          <ChecklistTest items={[getChecklistItem(0, { title: null })]} />
        );
        expect(rendered.queryByText('checklist-item-title-0')).toBeNull();
      });
    });

    describe('body field', () => {
      it('renders a body if non-null body is returned from API', () => {
        rendered = render(<ChecklistTest items={[getChecklistItem(0)]} />);
        expect(rendered.queryByText('checklist-item-body-0')).not.toBeNull();
      });
      it('adds the correct static class to the body element', () => {
        rendered = render(<ChecklistTest items={[getChecklistItem(0)]} />);
        expect(
          rendered.container.querySelector(
            '.dopt-checklist__item--1 .dopt-checklist__item-body'
          )
        ).not.toBeNull();
      });
      it('does not render a item body if body text is null', () => {
        rendered = render(
          <ChecklistTest items={[getChecklistItem(0, { body: null })]} />
        );
        expect(
          rendered.container.querySelector(
            '.dopt-checklist__item--1 .dopt-checklist__item-body'
          )
        ).toBeNull();
      });
    });
  });
});
