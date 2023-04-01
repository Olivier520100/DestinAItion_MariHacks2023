import { Button, Group } from "@mantine/core";
import { useState } from 'react';
import { NavbarMinimal } from "../components/navbar";
import Flights from "../components/flights";


export default function IndexPage() {

  const [active, setActive] = useState(1); //CHANGE EVERYTHING HERE
  const [depart, setDepart] = useState("YUL")
  const [destination, setDestination] = useState("ICN")
  return (
    <>
      <div style={{ display: "flex", flexDirection: "row"}}>
        {active == 0? <></> :<NavbarMinimal active = {active} setActive = {setActive}/>}
        <div style={{marginTop: "5vh", marginLeft: "6vw"}}>
          {active == 1? <Flights fromWhere = {depart} toWhere = {destination}/> : <></> }
        </div>
      </div>
    </>
  );
}
//{active == 1? <Flights/> : <></> } ADD THIS BUT FOR OTHERS

