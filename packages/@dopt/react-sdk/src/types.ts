export interface Block {
  /*readonly*/ active: boolean;
}

export interface Blocks {
  [identifier: string]: Block;
}

export interface Methods {
  get: (identifier: string) => void;
  done: (identifier: string) => void;
  stop: (identifier: string) => void;
  skip: (identifier: string) => void;
}

export interface ProviderConfig {
  userId: string;
  apiKey: string;
  children: React.ReactNode;
}
