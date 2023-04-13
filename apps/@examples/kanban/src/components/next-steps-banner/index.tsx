import { Alert, Box, Stack, Text, Title, Group, Card } from '@mantine/core';
import { IconTableOptions, IconTemplate, IconUserPlus } from '@tabler/icons';

import { useBlock } from '@dopt/react';

export function NextStepsBanner() {
  const [nextSteps, closeTransition] =
    useBlock<['default']>('kanban.next-steps');

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
        onClose={() => closeTransition('default')}
      >
        <Stack justify="center" align="center" spacing="md">
          <Title order={5}>{nextSteps.field('banner-title', '')} </Title>
          <Text size="lg">{nextSteps.field('banner-description', '')}</Text>
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
