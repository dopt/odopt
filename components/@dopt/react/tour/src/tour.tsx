import * as classes from './styles';
import { classNameRoot } from './const';

import {
  Children,
  type ForwardedRef,
  type PropsWithChildren,
  type ReactElement,
  cloneElement,
  createContext,
  useContext,
  forwardRef,
  type MouseEventHandler,
  type ComponentPropsWithRef,
  useState,
  useEffect,
  useRef,
} from 'react';

import { useComposedRefs } from '@radix-ui/react-compose-refs';

import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  type ReferenceType,
  Side,
  Alignment,
} from '@floating-ui/react-dom';

import {
  cls,
  type StyleProps,
  ThemeContext,
  getThemeClassName,
  useTheme,
} from '@dopt/react-theme';

import type { TourItem } from '@dopt/semantic-data-layer-tour';
import { Portal } from '@dopt/react-portal';

export interface TourItemContext {
  active: boolean;
  anchor: Measurable | null;
  setAnchor(anchor: Measurable | null): void;
}

const TourItemContext = createContext<TourItemContext>({
  active: false,
  anchor: null,
  setAnchor: () => {},
});

export type Measurable = { getBoundingClientRect(): ClientRect };

export interface TourItemProps extends PropsWithChildren, StyleProps {
  active?: boolean;
}

function TourItem(props: TourItemProps) {
  const { active = false, theme, children } = props;

  const [anchor, setAnchor] = useState<Measurable | null>(null);

  return (
    <TourItemContext.Provider
      value={{
        active,
        anchor,
        setAnchor,
      }}
    >
      <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
    </TourItemContext.Provider>
  );
}

export interface AnchorProps
  extends ComponentPropsWithRef<React.ElementType<any>> {
  children: ReactElement;
}

function TourItemAnchor(
  props: AnchorProps,
  forwardedRef?: ForwardedRef<HTMLElement>
) {
  const { children, ...anchorProps } = props;

  const { setAnchor } = useContext(TourItemContext);

  const ref = useRef(null);

  const composedRefs = useComposedRefs(forwardedRef, ref);

  let anchorElement = Children.only(children);

  useEffect(() => {
    setAnchor(ref.current);
  });

  return cloneElement(anchorElement, {
    ...anchorProps,
    ref: composedRefs,
  });
}

export interface PopoverProps extends ComponentPropsWithRef<'div'>, StyleProps {
  position?: Side;
  alignment?: Alignment | 'center';
  offset?: number;
}

const popoverClassName = classNameRoot;

function TourPopover(props: PopoverProps) {
  const {
    css,
    theme: injectedTheme,
    className,
    children,
    offset: popoverOffset = 10,
    position = 'top',
    alignment = 'center',
    style,
    ...restProps
  } = props;

  const { active, anchor } = useContext(TourItemContext);

  const { refs, floatingStyles } = useFloating({
    middleware: [offset(popoverOffset), flip(), shift()],
    placement: alignment === 'center' ? position : `${position}-${alignment}`,
    whileElementsMounted: autoUpdate,
    elements: {
      reference: anchor,
    },
  });

  const theme = useTheme(injectedTheme);

  if (!active || !anchor) {
    return null;
  }

  return (
    <Portal>
      <div
        style={{ ...style, ...floatingStyles }}
        className={cls([
          getThemeClassName({
            theme,
            className: [classes.popover({ css, position, alignment }), theme],
          }),
          popoverClassName,
          `${popoverClassName}--${position}`,
          `${popoverClassName}--${alignment}`,
          className,
        ])}
        data-position={position}
        data-alignment={alignment}
        {...restProps}
        ref={refs.setFloating}
      >
        {children}
      </div>
    </Portal>
  );
}

export interface ContentProps
  extends ComponentPropsWithRef<'section'>,
    StyleProps {}

const contentClassName = `${classNameRoot}__content` as const;

function TourItemContent(props: ContentProps, ref?: ForwardedRef<HTMLElement>) {
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
  extends ComponentPropsWithRef<'header'>,
    StyleProps {}

const headerClassName = `${classNameRoot}__header` as const;

function TourItemHeader(props: HeaderProps, ref?: ForwardedRef<HTMLElement>) {
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

export interface TitleProps extends ComponentPropsWithRef<'h1'>, StyleProps {}

const titleClassName = `${classNameRoot}__title` as const;

function TourItemTitle(
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
  extends ComponentPropsWithRef<'button'>,
    StyleProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const dismissIconClassName = `${classNameRoot}__dismiss-icon` as const;

function TourItemDismissIcon(
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
  extends Omit<ComponentPropsWithRef<'div'>, 'title'>,
    StyleProps {
  children?: TourItem['body'];
}

const bodyClassName = `${classNameRoot}__body` as const;

function TourItemBody(props: BodyProps, ref?: ForwardedRef<HTMLDivElement>) {
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
  extends Omit<ComponentPropsWithRef<'footer'>, 'title'>,
    StyleProps {}

const footerClassName = `${classNameRoot}__footer` as const;

function TourItemFooter(props: FooterProps, ref?: ForwardedRef<HTMLElement>) {
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

export interface BackButtonProps
  extends ComponentPropsWithRef<'button'>,
    StyleProps {
  children?: TourItem['backLabel'];
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const backButtonClassName = `${classNameRoot}__back-button` as const;

function TourItemBackButton(
  props: BackButtonProps,
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
          className: [classes.backButton({ css }), theme],
        }),
        backButtonClassName,
        className,
      ])}
      {...restProps}
      ref={ref}
    >
      {children}
    </button>
  );
}

export interface NextButtonProps
  extends ComponentPropsWithRef<'button'>,
    StyleProps {
  children?: TourItem['nextLabel'];
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const nextButtonClassName = `${classNameRoot}__next-button` as const;

function TourItemNextButton(
  props: NextButtonProps,
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
          className: [classes.nextButton({ css }), theme],
        }),
        nextButtonClassName,
        className,
      ])}
      {...restProps}
      ref={ref}
    >
      {children}
    </button>
  );
}

const Root = TourItem;
const Anchor = forwardRef(TourItemAnchor);
const Popover = TourPopover;
const Content = forwardRef(TourItemContent);
const Header = forwardRef(TourItemHeader);
const Title = forwardRef(TourItemTitle);
const DismissIcon = forwardRef(TourItemDismissIcon);
const Body = forwardRef(TourItemBody);
const Footer = forwardRef(TourItemFooter);
const BackButton = forwardRef(TourItemBackButton);
const NextButton = forwardRef(TourItemNextButton);

export {
  Root,
  Anchor,
  Popover,
  TourItem,
  Content,
  Header,
  Title,
  DismissIcon,
  Body,
  Footer,
  BackButton,
  NextButton,
  Anchor as TourItemAnchor,
  Popover as TourPopover,
  Content as TourItemContent,
  Header as TourItemHeader,
  Title as TourItemTitle,
  DismissIcon as TourItemDismissIcon,
  Body as TourItemBody,
  Footer as TourItemFooter,
  BackButton as TourItemBackButton,
  NextButton as TourItemNextButton,
};
