export interface Block {
  /*readonly*/ active: boolean;
  /*readonly*/ finished?: boolean;
}

export interface Blocks {
  [identifier: string]: Block;
}

export interface Methods {
  get: (identifier: string) => void;
  finish: (identifier: string) => void;
  exit: (identifier: string) => void;
}

export interface ProviderConfig {
  userId: string;
  apiKey: string;
  children: React.ReactNode;
}
