export type StyleTheme =
  | (string & {
      className: string;
      selector: string;
    })
  | null
  | undefined;

export interface StyleProps {
  theme?: StyleTheme;
}