import { Alert, Box, Stack, Text, Title, Group, Card } from '@mantine/core';

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
        py="xl"
        withCloseButton
        onClose={() => closeNextSteps.complete()}
      >
        <Stack justify="center" align="center" spacing="md">
          <Title order={2}>🎉 Next steps</Title>
          <Text size="lg">
            The simple tool to track your tasks and stay in flow. To start,
            create an issue.
          </Text>
          <Group>
            <Card>Customize columns to fit your workflow</Card>
            <Card>Get started with a template</Card>
            <Card>Invite your teammates</Card>
          </Group>
        </Stack>
      </Alert>
    </Box>
  );
}
