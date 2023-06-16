import {
    TextInput,
    ActionIcon,
    Group,
    Stack,
    Space
  } from '@mantine/core';
import { useState } from 'react';
import { Search } from 'react-feather';

const DistanceInput = ( props ) => {

    const [value, setValue] = useState('');
    const [err, setErr] = useState('');

    var updateCoordinates = () => {
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${value}&key=${process.env.REACT_APP_API_KEY}`)
        .then((response) => {
            return response.json();
        }).then(jsonData => {
            props.setLat(jsonData.results[0].geometry.location.lat)
            props.setLong(jsonData.results[0].geometry.location.lng)
            setErr('')
        })
        .catch(error => {
            setErr("Please ensure that point is well-formed")
        })
    }

    return (
 
      <Group  align="center">
        <TextInput 
          placeholder="40.726572, -73.981766" 
          value={value}
          sx={{width: '85%'}}
          onChange={(event) => setValue(event.currentTarget.value)}
          label={props.label} 
          error={err}
          withAsterisk />
          <Stack>
              <Space/>
              <ActionIcon onClick={updateCoordinates} color="blue" variant="filled">
                <Search />
              </ActionIcon>
              <Space sx={{display: err ? 'flex' : 'none'}}/>
          </Stack>
      </Group>
    );
  }

export default DistanceInput