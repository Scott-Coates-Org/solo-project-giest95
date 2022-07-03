import React, { useEffect, useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllAddress } from "redux/address";
//These imports will be needed when a searchbar function is created
/* import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

 const libraries = ["places"]; */

export default function MapWidget() {
  const { isLoaded: mapsIsLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    /* libraries, */
  });
  const dispatch = useDispatch();

  //this will switch to true if user is in database
  let userInDB = false;
  //this gets updated to point to correct user information
  let i = -1;
  //default map center coordinates. Changed if user is in Database
  let center = { lat: 40.7754467, lng: -73.9786182 };

  //grabs the address redux slice
  const { addressData, addressIsLoaded, addressHasErrors } = useSelector(
    (state) => state.address
  );

  //grabs the user redux slice
  const { data, isLoaded, hasErrors } = useSelector((state) => state.user);

  //sets user ID to a variable
  const userID = data.uid;

  //updates react with address's in database on every render
  useEffect(() => {
    dispatch(fetchAllAddress());
  }, [dispatch]);

  //once database address call has completed, this loops through them to set i and indicate that the user is in the database
  if (addressIsLoaded) {
    for (let x of addressData) {
      i++;
      if (Object.values(x).includes(userID)) {
        userInDB = true;
        break;
      }
    }
  }

  function Map() {
    //if the user is found in the database the senter coordinates are set to the address
    if (addressIsLoaded && userInDB) {
      center = { lat: addressData[i].latitude, lng: addressData[i].longitude };
    }

    //this is the map with is requrired parameters
    return (
      <GoogleMap
        zoom={17}
        center={center}
        mapContainerStyle={{ height: 600, width: 900 }}
      ></GoogleMap>
    );
  }
  //display loading if still waiting on maps or address data fetch
  if (!mapsIsLoaded || !addressIsLoaded) return <div>Loading</div>;
  return (
    <div>
      <Map />
    </div>
  );
}

//This function will be needed when a searchbar function is created
function Search() {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete();

  return (
    <Combobox
      onSelect={async (address) => {
        try {
          const results = await getGeocode({ address });
          const { lat, lng } = await getLatLng(results[0]);
          console.log(lat, lng);
        } catch (error) {
          console.log("error!");
        }
        //console.log(address);
      }}
    >
      <ComboboxInput
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        disabled={!ready}
        placeholder="Enter an address"
      />
      <ComboboxPopover>
        {status === "OK" &&
          data.map(({ id, description }) => (
            <ComboboxOption key={id} value={description} />
          ))}
      </ComboboxPopover>
    </Combobox>
  );
}
