import { useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

export function useTheme(
  initialTheme: Theme
): [Theme, React.Dispatch<React.SetStateAction<Theme>>] {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return [theme, setTheme];
}
