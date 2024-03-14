import { CSSProperties } from 'react';
import './styles.css';

interface SkeletonProps {
  width?: CSSProperties['width'];
}

export function Skeleton(props: SkeletonProps) {
  const { width } = props;

  return <div className="skeleton" style={{ width }} />;
}
