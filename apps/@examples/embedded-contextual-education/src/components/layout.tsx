import { type ReactNode } from 'react';
import { Grid, GridItem } from '@chakra-ui/react';
import { Navigation } from './navigation';
import { Header } from './header';

export interface LayoutProps {
  title: ReactNode;
  children: ReactNode;
}

export function Layout(props: LayoutProps) {
  const { title, children } = props;
  return (
    <Grid
      templateAreas={`
        "nav header"
        "nav main"
      `}
      gridTemplateRows={'63px 1fr'}
      gridTemplateColumns={'225px 1fr'}
      h="full"
    >
      <GridItem area={'nav'} display="flex">
        <Navigation />
      </GridItem>

      <GridItem area={'header'}>
        <Header>{title}</Header>
      </GridItem>

      <GridItem
        p={4}
        area={'main'}
        display="flex"
        alignItems="start"
        overflowX="auto"
      >
        {children}
      </GridItem>
    </Grid>
  );
}
