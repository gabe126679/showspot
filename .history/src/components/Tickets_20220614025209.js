import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from "redux";
import { createShow } from '../../store/actions/showActions';
import { useNavigate } from "react-router-dom";


function Tickets(props) {

    const { auth, users } = props;

    const navigate = useNavigate();

    const handleClick = () => {
        console.log(headlinerId);

    }

    useEffect(() => {
        if (!auth.uid) {
            navigate("/spotterLogin");
        }
      }, []);

    return (
        <div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            
            <div className="container">
                <p className="text-center">Promote a Show with up to 5 artists. You are now a ShowSpotter!</p>
            </div>
            {/* <button onClick={handleClick}>hi</button> */}
            <div className="login-container container border">
            <button onClick={handleClick}> hello </button>
                <br/>
                <br/>
                <Form onSubmit={handleSubmit}>
                    <h1 className="text-center">Promote A Show</h1>
                    <br/>
                    <Form.Group className="mb-3" controlId="headliner" onChange={handleChange} >
                        <Form.Label> Ticket Price</Form.Label>
                        <Form.Control type="text" placeholder="Enter Price Per Ticket" 
                        
                        />

                    </Form.Group>
                    <br/>
                    <br/>
                    <div className="col text-center">
                        <Button className="align-center" variant="primary" type="submit">
                            Promote
                        </Button>
                    </div>
                    <br/>
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

    return {
      auth: state.firebase.auth,
      users: state.firestore.ordered.users
    }
}

const mapDispatchToProps = dispatch => {
    return {
      createShow: (show) => dispatch(createShow(show))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([{
      collection: 'users'
    }])
  )(Tickets);