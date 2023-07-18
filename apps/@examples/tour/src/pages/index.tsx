// import Tour, { useTourItem } from '@dopt/react-tour';
import { Skeleton, Tour } from '@/components';

import './index.css';

export function Home() {
  return (
    <div className="home">
      <Tour id="tour-component.crazy-donuts-invite" position="right">
        <Skeleton />
      </Tour>
      <Tour id="tour-component.fast-boats-invent" position="left">
        <Skeleton />
      </Tour>
      <Tour id="tour-component.shiny-bobcats-relate" position="left">
        <Skeleton />
      </Tour>
    </div>
  );
}
