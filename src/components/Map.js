import GoogleMapReact from 'google-map-react';
import { MapPin } from 'react-feather';

const Map = ( props ) => {

    const defaultProps = {
      center: {
        lat: parseFloat(props.lat),
        lng: parseFloat(props.long)
      },
      zoom: 11
    };

      return (
          <GoogleMapReact 
            bootstrapURLKeys={{ key: process.env.REACT_APP_API_KEY }}
            defaultCenter={defaultProps.center}
            center={defaultProps.center}
            defaultZoom={defaultProps.zoom}
          > 
          <MapPin 
            lat={parseFloat(props.lat)}
            lng= {parseFloat(props.long)}
            fill="red"
            style={{transform: 'translateZ(0) translate(-50%, -50%)', position: "absolute"}}
          />
          </GoogleMapReact>
      )
  }

export default Map