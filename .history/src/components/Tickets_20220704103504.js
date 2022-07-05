import React, { useState, useEffect } from 'react';
import { Container, Button, Row } from 'react-bootstrap';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from "redux";
import { updateTicket } from '../store/actions/showActions';
import { addToCart } from '../store/actions/authActions'
import { useNavigate, useParams } from "react-router-dom";

function Tickets(props) {

    const { auth, shows } = props;

    const { id } = useParams();

    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        shows.map((show) => {
            if (show.id === id && !show.price === undefined) {
                console.log("hello");
            }
        })
    } 

    const handleCart = async (e) => {
        e.preventDefault(); 
        props.addToCart(id);
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
            <div className="login-container container border">
            <button onClick={handleClick}> hello </button>
                <br/>
                <br/>
                {shows && shows.map((show) => {
                    if (show.id === id) {
                        const artistArray = [...show.artists];
                        return (
                            <Container fluid>
                                <br/>
                                {artistArray.sort((a, b) => a.number - b.number).map((artist) => {
                                    return (
                                        <Row className="mb-3 text-center"  >
                                            artist {artist.number} : {artist.firstName} {artist.lastName}
                                        </Row>
                                    )
                                })}
                                <Row className="mb-3 text-center"  >
                                    @ : {show.venue}
                                </Row>                               
                                <h1 className="text-center">Ticket Price</h1>
                                <Row className="mb-3 text-center" >
                                    {show.ticketPrice}
                                </Row>
                                <div className="col text-center">
                                <Button className="align-center" onClick={handleCart} >
                                    Add to Cart
                                </Button>

                                </div>
                            </Container>
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
      addToCart: (item) => dispatch(addToCart(item))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([{
      collection: 'shows'
    }])
  )(Tickets);
