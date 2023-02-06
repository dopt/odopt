import { type ReactNode } from 'react';
import { Box, Text } from '@chakra-ui/react';

export interface HeaderProps {
  children: ReactNode;
}

export function Header(props: HeaderProps) {
  const { children } = props;
  return (
    <Box p={4} borderBottom="1px" borderBottomColor="gray.100">
      <Text fontWeight="medium" fontSize="xl">
        {children}
      </Text>
    </Box>
  );
}
