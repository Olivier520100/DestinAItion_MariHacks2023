import { Carousel } from '@mantine/carousel';
import { useMediaQuery } from '@mantine/hooks';
import { createStyles, Paper, Text, Title, Button, useMantineTheme, rem } from '@mantine/core';
import Pop from './popup';
import 'reactjs-popup/dist/index.css';
import { useState } from 'react';



const useStyles = createStyles((theme) => ({
  card: {
    height: rem(600),
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    color: theme.white,
    lineHeight: 1.2,
    fontSize: rem(32),
    marginTop: theme.spacing.xs,
  },

  category: {
    color: theme.white,
    opacity: 0.7,
    fontWeight: 700,
    textTransform: 'uppercase',
  },
}));

interface CardProps {
  image: string;
  title: string;
  text: string;
}

function Card({ image, title, text}: CardProps) {
  const { classes } = useStyles();

  const [popped, setPopped] = useState(false)

  function clicky(){
    setPopped(!popped)
  }

  return (
    <Paper
      shadow="md"
      p="xl"
      radius="md"
      sx={{ backgroundImage: `url(${image})` }}
      className={classes.card}
    >
      <div>
        
        <Title order={3} className={classes.title}>
          {title} 
        </Title>
      </div>
      <Button onClick = {clicky}variant="white"  color="dark">Read More </Button>
      {popped? <Pop text = {text}/> : <></>}  
    </Paper>
  );
}


const data = [
  {
    image: "https://media.cntraveler.com/photos/6123bdb14fbeb917c1ae8c6f/16:9/w_2560,c_limit/Tower%20of%20London_GettyImages-155432006.jpg",
    title: 'Tower of London',
    text:  "The Tower of London is one of the most recognizable landmarks in London and has a fascinating history dating back over 900 years. Originally built as a stronghold to keep enemies at bay, it was later used as a royal palace, a treasury, a mint, an armory, and even a zoo! Today, the Tower of London is home to the Crown Jewels, a collection of stunning and priceless gems that have been used by British monarchs for centuries. Visitors can marvel at diamonds, sapphires, rubies and emeralds, all adorning the crowns and scepters of the royal family.\n\nAside from the Crown Jewels, visitors to the Tower of London can explore the historic buildings, including the White Tower and the Bloody Tower, both of which are steeped in dark and eerie history. A tour guide will lead the way, providing fascinating insights into the tower s role in royal life, political intrigue, and even torture and execution. Don't forget to say hello to the famous ravens as well, who are believed to protect the tower according to a long-standing superstition. Visiting the Tower of London is a chance to step back in time and explore the rich history of England, all while enjoying the bustling city environment that surrounds the site today."
  },
  {
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/London-Eye-2009.JPG/1200px-London-Eye-2009.JPG',
    title: 'London Eye',
    text: "Welcome, travelers! Today, I'm excited to introduce you to one of London's most iconic attractions - the London Eye. Standing tall at 135 meters, this observation wheel provides a 360-degree view of the city skyline. Did you know that it's one of the world's largest observation wheels? \nBut there's more to this attraction than just the breathtaking view. The London Eye has become a quintessential part of the city's skyline and culture since its inception in 2000. With over 3.5 million visitors each year, it has served as a romantic setting for many proposals and even hosted many celebratory events such as the New Year fireworks display.\n\nFurthermore, the London Eye is also a symbol of sustainability. Did you know that as much energy as it takes to boil 1,400 kettles is generated with each turn of the Eye? This makes it an eco-friendly attraction and a testament to the city's commitment towards sustainability. So next time you're in London, make sure to take a ride on the London Eye for a unique and unforgettable experience!"
  },
  {
    image:
      'https://cdn.britannica.com/94/148994-050-3EFF8DCB/Buckingham-Palace-Queen-Victoria-Memorial-London-statue.jpg',
    title: 'Buckingham Palace',
    text: "Buckingham Palace is a royal palace situated in Westminster, London. It has been the official residence of the monarchs of the United Kingdom since the reign of Queen Victoria in 1837. The palace serves as a symbol of the British monarchy and is often used for state occasions and royal hospitality. Visitors can attend events in the palace when they are not being used for official business.\n\nVisitors can experience the unique spectacle of the Changing of the Guard, a tradition that has been held in front of the palace since 1660. It is the best-known ceremony of Buckingham Palace, and it represents the official handover of responsibilities from one regiment to another. The ceremony takes place at 11am every day, during which one group of guards is replaced by another group of guards. This tradition is a fashionable attraction for tourists and is something you don't want to miss. Buckingham Palace is a historic and cultural landmark that is a great destination to learn about British culture and the monarchy."
  },
  {
    image:
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/63/f8/bb/big-ben.jpg?w=1200&h=1200&s=1&pcx=1033&pcy=310&pchk=v1_bf93e1170e1f1f8d4cea',
    title: 'Big Ben',
    text: "Ah, Big Ben! Iconic as England itself, this giant clock tower situated at the north end of Westminster Palace is one of the most recognizable landmarks in the world. Though, you may be surprised to hear that the name Big Ben actually refers to the bell inside the tower, not the tower itself! The bell weighs more than 13 tons and was installed in 1858.\n\nFun fact: Did you know that Big Ben has been silenced on several occasions? Sometimes for repairs, but did you know that in 1965, the bell was silenced because of a flock of starlings that decided to roost on the minute hand? It just goes to show that even inanimate objects need to be careful of pesky birds! \n\nAround Big Ben, you\'ll find other notable landmarks, like the Houses of Parliament, Westminster Abbey, and the London Eye. As you explore, you\'ll encounter the bustling city of London and its charming culture. The city is famous for its rich foodie scene, and you'll find no shortage of delicious options to explore. Make sure to try some traditional pub grub, like fish and chips, and an ale or two!"

  },]
  const data1 = [
    {
      image: "https://images.adsttc.com/media/images/5254/4190/e8e4/4eff/0200/06cf/medium_jpg/sfpassio.jpg?1381253501",
      title: 'La sagrada de familia',
    },
    {
      image:
        'https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/27/60/bb.jpg',
      title: 'Parc Guell',
    },
    {
      image:
        'https://upload.wikimedia.org/wikipedia/commons/b/bf/Casa_Batllo_Overview_Barcelona_Spain_cut.jpg',
      title: 'Casa Batllo',
    },
    {
      image:
        'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/03/e3/7d/a-stroll-down-la-rambla.jpg?w=700&h=-1&s=1',
      title: 'La rambla',
    },
];


export function CardsCarousel(locationsin) {
  
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const slides = data.map((item) => (
    <Carousel.Slide key={item.title}>
      <Card {...item} />
    </Carousel.Slide>
  ));

  return (
    <Carousel
      slideSize="100%"
      breakpoints={[{ maxWidth: 'sm', slideSize: '100%', slideGap: rem(0) }]}
      slideGap="xl"
      align="start"
      
    >
      {slides}
    </Carousel>
  );
}