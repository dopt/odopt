import { type FormEventHandler } from 'react';

interface InviteProps {
  onSubmit?: FormEventHandler;
}

export function Invite(props: InviteProps) {
  const {
    onSubmit = () => {
      /* noop */
    },
  } = props;

  const handleOnSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <section className="invite">
      <form className="invite__form" onSubmit={handleOnSubmit}>
        <h1 className="invite__title">Invite collaborators</h1>
        <div className="invite__form-field">
          <label className="invite__form-field-label">Email</label>
          <input type="email" className="invite__form-field-input" required />
        </div>
        <p className="invite__text">
          This is just a demo and won’t actually send an invite!
        </p>
        <button type="submit" className="invite__button">
          Invite
        </button>
      </form>
    </section>
  );
}
