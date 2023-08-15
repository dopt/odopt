import { Popover } from './popover';

import { useTour } from '@dopt/react-tour';

import {
  DOPT_TOUR_ID,
  DOPT_TOUR_STEP_1_ID,
  DOPT_TOUR_STEP_2_ID,
} from '../../const';

import './styles.css';

export function TourWrapper() {
  const tour = useTour(DOPT_TOUR_ID);

  if (!tour.active) return null;

  return (
    <div className="tour-wrapper">
      <Popover id={DOPT_TOUR_STEP_1_ID}>
        <div className="placeholder" />
      </Popover>

      <Popover id={DOPT_TOUR_STEP_2_ID}>
        <div className="placeholder" />
      </Popover>
    </div>
  );
}
