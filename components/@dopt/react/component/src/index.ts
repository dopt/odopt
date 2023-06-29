import React, { PropsWithoutRef } from 'react';

export type ComponentPropsWithoutRef<T extends React.ElementType> =
  PropsWithoutRef<React.ComponentProps<T>>;

export type ComponentPropsWithRef<T extends React.ElementType> =
  React.ComponentPropsWithRef<T>;
