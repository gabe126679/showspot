import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { artistSignUp } from '../../store/actions/authActions'

function ArtistSignup(props) {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [mainInstrument, setMainInstrument] = useState("");

    const handleChange = (e) => {
        switch (e.target.id) {
            case 'firstName': 
              setFirstName(e.target.value);
            case 'lastName': 
              setLastName(e.target.value);
            case 'mainInstrument': 
              setMainInstrument(e.target.value);
          }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const stateObject = {
            firstName,
            lastName,
            mainInstrument
        }

        props.artistSignUp(stateObject);

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
            <p className="text-center">Sign Up as an Artist and Start Playing Shows</p>
        </div>
        <div className="login-container container border">
            <br/>
            <br/>
            <Form onSubmit={handleSubmit}>
                <h1 className="text-center">Artist Sign Up</h1>
                <br/>
                <Form.Group className="mb-3" controlId="firstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder="First Name" onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="lastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control  type="text" placeholder="Last Name" onChange={handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="mainInstrument">
                    <Form.Label>Main Instrument</Form.Label>
                    <Form.Control type="text" placeholder="Main Instrument" onChange={handleChange} />
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
      artistSignUp: (creds) => dispatch(artistSignUp(creds))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtistSignup);