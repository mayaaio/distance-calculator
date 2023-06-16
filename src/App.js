import './App.css';
import {
  AppShell,
  Header,
  Group,
  Stack,
  Button,
  Text,
} from '@mantine/core';
import { useState } from 'react';
import MapInputStack from './components/MapInputStack';

const App = () => {

  const initLat = 40.726572
  const initLong = -73.981766

  const [latA, setLatA] = useState(initLat);
  const [latB, setLatB] = useState(initLat);
  const [longA, setLongA] = useState(initLong);
  const [longB, setLongB] = useState(initLong);
  const [distance, setDistance] = useState('');


  var degreeToRad = (deg) => {
    return deg * (Math.PI/180)
  }

  var calculateDist = () => {
    // convert longitude and latitude from degrees to radians
    var longRadA = degreeToRad(longA)
    var longRadB = degreeToRad(longB)
    var latRadA = degreeToRad(latA)
    var latRadB = degreeToRad(latB)

    // haversine formula- from https://www.geeksforgeeks.org/program-distance-two-points-earth/
    var dLong = longRadB - longRadA;
    var dLat = latRadB - latRadA;

    var a = Math.pow(Math.sin(dLat / 2), 2) 
            + Math.cos(latRadA) 
            * Math.cos(latRadB) 
            * Math.pow(Math.sin(dLong / 2), 2);
    
    var c = 2 * Math.asin(Math.sqrt(a));

    // Radius of earth in km
    var R = 6371;
    // result 
    var calculatedDist = (c * R).toString()
    setDistance("Distance: " + calculatedDist + "km");
  }

  return (
    <AppShell
      header={<Header height={60} p="md">
                <Text fw={600}>Distance Calculator</Text>
              </Header>}
    >
      <Stack align="center">
        <Text ta="center">
            Points are accepted in the format latitude, longitude or as street addresses.
        </Text> 
        <Group spacing="xl" align="top" grow style={{ height: '50vh', width: '50%' }}>
          <MapInputStack lat={latA} long={longA} setLat={setLatA} setLong={setLongA} label='Point A'/>
          <MapInputStack lat={latB} long={longB} setLat={setLatB} setLong={setLongB} label='Point B'/>
        </Group>
        <Button 
          onClick={calculateDist}
          disabled={!latA || !latB || !longA || !longB}>
          Calculate distance!
        </Button>
        <Text>{distance}</Text>
      </Stack>
    </AppShell>
  );
}

export default App;
