export interface Block {
  readonly active: boolean;
  readonly completed: boolean;
  readonly started: boolean;
  readonly stopped: boolean;
  readonly exited: boolean;
  readonly uuid: string;
}

export interface Blocks {
  [identifier: string]: Block;
}

export type BlockIdentifier = Pick<Block, 'uuid'>;

export interface BlockIntentions {
  start: (identifier: string) => void;
  /** @internal */
  complete: (identifier: string) => void;
  /** @internal */
  stop: (identifier: string) => void;
  /** @internal */
  exit: (identifier: string) => void;
  /** @internal */
  prev: (identifier: string) => void;
  /** @internal */
  next: (identifier: string) => void;
  /** @internal */
  goto: (identifier: string) => void;
}

export interface Group extends Block {
  readonly blocks: Block[];
}

export interface Flow {
  readonly name: string;
  readonly version: number;
}

export interface Flows {
  [name: Flow['name']]: {
    [version: Flow['version']]: Flow;
  };
}

export interface FlowIntentions {
  reset: (name: Flow['name'], version: Flow['version']) => void;
}
