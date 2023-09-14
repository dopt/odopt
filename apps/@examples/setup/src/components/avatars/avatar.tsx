interface AvatarProps {
  children: string;
  active?: boolean;
  onClick?: () => void;
}

export function Avatar(props: AvatarProps) {
  const { children, active, onClick } = props;

  return (
    <div
      className={`avatar${active ? ' avatar--active' : ''}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
