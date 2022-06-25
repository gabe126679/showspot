import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from "redux";
import { updateTicket } from '../store/actions/showActions';
import { useNavigate } from "react-router-dom";


function Tickets(props) {

    const { auth, users } = props;

    const [price, setPrice] = useState("0");

    const navigate = useNavigate();

    const handleClick = () => {

    }

    const handleChange = (e) => {
        e.preventDefault();
        console.log(e.target.value);
        setPrice(e.target.value)

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e);
        // props.updateTicket(e.target.value)
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
                    <h1 className="text-center">Ticket Price</h1>
                    <br/>
                    <Form.Group className="mb-3" controlId="price" onChange={handleChange} >
                        <Form.Label>Enter Price Per Ticket</Form.Label>
                        <Form.Control type="text" placeholder="$" 
                        
                        />

                    </Form.Group>
                    <br/>
                    <br/>
                    <h3 className="text-center">${price}.00 per ticket</h3>                    
                    <br/>
                    <br/>
                    <div className="col text-center">
                        <Button className="align-center" variant="primary" type="submit">
                            Set Price
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
      updateTicket: (ticket) => dispatch(updateTicket(ticket))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([{
      collection: 'users'
    }])
  )(Tickets);