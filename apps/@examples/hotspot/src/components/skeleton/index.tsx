import { PropsWithChildren } from 'react';
import LoadingSkeleton from 'react-loading-skeleton';
import { skeletonClass } from './index.css';

type Props = PropsWithChildren;

export function Skeleton({ children }: Props) {
  return (
    <div className={skeletonClass}>
      <LoadingSkeleton
        baseColor="#F1F3F5"
        height={200}
        width={200}
        enableAnimation={false}
      />
      {children}
    </div>
  );
}
