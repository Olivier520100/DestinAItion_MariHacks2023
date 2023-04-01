
import { createStyles, Image, Card, Text, Group, Button, getStylesRef, rem } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { IconStar } from '@tabler/icons-react';
import { useEffect, useState } from 'react';


const useStyles = createStyles((theme) => ({
  price: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
  },

  carousel: {
    '&:hover': {
      [`& .${getStylesRef('carouselControls')}`]: {
        opacity: 1,
      },
    },
  },

  carouselControls: {
    ref: getStylesRef('carouselControls'),
    transition: 'opacity 150ms ease',
    opacity: 0,
  },

  carouselIndicator: {
    width: rem(4),
    height: rem(4),
    transition: 'width 250ms ease',

    '&[data-active]': {
      width: rem(16),
    },
  },
}));

async function GetImages(location) {
  const apiUrl = `https://serpapi.com/search.json?q=Apple&tbm=isch&ijn=0`;
  console.log(apiUrl)
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const pic1 = data.images_results[0].original;
    const pic2 = data.images_results[1].original;

    console.log(pic1);
    console.log(pic2);
    return [pic1, pic2]

  } catch (error) {
    console.error(`Error fetching Images: ${error.message}`);
  }
}




export function CarouselCard({ locationtest }: { locationtest: string }) {

  const [latgood, setLatgood] = useState(null);
  const [lnggood, setLnggood] = useState(null);

  useEffect(() => {
    const fetchCoordinates = async () => {
      const [lat, lng] = await GetImages(locationtest);
      setLatgood(lat);
      setLnggood(lng);
    };
    fetchCoordinates();
  }, []);

  const images = [
    latgood,
    lnggood,
  ];
  const getName = <Text fw={500} fz="lg">{locationtest}</Text>

  const { classes } = useStyles();

  const slides = images.map((image) => (
    <Carousel.Slide key={image}>
      <Image src={image} height={220} />
    </Carousel.Slide>
  ));

  return (
    <Card radius="md" withBorder padding="xl">
      <Card.Section>
        <Carousel
          withIndicators
          loop
          classNames={{
            root: classes.carousel,
            controls: classes.carouselControls,
            indicator: classes.carouselIndicator,
          }}
        >
          {slides}
        </Carousel>
      </Card.Section>

      <Group position="apart" mt="lg">
        {getName}
        <Group spacing={5}>
        <Button radius="md">Tour</Button>
        </Group>
      </Group>
    </Card>
  );
}