import { type ForwardedRef, forwardRef } from 'react';
import './styles.css';

function Skeleton(_props: unknown, ref?: ForwardedRef<HTMLDivElement>) {
  return <div className="skeleton" ref={ref}></div>;
}

const Component = forwardRef(Skeleton);
export { Component as Skeleton };
