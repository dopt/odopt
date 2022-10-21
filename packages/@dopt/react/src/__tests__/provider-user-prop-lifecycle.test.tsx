import { useEffect, useState } from 'react';

import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { DoptProvider, useDopt } from '../';

describe('Tests the DoptProvider initialization', () => {
  const unmockedFetch = global.fetch;

  beforeAll(() => {
    global.fetch = jest.fn((url) => {
      switch (url) {
        case 'undefined/blocks?journeyIdentifier=test&version=1':
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve([{ uuid: 'myblockid' }]),
          });
        case 'undefined/block/myblockid?version=1&endUserIdentifier=9083778098':
          return Promise.resolve({
            ok: true,
            json: () =>
              Promise.resolve({
                uuid: 'myblockid',
                active: true,
                version: 1,
                started: false,
                completed: true,
                stopped: false,
                exited: false,
              }),
          });
      }
    }) as jest.Mock;
  });

  afterAll(() => {
    global.fetch = unmockedFetch;
  });

  jest.useFakeTimers();

  const BlockComponent = function (props: {
    userId: string | undefined;
    updateUserId: (doptUserId: string) => void;
  }): JSX.Element {
    const [block] = useDopt('myblockid');

    useEffect(() => {
      setTimeout(() => {
        props.updateUserId('9083778098');
      }, 2000);
    });

    if (block.active) {
      return <div>ON</div>;
    }
    return <div>OFF</div>;
  };

  const TestApp = function (): JSX.Element {
    const [userId, updateUserId] = useState<string | undefined>(undefined);
    return (
      <DoptProvider
        apiKey="fancyApiKey"
        userId={userId}
        flowVersions={{ test: 1 }}
      >
        <BlockComponent updateUserId={updateUserId} userId={userId} />
      </DoptProvider>
    );
  };

  test('Verify useDopt hooks work with userID prop lifecycle', async () => {
    const { getByText } = render(<TestApp />);

    expect(() => getByText(/ON/)).toThrow();
    expect(() => getByText(/OFF/)).not.toThrow();

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    // Still waiting for user to be updated
    expect(() => getByText(/ON/)).toThrow();
    expect(() => getByText(/OFF/)).not.toThrow();

    // Update user complete, block is active
    await act(async () => {
      jest.advanceTimersByTime(2000);
    });
    expect(() => getByText(/ON/)).not.toThrow();
    expect(() => getByText(/OFF/)).toThrow();
  });
});
