import {
  Button,
  Card,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  UseDisclosureProps,
} from '@chakra-ui/react';

import {
  ActiveToday,
  MonthlyActiveUsers,
  MostActiveUsers,
  NewActiveUsers,
} from '@/charts';
import { useState } from 'react';

import { ChartSelection } from '@/types';

import styles from './chart.module.css';

export function AddChartsModal({
  onClose = () => undefined,
  isOpen = false,
  onFinish,
}: Pick<UseDisclosureProps, 'isOpen' | 'onClose'> & {
  onFinish: (selection: ChartSelection) => void;
}) {
  const [selection, setSelection] = useState<ChartSelection>({
    dailyActiveUsers: false,
    newActiveUsers: false,
    monthlyActiveUsers: false,
    mostActiveUsers: false,
    activeToday: false,
  });
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add chart</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex direction="column" gap={4}>
            <Flex gap={4}>
              <Card
                variant="unstyled"
                onClick={() => {
                  setSelection((prev) => {
                    return {
                      ...prev,
                      newActiveUsers: !prev.newActiveUsers,
                    };
                  });
                }}
                className={`${styles.chart} ${
                  selection.newActiveUsers ? styles.chartIsSelected : ''
                }`}
              >
                <NewActiveUsers />
              </Card>
              <Card
                variant="unstyled"
                onClick={() => {
                  setSelection((prev) => {
                    return {
                      ...prev,
                      mostActiveUsers: !prev.mostActiveUsers,
                    };
                  });
                }}
                className={`${styles.chart} ${
                  selection.mostActiveUsers ? styles.chartIsSelected : ''
                }`}
              >
                <MostActiveUsers />
              </Card>
            </Flex>
            <Flex gap={4}>
              <Card
                variant="unstyled"
                onClick={() => {
                  setSelection((prev) => {
                    return {
                      ...prev,
                      activeToday: !prev.activeToday,
                    };
                  });
                }}
                className={`${styles.chart} ${
                  selection.activeToday ? styles.chartIsSelected : ''
                }`}
              >
                <ActiveToday />
              </Card>
              <Card
                variant="unstyled"
                onClick={() => {
                  setSelection((prev) => {
                    return {
                      ...prev,
                      monthlyActiveUsers: !prev.monthlyActiveUsers,
                    };
                  });
                }}
                className={`${styles.chart} ${
                  selection.monthlyActiveUsers ? styles.chartIsSelected : ''
                }`}
              >
                <MonthlyActiveUsers />
              </Card>
            </Flex>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Flex gap={2}>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>{' '}
            <Button
              colorScheme="blue"
              isDisabled={
                Object.values(selection).filter((selected) => selected)
                  .length === 0
              }
              onClick={() => onFinish(selection)}
            >
              {Object.values(selection).filter((selected) => selected).length >
              1
                ? 'Add charts'
                : 'Add chart '}
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
