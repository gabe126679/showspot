import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Spotters from "./components/Spotters";
import NavMain from "./components/layout/NavMain";
import SpotterLogin from "./components/forms/SpotterLogin";
import SpotterSignup from "./components/forms/SpotterSignup";
import SpotterProfile from "./components/profiles/SpotterProfile";
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
import PublicBand from "./components/profiles/PublicBand";
import BandInvites from "./components/BandInvites";
import Bands from "./components/Bands";
import Tickets from "./components/Tickets";
import TicketPrice from "./components/forms/TicketPrice";
import Cart from "./components/cart/Cart";
import Playlists from "./components/Playlists"
import InstagramCard from "./components/InstagramCard"

import "./custom.scss"
import MapBackground from "./components/MapBackground";

function App() {
  return (
    <>
      <NavMain />
        <Routes >
          <Route exact path='/' element={<Home  />}  />
        </Routes>
        <Routes >
          <Route exact path='/cart' element={<Cart />} />
          <Route exact path='/venueSignup' element={<VenueSignup />} />
        </Routes>
        <MapBackground />
        <Routes >
          <Route exact path='/spotters' element={<Spotters/>} />
          <Route exact path='/spotterLogin' element={<SpotterLogin />} />
          <Route exact path='/spotterSignup' element={<SpotterSignup />} />
          <Route exact path='/spotterProfile' element={<SpotterProfile />} />
          <Route exact path='/promote' element={<Promote />} />
          <Route exact path='/formBand'element={<FormBand />} />
          <Route exact path='/profile' element={<Profile />} />
          <Route exact path='/artists' element={<Artists />} />
          <Route exact path='/artistProfile' element={<ArtistProfile />} />
          <Route exact path='/artistSignup' element={<ArtistSignup />} />
          <Route exact path='/venues' element={<Venues />} />
          <Route exact path='/venueProfile' element={<VenueProfile />} />
          
          <Route exact path='/bands' element={<Bands />} />
          <Route exact path='/bandProfile/:id' element={<BandProfile />} />
          <Route exact path='/artist/:id' element={<PublicArtist />} />
          <Route exact path='/venue/:id' element={<PublicVenue />} /> 
          <Route exact path='/tickets/:id' element={<Tickets />} />
          <Route exact path='/ticketPrice/:id' element={<TicketPrice />} />
          <Route exact path='/playlists' element={<Playlists />} />
          <Route exact path='/bandInvites/:id' element={<BandInvites />} />
          <Route exact path='/band/:id' element={<PublicBand />} />
        </Routes>

      <Footer />
  </>
  );
}

export default App;
