import React, { useCallback, useRef, useState, useEffect, useMemo } from "react";
import { GoogleMap, useLoadScript, Marker, InfoWindow, MarkerClusterer } from "@react-google-maps/api";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption, } from "@reach/combobox";
import { connect } from "react-redux";
import Geocode from "react-geocode";
import "@reach/combobox/styles.css";
import mapStyles from "../mapStyles";
import { useNavigate } from 'react-router-dom';

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

const mapKey = process.env.REACT_APP_MAP_KEY;

Geocode.setApiKey("AIzaSyDRdbg5n9g-_CFYgpI2pCK0hAAaY0MW65Q");

const Home = (props) => {

  const { users } = props;

  const navigate = useNavigate();

  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [address, setAddress] = useState("");

  useMemo(() => {
    if (users) {
      users.map((user) => {
        const venueAddress = user.venueAddress

        if (venueAddress) {
            const addressObject = 
            {
              lat: venueAddress[0],
              lng: venueAddress[1]
            }
            if (venueAddress && !markers.includes(addressObject)) {
              markers.push(addressObject);
            }
        }

      })
    } 
  });

  const onMapClick = useCallback((e) => {
    users.map((user) => {
      const address = user.venueAddress
      if (user.venueAddress) {
        console.log(user.venueAddress[0])
      }

      // if (user.isVenue) {
      //   setMarkers((current) => [
      //     ...current,
      //     {
      //       address
      //     },
      //   ]);
      // }
    })
  }, []);

  const handleClick = () => {
    // if (users) {
    //   users.map((user) => {
    //     const address = user.venueAddress
    //     console.log(address);
    //   })
    // }
    console.log(markers)
  };

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

  const image =
  "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";


      return (
        <div >
    
          <Locate panTo={panTo} />
          {/* <button className = "testBtn" onClick={handleClick}>hello</button> */}
          <Search  panTo={panTo} />
    
          <GoogleMap
            id="map"
            onClick={onMapClick}
            zoom={9}
            center={markers[0]}
            options={options}
            onLoad={onMapLoad}
          >
            
            {markers.map((marker) => (
              <Marker
                key={`${marker.lat}+${marker.lng}`}
                position={{ lat: marker.lat, lng: marker.lng }}
                onClick={() => {
                  setSelected(marker);
                  console.log(selected);
                }}
                icon={{
                  url: image,
                  origin: new window.google.maps.Point(0, 0),
                  anchor: new window.google.maps.Point(15, 15),
                  scaledSize: new window.google.maps.Size(30, 30),
                }}
              />
            ))}
            {users && users.map((user) => {
              if (user.isVenue && selected && user.venueAddress[0] === selected.lat && user.venueAddress[1] === selected.lng) {
                
                Geocode.fromLatLng(user.venueAddress[0], user.venueAddress[1]).then(
                  (response) => {
                    const address = response.results[0].formatted_address;
                    setAddress(address);
                  },
                  (error) => {
                    console.error(error);
                  }
                );
                return (
                  <InfoWindow
                    position={{ lat: selected.lat, lng: selected.lng }}
                    onCloseClick={() => {
                      setSelected(null);
                    }}
                  >
                          <div className="text-center">
                            <h2 className="text-center" >
                              {user.venueName}
                            </h2>
                            <p>address: {address}</p>
                            <p>owner: {user.firstName} {user.lastName}</p>
                            <button className="btn btn-primary text-center" onClick={() => {
                              navigate('/venue/' + user.id)
                            }}>shows</button>
                          </div>

                  </InfoWindow>
                )
              } 
            })}
            {/* {selected ? (
              <InfoWindow
                position={{ lat: selected.lat, lng: selected.lng }}
                onCloseClick={() => {
                  setSelected(null);
                }}
              >
                      <div>
                        <h2>
                          <span role="img" aria-label="bear">
                            🐻
                          </span>{" "}
                          hello
                        </h2>
                      </div>

    
              </InfoWindow>
            ) : null} */}
          </GoogleMap>
          
        </div>
      );
}

function Locate({ panTo }) {
  return (
    <button
      className="locate"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
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

function Search(props, { panTo }) {
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

  return (
    <div className="home-search">
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Search for Venues"
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
    </div>
  );
}

const mapStateToProps = (state) => {

  return {
    users: state.firestore.ordered.users
  }
}

export default connect(mapStateToProps)(Home);
