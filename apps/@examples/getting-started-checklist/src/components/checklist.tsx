import { useEffect } from 'react';
import {
  IconCircle,
  IconArrowRight,
  IconCircleCheck,
  IconPlugConnected,
  IconChartPie,
  IconShare,
} from '@tabler/icons';

import { useBlock, useFlow } from '@dopt/react';

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Card,
  Flex,
  Link,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

import {
  CONNECT_DATASOURCE,
  ADD_CHARTS,
  SHARE_DASHBOARD,
  GUARD,
  NEXT_STEPS,
} from '@/const';

import { ChartSelection } from '@/types';

import {
  ConnectDatasourceModal,
  InviteTeamMembersModal,
  AddChartsModal,
  NextStepsModal,
} from '@/components';

interface Props {
  datasourceModalProps: ReturnType<typeof useDisclosure>;
  inviteModalProps: ReturnType<typeof useDisclosure>;
  addChartsModalProps: ReturnType<typeof useDisclosure>;
  setDashboardCharts: (dashboardCharts: ChartSelection) => void;
}

export function GettingStartedChecklist({
  datasourceModalProps,
  inviteModalProps,
  addChartsModalProps,
  setDashboardCharts,
}: Props) {
  const [flow, { reset }] = useFlow('getting-started-checklist');

  const nextStepsModalProps = useDisclosure();

  const [datasourceBlock, datasorceMethods] = useBlock(CONNECT_DATASOURCE);
  const [chartsBlock, chartsMethods] = useBlock(ADD_CHARTS);
  const [shareBlock, shareMethods] = useBlock(SHARE_DASHBOARD);
  const [guardBlock, { complete: completeGuardBlock }] = useBlock(GUARD);
  const [nextStepsBlock, nextStepsMethods] = useBlock(NEXT_STEPS);

  useEffect(() => {
    if (
      guardBlock.state.active &&
      datasourceBlock.state.completed &&
      shareBlock.state.completed &&
      chartsBlock.state.completed
    ) {
      setTimeout(() => {
        completeGuardBlock();
      }, 100);
    }
  }, [guardBlock, datasourceBlock, shareBlock, chartsBlock]);

  if (flow.state?.completed) {
    return (
      <Button size="sm" onClick={() => reset()}>
        Reset Flow
      </Button>
    );
  }

  if (nextStepsBlock.state.active) {
    return (
      <Card p="4" gap="2" bg="white">
        <Flex align="center">
          <Box pr="1" opacity={0.75}>
            <IconCircleCheck size={24} fill="gray" color="white" />
          </Box>
          <Box as="span" flex="1" textAlign="left" opacity={0.75}>
            <Text>Getting started</Text>{' '}
          </Box>
        </Flex>
        <Flex color="#7047EB" align="center">
          <Link onClick={() => nextStepsModalProps.onOpen()}>
            <Text pr="1">Next steps</Text>
          </Link>
          <IconArrowRight size={16} />
        </Flex>
        <NextStepsModal {...nextStepsModalProps} />
      </Card>
    );
  }

  return (
    <Flex direction="column" gap="2">
      <Popover placement="top-start">
        <PopoverTrigger>
          <Card p="4" gap="2" bg="white">
            <Flex align="center">
              <Link>
                <Text pr="1">Getting started</Text>
              </Link>
              <IconArrowRight size={16} />
            </Flex>
            <Flex gap="2">
              {datasourceBlock.state.completed ? (
                <IconCircleCheck size={16} />
              ) : (
                <IconCircle size={16} />
              )}
              {chartsBlock.state.completed ? (
                <IconCircleCheck size={16} />
              ) : (
                <IconCircle size={16} />
              )}
              {shareBlock.state.completed ? (
                <IconCircleCheck size={16} />
              ) : (
                <IconCircle size={16} />
              )}
            </Flex>
          </Card>
        </PopoverTrigger>
        <PopoverContent>
          <Accordion>
            <Flex
              style={{
                background:
                  'linear-gradient(90.02deg, #7047EB 0.02%, #7047EB 34.91%, rgba(112, 71, 235, 0.74) 99.98%)',
                border: '0.5px solid #DCDCDC',
                boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.09)',
                borderRadius: '8px 8px 0px 0px',
              }}
              color="white"
              p="2"
            >
              Getting Started
            </Flex>
            {datasourceBlock.state.completed ? (
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box pr="1">
                      <IconCircleCheck size={24} fill="#7047EB" color="white" />
                    </Box>
                    <Box as="span" flex="1" textAlign="left" opacity={0.75}>
                      <Text>Connect a data source</Text>
                    </Box>
                  </AccordionButton>
                </h2>
              </AccordionItem>
            ) : (
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box pr="1">
                      <IconPlugConnected size={18} />
                    </Box>
                    <Box as="span" flex="1" textAlign="left">
                      Connect a data source
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Stack>
                    <Text>
                      Connect a data source so you can start analyzing your
                      active users.
                    </Text>
                    <Button
                      bg="#7047EB"
                      color="white"
                      onClick={datasourceModalProps.onOpen}
                    >
                      Connect a data source
                    </Button>
                  </Stack>
                </AccordionPanel>
              </AccordionItem>
            )}
            {chartsBlock.state.completed ? (
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box pr="1">
                      <IconCircleCheck size={24} fill="#7047EB" color="white" />
                    </Box>
                    <Box as="span" flex="1" textAlign="left" opacity={0.75}>
                      <Text>Add 3 charts</Text>
                    </Box>
                  </AccordionButton>
                </h2>
              </AccordionItem>
            ) : (
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box pr="1">
                      <IconChartPie size={18} />
                    </Box>
                    <Box as="span" flex="1" textAlign="left">
                      Add 3 Charts
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Stack>
                    <Text>
                      Add charts to your dashboard to see different views and
                      insights about your active users.
                    </Text>
                    <Button
                      bg="#7047EB"
                      color="white"
                      onClick={addChartsModalProps.onOpen}
                    >
                      Add a chart
                    </Button>
                  </Stack>
                </AccordionPanel>
              </AccordionItem>
            )}

            {shareBlock.state.completed ? (
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box pr="1">
                      <IconCircleCheck size={24} fill="#7047EB" color="white" />
                    </Box>
                    <Box as="span" flex="1" textAlign="left" opacity={0.75}>
                      <Text>Share your dasboard</Text>
                    </Box>
                  </AccordionButton>
                </h2>
              </AccordionItem>
            ) : (
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box pr="1">
                      <IconShare size={18} />
                    </Box>
                    <Box as="span" flex="1" textAlign="left">
                      Share your dasboard
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Stack>
                    <Text>
                      Share your dashboard with your teammates so they can view
                      and analyze your active users.
                    </Text>
                    <Button
                      bg="#7047EB"
                      color="white"
                      onClick={inviteModalProps.onOpen}
                    >
                      Share dashboard
                    </Button>
                  </Stack>
                </AccordionPanel>
              </AccordionItem>
            )}
          </Accordion>
        </PopoverContent>
      </Popover>
      <Button size="sm" onClick={() => reset()}>
        Reset Flow
      </Button>
      <ConnectDatasourceModal
        onClose={datasourceModalProps.onClose}
        isOpen={datasourceModalProps.isOpen}
        onFinish={() => {
          datasorceMethods.complete();
          datasourceModalProps.onClose();
        }}
      />
      <AddChartsModal
        onClose={addChartsModalProps.onClose}
        isOpen={addChartsModalProps.isOpen}
        onFinish={(selection) => {
          setDashboardCharts(selection);
          chartsMethods.complete();
          addChartsModalProps.onClose();
        }}
      />
      <InviteTeamMembersModal
        onClose={inviteModalProps.onClose}
        isOpen={inviteModalProps.isOpen}
        onFinish={() => {
          shareMethods.complete();
          inviteModalProps.onClose();
        }}
      />
    </Flex>
  );
}
