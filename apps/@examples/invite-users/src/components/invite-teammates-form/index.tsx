import { Button } from '../button';
import { textarea } from './index.css';

interface Props {
  onChange?: (value: string) => void;
  onSubmit?: () => void;
}

export function InviteUsersForm({
  onChange = () => {
    /* */
  },
  onSubmit,
}: Props) {
  if (onSubmit) {
    return (
      <>
        <div style={{ display: 'flex' }}>
          <textarea
            className={textarea}
            placeholder="Enter your teammates emails"
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
        <Button onClick={() => onSubmit()}>Send invites</Button>
      </>
    );
  }

  return (
    <div style={{ display: 'flex' }}>
      <textarea
        className={textarea}
        placeholder="Enter your teammates emails"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
