import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from "redux";
import { updateTicket } from '../../store/actions/showActions';
import { updateVenue} from '../../store/actions/showActions';
import { useNavigate, useParams } from "react-router-dom";


function Tickets(props) {

    const { auth, shows } = props;

    const {id} = useParams();

    const [price, setPrice] = useState("0");

    const navigate = useNavigate();

    const handleClick = () => {
    }

    const handleChange = (e) => {
        e.preventDefault();
        console.log(e.target.value);
        setPrice("$" + e.target.value + ".00")

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        shows.map((show) => {
            const decisionObject = {
                title: e.target.id,
                decision: true,
                price: price
            }
            if (e.target.id === show.id && auth.uid === show.venueId) {
                props.updateVenue(show, true)
                props.updateTicket(decisionObject)
            }
        })
        
        
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
                {shows && shows.map((show) => {
                    if (show.id === id) {
                        return (
                            <Form onSubmit={handleSubmit} id={show.id}>
                                <h1 className="text-center">Ticket Price</h1>
                                <br/>
                                {show.artists.map((artist) => {
                                    <Form.Group className="mb-3" controlId="headliner" onChange={handleChange} >
                                        <Form.Label>artist: {artist.firstName} {artist.lastName}</Form.Label>
                                    </Form.Group>                                    
                                })}
                                <Form.Group className="mb-3 text-center" controlId="price" onChange={handleChange} >
                                    <Form.Label>Enter Price Per Ticket</Form.Label>
                                    <Form.Control type="text" placeholder="$" 
                                    
                                    />
            
                                </Form.Group>
                                <br/>
                                <br/>
                                <h3 className="text-center">{price} per ticket</h3>                    
                                <br/>
                                <br/>
                                <div className="col text-center">
                                    <Button className="align-center" variant="primary" type="submit">
                                        Set Price
                                    </Button>
                                </div>
                                <br/>
                            </Form>
                        )
                    }
                })}
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
      shows: state.firestore.ordered.shows
    }
}

const mapDispatchToProps = dispatch => {
    return {
      updateTicket: (ticket) => dispatch(updateTicket(ticket)),
      updateVenue: (venue, decision) => dispatch(updateVenue(venue, decision))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([{
      collection: 'shows'
    }])
  )(Tickets);