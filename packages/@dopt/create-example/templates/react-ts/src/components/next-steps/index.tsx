import { useFlow } from '@dopt/react';

import { DOPT_FLOW_ID } from '../../const';

import './styles.css';

export function NextSteps() {
  const [flow, intent] = useFlow(DOPT_FLOW_ID);

  if (!flow.state.finished) return null;

  return (
    <section className="next-steps-wrapper">
      <h1 className="next-steps__title">That's it!</h1>

      <p className="next-steps__text">
        You just completed your first Dopt flow. Here are some next steps:
      </p>

      <ul className="next-steps__list">
        <li>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              intent.reset();
            }}
          >
            Reset this flow →
          </a>
        </li>
        <li>
          <a href="https://docs.dopt.com/components/">Read component docs →</a>
        </li>
        <li>
          <a href="https://www.dopt.com/examples">Check out other examples →</a>
        </li>
      </ul>
    </section>
  );
}
