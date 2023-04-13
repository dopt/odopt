import { IconLayoutKanban } from '@tabler/icons';
import { Alert, Box, Stack, Text, Title } from '@mantine/core';

import { useBlock } from '@dopt/react';

export function WelcomeBanner() {
  const [createAnIssueBlock] = useBlock('kanban.welcome-banner');

  if (!createAnIssueBlock.state.active) {
    return null;
  }

  return (
    <Box>
      <Alert p="lg" py={42} radius={6} sx={{ border: '0.5px solid #C4DAEA' }}>
        <Stack justify="center" align="center" spacing="sm">
          <IconLayoutKanban color="#228BE6" size={47} />
          <Title order={2}>
            {createAnIssueBlock.field('banner-title', '')}
          </Title>
          <Text size="lg" align="center">
            {createAnIssueBlock.field('banner-description', '')}
            <br />
            {createAnIssueBlock.field('banner-next-step', '')}
          </Text>
        </Stack>
      </Alert>
    </Box>
  );
}
