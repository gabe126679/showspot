import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { signUp } from '../../store/actions/authActions'

function SpotterSignUp(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");

    const handleChange = (e) => {
        switch (e.target.id) {
            case 'email': 
              setEmail(e.target.value);
            case 'password': 
              setPassword(e.target.value);
            case 'userName': 
              setUserName(e.target.value);
          }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const stateObject = {
            email,
            password,
            userName
        }

        props.signUp(stateObject);
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
            <p className="text-center">Sign Up as a Spotter and Start ShowSpotting</p>
        </div>
        <div className="login-container container border">
            <br/>
            <br/>
            <Form onSubmit={handleSubmit}>
                <h1 className="text-center">Spotter Sign Up</h1>
                <br/>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Email" onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control  type="password" placeholder="Password" onChange={handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="userName">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control type="text" placeholder="User Name" onChange={handleChange} />
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
      signUp: (creds) => dispatch(signUp(creds))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SpotterSignUp);