import * as classes from './styles';
import { classNameRoot } from './const';

import {
  forwardRef,
  type ForwardedRef,
  type ComponentPropsWithoutRef,
} from 'react';

import {
  cls,
  type StyleProps,
  ThemeContext,
  getThemeClassName,
  useTheme,
} from '@dopt/react-theme';

import type {
  Checklist,
  ChecklistItem,
} from '@dopt/semantic-data-layer-checklist';

export interface ChecklistProps
  extends ComponentPropsWithoutRef<'section'>,
    StyleProps {
  active?: boolean;
}
const checklistClassName = classNameRoot;

function Checklist(props: ChecklistProps, ref?: ForwardedRef<HTMLElement>) {
  const { active = false, css, theme, className, ...restProps } = props;

  if (!active) {
    return null;
  }

  return (
    <ThemeContext.Provider value={theme}>
      <section
        className={cls([
          getThemeClassName({
            theme,
            className: [classes.root({ css }), theme],
          }),
          checklistClassName,
          className,
        ])}
        {...restProps}
        ref={ref}
      />
    </ThemeContext.Provider>
  );
}

export interface ChecklistHeaderProps
  extends ComponentPropsWithoutRef<'header'>,
    StyleProps {}

const headerClassName = `${classNameRoot}__header` as const;

function ChecklistHeader(
  props: ChecklistHeaderProps,
  ref?: ForwardedRef<HTMLElement>
) {
  const { css, theme: injectedTheme, className, ...restProps } = props;

  const theme = useTheme(injectedTheme);

  return (
    <header
      className={cls([
        getThemeClassName({
          theme,
          className: [classes.header({ css }), theme],
        }),
        headerClassName,
        className,
      ])}
      {...restProps}
      ref={ref}
    />
  );
}

export interface TitleProps
  extends ComponentPropsWithoutRef<'h1'>,
    StyleProps {}

const titleClassName = `${classNameRoot}__title` as const;

function ChecklistTitle(
  props: TitleProps,
  ref?: ForwardedRef<HTMLHeadingElement>
) {
  const {
    css,
    theme: injectedTheme,
    className,
    children,
    ...restProps
  } = props;

  const theme = useTheme(injectedTheme);

  return children == undefined ? null : (
    <h1
      className={cls([
        getThemeClassName({
          theme,
          className: [classes.title({ css }), theme],
        }),
        titleClassName,
        className,
      ])}
      {...restProps}
      ref={ref}
    >
      {children}
    </h1>
  );
}

export interface DismissIconProps
  extends ComponentPropsWithoutRef<'button'>,
    StyleProps {}

const dismissIconClassName = `${classNameRoot}__dismiss-icon` as const;

function ChecklistDismissIcon(
  props: DismissIconProps,
  ref?: ForwardedRef<HTMLButtonElement>
) {
  const { css, theme: injectedTheme, className, onClick, ...restProps } = props;

  const theme = useTheme(injectedTheme);

  const icon = (
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
      <path d="M18 6l-12 12"></path>
      <path d="M6 6l12 12"></path>
    </svg>
  );

  return (
    <button
      className={cls([
        getThemeClassName({
          theme,
          className: [classes.dismissIcon({ css }), theme],
        }),
        dismissIconClassName,
        className,
      ])}
      onClick={onClick}
      {...restProps}
      ref={ref}
    >
      {icon}
    </button>
  );
}

export interface BodyProps
  extends ComponentPropsWithoutRef<'div'>,
    StyleProps {}

const bodyClassName = `${classNameRoot}__body` as const;

function ChecklistBody(props: TitleProps, ref?: ForwardedRef<HTMLDivElement>) {
  const {
    css,
    theme: injectedTheme,
    className,
    children,
    ...restProps
  } = props;

  const theme = useTheme(injectedTheme);

  return children == undefined ? null : (
    <div
      className={cls([
        getThemeClassName({
          theme,
          className: [classes.body({ css }), theme],
        }),
        bodyClassName,
        className,
      ])}
      {...restProps}
      ref={ref}
    >
      {children}
    </div>
  );
}

export interface ProgressProps
  extends ComponentPropsWithoutRef<'div'>,
    StyleProps {
  value?: number;
  max?: number;
}

const progressClassName = `${classNameRoot}__progress` as const;

function ChecklistProgress(
  props: ProgressProps,
  ref?: ForwardedRef<HTMLDivElement>
) {
  const {
    css,
    theme: injectedTheme,
    className,
    value = 0,
    max = 1,
    ...restProps
  } = props;

  const theme = useTheme(injectedTheme);

  return (
    <div
      className={cls([
        getThemeClassName({
          theme,
          className: [classes.progress(), theme],
        }),
        progressClassName,
        className,
      ])}
      {...restProps}
      ref={ref}
    >
      <div
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label="Completed"
        data-value={value}
        data-max={max}
        className={cls([
          getThemeClassName({ theme, className: classes.progressMeter() }),
          `${progressClassName}-meter`,
        ])}
      >
        <div
          className={cls([
            getThemeClassName({ theme, className: classes.progressMeterBar() }),
            `${progressClassName}-meter-bar`,
          ])}
          style={{ width: `${(value / max) * 100}%` }}
        ></div>
      </div>
      <div
        className={cls([
          getThemeClassName({ theme, className: classes.progressContent() }),
          `${progressClassName}-content`,
        ])}
      >
        {value} of {max} complete
      </div>
    </div>
  );
}

export interface ItemsProps extends ComponentPropsWithoutRef<'ul'>, StyleProps {
  items?: Checklist['items'];
}

const itemsClassName = `${classNameRoot}__items` as const;

function ChecklistItems(
  props: ItemsProps,
  ref?: ForwardedRef<HTMLUListElement>
) {
  const { css, theme: injectedTheme, className, items, ...restProps } = props;

  const theme = useTheme(injectedTheme);

  return (
    <ul
      className={cls([
        getThemeClassName({
          theme,
          className: [classes.items({ css }), theme],
        }),
        itemsClassName,
        className,
      ])}
      {...restProps}
      ref={ref}
    >
      {items
        ? items.map((item, i) => (
            <Item key={item.id} item={item} index={i} theme={theme} />
          ))
        : null}
    </ul>
  );
}

export interface ItemProps extends ComponentPropsWithoutRef<'li'>, StyleProps {
  item: ChecklistItem;
  index: number;
}

const itemClassName = `${classNameRoot}__item` as const;

function ChecklistItem(props: ItemProps, ref?: ForwardedRef<HTMLLIElement>) {
  const {
    css,
    theme: injectedTheme,
    className,
    item,
    index,
    ...restProps
  } = props;

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
        `${itemClassName}--${index + 1}`,
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

const Root = forwardRef(Checklist);
const Header = forwardRef(ChecklistHeader);
const Title = forwardRef(ChecklistTitle);
const DismissIcon = forwardRef(ChecklistDismissIcon);
const Body = forwardRef(ChecklistBody);
const Progress = forwardRef(ChecklistProgress);
const Items = forwardRef(ChecklistItems);
const Item = forwardRef(ChecklistItem);

export {
  Root,
  Header,
  Title,
  Body,
  DismissIcon,
  Progress,
  Items,
  Item,
  Root as Checklist,
  Header as ChecklistHeader,
  Title as ChecklistTitle,
  DismissIcon as ChecklistDismissIcon,
  Body as ChecklistBody,
  Progress as ChecklistProgress,
  Items as ChecklistItems,
  Item as ChecklistItem,
};
