import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Spotters from "./components/Spotters";
import NavMain from "./components/layout/NavMain";
import SpotterLogin from "./components/forms/SpotterLogin";
import SpotterSignup from "./components/forms/SpotterSignup";
import Promote from "./components/forms/Promote";
import FormBand from "./components/forms/FormBand";
import Footer from "./components/Footer";
import Profile from "./components/profiles/Profile";
import ArtistProfile from "./components/profiles/ArtistProfile";
import Artists from "./components/Artists";
import ArtistSignup from "./components/forms/ArtistSignup";
import PublicArtist from "./components/profiles/PublicArtist";
import VenueProfile from "./components/profiles/VenueProfile";
import Venues from "./components/Venues";
import VenueSignup from "./components/forms/VenueSignup";
import PublicVenue from "./components/profiles/PublicVenue";
import BandProfile from "./components/profiles/BandProfile";
import Bands from "./components/Bands";
import Invites from "./components/Invites";
import Tickets from "./components/Tickets";

import "./custom.scss"

function App() {
  return (
    <>
      <BrowserRouter >
        <NavMain />
          <Routes >
            <Route exact path='/'element={<Home  />}  />
            <Route exact path='/spotters'element={<Spotters />} />
            <Route exact path='/spotterLogin'element={<SpotterLogin />} />
            <Route exact path='/spotterSignup'element={<SpotterSignup />} />
            <Route exact path='/promote'element={<Promote />} />
            <Route exact path='/formBand'element={<FormBand />} />
            <Route exact path='/profile'element={<Profile />} />
            <Route exact path='/artists'element={<Artists />} />
            <Route exact path='/artistProfile'element={<ArtistProfile />} />
            <Route exact path='/artistSignup'element={<ArtistSignup />} />
            <Route exact path='/venues'element={<Venues />} />
            <Route exact path='/venueProfile'element={<VenueProfile />} />
            <Route exact path='/venueSignup'element={<VenueSignup />} />
            <Route exact path='/bands'element={<Bands />} />
            <Route exact path='/bandProfile'element={<BandProfile />} />
            <Route exact path='/artist/:id'element={<PublicArtist />} />
            <Route exact path='/venue/:id'element={<PublicVenue />} />
            <Route exact path='/invites'element={<Invites />} />
            <Route exact path='/tickets'element={<Tickets />} />
          </Routes>
        <Footer />
    </BrowserRouter>
  </>
  );
}

export default App;
