import { Chart } from './chart';

export function MostActiveUsers() {
  return (
    <Chart title="Most active users">
      <img src={`${import.meta.env.BASE_URL}charts/most-active-users.svg`} />
    </Chart>
  );
}
