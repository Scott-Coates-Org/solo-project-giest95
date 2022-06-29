import React, { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

export default function GMap() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) return <div>Loading</div>;
  return <Map />;
}

function Map() {
  const center = useMemo(() => ({ lat: 44.154312, lng: -88.496572 }), []);
  return (
    <GoogleMap
      zoom={17}
      center={center}
      mapContainerStyle={{ height: 400, width: 400 }}
    ></GoogleMap>
  );
}
