import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { signIn } from '../../store/actions/authActions';
import { Navigate } from 'react-router-dom';

function SpotterLogin(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleChange = (e) => {
        switch (e.target.id) {
            case 'email': 
              setEmail(e.target.value);
            case 'password': 
              setPassword(e.target.value);
          }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const stateObject = {
            email,
            password
        }

        props.signIn(stateObject);
      } 

      const { auth } = props;

      if (auth.uid) return  <Navigate to='/'/>

  return (
    <div>

        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <div className="container">
            <p className="text-center">Log In and Keep ShowSpotting</p>
        </div>
        <div className="login-container container border">
            <br/>
            <br/>
            <Form onSubmit={handleSubmit}>
                <h1 className="text-center">Spotter Log In</h1>
                <br/>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control onChange={handleChange} type="email" placeholder="Email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={handleChange} type="password" placeholder="Password" />
                </Form.Group>
                <br/>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                <br/>
                <p className="text-center">new to ShowSpot? <a href="/spotterSignup">Signup</a></p>
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
      auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      signIn: (creds) => dispatch(signIn(creds))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SpotterLogin);