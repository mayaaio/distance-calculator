import {
    Stack,
  } from '@mantine/core';
import DistanceInput from './DistanceInput';
import Map from './Map';

const MapInputStack = ( props ) => {

    return (
        <Stack justify="space-between">
            <DistanceInput label={props.label} setLat={props.setLat} setLong={props.setLong} />
            <Map lat={props.lat} long={props.long} />
          </Stack>
    )
}

export default MapInputStack