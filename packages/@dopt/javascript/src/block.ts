import { Logger } from '@dopt/logger';
import { blocksApi, getBlockDefaultState } from '@dopt/javascript-common';

export interface Props {
  identifier: string;
  intents: ReturnType<typeof blocksApi>['intent'];
  logger: Logger;
  version: number;
}

import { Block as BlockType } from '@dopt/javascript-common';

import { store } from './store';

class Block {
  public identifier: Props['identifier'];

  private logger: Props['logger'];
  private intents: Props['intents'];
  private version: Props['version'];

  constructor({ identifier, intents, logger, version }: Props) {
    this.identifier = identifier;
    this.intents = intents;
    this.version = version;
    this.logger = logger;
  }

  state() {
    return (
      store.getState()[this.identifier] || getBlockDefaultState(this.identifier)
    );
  }

  complete() {
    return this.intents.complete(this.identifier, this.version);
  }

  exit() {
    return this.intents.complete(this.identifier, this.version);
  }

  stop() {
    return this.intents.stop(this.identifier, this.version);
  }

  subscribe(listener: (block: BlockType) => void) {
    store.subscribe((blocks) => blocks[this.identifier], listener);
  }
}

export { Block };
