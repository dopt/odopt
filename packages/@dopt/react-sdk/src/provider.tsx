import { Component } from 'react';
import { DoptContext } from './context';

import { ProviderConfig, Methods, Block } from './types';

import client from './client';

const generateblockIntentHandler = (
  userId: string,
  apiKey: string,
  method: keyof Methods,
  beforeRequest: (identifier: string) => void,
  afterRequest: (response: { block: Block; updated: Block[] }) => void
) => {
  return async (identifier: string) => {
    beforeRequest(identifier);
    afterRequest(
      await client(`/user/${userId}/block/${identifier}/${method}`, apiKey, {
        method: 'POST',
        body: '{}',
        headers: {
          'Content-Type': 'application/json',
        },
      })
    );
  };
};

const updatedBlocksIdentifierMap = (
  updated: Block[]
): { [identifier: string]: Block } => {
  const updateBlocksMap: { [identifier: string]: Block } = {};
  updated.forEach((block: Block) => {
    let uuid = block.uuid;
    if (uuid !== undefined) {
      updateBlocksMap[uuid] = block;
    }
  });
  return updateBlocksMap;
};

class DoptProvider extends Component<ProviderConfig, DoptContext> {
  constructor(props: ProviderConfig) {
    super(props);

    const { userId, apiKey, mockBlocks } = props;

    const initialRequests: { [identifier: string]: Promise<Block> } = {};

    // Determines if the intent API can be called on a block
    const validIntentState = (block: Block) =>
      block.active && !block.completed && !block.stopped && !block.exited;

    const manuallySetBlockToInActive = (identifier: string) => {
      this.setState({
        blocks: {
          ...this.state.blocks,
          [identifier]: { active: false },
        },
      });
    };

    const mockMethods: Methods = {
      get: () => {},
      start: (identifier) => {
        const { blocks } = this.state;
        const block = blocks[identifier];
        if (block && validIntentState(block)) {
          this.setState({
            blocks: {
              ...blocks,
              [identifier]: {
                ...blocks[identifier],
                started: true,
              },
            },
          });
        }
      },
      complete: (identifier) => {
        const { blocks } = this.state;
        const block = blocks[identifier];
        if (block && validIntentState(block)) {
          this.setState({
            blocks: {
              ...blocks,
              [identifier]: {
                ...blocks[identifier],
                active: false,
                completed: true,
              },
            },
          });
        }
      },
      stop: (identifier) => {
        const { blocks } = this.state;
        const block = blocks[identifier];
        if (block && validIntentState(block)) {
          this.setState({
            blocks: {
              ...blocks,
              [identifier]: {
                ...blocks[identifier],
                active: false,
                stopped: true,
              },
            },
          });
        }
      },
      exit: (identifier) => {
        const { blocks } = this.state;
        const block = blocks[identifier];
        if (block && validIntentState(block)) {
          this.setState({
            blocks: {
              ...blocks,
              [identifier]: {
                ...blocks[identifier],
                active: false,
                exited: true,
              },
            },
          });
        }
      },
    };

    const liveMethods: Methods = {
      get: async (identifier) => {
        const { blocks } = this.state;

        if (!blocks[identifier]) {
          manuallySetBlockToInActive(identifier);
        }

        if (!initialRequests[identifier]) {
          const blockRequest = client(
            `/user/${userId}/block/${identifier}`,
            apiKey
          );
          initialRequests[identifier] = blockRequest;
          const { active } = await blockRequest;
          this.setState({
            blocks: {
              ...this.state.blocks,
              [identifier]: { active },
            },
          });
        }
      },
      start: generateblockIntentHandler(
        userId,
        apiKey,
        'start',
        (identifier) =>
          this.setState({
            blocks: {
              ...this.state.blocks,
              [identifier]: {
                ...this.state.blocks[identifier],
                started: true,
                active: true,
                completed: false,
              },
            },
          }),
        ({ updated }) =>
          this.setState({
            blocks: {
              ...this.state.blocks,
              ...updatedBlocksIdentifierMap(updated),
            },
          })
      ),
      complete: generateblockIntentHandler(
        userId,
        apiKey,
        'complete',
        (identifier) =>
          this.setState({
            blocks: {
              ...this.state.blocks,
              [identifier]: {
                ...this.state.blocks[identifier],
                started: true,
                active: false,
                completed: true,
              },
            },
          }),
        ({ updated }) =>
          this.setState({
            blocks: {
              ...this.state.blocks,
              ...updatedBlocksIdentifierMap(updated),
            },
          })
      ),
      stop: generateblockIntentHandler(
        userId,
        apiKey,
        'stop',
        manuallySetBlockToInActive,
        ({ updated }) =>
          this.setState({
            blocks: {
              ...this.state.blocks,
              ...updatedBlocksIdentifierMap(updated),
            },
          })
      ),
      exit: generateblockIntentHandler(
        userId,
        apiKey,
        'exit',
        manuallySetBlockToInActive,
        ({ updated }) =>
          this.setState({
            blocks: {
              ...this.state.blocks,
              ...updatedBlocksIdentifierMap(updated),
            },
          })
      ),
    };

    this.state = {
      blocks: mockBlocks ? mockBlocks : {},
      methods: mockBlocks ? mockMethods : liveMethods,
    };
  }

  render() {
    return (
      <DoptContext.Provider value={this.state}>
        {this.props.children}
      </DoptContext.Provider>
    );
  }
}

export { DoptProvider };
