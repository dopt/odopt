import { IconLayoutKanban } from '@tabler/icons';
import { Alert, Box, Stack, Text, Title } from '@mantine/core';

import { useBlock } from '@dopt/react-old';

export function WelcomeBanner() {
  const [createAnIssueBlock] = useBlock('f7oaGfQYNJ1KtueMLv4nm');

  if (!createAnIssueBlock.state.active) {
    return null;
  }

  return (
    <Box>
      <Alert p="lg" py={42} radius={6} sx={{ border: '0.5px solid #C4DAEA' }}>
        <Stack justify="center" align="center" spacing="sm">
          <IconLayoutKanban color="#228BE6" size={47} />
          <Title order={2}>
            {createAnIssueBlock.getField('banner-title', '')}
          </Title>
          <Text size="lg" align="center">
            {createAnIssueBlock.getField('banner-description', '')}
            <br />
            {createAnIssueBlock.getField('banner-next-step', '')}
          </Text>
        </Stack>
      </Alert>
    </Box>
  );
}
