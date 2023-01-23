import React, { useState, useEffect } from 'react';
import { Container, Button, Row, Dropdown, Table } from 'react-bootstrap';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from "redux";
import { updateTicket } from '../store/actions/showActions';
import { addToCart } from '../store/actions/authActions'
import { useNavigate, useParams, Link } from "react-router-dom";
import { createBackline, updateVote, updateBackline } from '../store/actions/showActions';
import { format } from 'date-fns'

function Tickets(props) {

    const { auth, shows, users } = props;

    const { id } = useParams();

    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        shows.map((show) => {
            if (show.id === id && !show.price === undefined) {
                console.log("hello");
            }
        })
        shows.map((show) => {
            if (show.id === e.target.id && !show.backlines.includes(auth.uid)) {
                users.map((user) => {
                if (user.id === auth.uid) {
                    const backlineObject = {
                        title: show.id,
                        artist: auth.uid,
                        firstName: user.firstName,
                        lastName: user.lastName, 
                        voteCount: 1,
                        votedOn: [auth.uid]
                    }
                    props.createBackline(backlineObject);
                }
                })
            }
        })
    } 

    const handleBacklineVote = async (show, artist) => {

        show.backlines.map((backline) => {
            
            if (backline.artist === artist && !backline.votedOn.includes(auth.uid)) {
                
                const backlineObject = {
                    artist: backline.artist,
                    firstName: backline.firstName,
                    lastName: backline.lastName,  
                    title: show.id,
                    voteCount: backline.voteCount + 1,
                    votedOn: [...backline.votedOn, auth.uid]                 
                }
                props.updateBackline(backlineObject, backline);
            }
        })

    }

    const handleCart = async (e) => {
        e.preventDefault(); 
        props.addToCart(id);
        navigate('/spotters');
      }

    useEffect(() => {
        if (!auth.uid) {
            navigate("/spotterLogin");
        }


      });

    return (
        <div className="ticket-border">

            <div className="ticket-card login-container container bg-warning text-primary">

                {shows && shows.map((show) => {
                    if (show.id === id) {
                        const artistArray = [...show.artists];
                        
                        return (
                            <Container fluid>
                                <br/>
                                <br/>
                                {(() => {
                                    if (show.startTime) {
                                        return <h1 className="text-center ">{show.startTime.toDate().toDateString()}</h1>
                                    }
                                })()}
                                <p className="text-center ">@ : {show.venueName}</p>
                                <br/>
                                {artistArray.sort((a, b) => a.number - b.number).map((artist) => {
                                    if (artist.type === "artist" || !artist.type) {
                                        return (
                                            <Row className="mb-3 text-center"  >
                                                artist {artist.number} : {artist.firstName} {artist.lastName}
                                            </Row>
                                        )
                                    } else if (artist.type === "band" || !artist.type) {
                                        return (
                                            <Row className="mb-3 text-center"  >
                                                artist {artist.number} : {artist.bandName}
                                            </Row>
                                        )
                                    }

                                })}
                                <Row className="mb-3 text-center"  >
                                    @ : {show.venueName}
                                    
                                </Row>  
                                <Row className="float-end">
                                    {(() => {
                                        if (!show.votedOn.includes(auth.uid)) {
                                            return (
                                                <div className="backlines">
                                                    <button className="btn-sm btn-primary float-end" onClick={() => {   
                                                        props.updateVote(auth.uid, show.id);  
                                                    }} id={show.id}>^</button>
                                                </div>
                                            )
                                        }
                                    })()}
                                </Row>  
                                <Row className=" float-start">    
                                vote count: {show.voteCount}
                                </Row>   
                                <br/>
                                <br/>

                                <Row className="mb-3 text-center"  >
                                    <h1 className="text-center"> Backlines </h1>
                                </Row>     
                                <Table bordered hover>
                                    <thead>
                                    <tr>
                                        <th>Backlines</th>
                                        <th>Vote Count</th>
                                        <th>Vote</th>
                                    </tr>
                                    </thead>
                                    {show.backlines && show.backlines.map((backline) => {
                                        return (
                                            <tbody>

                                                <tr>
                                                    <td>
                                                        {backline.firstName + " " + backline.lastName}
                                                        
                                                    </td>
                                                    <td>

                                                        {backline.voteCount}
                                                    </td>
                                                    <td>

                                                {(() => {
                                                        if (backline.artist !== auth.uid && !backline.votedOn.includes(auth.uid)) {
                                                            return (

                                                            <button className={"btn btn-primary"} onClick={() => {
                                                                handleBacklineVote(show, backline.artist)
                                                            }}>+</button>      
                                                            )
                                                        } else {
                                                            return <div> backline voted</div>
                                                        }
                                                })()}
                                                    </td>
                                                </tr>

                                            </tbody>
                                        )
                                    })}
                                </Table>                          
                                <h1 className="text-center">Ticket Price</h1>
                                <Row className="mb-3 text-center" >
                                    {show.ticketPrice}
                                </Row>
                                <div className="col text-center">
                                {users && users.map((user) => {
                                    if (user.id === auth.uid && user.cartItems && user.cartItems.includes(auth.uid)) {
                                        return (
                                            <span className="align-center" onClick={handleCart} >
                                                Item In Cart
                                            </span>
                                        )
                                    }
                                    else if (user.id === auth.uid && show.ticketBuyers && show.ticketBuyers.includes(auth.uid)) {
                                        return (
                                            <span className="align-center" onClick={handleCart} >
                                                Ticket Purchased
                                            </span>
                                        )
                                    }                                    
                                    else if (user.id === auth.uid && show.ticketPrice) {
                                        return (
                                            <Button className="align-center" onClick={handleCart} >
                                                Add to Cart
                                            </Button>
                                        )
                                    }
                                })}


                                </div>
                            </Container>
                            )
                        }
                })}
                <br/>
            </div> 
            <br/>

 
        </div>
    )
}

const mapStateToProps = (state) => {

    return {
      auth: state.firebase.auth,
      shows: state.firestore.ordered.shows, 
      users: state.firestore.ordered.users
    }
}

const mapDispatchToProps = dispatch => {
    return {
      createBackline: (backline) => dispatch(createBackline(backline)),
      updateBackline: (backline, oldBackline) => dispatch(updateBackline(backline, oldBackline)),
      updateTicket: (ticket) => dispatch(updateTicket(ticket)),
      updateVote: (voter, show) => dispatch(updateVote(voter, show)),
      addToCart: (item) => dispatch(addToCart(item))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
      {collection: 'shows'},
      {collection: 'users'}
    ])
  )(Tickets);
