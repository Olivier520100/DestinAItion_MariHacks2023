import { Container, Grid, SimpleGrid, Skeleton, useMantineTheme, rem } from '@mantine/core';
import { Map } from "./mapsapi";
import { GetDest} from "./locations"
import { useState, useEffect } from 'react';

import { CardsCarousel, CarouselCard } from './carousel';

const PRIMARY_COL_HEIGHT = rem(300);

export default function DestinationPage(props) {
  
  
  useEffect(() => {
    IataToCity();
  }, []);
  
  function IataToCity() {
    let dest = props.destination;
    let key = "KJLJKK-TWYU7552V2";
    let url = "http://api.wolframalpha.com/v1/spoken?appid=" + key + "&i=" + dest + "+city";
    try {
      fetch(url)
        .then(response => response.text())
        .then(data => {
          let myData = data.toString();
          let newData = myData.split(" ")[0];
          newData = newData.split(",")[0];
          props.setCity(newData.toLowerCase());
          console.log(props.city)
          props.setLocationarray(GetDest(props.city));
          console.log(props.locationarray);

        });
    } catch {
      alert("Either No Airport is Available from your Input or You included a Country in your Input");
    }

  }

  const theme = useMantineTheme();
  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - ${theme.spacing.md} / 2)`;

  return (
    <Container my="md">
      <SimpleGrid cols={2} spacing="md" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
        <div><Map locationtest={props.city} /></div>
        <Grid gutter="md">
          <Grid.Col span={12}>
            <div style={{ marginBottom: 10 }}>
              <CardsCarousel />
            </div>
          </Grid.Col>
        </Grid>
      </SimpleGrid>
    </Container>
  );
}