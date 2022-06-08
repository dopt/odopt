import React from 'react';
import { DoptContext } from './context';

import { ProviderConfig, State } from './types';

import client from './client';

class DoptProvider extends React.Component<ProviderConfig, DoptContext> {
  constructor(props: ProviderConfig) {
    super(props);

    this.state = {
      userId: undefined,
      models: {},
    };
  }

  initializeModels = async () => {
    const models = await client(`/users/${this.props.userId}/states`);

    this.setState({
      userId: this.props.userId,
      ...models,
      setState: async (key: string, newState: Partial<State>) => {
        const model = await client(
          `/users/${this.props.userId}/states/${key}`,
          {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newState),
          }
        );
        this.setState({ [key]: model });

        const models = await client(`/users/${this.props.userId}/states`);

        this.setState({ ...models });
      },
    });
  };

  async componentDidMount() {
    await this.initializeModels();
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
