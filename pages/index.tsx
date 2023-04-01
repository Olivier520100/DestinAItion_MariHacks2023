import { Button, Group } from "@mantine/core";
import { useState } from 'react';
import { NavbarMinimal } from "../components/navbar";
import Flights from "../components/flights";
import DestinationPage from"../components/destinationspage"
import LandingPage from "../components/landingPage";
import City from "../components/setCity";


export default function IndexPage() {

  const [active, setActive] = useState(0); //CHANGE EVERYTHING HERE
  const [depart, setDepart] = useState("")
    const [destination, setDestination] = useState("")
  return (
    <>
      <div style={{ display: "flex", flexDirection: "row", width: "100vw"}}>
        {active == 0? <div style = {{display: "flex", flexDirection: "column"}}><LandingPage/> <City setActive = {setActive} setDestination = {setDestination} setDeparture = {setDepart}/></div>: <></>}
        {active !== 0? <><NavbarMinimal active = {active} setActive = {setActive}/> <div style={{marginTop: "5vh", marginLeft: "6vw"}}>
          {active == 1? <Flights fromWhere = {depart} toWhere = {destination}/> : <></> }
          {active == 2? <DestinationPage/> : <></>}
        </div></> : <></>}
       
      </div>
    </>
  );
}
//{active == 1? <Flights/> : <></> } ADD THIS BUT FOR OTHERS

