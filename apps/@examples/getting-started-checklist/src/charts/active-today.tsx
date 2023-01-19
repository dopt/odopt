import { Chart } from './chart';

export function ActiveToday() {
  return (
    <Chart title="Active today">
      <img src={`${import.meta.env.BASE_URL}charts/active-today.svg`} />
    </Chart>
  );
}
