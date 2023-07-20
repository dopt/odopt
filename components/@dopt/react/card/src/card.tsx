import * as classes from './styles';

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

import { classNameRoot } from './const';
import type { Card } from '@dopt/semantic-data-layer-card';
import { MouseEventHandler } from 'react';
import { RichText } from '@dopt/react-rich-text';

const cardClassName = classNameRoot;

export interface CardProps extends ComponentPropsWithoutRef<'div'>, StyleProps {
  active?: boolean;
}

function Card(props: CardProps, ref?: ForwardedRef<HTMLDivElement>) {
  const { active = false, theme, className, ...restProps } = props;

  if (!active) {
    return null;
  }

  return (
    <ThemeContext.Provider value={theme}>
      <div
        className={cls([
          getThemeClassName({
            theme,
            className: [classes.root(), theme],
          }),
          cardClassName,
          className,
        ])}
        {...restProps}
        ref={ref}
      />
    </ThemeContext.Provider>
  );
}

export interface ContentProps
  extends ComponentPropsWithoutRef<'section'>,
    StyleProps {}

const contentClassName = `${classNameRoot}__content` as const;

function CardContent(props: ContentProps, ref?: ForwardedRef<HTMLDivElement>) {
  const { theme: injectedTheme, className, ...restProps } = props;

  const theme = useTheme(injectedTheme);

  return (
    <section
      className={cls([
        getThemeClassName({
          theme,
          className: [classes.content(), theme],
        }),
        contentClassName,
        className,
      ])}
      {...restProps}
      ref={ref}
    />
  );
}

export interface HeaderProps
  extends ComponentPropsWithoutRef<'header'>,
    StyleProps {}

const headerClassName = `${classNameRoot}__header` as const;

function CardHeader(props: HeaderProps, ref?: ForwardedRef<HTMLElement>) {
  const { theme: injectedTheme, className, ...restProps } = props;

  const theme = useTheme(injectedTheme);

  return (
    <header
      className={cls([
        getThemeClassName({
          theme,
          className: [classes.header(), theme],
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

function CardTitle(props: TitleProps, ref?: ForwardedRef<HTMLHeadingElement>) {
  const { theme: injectedTheme, className, children, ...restProps } = props;

  const theme = useTheme(injectedTheme);

  return children == undefined ? null : (
    <h1
      className={cls([
        getThemeClassName({
          theme,
          className: [classes.title(), theme],
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
    StyleProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const dismissIconClassName = `${classNameRoot}__dismiss-icon` as const;

function CardDismissIcon(
  props: DismissIconProps,
  ref?: ForwardedRef<HTMLButtonElement>
) {
  const { theme: injectedTheme, className, onClick, ...restProps } = props;

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
      onClick={onClick}
      className={cls([
        getThemeClassName({
          theme,
          className: [classes.dismissIcon(), theme],
        }),
        dismissIconClassName,
        className,
      ])}
      {...restProps}
      ref={ref}
    >
      {icon}
    </button>
  );
}

export interface BodyProps
  extends Omit<ComponentPropsWithoutRef<'div'>, 'children'>,
    StyleProps {
  children?: Card['body'];
}

const bodyClassName = `${classNameRoot}__body` as const;

function CardBody(props: BodyProps, ref?: ForwardedRef<HTMLDivElement>) {
  const { theme: injectedTheme, className, children, ...restProps } = props;

  const theme = useTheme(injectedTheme);

  return children == undefined ? null : (
    <div
      className={cls([
        getThemeClassName({
          theme,
          className: [classes.body(), theme],
        }),
        bodyClassName,
        className,
      ])}
      {...restProps}
      ref={ref}
    >
      <RichText>{children}</RichText>
    </div>
  );
}

export interface FooterProps
  extends Omit<ComponentPropsWithoutRef<'footer'>, 'title'>,
    StyleProps {}

const footerClassName = `${classNameRoot}__footer` as const;

function CardFooter(props: FooterProps, ref?: ForwardedRef<HTMLElement>) {
  const { theme: injectedTheme, className, ...restProps } = props;

  const theme = useTheme(injectedTheme);

  return (
    <footer
      className={cls([
        getThemeClassName({
          theme,
          className: [classes.footer(), theme],
        }),
        footerClassName,
        className,
      ])}
      {...restProps}
      ref={ref}
    />
  );
}

export interface DismissButtonProps
  extends ComponentPropsWithoutRef<'button'>,
    StyleProps {
  children?: Card['dismissLabel'];
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const dismissButtonClassName = `${classNameRoot}__dismiss-button` as const;

function CardDismissButton(
  props: DismissButtonProps,
  ref?: ForwardedRef<HTMLButtonElement>
) {
  const {
    theme: injectedTheme,
    className,
    children,
    onClick,
    ...restProps
  } = props;

  const theme = useTheme(injectedTheme);

  return children == undefined ? null : (
    <button
      onClick={onClick}
      className={cls([
        getThemeClassName({
          theme,
          className: [classes.dismissButton(), theme],
        }),
        dismissButtonClassName,
        className,
      ])}
      {...restProps}
      ref={ref}
    >
      {children}
    </button>
  );
}

export interface CompleteButtonProps
  extends ComponentPropsWithoutRef<'button'>,
    StyleProps {
  children?: Card['completeLabel'];
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const completeButtonClassName = `${classNameRoot}__complete-button` as const;

function CardCompleteButton(
  props: CompleteButtonProps,
  ref?: ForwardedRef<HTMLButtonElement>
) {
  const {
    theme: injectedTheme,
    className,
    children,
    onClick,
    ...restProps
  } = props;

  const theme = useTheme(injectedTheme);

  return children == undefined ? null : (
    <button
      onClick={onClick}
      className={cls([
        getThemeClassName({
          theme,
          className: [classes.completeButton(), theme],
        }),
        completeButtonClassName,
        className,
      ])}
      {...restProps}
      ref={ref}
    >
      {children}
    </button>
  );
}

const Root = forwardRef(Card);
const Content = forwardRef(CardContent);
const Header = forwardRef(CardHeader);
const Title = forwardRef(CardTitle);
const Body = forwardRef(CardBody);
const Footer = forwardRef(CardFooter);
const DismissIcon = forwardRef(CardDismissIcon);
const DismissButton = forwardRef(CardDismissButton);
const CompleteButton = forwardRef(CardCompleteButton);

export {
  Root,
  Content,
  Header,
  Title,
  Body,
  Footer,
  DismissIcon,
  DismissButton,
  CompleteButton,
};
