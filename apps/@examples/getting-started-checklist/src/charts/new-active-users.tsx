import { Chart } from './chart';

export function NewActiveUsers() {
  return (
    <Chart title="New active users">
      <img src={`${import.meta.env.BASE_URL}charts/new-active-users.svg`} />
    </Chart>
  );
}
