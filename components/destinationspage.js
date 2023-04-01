import { Container, Grid, SimpleGrid, Skeleton, useMantineTheme, rem } from '@mantine/core';
import { Map } from "./mapsapi";

import { CarouselCard } from './carousel';

const PRIMARY_COL_HEIGHT = rem(300);

export function DestinationPage() {
  const theme = useMantineTheme();
  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - ${theme.spacing.md} / 2)`;

  return (
    
    <Container my="md">
      <SimpleGrid cols={2} spacing="md" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
      <div><Map locationtest = "Tokyo"/></div>
        <Grid gutter="md">
        
          <Grid.Col span={12}>
          <div style={{ marginBottom: 10 }}>
                <CarouselCard locationtest='Tokyo'/>
            </div>
          </Grid.Col>
        </Grid>
      </SimpleGrid>
    </Container>
  );
}
