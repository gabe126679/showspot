import React, { useState, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { venueSignUp } from '../../store/actions/authActions'
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption, } from "@reach/combobox";

import "@reach/combobox/styles.css";
import mapStyles from "../../mapStyles";

const libraries = ["places"];
// const mapContainerStyle = {
//   overflow: "hidden",
//   display: "flex",
//   minHeight: "658px"
// };
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: false,
};
const center = {
  lat: 43.6532,
  lng: -79.3832,
};

const mapKey = process.env.REACT_APP_MAP_KEY;

function VenueSignup(props) {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: mapKey,
        libraries,
      });
    
    const mapRef = useRef();
    const onMapLoad = useCallback((map) => {

    mapRef.current = map;
    }, []);

    const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
    }, []);


    const navigate = useNavigate();

    const [venueName, setVenueName] = useState("");
    const [venueAddress, setVenueAddress] = useState("");

    const handleChange = (e) => {
        switch (e.target.id) {
            case 'venueName': 
              setVenueName(e.target.value);
            case 'venueAddress': 
              setVenueAddress(e.target.value);
          }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const stateObject = {
            venueName,
            venueAddress
        }

        props.venueSignUp(stateObject);

        navigate('/');
      } 
      const { ready, value, suggestions: { status, data }, setValue, clearSuggestions } = usePlacesAutocomplete({
        requestOptions: {
        location: { lat: () => 43.6532, lng: () => -79.3832 },
        radius: 100 * 1000,
        }
    });
    
    const handleInput = (e) => {
        
        setValue(e.target.value);
    };
    
    const handleSelect = async (address) => {
        setValue(address, false);
        clearSuggestions();
    
        try {
        const results = await getGeocode({ address });
        console.log(results);
        const { lat, lng } = getLatLng(results[0]);
        panTo({ lat, lng });
        } catch (error) {
        console.log("😱 Error: ", error);
        }
    };
      const { auth } = props;

      if (!auth.uid) return navigate('/');
      if (loadError) return "Error";
      if (!isLoaded) return "Loading...";
    
  return (
    <div>
        <br/> 
        <br/> 
        <br/> 
        <br/> 
        <br/> 
        <div className="container">
            <p className="text-center">Sign Up as a Venue and Start Hosting Shows</p>
        </div>
        <div className="login-container container border">
            <br/>
            <br/>
            <Form onSubmit={handleSubmit}>
                <h1 className="text-center">Venue Sign Up</h1>
                <br/>
                <Form.Group className="mb-3" controlId="venueName">
                    <Form.Label>Venue Name</Form.Label>
                    <Form.Control type="text" placeholder="Venue Name" onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3 map-search" >
                    <Form.Label>Venue Address</Form.Label>
                    <Combobox onSelect={handleSelect}>
                        <ComboboxInput
                        value={value}
                        onChange={handleInput}
                        disabled={!ready}
                        placeholder="Venue Address"
                        />
                        <ComboboxPopover>
                        <ComboboxList>
                            {status === "OK" &&
                            data.map(({ place_id, description }) => (
                                <ComboboxOption key={place_id} value={description} />
                            ))}
                        </ComboboxList>
                        </ComboboxPopover>
                    </Combobox>
                </Form.Group>
                <br/>
                <div>
                    <Locate panTo={panTo} />
                    

                    <GoogleMap
                        id="map"
                        
                        zoom={9}
                        center={center}
                        options={options}
                        onLoad={onMapLoad}
                    >
                    </GoogleMap>
                </div>
                <br/>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                <br/>
                <p className="text-center">already have an account? <a href="/spotterLogin">Login</a></p>
            </Form>
            <br/>
        </div>
        <br/> 
        <br/> 
        <br/> 
        <br/> 
        <br/> 
    </div>
  )
}

function Locate({ panTo }) {
    return (
      <button
        className="locate"
        onClick={() => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              console.log(position);
              panTo({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              });
            }
          );
        }}
      >
        <img src="/1.png" alt="location" />
      </button>
    );
  }
  

const mapStateToProps = (state) => {
    console.log(state.firestore)
    return {
      auth: state.firebase.auth,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      venueSignUp: (creds) => dispatch(venueSignUp(creds))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VenueSignup);