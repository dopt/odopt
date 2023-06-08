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
import type { Modal } from '@dopt/semantic-data-layer-modal';
import { MouseEventHandler } from 'react';

const modalClassName = classNameRoot;

export interface ModalProps
  extends ComponentPropsWithoutRef<'div'>,
    StyleProps {}

function Modal(props: ModalProps, ref?: ForwardedRef<HTMLDivElement>) {
  const { css, theme, className, ...restProps } = props;

  return (
    <ThemeContext.Provider value={theme}>
      <div
        className={cls([
          getThemeClassName({
            theme,
            className: [classes.root({ css }), theme],
          }),
          modalClassName,
          className,
        ])}
        {...restProps}
        ref={ref}
      />
    </ThemeContext.Provider>
  );
}

export interface OverlayProps
  extends ComponentPropsWithoutRef<'div'>,
    StyleProps {}

const overlayClassName = `${classNameRoot}__overlay` as const;

function ModalOverlay(props: OverlayProps, ref?: ForwardedRef<HTMLDivElement>) {
  const { css, theme: injectedTheme, className, ...restProps } = props;

  const theme = useTheme(injectedTheme);

  return (
    <div
      className={cls([
        getThemeClassName({
          theme,
          className: [classes.overlay({ css }), theme],
        }),
        overlayClassName,
        className,
      ])}
      {...restProps}
      ref={ref}
    />
  );
}

export interface ContentProps
  extends ComponentPropsWithoutRef<'section'>,
    StyleProps {}

const contentClassName = `${classNameRoot}__content` as const;

function ModalContent(props: ContentProps, ref?: ForwardedRef<HTMLDivElement>) {
  const { css, theme: injectedTheme, className, ...restProps } = props;

  const theme = useTheme(injectedTheme);

  return (
    <section
      className={cls([
        getThemeClassName({
          theme,
          className: [classes.content({ css }), theme],
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

function ModalHeader(props: HeaderProps, ref?: ForwardedRef<HTMLElement>) {
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

function ModalTitle(props: TitleProps, ref?: ForwardedRef<HTMLHeadingElement>) {
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
    StyleProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const dismissIconClassName = `${classNameRoot}__dismiss-icon` as const;

function ModalDismissIcon(
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
      onClick={onClick}
      className={cls([
        getThemeClassName({
          theme,
          className: [classes.dismissIcon({ css }), theme],
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
  extends Omit<ComponentPropsWithoutRef<'div'>, 'title'>,
    StyleProps {
  children?: Modal['body'];
}

const bodyClassName = `${classNameRoot}__body` as const;

function ModalBody(props: BodyProps, ref?: ForwardedRef<HTMLDivElement>) {
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

export interface FooterProps
  extends Omit<ComponentPropsWithoutRef<'footer'>, 'title'>,
    StyleProps {}

const footerClassName = `${classNameRoot}__footer` as const;

function ModalFooter(props: FooterProps, ref?: ForwardedRef<HTMLElement>) {
  const { css, theme: injectedTheme, className, ...restProps } = props;

  const theme = useTheme(injectedTheme);

  return (
    <footer
      className={cls([
        getThemeClassName({
          theme,
          className: [classes.footer({ css }), theme],
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
  children?: Modal['dismissLabel'];
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const dismissButtonClassName = `${classNameRoot}__dismiss-button` as const;

function ModalDismissButton(
  props: DismissButtonProps,
  ref?: ForwardedRef<HTMLButtonElement>
) {
  const {
    css,
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
          className: [classes.dismissButton({ css }), theme],
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
  children?: Modal['completeLabel'];
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const completeButtonClassName = `${classNameRoot}__complete-button` as const;

function ModalCompleteButton(
  props: CompleteButtonProps,
  ref?: ForwardedRef<HTMLButtonElement>
) {
  const {
    css,
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
          className: [classes.completeButton({ css }), theme],
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

const Root = forwardRef(Modal);
const Overlay = forwardRef(ModalOverlay);
const Content = forwardRef(ModalContent);
const Header = forwardRef(ModalHeader);
const Title = forwardRef(ModalTitle);
const Body = forwardRef(ModalBody);
const Footer = forwardRef(ModalFooter);
const DismissIcon = forwardRef(ModalDismissIcon);
const DismissButton = forwardRef(ModalDismissButton);
const CompleteButton = forwardRef(ModalCompleteButton);

export {
  Root,
  Overlay,
  Content,
  Header,
  Title,
  Body,
  Footer,
  DismissIcon,
  DismissButton,
  CompleteButton,
  Root as Modal,
  Overlay as ModalOverlay,
  Content as ModalContent,
  Header as ModalHeader,
  Title as ModalTitle,
  Body as ModalBody,
  Footer as ModalFooter,
  DismissIcon as ModalDismissIcon,
  DismissButton as ModalDismissButton,
  CompleteButton as ModalCompleteButton,
};
