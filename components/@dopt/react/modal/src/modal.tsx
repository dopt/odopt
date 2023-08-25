import * as classes from './styles.css';
import { classNameRoot } from './const';

import {
  forwardRef,
  type ForwardedRef,
  type ComponentPropsWithoutRef,
  useEffect,
} from 'react';
import clsx from 'clsx';

import {
  type StyleProps,
  themeClassName,
  themeStyle,
  ThemeContext,
  useTheme,
} from '@dopt/react-theme';

import Portal, { type PortalProps } from '@dopt/react-portal';
import RichText from '@dopt/react-rich-text';

import type { Modal } from '@dopt/semantic-data-layer-modal';

const modalClassName = classNameRoot;

export interface ModalProps
  extends ComponentPropsWithoutRef<'div'>,
    StyleProps {
  active?: boolean;
  container?: PortalProps['container'];
  lockScroll?: boolean;
}

function Modal(props: ModalProps, ref?: ForwardedRef<HTMLDivElement>) {
  const {
    active = false,
    container,
    lockScroll = true,
    theme,
    className,
    style,
    ...restProps
  } = props;

  useEffect(() => {
    if (lockScroll) {
      const bodyClassList = document.body.classList;
      if (active) {
        bodyClassList.add(classes.lockScroll);
      } else {
        bodyClassList.remove(classes.lockScroll);
      }
    }
  }, [lockScroll, active]);

  if (!active) {
    return null;
  }

  return (
    <ThemeContext.Provider value={theme}>
      <Portal container={container}>
        <div
          className={clsx([
            themeClassName({
              theme,
              className: classes.modalRoot,
            }),
            modalClassName,
            className,
          ])}
          style={themeStyle({ style, theme })}
          {...restProps}
          ref={ref}
        />
      </Portal>
    </ThemeContext.Provider>
  );
}

export interface OverlayProps
  extends ComponentPropsWithoutRef<'div'>,
    StyleProps {
  container?: PortalProps['container'];
}

const overlayClassName = `${classNameRoot}__overlay` as const;

function ModalOverlay(props: OverlayProps, ref?: ForwardedRef<HTMLDivElement>) {
  const {
    container,
    theme: injectedTheme,
    className,
    style,
    ...restProps
  } = props;

  const theme = useTheme(injectedTheme);

  return (
    <Portal container={container}>
      <div
        className={clsx([
          themeClassName({
            theme,
            className: classes.modalOverlay,
          }),
          overlayClassName,
          className,
        ])}
        style={themeStyle({ theme, style })}
        {...restProps}
        ref={ref}
      />
    </Portal>
  );
}

export interface ContentProps
  extends ComponentPropsWithoutRef<'section'>,
    StyleProps {}

const contentClassName = `${classNameRoot}__content` as const;

function ModalContent(props: ContentProps, ref?: ForwardedRef<HTMLDivElement>) {
  const { theme: injectedTheme, className, style, ...restProps } = props;

  const theme = useTheme(injectedTheme);

  return (
    <section
      className={clsx([
        themeClassName({
          theme,
          className: classes.modalContent,
        }),
        contentClassName,
        className,
      ])}
      style={themeStyle({ theme, style })}
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
  const { theme: injectedTheme, className, style, ...restProps } = props;

  const theme = useTheme(injectedTheme);

  return (
    <header
      className={clsx([
        themeClassName({
          theme,
          className: classes.modalHeader,
        }),
        headerClassName,
        className,
      ])}
      style={themeStyle({ theme, style })}
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
    theme: injectedTheme,
    className,
    style,
    children,
    ...restProps
  } = props;

  const theme = useTheme(injectedTheme);

  return children == undefined ? null : (
    <h1
      className={clsx([
        themeClassName({
          theme,
          className: classes.modalTitle,
        }),
        titleClassName,
        className,
      ])}
      style={themeStyle({ theme, style })}
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

function ModalDismissIcon(
  props: DismissIconProps,
  ref?: ForwardedRef<HTMLButtonElement>
) {
  const { theme: injectedTheme, className, style, ...restProps } = props;

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
      className={clsx([
        themeClassName({
          theme,
          className: classes.modalDismissIcon,
        }),
        dismissIconClassName,
        className,
      ])}
      style={themeStyle({ theme, style })}
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
  children?: Modal['body'];
}

const bodyClassName = `${classNameRoot}__body` as const;

function ModalBody(props: BodyProps, ref?: ForwardedRef<HTMLDivElement>) {
  const {
    theme: injectedTheme,
    className,
    style,
    children,
    ...restProps
  } = props;

  const theme = useTheme(injectedTheme);

  return children == undefined ? null : (
    <div
      className={clsx([
        themeClassName({
          theme,
          className: classes.modalBody,
        }),
        bodyClassName,
        className,
      ])}
      style={themeStyle({ theme, style })}
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

function ModalFooter(props: FooterProps, ref?: ForwardedRef<HTMLElement>) {
  const { theme: injectedTheme, className, style, ...restProps } = props;

  const theme = useTheme(injectedTheme);

  return (
    <footer
      className={clsx([
        themeClassName({
          theme,
          className: classes.modalFooter,
        }),
        footerClassName,
        className,
      ])}
      style={themeStyle({ theme, style })}
      {...restProps}
      ref={ref}
    />
  );
}

export interface DismissButtonProps
  extends ComponentPropsWithoutRef<'button'>,
    StyleProps {
  children?: Modal['dismissLabel'];
}

const dismissButtonClassName = `${classNameRoot}__dismiss-button` as const;

function ModalDismissButton(
  props: DismissButtonProps,
  ref?: ForwardedRef<HTMLButtonElement>
) {
  const {
    theme: injectedTheme,
    className,
    style,
    children,
    ...restProps
  } = props;

  const theme = useTheme(injectedTheme);

  return children == undefined ? null : (
    <button
      className={clsx([
        themeClassName({
          theme,
          className: classes.modalDismissButton,
        }),
        dismissButtonClassName,
        className,
      ])}
      style={themeStyle({ theme, style })}
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
}

const completeButtonClassName = `${classNameRoot}__complete-button` as const;

function ModalCompleteButton(
  props: CompleteButtonProps,
  ref?: ForwardedRef<HTMLButtonElement>
) {
  const {
    theme: injectedTheme,
    className,
    style,
    children,
    ...restProps
  } = props;

  const theme = useTheme(injectedTheme);

  return children == undefined ? null : (
    <button
      className={clsx([
        themeClassName({
          theme,
          className: classes.modalCompleteButton,
        }),
        completeButtonClassName,
        className,
      ])}
      style={themeStyle({ theme, style })}
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
};
