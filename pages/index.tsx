import { Button, Group } from "@mantine/core";
import { useState } from 'react';
import { Container, Grid, SimpleGrid, Skeleton, useMantineTheme, rem, Stack, px } from '@mantine/core';
import {GoogleMap, useLoadScript, Marker} from "@react-google-maps/api";
import { DestinationPage } from "../components/destinationspage.js";


export default function IndexPage() {
  return <DestinationPage/>;
}


  
