import * as classes from '../styles';
import { classNameRoot } from '../const';

import {
  forwardRef,
  type ForwardedRef,
  type ComponentPropsWithRef,
} from 'react';

import {
  cls,
  type StyleProps,
  getThemeClassName,
  useTheme,
} from '@dopt/react-theme';

import type { ChecklistItem } from '@dopt/semantic-data-layer-checklist';

export interface ItemProps extends ComponentPropsWithRef<'li'>, StyleProps {
  item: ChecklistItem;
}

const itemClassName = `${classNameRoot}__item` as const;

function ChecklistItem(props: ItemProps, ref?: ForwardedRef<HTMLLIElement>) {
  const { css, theme: injectedTheme, className, item, ...restProps } = props;

  const theme = useTheme(injectedTheme);

  const iconCircle = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
    </svg>
  );

  const iconCheck = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path
        d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z"
        strokeWidth="0"
        fill="currentColor"
      ></path>
    </svg>
  );

  const iconX = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path
        d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-6.489 5.8a1 1 0 0 0 -1.218 1.567l1.292 1.293l-1.292 1.293l-.083 .094a1 1 0 0 0 1.497 1.32l1.293 -1.292l1.293 1.292l.094 .083a1 1 0 0 0 1.32 -1.497l-1.292 -1.293l1.292 -1.293l.083 -.094a1 1 0 0 0 -1.497 -1.32l-1.293 1.292l-1.293 -1.292l-.094 -.083z"
        strokeWidth="0"
        fill="currentColor"
      ></path>
    </svg>
  );

  return (
    <li
      data-item-id={item.id}
      className={cls([
        getThemeClassName({
          theme,
          className: [classes.item({ css }), theme],
        }),
        itemClassName,
        `${itemClassName}--${(item.index || 0) + 1}`,
        item.active ? `${itemClassName}--active` : undefined,
        item.completed ? `${itemClassName}--completed` : undefined,
        className,
      ])}
      {...restProps}
      ref={ref}
    >
      <div
        className={cls([
          getThemeClassName({
            theme,
            className: classes.itemIcon({
              completed: item.completed,
            }),
          }),
          `${itemClassName}-icon`,
        ])}
      >
        {item.completed ? iconCheck : iconCircle}
      </div>
      <div
        className={cls([
          getThemeClassName({
            theme,
            className: classes.itemContent(),
          }),
          `${itemClassName}-content`,
        ])}
      >
        {item.title && (
          <div
            className={cls([
              getThemeClassName({
                theme,
                className: classes.itemTitle({
                  completed: item.completed,
                }),
              }),
              `${itemClassName}-title`,
            ])}
          >
            {item.title}
          </div>
        )}
        {item.body && (
          <div
            className={cls([
              getThemeClassName({
                theme,
                className: classes.itemBody({ completed: item.completed }),
              }),
              `${itemClassName}-body`,
            ])}
          >
            {item.body}
          </div>
        )}
        {item.completeLabel && !item.completed && (
          <button
            onClick={item.complete}
            className={cls([
              getThemeClassName({
                theme,
                className: classes.itemCompleteButton(),
              }),
              `${itemClassName}-complete-button`,
            ])}
          >
            {item.completeLabel}
          </button>
        )}
      </div>
      {!item.completed && (
        <button
          onClick={item.skip}
          className={cls([
            getThemeClassName({
              theme,
              className: classes.itemSkipIcon(),
            }),
            `${itemClassName}-skip-icon`,
          ])}
        >
          {iconX}
        </button>
      )}
    </li>
  );
}
const Item = forwardRef(ChecklistItem);
export { Item, Item as ChecklistItem };
