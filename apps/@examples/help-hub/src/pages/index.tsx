import {
  destinations,
  example,
  footerNav,
  navigation,
  topNav,
} from '@/pages/index.css';

import { Brand, Destinations, Navigation, User } from '@/components';
import HelpHub, { useHelpHub } from '@dopt/react-help-hub';
import { useEffect } from 'react';

export function Example() {
  const helpHub = useHelpHub('ai-segment-destination');

  useEffect(() => {
    helpHub.open();
    /**
     * On mount, open the helpHub.
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={example}>
      <div className={navigation}>
        <div className={topNav}>
          <Brand />
          <Navigation />
        </div>
        <div className={footerNav}>
          <User />
        </div>
      </div>
      <div className={destinations}>
        <Destinations />
      </div>
      <HelpHub.Root>
        <HelpHub.Activator>
          <HelpHub.Launcher
            isOpen={helpHub.isOpen}
            onClick={() => (helpHub.isOpen ? helpHub.close() : helpHub.open())}
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              zIndex: 10000,
              width: 45,
              height: 45,
            }}
          />
        </HelpHub.Activator>
        <HelpHub.Popover position="top" alignment="end" isOpen={helpHub.isOpen}>
          <HelpHub.Content>
            <HelpHub.Header>
              {helpHub.askQuery ? (
                <HelpHub.BackIcon onClick={() => helpHub.backToSearch()} />
              ) : (
                <HelpHub.Title>Learn more about Datashift</HelpHub.Title>
              )}
              <HelpHub.CloseIcon onClick={() => helpHub.close()} />
            </HelpHub.Header>
            {!helpHub.askQuery && (
              <HelpHub.SearchInput onEnteredSearch={helpHub.search}>
                {helpHub.searchQuery}
              </HelpHub.SearchInput>
            )}
            <HelpHub.Body>
              {helpHub.askQuery ? (
                <>
                  <HelpHub.BodyHeading>{helpHub.askQuery}</HelpHub.BodyHeading>
                  {helpHub.askAnswer ? (
                    <HelpHub.Answer>{helpHub.askAnswer}</HelpHub.Answer>
                  ) : (
                    <HelpHub.Loader />
                  )}
                  {helpHub.askSources && helpHub.askSources.length > 0 && (
                    <>
                      <HelpHub.BodyHeading>Sources</HelpHub.BodyHeading>
                      <HelpHub.SourceList>
                        {helpHub.askSources.map((document) => {
                          return (
                            <HelpHub.Source
                              key={document.id}
                              index={document.id}
                              url={document.url}
                              title={document.title}
                            />
                          );
                        })}
                      </HelpHub.SourceList>
                    </>
                  )}
                </>
              ) : (
                <HelpHub.SourceList>
                  {helpHub.searchQuery ? (
                    <>
                      <HelpHub.AskItem
                        query={helpHub.searchQuery}
                        onClick={() => helpHub.ask()}
                      />
                      {!helpHub.searchResults ? (
                        <HelpHub.Loader />
                      ) : (
                        helpHub.searchResults.map((document) => {
                          return (
                            <HelpHub.Source
                              key={document.id}
                              url={document.url}
                              title={document.title}
                              content={document.chunks[0]?.text}
                            />
                          );
                        })
                      )}
                    </>
                  ) : (
                    <>
                      <HelpHub.Source
                        url="https://segment.com/docs/"
                        title="Visit the Datashift Docs"
                        hideUrl
                      />
                      <HelpHub.Source
                        url="https://community.segment.com/p/help"
                        title="Get Help!"
                        hideUrl
                      />
                      <HelpHub.Source
                        url="https://community.segment.com/"
                        title="Join our Community"
                        hideUrl
                      />
                    </>
                  )}
                </HelpHub.SourceList>
              )}
            </HelpHub.Body>
            {helpHub.askQuery && (
              <HelpHub.Question canAsk={helpHub.canAsk} ask={helpHub.ask} />
            )}
          </HelpHub.Content>
        </HelpHub.Popover>
      </HelpHub.Root>
    </div>
  );
}
