export interface State {
  readonly active: boolean;
  started: boolean;
  finished: boolean;
  stopped: boolean;
  exited: boolean;
  paused: boolean;
}

export interface Models {
  [identifier: string]: State;
}
export interface ProviderConfig {
  userId: string;
  children: React.ReactNode;
}
