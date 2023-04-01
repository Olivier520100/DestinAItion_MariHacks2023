import { Button, Group } from "@mantine/core";
import { useState } from 'react';
import { NavbarMinimal } from "./navbar";
import Flights from "./flights";




export default function IndexPage() {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10vh", marginLeft: "5vw"}}>
        <Flights/> 
      </div>
    </>
  );
}

