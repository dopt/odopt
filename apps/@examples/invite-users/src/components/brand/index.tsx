import { IconBallVolleyball } from '@tabler/icons';
import { brand } from './index.css';

export function Brand() {
  return (
    <div className={brand}>
      <IconBallVolleyball size={32} />
      <div>SomeCMS</div>
    </div>
  );
}
