import React, { useState, useEffect } from 'react';
import { Container, Button, Row } from 'react-bootstrap';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from "redux";
import { updateTicket } from '../../store/actions/showActions';
import { useNavigate } from "react-router-dom";


function SongUpload(props) {
    const { auth, shows } = props;

    const [price, setPrice] = useState("0");

    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        shows.map((show) => {
            if (show.id === id) {
                console.log(id);
            }
        })
    }

    const handleChange = (e) => {
        e.preventDefault();
        console.log(e.target.value);
        setPrice("$" + e.target.value + ".00")
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const ticketObject = {
            title: id,
            price: price
        }
        props.updateTicket(ticketObject);
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
                <p className="text-center">Set a Price for tickets to this show. Subject to dispute.</p>
            </div>
            <div className="login-container container border">
            <button onClick={handleClick}> hello </button>
                <br/>
                <br/>
                {shows && shows.map((show) => {
                    if (show.id === id) {
                        return (
                            <Container fluid>
                                <br/>
                                <Row className="mb-3 text-center"  >
                                    headliner : {show.headliner}
                                </Row>
                                <Row className="mb-3 text-center"  >
                                    second : {show.second}
                                </Row> 
                                <Row className="mb-3 text-center"  >
                                    third : {show.third}
                                </Row>
                                <Row className="mb-3 text-center"  >
                                    second : {show.second}
                                </Row> 
                                <Row className="mb-3 text-center"  >
                                    opener : {show.opener}
                                </Row>
                                <Row className="mb-3 text-center"  >
                                    @ : {show.venue}
                                </Row>                  
                                <h1 className="text-center">Ticket Price</h1>
                                <Row className="mb-3 text-center" >
                                    {show.ticketPrice}
                                </Row>
                                <div className="col text-center">
                                    <Button className="align-center" variant="primary" type="submit">
                                        Add to Cart
                                    </Button>
                                </div>
                                <br/>
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
      updateTicket: (ticket) => dispatch(updateTicket(ticket))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([{
      collection: 'shows'
    }])
  )(SongUpload);