import './App.css';
import {
  AppShell,
  Header,
  Group,
  Stack,
  Button,
  Text
} from '@mantine/core';
import DistanceInput from './components/Input';
import { useState } from 'react';

const App = () => {

  const [valueA, setValueA] = useState('');
  const [valueB, setValueB] = useState('');
  const [errA, setErrA] = useState('');
  const [errB, setErrB] = useState('');
  const [distance, setDistance] = useState('');

  var getLongLatFromValue = (value, setErr) => {
    var coords = value.split(/[, ]+/)
    const lat = coords[0]
    const long = coords[1]
    if(!lat || !long) {
      setErr("Please ensure that point is well-formed")
      return
    }
    var reg = new RegExp("^-?([1-8]?[1-9]|[1-9]0)\.{1}\d*");
    console.log(long)
    console.log(reg.exec(long))
    if(reg.exec(lat) && reg.exec(long)) {
      return {lat, long}
    } else {
      setErr("Please ensure that point is well-formed")
      return
    }
  }

  var calculateDist = () => {
    var a = getLongLatFromValue(valueA, setErrA)
    var b = getLongLatFromValue(valueB, setErrB)
    console.log(a)
    console.log(b)
  }

  return (
    <AppShell
    header={<Header height={60} p="xs">Distance Calculator</Header>}
    >
      <Stack align="center">
        <Group spacing="lg">
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
