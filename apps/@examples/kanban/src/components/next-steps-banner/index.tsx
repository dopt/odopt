import { Alert, Box, Stack, Text, Title, Group, Card } from '@mantine/core';
import { IconTableOptions, IconTemplate, IconUserPlus } from '@tabler/icons';

import { useBlock } from '@dopt/react';

export function NextStepsBanner() {
  const [nextSteps, closeNextSteps] = useBlock('bLcWkysVad5kGkRlV9zLe');

  if (!nextSteps.state.active) {
    return null;
  }

  return (
    <Box>
      <Alert
        p="lg"
        py={42}
        radius={6}
        sx={{ border: '0.5px solid #C4DAEA' }}
        withCloseButton
        onClose={() => closeNextSteps.complete()}
      >
        <Stack justify="center" align="center" spacing="md">
          <Title order={5}>🎉 Next steps</Title>
          <Text size="lg">
            You just used the Kanban board to stay in flow with your team and
            complete your tasks. Here are some next steps:
          </Text>
          <Group position="center" grow>
            <Card
              radius={8}
              py={48}
              sx={{
                width: '400px',
                border: '2px solid #7AC4F9',
                textAlign: 'center',
              }}
            >
              <Group position="center" spacing={8}>
                <IconTableOptions /> Customize columns to fit your workflow
              </Group>
            </Card>
            <Card
              radius={8}
              py={48}
              sx={{
                width: '400px',
                border: '2px solid #7AC4F9',
                textAlign: 'center',
              }}
            >
              <Group position="center" spacing={8}>
                <IconTemplate /> Get started with a template
              </Group>
            </Card>
            <Card
              radius={8}
              py={48}
              sx={{
                width: '400px',
                border: '2px solid #7AC4F9',
                textAlign: 'center',
              }}
            >
              <Group position="center" spacing={8}>
                <IconUserPlus /> Invite your teammates
              </Group>
            </Card>
          </Group>
        </Stack>
      </Alert>
    </Box>
  );
}
