import { IconLayoutKanban } from '@tabler/icons';
import { Alert, Box, Stack, Text, Title } from '@mantine/core';

import { useBlock } from '@dopt/react';

export function WelcomeBanner() {
  const [createAnIssueBlock] = useBlock('f7oaGfQYNJ1KtueMLv4nm');

  if (!createAnIssueBlock.state.active) {
    return null;
  }

  return (
    <Box>
      <Alert p="lg" py="xl">
        <Stack justify="center" align="center" spacing="sm">
          <IconLayoutKanban color="#228BE6" size={47} />
          <Title order={2}>👋 Welcome to Kanban</Title>
          <Text size="lg">
            The simple tool to track your tasks and stay in flow. To start,
            create an issue.
          </Text>
        </Stack>
      </Alert>
    </Box>
  );
}
