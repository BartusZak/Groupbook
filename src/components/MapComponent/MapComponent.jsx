import React from "react"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const mapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?&v=3.exp&libraries=geometry,drawing,places&key=AIzaSyA_r4AeCesRtJFCmxarkjSgITIDcOdBa8I ",
    loadingElement: <div style={{ height: `90%`, width: `100%` }} />,
    containerElement: <div style={{ height: `90%` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: props.lat, lng: props.lng }}
  >
  <Marker position={{ lat: props.lat, lng: props.lng }} onClick={props.onMarkerClick} />
  </GoogleMap>
);

export default mapComponent;