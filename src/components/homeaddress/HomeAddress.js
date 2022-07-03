import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllAddress } from "redux/address";
import { useEffect } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { useHistory } from "react-router-dom";

const HomeAddress = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  //this gets updated to point to correct user information
  let i = -1;
  //this gets updated if the user has a home address set
  let displayAddress = "Default, West 70th Street, New York, NY";

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

  //once database address call has completed, this loops through them to set i and change the address to be displayed to the users address
  if (addressIsLoaded) {
    for (let x of addressData) {
      i++;
      if (Object.values(x).includes(userID)) {
        displayAddress = addressData[i].address;
        break;
      }
    }
  }

  //if update address is pressed, this navigates to the component
  function handleClick(path) {
    history.push(path);
  }

  return (
    <section>
      {!addressIsLoaded && "Address loading…"}
      {addressHasErrors && "Error Loading"}
      {addressIsLoaded && (
        <div
          className="border border-primary d-flex"
          style={{ marginBottom: "50px", marginTop: "10px" }}
        >
          <p style={{ fontSize: "40px", fontWeight: "bold" }}>
            <FontAwesomeIcon icon={faMapMarkerAlt} style={{ height: "40px" }} />
            &nbsp;Home Address:&nbsp;
          </p>
          <p style={{ fontSize: "40px" }}>{displayAddress}</p>
          <Button onClick={() => handleClick("address")}>Update Address</Button>
        </div>
      )}
    </section>
  );
};

export default HomeAddress;
