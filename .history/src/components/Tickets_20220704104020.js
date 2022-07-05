import React, { useState, useEffect } from 'react';
import { Container, Button, Row, Dropdown } from 'react-bootstrap';
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
                                    @ : {show.venueName}
                                </Row>     
                                <Table bordered hover>
                                    <thead>
                                    <tr>
                                        <th>Artists</th>
                                        <th>Details</th>
                                        <th>Venue</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>
                                        <div className="backlines">
                                            <div className="col-4">{show.voteCount}</div>
                                            <button className="btn btn-primary" onClick={() => {   
                                            props.updateVote(auth.uid, show.id);  
                                            }} id={show.id}>^</button>
                                        </div>
                                        </td>
                                        <td className="backlines">

                                            <div>

                                            <Dropdown >
                                                <Dropdown.Toggle className="dropdown-basic" variant="warning" id="dropdown-basic"
                                                >
                                                {show.backlines[0].firstName + " " + show.backlines[0].lastName}
                                                view
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu  >
                                                {show.backlines && show.backlines.map((backline) => {
                                                return (
                                                    <div className="container w-100 p-2 m-2">
                                                    <Dropdown.Item href="#/action-1">  
                                                        <div className="float-start">
                                                        <Link to={"/artist/" + backline.artist}>
                                                            {backline.firstName + " " + backline.lastName}
                                                            
                                                        </Link>

                                                        </div>
                                                        <div className="backlineColumn">
                                                        <button className="btn-sm btn-primary">^</button>
                                                        <p >0</p>
                                                        </div>
                                                    </Dropdown.Item>

                                                    
                                                    </div>

                                                    
                                                )
                                                })}
                                                </Dropdown.Menu>
                                            </Dropdown>

                                            </div>
                                            {(() => {

                                            if (!checkedBacklines.includes(show.id)) {
                                                return (
                                                <button className={"btn btn-primary"} id={show.id} onClick={handleClick}>+</button>      
                                                )
                                            }
                                            })()}
                                            
                                        </td>
                                    </tr>
                                    </tbody>
                                </Table>                          
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
