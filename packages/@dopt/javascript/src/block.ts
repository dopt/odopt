import { Logger } from '@dopt/logger';
import { blocksApi, getDefaultBlocksState } from '@dopt/javascript-common';

export interface Props {
  identifier: string;
  intents: ReturnType<typeof blocksApi>['blockIntent'];
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
      store.getState()[this.identifier] ||
      getDefaultBlocksState(this.identifier)
    );
  }

  complete() {
    return this.intents.complete(this.identifier, this.version, () => {
      const block = store.getState()[this.identifier];
      return [
        block,
        () => {
          store.setState({
            [this.identifier]: Object.assign(block, {
              active: false,
              completed: true,
            }),
          });
        },
      ];
    });
  }

  exit() {
    return this.intents.complete(this.identifier, this.version);
  }

  stop() {
    return this.intents.stop(this.identifier, this.version, () => {
      const block = store.getState()[this.identifier];
      return [
        block,
        () => {
          store.setState({
            [this.identifier]: Object.assign(block, {
              active: false,
              stopped: true,
            }),
          });
        },
      ];
    });
  }

  subscribe(listener: (block: BlockType) => void) {
    store.subscribe((blocks) => blocks[this.identifier], listener);
  }
}

export { Block };
