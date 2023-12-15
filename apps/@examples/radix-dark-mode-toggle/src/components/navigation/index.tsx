import { navigation } from './index.css';
interface NavigationItem {
  name: string;
  active?: boolean;
}

interface Props {
  items?: NavigationItem[];
}
export function Navigation({
  items = [
    {
      name: 'People',
    },
    {
      name: 'Projects',
      active: true,
    },
    {
      name: 'Reports',
    },
    {
      name: 'Tasks',
    },
  ],
}: Props) {
  return (
    <div className={navigation}>
      {items.map((item, i) => {
        if (item.active) {
          return (
            <div key={i} style={{ color: '#51CF66' }}>
              {item.name}
            </div>
          );
        }
        return <div key={i}>{item.name}</div>;
      })}
    </div>
  );
}
