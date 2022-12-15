import {
  Modal,
  TextInput,
  Textarea,
  Button,
  Group,
  Stack,
} from '@mantine/core';
import { useForm } from '@mantine/form';

import { useBlock } from '@dopt/react';

import { nanoid } from 'nanoid';

export interface FormValues {
  id: string;
  title: string;
  description?: string;
}

interface Props {
  opened?: boolean;
  onClose: () => void;
  onSubmit?: (values: FormValues) => void;
}

export function CreateIssueModal(props: Props) {
  const { opened = false, onClose, onSubmit } = props;

  const [createIssueBlock] = useBlock('f7oaGfQYNJ1KtueMLv4nm');

  const form = useForm<FormValues>({
    initialValues: {
      id: '',
      title: '',
      description: '',
    },
  });

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const handleSubmit = (values: FormValues) => {
    if (onSubmit) {
      onSubmit(
        Object.assign({
          ...values,
          id: nanoid(),
        })
      );
    }
    handleClose();
  };

  return (
    <Modal
      title="Create issue"
      withCloseButton={false}
      closeOnClickOutside={false}
      closeOnEscape={false}
      onClose={handleClose}
      opened={opened}
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput
            type="hidden"
            value={createIssueBlock.state.active ? 'first-issue' : undefined}
            {...form.getInputProps('id')}
          />
          <TextInput
            label="Title"
            withAsterisk
            required
            {...form.getInputProps('title')}
          />

          <Textarea
            label="Description"
            {...form.getInputProps('description')}
          />
          <Group position="right">
            <Button variant="subtle" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit">Create</Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}
