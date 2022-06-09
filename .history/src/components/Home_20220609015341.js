import React, { useCallback, useRef, useState, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption, } from "@reach/combobox";
import { connect } from "react-redux";

import "@reach/combobox/styles.css";
import mapStyles from "../mapStyles";

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

function Home(props) {

  const { users } = props;

  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (users) {
      users.map((user) => {
        const address = user.venueAddress
        console.log(address);
        if (user.isVenue) {
          setMarkers((current) => [
            ...current,
            {
              address
            },
          ]);
        }
      })
    }
    console.log(markers);
  }, []);

  const handleClick = () => {
    if (users) {
      users.map((user) => {
        const address = user.venueAddress
        console.log(address);
      })
    }
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
      <Search  panTo={panTo} />
      <button onClick={handleClick}>hello</button>
      <GoogleMap
        id="map"
        
        zoom={9}
        center={center}
        options={options}
        onLoad={onMapLoad}
      >
        
        {markers.map((marker) => (
          <Marker
            key={`${marker.lat}+${marker.lng}`}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => {
              setSelected(marker);
            }}
            icon={{
              url: image,
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
              scaledSize: new window.google.maps.Size(30, 30),
            }}
          />
        ))}

        {selected ? (
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
        ) : null}
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
