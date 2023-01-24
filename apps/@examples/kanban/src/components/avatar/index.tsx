import { avatarClass, imgClass } from './index.css';

export interface Props {
  name: string;
  src: string;
}

const bgColors: Record<string, string> = {
  yellow: '#FFE7AB',
  purple: '#E2DAFB',
  orange: '#F5B5A1',
};

export function Avatar(props: Props) {
  const { name, src } = props;

  const getBgColor = (): string => {
    const value = name ? name : 'A';
    const bgColorKeys = Object.keys(bgColors);
    const firstChar = value.substring(0, 1);
    const charCode = firstChar.charCodeAt(0);
    const colorIndex = charCode % bgColorKeys.length;

    return bgColors[bgColorKeys[colorIndex]];
  };

  return (
    <div className={avatarClass} style={{ background: getBgColor() }}>
      <img src={src} alt={name} width={24} height={24} className={imgClass} />
    </div>
  );
}
