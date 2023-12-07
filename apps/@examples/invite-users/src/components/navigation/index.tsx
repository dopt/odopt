import {
  IconFileDescription,
  IconListCheck,
  IconLivePhoto,
  IconPlug,
  IconSettings,
} from '@tabler/icons';
import { navigation, navigationItem } from './index.css';
interface NavigationItem {
  name: string;
  icon: React.ReactNode;
  active?: boolean;
}

interface Props {
  items?: NavigationItem[];
}
export function Navigation({
  items = [
    {
      name: 'Getting started ',
      active: true,
      icon: <IconListCheck />,
    },
    {
      name: 'Documents',
      icon: <IconFileDescription />,
    },
    {
      name: 'Library',
      icon: <IconLivePhoto />,
    },
    {
      name: 'Plugins',
      icon: <IconPlug />,
    },
    {
      name: 'Settings',
      icon: <IconSettings />,
    },
  ],
}: Props) {
  return (
    <div className={navigation}>
      {items.map((item, i) => {
        if (item.active) {
          return (
            <div
              key={i}
              className={navigationItem}
              style={{
                color: '#339AF0',
                backgroundColor: '#E7F5FF',
              }}
            >
              {item.icon}
              {item.name}
            </div>
          );
        }
        return (
          <div key={i} className={navigationItem}>
            {item.icon}
            {item.name}
          </div>
        );
      })}
    </div>
  );
}
