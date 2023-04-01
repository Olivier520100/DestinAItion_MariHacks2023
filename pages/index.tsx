import { Button, Group } from "@mantine/core";
import { useState } from 'react';
import { NavbarMinimal } from "../components/navbar";
import Flights from "../components/flights";
import DestinationPage from"../components/destinationspage"
import { GetImages } from "../components/images";
import { GetDest } from "../components/locations";
import { OpenedImage } from "../components/opened";




export default function IndexPage() {
  const [active, setActive] = useState(1); //CHANGE EVERYTHING HERE
  const [depart, setDepart] = useState("YUL")
  const [destination, setDestination] = useState("ICN")
  const locations = GetDest(cityin);
  
  
  return (
    <>
      <div style={{ display: "flex", flexDirection: "row"}}>
        {active == 0? <></> :<NavbarMinimal active = {active} setActive = {setActive}/>}
        <div style={{marginTop: "5vh", marginLeft: "6vw"}}>
          {active == 1? <Flights fromWhere = {depart} toWhere = {destination}/> : <></> }
          {active == 2? <OpenedImage/> : <></>}
          {active == 3? <DestinationPage bigarray = {locations} city = {cityin} /> : <></>}
        

        </div>
      </div>
    </>
  );
}
//{active == 1? <Flights/> : <></> } ADD THIS BUT FOR OTHERS

