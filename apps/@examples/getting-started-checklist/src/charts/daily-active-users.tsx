import { Chart } from './chart';

export function DailyActiveUsers() {
  return (
    <Chart title="Daily active users">
      <img src={`${import.meta.env.BASE_URL}charts/daily-active-users.svg`} />
    </Chart>
  );
}
