import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from "redux";
import { createBand } from '../../store/actions/showActions';
import { useNavigate } from "react-router-dom";


function FormBand(props) {

    const { auth, users } = props;

    const navigate = useNavigate();

    const [artists, setArtists] = useState([]);
    const [next, setNext] = useState("");
    const [bandName, setBandName] = useState("");
    const [ids, setIds] = useState([]);


    const handleClick = () => {
        console.log(next);
    }

    const handleChange = (e) => {
        setNext(e.target.value);
        console.log(next)
        if (e.target.id === "bandName") {
            setBandName(e.target.value);
        }
        console.log(artists)
    }

    const handleAddArtist = (e) => {
        e.preventDefault();
        const newName = next.split(" ")

        users.map((user) => {  
            if (newName[0] === user.firstName && newName[1] === user.lastName) {
                const artistOne = {
                    id: user.id,
                    number: artists.length + 1,
                    firstName: user.firstName,
                    lastName: user.lastName
                }
                setArtists((artists) => [...artists, artistOne])
                setIds((ids) => [...ids, artistOne.id])
            }
        })
        
        // navigate('/spotters');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newName = next.split(" ")

        users.map((user) => {  
            if (newName[0] === user.firstName && newName[1] === user.lastName) {
                const artistOne = {
                    id: user.id,
                    number: artists.length + 1,
                    firstName: user.firstName,
                    lastName: user.lastName
                }
                setArtists((artists) => [...artists, artistOne])
                setIds((ids) => [...ids, artistOne.id])
            }
        })
        props.createBand(artists, bandName, ids);
        // navigate('/spotters');
    }

    

    useEffect(() => {
        if (!auth.uid) {
            navigate("/spotterLogin");
        }
        if (users) {
            users.map((user) => {
                if (user.id === auth.uid && artists.length <= 0) {
                    const artistOne = {
                        id: auth.uid,
                        number: 1,
                        firstName: user.firstName,
                        lastName: user.lastName
                    }
                    setArtists((artists) => [...artists, artistOne])
                    setIds((ids) => [...ids, artistOne.id])
                }
            })
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
            
            <div className="container">
                <p className="text-center">Create a Band with up to 5 artists. Don't forget to Name your Band</p>
            </div>
            {/* <button onClick={handleClick}>hi</button> */}
            <div className="login-container container border">
                <br/>
                <br/>
                <Form onSubmit={handleAddArtist}>
                    <h1 className="text-center">Form a Band</h1>
                    <br/>
                    {artists && artists.map((artist) => {
                         
                            return (
                                <div>
                                    <Form.Label>Artsit # {artist.number}</Form.Label>
                                    <div className="mb-3 p-2 border">
                                        {artist.firstName} {artist.lastName}
                                    </div>
                                </div>
                            ) 
                    })}
                    <Form.Group className="mb-3" controlId="second" onChange={handleChange}>
                        <Form.Label>Artsit # {artists.length + 1}</Form.Label>
                        <Form.Control type="text" placeholder="Enter next artist"
                         
                        />

                    </Form.Group>

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
                    <h1 className="text-center">Name Your Band</h1>
                    <br/>
                    {artists && artists.map((artist) => {
                        return (
                        <div className="container">
                            <p>{artist.number}: {artist.firstName} {artist.lastName}</p>
                            
                        </div>
                        )

                    })}
                    <Form.Group className="mb-3" controlId="bandName" onChange={handleChange}>
                        <Form.Label>Band Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Band Name"
                         
                        />

                    </Form.Group>

                    <br/>
                    <br/>
                    <div className="col text-center">
                        <Button className="align-center" variant="primary" type="submit">
                            Create Band
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
      users: state.firestore.ordered.users
    }
}

const mapDispatchToProps = dispatch => {
    return {
      createBand: (band, name, ids) => dispatch(createBand(band, name, ids))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([{
      collection: 'users'
    }])
  )(FormBand);