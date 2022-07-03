import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { createAddress, fetchAllAddress, updateAddress } from "redux/address";
import { Table } from "reactstrap";
import { useHistory } from "react-router-dom";
import { useLoadScript } from "@react-google-maps/api";
import usePlacesAutocomplete, {
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
import "index.css";

const libraries = ["places"];

const EditHomeAddress = (props) => {
  //rename isLoaded to not interfier with user variable of the same name
  const { isLoaded: mapsIsLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const dispatch = useDispatch();
  const history = useHistory();

  //this will switch to true if user is in database
  let userInDB = false;
  //this gets updated to point to correct user information
  let i = -1;

  //grabs the address redux slice
  const { addressData, addressIsLoaded, addressHasErrors } = useSelector(
    (state) => state.address
  );

  //grabs the user redux slice
  const { data, isLoaded, hasErrors } = useSelector((state) => state.user);

  //sets user data object to a variable
  const userData = data;
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

  //this section will be needed if a form is used
  /* const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { ref: addressRef, ...addressRest } = register("address", {
    required: true,
  });
  const { ref: cityRef, ...cityRest } = register("city", { required: true });
  const { ref: stateRef, ...stateRest } = register("state", { required: true });

  const onSubmit = (data) => {
    if (Object.keys(errors).length) {
      alert("Error saving product: " + JSON.stringify(errors));
    } else {
      if (userInDB) {
        //console.log(addressData.id);
        dispatch(
          updateAddress({
            id: addressData[i].id,
            key: userData.uid,
            username: userData.displayName,
            address: data.address,
            city: data.city,
            state: data.state,
          })
        ).then(() => {
          reset();
          dispatch(fetchAllAddress());
          alert("Address updated in Database");
          console.log("Address updated in DB");
        });
      } else {
        dispatch(
          createAddress({
            key: userData.uid,
            username: userData.displayName,
            address: data.address,
            city: data.city,
            state: data.state,
          })
        ).then(() => {
          reset();
          dispatch(fetchAllAddress());
          alert("Address added to Database");
          console.log("Address added to DB");
        });
      }
    }
  }; */

  //if update address is pressed, this navigates to the component
  function handleClick(path) {
    history.push(path);
  }

  //this section creates the searchbar
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
        //once a selection is made the following actions occur
        onSelect={async (address) => {
          try {
            //results sets results to the geocode object based on selected address
            const results = await getGeocode({ address });
            //grabs the latitude and longitude of the selected address and places them in variables
            const { lat, lng } = await getLatLng(results[0]);
            //if the user is in the database the address info is updated
            if (userInDB) {
              dispatch(
                updateAddress({
                  id: addressData[i].id,
                  key: userData.uid,
                  username: userData.displayName,
                  address: address,
                  latitude: lat,
                  longitude: lng,
                })
              ).then(() => {
                dispatch(fetchAllAddress());
                alert("Home Address Updated!");
                console.log("Address updated in DB");
              });
            }
            //if the user is not in the database the address info is created
            else {
              dispatch(
                createAddress({
                  key: userData.uid,
                  username: userData.displayName,
                  address: address,
                  latitude: lat,
                  longitude: lng,
                })
              ).then(() => {
                dispatch(fetchAllAddress());
                alert("Home Address Added!");
                console.log("Address added to DB");
              });
            }
          } catch (error) {
            console.log(error);
          }
        }}
      >
        {/* //functions with usePlacesAutocomplete to display search options */}
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

  if (!mapsIsLoaded) return <div>Loading</div>;
  return (
    <section>
      <div className="search">
        <Search />
      </div>
      <div>
        {<Button onClick={() => handleClick("/")}>Return to Home</Button>}
      </div>
    </section>
  );
};

//

/* return (

    <section>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className="p-3 my-3 border border-primary"
      >
        <FormGroup>
          <Label for="address">Address</Label>
          <Input
            id="address"
            type="text"
            {...addressRest}
            innerRef={addressRef}
            invalid={errors.address}
          />
        </FormGroup>
        <FormGroup>
          <Label for="city">City</Label>
          <Input
            id="city"
            type="text"
            {...cityRest}
            innerRef={cityRef}
            invalid={errors.city}
          />
        </FormGroup>
        <FormGroup>
          <Label for="state">State</Label>
          <Input
            id="state"
            type="text"
            {...stateRest}
            innerRef={stateRef}
            invalid={errors.state}
          />
        </FormGroup>
        <Button type="submit" color="primary">
          Update Address
        </Button>
      </Form>
      <Button onClick={() => handleClick("/")}>Return to Home</Button>
      {!addressIsLoaded && "Address loading..."}
      {addressHasErrors && "Error Loading"}
      {addressIsLoaded && (
        <Table striped>
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Address</th>
              <th>City</th>
              <th>State</th>
            </tr>
          </thead>
          {addressData.map((item, index) => {
            return (
              <tbody>
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{item.username}</td>
                  <td>{item.address}</td>
                  <td>{item.city}</td>
                  <td>{item.state}</td>
                </tr>
              </tbody>
            );
          })}
        </Table>
      )}
    </section>
  );
}; */

export default EditHomeAddress;
