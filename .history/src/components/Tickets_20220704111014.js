import React, { useState, useEffect } from 'react';
import { Container, Button, Row, Dropdown, Table } from 'react-bootstrap';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from "redux";
import { updateTicket } from '../store/actions/showActions';
import { addToCart } from '../store/actions/authActions'
import { useNavigate, useParams, Link } from "react-router-dom";
import { updateBackline, updateVote } from '../store/actions/showActions';

function Tickets(props) {

    const { auth, shows, users } = props;

    const { id } = useParams();

    const [checkedBacklines, setCheckedBacklines] = useState([])

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
                    props.updateBackline(backlineObject);
                }
                })
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
        if (shows) {
            shows.map((show) => {
              show.backlines.map((backline) => {
                if (backline.artist === auth.uid && !checkedBacklines.includes(auth.uid)) {
                  setCheckedBacklines([...checkedBacklines, auth.uid]);
                }
              })
            })
          }
      });

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
                                        <td className="backlines">
                                            {backline.firstName + " " + backline.lastName}
                                            {/* <div>

                                            <Dropdown >
                                                <Dropdown.Toggle className="dropdown-basic" variant="warning" id="dropdown-basic"
                                                >
                                                {show.backlines[0].firstName + " " + show.backlines[0].lastName}
                                                view
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu  >

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

                                                    

                                                </Dropdown.Menu>
                                            </Dropdown>

                                            </div> */}
                                            {(() => {

                                            if (!checkedBacklines.includes(auth.uid)) {
                                                return (
                                                <button className={"btn btn-primary"} id={show.id} onClick={handleClick}>+</button>      
                                                )
                                            }
                                            })()}
                                            
                                        </td>
                                        <td>
                                        <div className="backlines">
                                            <div className="col-4">{show.voteCount}</div>
                                            <button className="btn btn-primary" onClick={() => {   
                                                props.updateVote(auth.uid, show.id);  
                                            }} id={show.id}>^</button>
                                        </div>
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
      shows: state.firestore.ordered.shows, 
      users: state.firestore.ordered.users
    }
}

const mapDispatchToProps = dispatch => {
    return {
      updateBackline: (backline) => dispatch(updateBackline(backline)),
      updateTicket: (ticket) => dispatch(updateTicket(ticket)),
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
