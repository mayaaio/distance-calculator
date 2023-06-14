import './App.css';
import {
  AppShell,
  Header,
  Group,
  Stack,
  Button,
  Text,
} from '@mantine/core';
import DistanceInput from './components/Input';
import { useState } from 'react';

const App = () => {

  const [valueA, setValueA] = useState('');
  const [valueB, setValueB] = useState('');
  const [errA, setErrA] = useState('');
  const [errB, setErrB] = useState('');
  const [distance, setDistance] = useState('');

  var parseLongLat = (value, setErr) => {
    var coords = value.split(/[, ]+/)
    var lat = coords[0]
    var long = coords[1]
    if(!lat || !long) {
      setErr("Please ensure that point is well-formed")
      return
    }
    // regex for latitude, ranges between -90 and 90
    var regLat = new RegExp("^-?(90|[1-8]?[0-9](\.{1}\d*)?)");
    // regex for longitude, ranges between -180 to 180
    var regLong = new RegExp("^-?(180|1[0-7][0-9](\.{1}\d*)?|[1-9]?[0-9](\.{1}\d*)?)");
    if(regLat.exec(lat) && regLong.exec(long)) {
      lat = parseFloat(lat)
      long = parseFloat(long)
      setErr('')
      return {lat, long}
    } else {
      setErr("Please ensure that point is well-formed")
      return
    }
  }

  var degreeToRad = (deg) => {
    return deg * (Math.PI/180)
  }

  var calculateDist = () => {
    // parse the input values
    var aCoords = parseLongLat(valueA, setErrA)
    var bCoords = parseLongLat(valueB, setErrB)

    console.log(aCoords, bCoords)

    if(!aCoords || !bCoords) {
      return
    }

    // convert longitude and latitude from degrees to radians
    var longA = degreeToRad(aCoords.long)
    var longB = degreeToRad(bCoords.long)
    var latA = degreeToRad(aCoords.lat)
    var latB = degreeToRad(bCoords.lat)

    // haversine formula- from https://www.geeksforgeeks.org/program-distance-two-points-earth/
    var dLong = longB - longA;
    var dLat = latB - latA;

    var a = Math.pow(Math.sin(dLat / 2), 2) 
            + Math.cos(latA) 
            * Math.cos(latB) 
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
    header={<Header height={60} p="xs">Distance Calculator</Header>}
    >
      <Stack align="center">
        <Text ta="center">
            Points are accepted in the format latitude, longitude where latitude ranges from -90 to 90 and longitude ranges from -180 to 180.
        </Text> 
        <Group spacing="lg" align="top" grow>
          <DistanceInput label='Point A' value={valueA} setValue={setValueA} err={errA}></DistanceInput>
          <DistanceInput label='Point B' value={valueB} setValue={setValueB} err={errB}></DistanceInput>
        </Group>
        <Button 
          onClick={calculateDist}
          disabled={valueA === "" || valueB === ""}>
          Calculate distance!
        </Button>
        <Text>{distance}</Text>
      </Stack>
    </AppShell>
  );
}

export default App;
