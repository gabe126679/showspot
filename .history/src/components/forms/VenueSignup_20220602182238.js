import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { venueSignUp } from '../../store/actions/authActions'

function VenueSignup(props) {
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

      const { auth } = props;

      if (!auth.uid) return navigate('/');
    
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
                <Form.Group className="mb-3" controlId="venueAddress">
                    <Form.Label>Venue Address</Form.Label>
                    <Form.Control  type="text" placeholder="Venue Address" onChange={handleChange}/>
                </Form.Group>
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