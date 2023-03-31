import { Button, Group } from "@mantine/core";
import { useState } from 'react';
import { NavbarMinimal } from "./navbar";

export default function IndexPage() {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 0}}>
        <NavbarMinimal />
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
          <h1>hello</h1>
        </div>
      </div>
    </>
  );
}