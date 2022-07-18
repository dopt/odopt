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

    const { userId, apiKey } = props;

    const initialRequests: { [identifier: string]: Promise<Block> } = {};

    const manuallySetBlockToInActive = (identifier: string) => {
      this.setState({
        blocks: {
          ...this.state.blocks,
          [identifier]: { active: false },
        },
      });
    };

    this.state = {
      blocks: {},
      methods: {
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
      },
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
