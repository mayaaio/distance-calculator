import {
    TextInput
  } from '@mantine/core';

const DistanceInput = ( props ) => {


    return (
      <TextInput 
        placeholder="40.726572, -73.981766" 
        value={props.value}
        onChange={(event) => props.setValue(event.currentTarget.value)}
        label={props.label} 
        error={props.err}
        withAsterisk />
    );
  }

export default DistanceInput