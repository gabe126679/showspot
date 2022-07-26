import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from "redux";
import { createShow } from '../../store/actions/showActions';
import { useNavigate } from "react-router-dom";


function Promote(props) {

    const { auth, users, bands } = props;

    const navigate = useNavigate();

    const [artists, setArtists] = useState([]);
    const [newBands, setNewBands] = useState([]);
    const [next, setNext] = useState("");
    const [venue, setVenue] = useState("");
    const [ids, setIds] = useState([]);
    const [bandIds, setBandIds] = useState([]);


    const handleClick = () => {
        navigate("/formBand")
    }


    const handleBandShift = (e) => {
        e.preventDefault();
        const newArtists = document.querySelector(".artists");
        const newBand = document.querySelector(".bands");
        const bandButton = document.querySelector(".band-button");
        const artistButton = document.querySelector(".artist-button");    
        newArtists.style.display = "none";
        newBand.classList.remove("d-none");
        bandButton.classList.add("btn-primary");
        bandButton.classList.remove("btn-warning");
        artistButton.classList.add("btn-warning");
        artistButton.classList.remove("btn-primary");
    }
    const handleArtistShift = (e) => {
        e.preventDefault();
        const newArtists = document.querySelector(".artists");
        const newBand = document.querySelector(".bands");
        const bandButton = document.querySelector(".band-button");
        const artistButton = document.querySelector(".artist-button");    
        newArtists.style.display = "inline";
        newBand.classList.add("d-none");
        bandButton.classList.add("btn-warning");
        bandButton.classList.remove("btn-primary");
        artistButton.classList.add("btn-primary");
        artistButton.classList.remove("btn-warning");
    }

    const handleChange = (e) => {

        users.map((user) => {
            if (user.isVenue && e.target.value === user.venueName && e.target.id === "venue") {
                setVenue({
                    name: e.target.value,
                    id: user.id
                })
            } else {
                setNext(e.target.value);
            }
        })
        console.log(artists);
        console.log(venue);
    }

    const handleAddArtist = (e) => {
        e.preventDefault();
        bands.map((band) => {
            
            if (band.bandName === next) {
                
                const bandOne = {
                    type: "band",
                    id: band.id,
                    number: artists.length + 1,
                    bandName: band.bandName
                }
                setNewBands((newBands) => [...newBands, bandOne])
                setArtists((artists) => [...artists, bandOne])
                setBandIds((bandIds) => [...bandIds, bandOne.id])
            } 
        })
        users.map((user) => {  
            const newName = next.split(" ")
            if (newName[0] === user.firstName && newName[1] === user.lastName) {
                const artistOne = {
                    type: "artist",
                    id: user.id,
                    number: artists.length + 1,
                    firstName: user.firstName,
                    lastName: user.lastName
                }
                setArtists((artists) => [...artists, artistOne])
                setIds((ids) => [...ids, artistOne.id])
            }
        })
        setNext("");
        console.log(artists);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        bands.map((band) => {
            
            if (band.bandName === next) {
                
                const bandOne = {
                    type: "band",
                    id: band.id,
                    number: artists.length + 1,
                    bandName: band.bandName
                }
                setNewBands((newBands) => [...newBands, bandOne])
                setArtists((artists) => [...artists, bandOne])
                setBandIds((bandIds) => [...bandIds, bandOne.id])
            } 
        })
        users.map((user) => {  
            const newName = next.split(" ")
            if (newName[0] === user.firstName && newName[1] === user.lastName) {
                const artistOne = {
                    type: "artist",
                    id: user.id,
                    number: artists.length + 1,
                    firstName: user.firstName,
                    lastName: user.lastName
                }
                setArtists((artists) => [...artists, artistOne])
                setIds((ids) => [...ids, artistOne.id])
            }
        })
        setNext("");
        props.createShow(artists, venue);
        navigate('/spotters');
    }

    

    useEffect(() => {
        if (!auth.uid) {
            navigate("/spotterLogin");
        }
      });

    return (
        <div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            
            <div className="container text-center">
                <button className="btn btn-warning">show</button>
                <button className="btn btn-primary" onClick={handleClick}>band</button>
            </div>
            {/* <button onClick={handleClick}>hi</button> */}
            <div className="login-container container border">
            <br/>
                    <br/>
                <Form onSubmit={handleAddArtist}>
                    <h1 className="text-center">Promote A Show</h1>

                    <div className="container text-center">
                        <button className="btn btn-primary artist-button" onClick={handleArtistShift}>artist</button>
                        <button className="btn btn-warning band-button" onClick={handleBandShift}>band</button>
                    </div>

                    <br/>
                    <div className="artists">
                        {artists && artists.map((artist) => {
                            
                            if (artist.type === "artist") {
                                return (
                                    <div>
                                        <Form.Label>Artsit # {artist.number}</Form.Label>
                                        <div className="mb-3 p-2 border">
                                            {artist.firstName} {artist.lastName}
                                        </div>
                                    </div>
                                ) 
                            } else if (artist.type === 'band') {
                                return (
                                    <div>
                                        <Form.Label>Artsit # {artist.number}</Form.Label>
                                        <div className="mb-3 p-2 border">
                                            {artist.bandName}
                                        </div>
                                    </div>
                                ) 
                            }
                        })}
                        <Form.Group className="mb-3" controlId="second" onChange={handleChange}>
                            <Form.Label>Artsit # {artists.length + 1}</Form.Label>
                            <Form.Control type="text" placeholder="Enter Artist Name"
                            
                            />

                        </Form.Group>
                    </div>
                    <div className="bands d-none">
                        {artists && artists.map((artist) => {
                            if (artist.type === "artist") {
                                return (
                                    <div>
                                        <Form.Label>Artsit # {artist.number}</Form.Label>
                                        <div className="mb-3 p-2 border">
                                            {artist.firstName} {artist.lastName}
                                        </div>
                                    </div>
                                ) 
                            } else if (artist.type === 'band') {
                                return (
                                    <div>
                                        <Form.Label>Artsit # {artist.number}</Form.Label>
                                        <div className="mb-3 p-2 border">
                                            {artist.bandName}
                                        </div>
                                    </div>
                                ) 
                            }

                        })}
                        <Form.Group className="mb-3" controlId="second" onChange={handleChange}>
                            <Form.Label>Artsit # {artists.length + 1}</Form.Label>
                            <Form.Control type="text" placeholder="Enter Band Name"
                            
                            />

                        </Form.Group>
                    </div>


                    <br/>
                    <br/>
                    <div className="col text-center">
                        <Button className="align-center" variant="primary" type="submit">
                            Add Artist
                        </Button>
                    </div>
                    <br/>
                </Form>
                <br/>
                <br/>
            </div> 
            <br/>
            <div className="login-container container border">
                <br/>
                <br/>
                <Form onSubmit={handleSubmit}>
                    <h1 className="text-center">Choose a Venue</h1>
                    <br/>
                    {artists && artists.map((artist) => {
                        if (artist.type === "artist") {
                            return (
                                <div className="container">
                                    <p>{artist.number}: {artist.firstName} {artist.lastName}</p>
                                    
                                </div>
                                )
                        } else if (artist.type === "band") {
                            return (
                                <div className="container">
                                    <p>{artist.number}: {artist.bandName}</p>
                                    
                                </div>
                            )
                        }


                    })}
                    <Form.Group className="mb-3" controlId="venue" onChange={handleChange}>
                        <Form.Label>Venue</Form.Label>
                        <Form.Control type="text" placeholder="Enter Venue"
                         
                        />

                    </Form.Group>

                    <br/>
                    <br/>
                    <div className="col text-center">
                        <Button className="align-center" variant="primary" type="submit">
                            Promote Show
                        </Button>
                    </div>
                    <br/>
                </Form>
                <br/>
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

const mapStateToProps = (state) => {

    return {
      auth: state.firebase.auth,
      users: state.firestore.ordered.users,
      bands: state.firestore.ordered.bands
    }
}

const mapDispatchToProps = dispatch => {
    return {
      createShow: (show, venue) => dispatch(createShow(show, venue))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'users' },
        { collection: 'bands' }
    ])
  )(Promote);