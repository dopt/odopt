import './states.css';

interface Props {
  title: string;
  state: Record<string, boolean>;
}

export function States(props: Props) {
  const { title, state } = props;
  const states = Object.keys(state).sort();
  return (
    <pre className="states">
      <h3 className="states-title">{title}</h3>
      <code>
        {states.map((s) => {
          return `${s}: ${state[s].toString()}\n`;
        })}
      </code>
    </pre>
  );
}
