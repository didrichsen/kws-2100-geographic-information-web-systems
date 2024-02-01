import React from "react";
import Map from "ol/Map";
import { Zoom } from "ol/control";

const FocusOnMe = ({ map }: { map: Map }) => {
  const getMyLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      map
        .getView()
        .setCenter([position.coords.longitude, position.coords.latitude]);
      map.getView().setZoom(20);
    });
  };

  return (
    <>
      <button onClick={getMyLocation}>Focus on me</button>
    </>
  );
};

export default FocusOnMe;
