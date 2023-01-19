import { Chart } from './chart';

export function MonthlyActiveUsers() {
  return (
    <Chart title="Monthly active users">
      <img src={`${import.meta.env.BASE_URL}charts/monthly-active-users.svg`} />
    </Chart>
  );
}
