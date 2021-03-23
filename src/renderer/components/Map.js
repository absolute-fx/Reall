import React, {useContext} from 'react';
import GoogleMapReact from 'google-map-react';
import {AppParamsContext} from "../contexts/AppParamsContext";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const SimpleMap = ()=> {
  const {appParams, setAppParams} = useContext(AppParamsContext)
  	const defaultProps = {
		center: {
			lat: 59.95,
			lng: 30.33
		},
		zoom: 11
  };
  
    return (
      <div style={{ height: '400px', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: appParams.external_api.gm_key }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
          <AnyReactComponent
            lat={59.955413}
            lng={30.337844}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
    );
}

export default SimpleMap;