import React from 'react';
import { DoptContext } from '@/context';

import { ProviderConfig, Methods, Block } from '@/types';

import client from '@/client';

const generateblockIntentHandler = (
  userId: string,
  apiKey: string,
  method: keyof Methods,
  beforeRequest: (identifier: string) => void,
  afterRequest: (response: {
    block: Block;
    updated: { [identifier: string]: Block };
  }) => void
) => {
  return async (identifier: string) => {
    beforeRequest(identifier);
    afterRequest(
      await client(`/users/${userId}/block/${identifier}/${method}`, apiKey, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
    );
  };
};

class DoptProvider extends React.Component<ProviderConfig, DoptContext> {
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
              `/users/${userId}/block/${identifier}`,
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
        finish: generateblockIntentHandler(
          userId,
          apiKey,
          'finish',
          manuallySetBlockToInActive,
          ({ updated }) =>
            this.setState({
              blocks: {
                ...this.state.blocks,
                ...updated,
              },
            })
        ),
        exit: generateblockIntentHandler(
          userId,
          apiKey,
          'exit',
          manuallySetBlockToInActive,
          () => {}
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
