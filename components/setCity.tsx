import { createStyles, rem, Select, TextInput } from '@mantine/core';
import { Title, Text, Container, Button, Overlay } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { IconCircuitCapacitorPolarized } from '@tabler/icons-react';
import { stringify } from 'querystring';
import { useState } from 'react';

const useStyles = createStyles((theme) => ({
    wrapper: {
      width: "100vw",
      position: 'relative',
      paddingTop: rem(180),
      paddingBottom: rem(130),
      backgroundImage:
        'url(https://wallpapershome.com/images/wallpapers/lake-louise-3840x2160-4k-hd-wallpaper-sanada-travel-mountain-12772.jpg)',
      backgroundSize: 'cover',
      backgroundPositionY: '30%',
  
      [theme.fn.smallerThan('xs')]: {
        paddingTop: rem(80),
        paddingBottom: rem(50),
      },
    },
  
    inner: {
      position: 'relative',
      zIndex: 1,
    },
  
    title: {
      fontWeight: 800,
      fontSize: rem(70),
      letterSpacing: rem(-1),
      paddingLeft: theme.spacing.md,
      paddingRight: theme.spacing.md,
      color: theme.white,
      marginBottom: theme.spacing.xs,
      textAlign: 'center',
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  
      [theme.fn.smallerThan('xs')]: {
        fontSize: rem(28),
        textAlign: 'left',
      },
    },
  
    highlight: {
      color: theme.colors[theme.primaryColor][4],
    },
  
    description: {
      color: theme.colors.gray[0],
      textAlign: 'center',
  
      [theme.fn.smallerThan('xs')]: {
        fontSize: theme.fontSizes.md,
        textAlign: 'left',
      },
    },
  
    controls: {
      marginTop: `calc(${theme.spacing.xl} * 1.5)`,
      display: 'flex',
      justifyContent: 'center',
      paddingLeft: theme.spacing.md,
      paddingRight: theme.spacing.md,
  
      [theme.fn.smallerThan('xs')]: {
        flexDirection: 'column',
      },
    },
  
    control: {
      height: rem(42),
      fontSize: theme.fontSizes.md,
  
      '&:not(:first-of-type)': {
        marginLeft: theme.spacing.md,
      },
  
      [theme.fn.smallerThan('xs')]: {
        '&:not(:first-of-type)': {
          marginTop: theme.spacing.md,
          marginLeft: 0,
        },
      },
    },
  
    secondaryControl: {
      color: theme.white,
      backgroundColor: 'rgba(255, 255, 255, .4)',
  
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, .45) !important',
      },
    },
  }));
  

const inputStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
  },

  input: {
    height: rem(54),
    paddingTop: rem(18),
  },

  label: {
    position: 'absolute',
    pointerEvents: 'none',
    fontSize: theme.fontSizes.xs,
    paddingLeft: theme.spacing.sm,
    paddingTop: `calc(${theme.spacing.sm} / 2)`,
    zIndex: 1,
  },
}));

export default function City(props) {
    //const [departure, setDeparture] = useState("")
    //const [destination, setDestination] = useState("")
    const [inputDep, setInputDep] = useState("")
    const [inputDest, setInputDest] = useState("")
  // You can add these classes as classNames to any Mantine input, it will work the same
  const { classes } = inputStyles();

    function apiCall(input, dep){
    let newInput = input.split(" ").join("+")
    let key = "KJLJKK-TWYU7552V2"
    let url = "http://api.wolframalpha.com/v1/spoken?appid="+key+"&i="+newInput+"+airport+iata+code%3f"
    if(dep){
        try{
            fetch(url)
            .then(response => response.text())
            .then(data => {let myData = data.toString(); let newData = myData.split(" ")[3]; props.setDeparture(newData); console.log(newData)})
            return true
        }
        catch{
            alert("Either No Airport is Available from your Input or You included a Country in your Input")
        }
    }
    else{
        try{
            fetch(url)
            .then(response => response.text())
            .then(data => {let myData = data.toString(); let newData = myData.split(" ")[3]; props.setDestination(newData); console.log(newData)})
            return true
        }
        catch{
            alert("Either No Airport is Available from your Input or You included a Country in your Input")
        }
    }
    
    
  }


  function handleDep(event){
    setInputDep(event.target.value)
  }

  function handleDest(event){
    setInputDest(event.target.value)
  }

  function handleClick(event){
    if(inputDest !== "" && inputDep !== ""){
       let inp1 = apiCall(inputDest, false)
       let inp2 = apiCall(inputDep, true)
       if(inp1 && inp2){
        props.setActive(1)
       } else{
        alert("one or more cities are spelled wrong")
       }
    }
    else{
        alert("one or more cases are empty")
    }
  }

  return (
    <div style={{display: "flex", flexDirection: "row", marginTop: "50px", justifyContent: "center", rowGap: "100px"}}>
      <TextInput value = {inputDep} onChange = {handleDep} label="Departure" placeholder="Montreal (City Only)" classNames={classes} />
      <div style = {{width: "200px"}}>
      </div>
      <TextInput value = {inputDest} onChange = {handleDest} label="Destination" placeholder="London (City Only)" classNames={classes} />
      <div style={{position: "absolute", marginTop: "100px"}}>
          <Button onClick={handleClick} style={{}}>Get Started</Button>
        </div>
    </div>
  );
}