import React from 'react';

import { Grid, GridItem } from '@chakra-ui/react';

interface Props {
  navigation: React.ReactElement;
  header: React.ReactElement;
  main: React.ReactElement;
}

export function Layout(props: Props) {
  return (
    <Grid
      templateAreas={`
        "nav header"
        "nav main"
      `}
      gridTemplateRows={'73px 1fr'}
      gridTemplateColumns={'225px 1fr'}
      h="full"
      color="blackAlpha.700"
      fontWeight="bold"
    >
      <GridItem
        p="4"
        bg="#F6F6F6"
        area={'nav'}
        display="flex"
        borderRight="1px solid #E1E1E1"
      >
        {props.navigation}
      </GridItem>

      <GridItem
        p="4"
        bg="white"
        area={'header'}
        alignSelf="center"
        borderBottom="1px solid #E1E1E1"
      >
        {props.header}
      </GridItem>
      <GridItem
        p="4"
        bg="white"
        area={'main'}
        display="flex"
        alignItems="start"
      >
        {props.main}
      </GridItem>
    </Grid>
  );
}
