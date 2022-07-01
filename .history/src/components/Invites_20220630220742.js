import React, { useState } from 'react'
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useNavigate } from "react-router-dom";
import { Table, Dropdown } from "react-bootstrap";
import { updateArtist, updateMember, updateVenue, activateShow, activateBand } from '../store/actions/showActions';

function Invites(props) {

    const { auth, users, shows, bands } = props;

    let navigate = useNavigate();

    const acceptedCount = [];
    const memberCount = [];

    const ViewShow = (show, artist, decision) => {
        props.updateArtist(show, artist, decision);
                           
        shows.map((secondShow) => {
            if (secondShow.id === show.id) {
                show.artists.map((secondArtist) => {
                    if (secondArtist.accepted === true && !acceptedCount.includes(secondArtist.id)) {
                        acceptedCount.push(secondArtist.id);                   
                    }
                })
                if (acceptedCount.length === show.artists.length && show.venueDecision === true) {
                    props.activateShow(show, true);
                } 
            }
        })   
    }
    
    const BandDecision = (band, artist, decision) => {
        // props.updateMember(band, artist, decision);
        
        // bands.map((secondBand) => {

        //     if (secondBand.id === band.id) {

        //         band.members.map((secondMembers) => {
                     
        //             if (secondMembers.accepted === true && !memberCount.includes(secondMembers.id)) {
        //                 memberCount.push(secondMembers.id);                   
        //             }
        //             if (memberCount.length === band.artists.length) {
        //                 props.activateShow(band, true);
        //             } 
        //         })
        //     }
        // });

        if (memberCount.length - 1 === band.members.length) {
            props.activateBand(band, true);
        } else if (memberCount.length < band.members.length) {
            props.activateBand(band, false)
        }
        console.log(memberCount);
    }

    const ViewBand = () => {
        navigate('/show/');
      }

    const pushProfile = () => {
      navigate('/artistProfile');
    }

    const pushPrice = (e) => {
        navigate('/ticketPrice/' + e.target.id);
      }

    if (!auth.uid) return navigate('/artistSignup');

    if (users) {
      return (
      <div>
      <br/>
      <br/>
      <br/>
      <br/>
        <button className="btn btn-primary float-start m-2 p-3" onClick={pushProfile}>
            My Profile
        </button>
        <div className="profile-border">
            <br/>
            <div>

                <div className="text-center border bg-light">
                    Artist Invites
                </div>
            </div>            
            <br/>
            <br/>
            <Table hover>
                <thead >
                <tr>
                    <th>Show Details</th>
                    <th>Accept</th>
                    <th>Reject</th>
                    <th>Spot</th>
                </tr>
                </thead>
                {shows && shows.map((show) => {
                    return (
                        <tbody>
                            {show.artists.map((artist) => {
                                
                                if (artist.id === auth.uid && artist.accepted === true) {

                                    return (
                                        <tr>
                                            <td id={show.id}><button className="btn btn-warning" id={show.id} onClick={ViewShow(show, artist)}>{show.id}</button></td>
                                            <td id={show.id}>show Accepted</td>
                                            <td ><button className="btn btn-warning" id={show.id} onClick={() => {
                                                ViewShow(show, artist, false)
                                            }}>Reject</button></td>
                                            
                                            
                                        </tr>
                                    )
                                } else if (artist.id === auth.uid && artist.accepted === false) {
                                    return (
                                        <tr>
                                            <td id={show.id}><button className="btn btn-warning" id={show.id} onClick={ViewShow(show, artist)}>{show.id}</button></td>
                                            <td id={show.id}><button className="btn btn-warning" id={show.id} onClick={() => {
                                                ViewShow(show, artist, true)
                                            }}>Accept</button></td>
                                            <td id={show.id}>show Rejecetd</td>
                                            <td>{artist.number}</td>
                                            
                                        </tr>
                                    )
                                } else if (artist.id === auth.uid) {
                                    return (
                                        <tr>
                                            <td id={show.id}><button className="btn btn-warning" id={show.id} onClick={ViewShow(show, artist)}>{show.id}</button></td>
                                            <td id={artist}><button className="btn btn-warning" id={artist} onClick={() => {
                                                ViewShow(show, artist, true)
                                            }}>Accept</button></td>
                                            <td><button className="btn btn-warning" id={show.id} onClick={() => {
                                                ViewShow(show, artist, false)
                                            }}>Reject</button></td>
                                            <td className="text-center">{artist.number}</td>
                                        </tr>
                                    ) 
                                } 
                            })}

                        </tbody>
                    )
                })}
            </Table>
        </div>
        <div className="profile-border">
            <br/>
            <div>
                <div className="text-center border bg-light">
                    Venue Invites
                </div>
            </div>            
            <br/>
            <br/>
            <Table hover>
                <thead >
                <tr>
                    <th>Show Details</th>
                    <th>Accept</th>
                    <th>Reject</th>
                    
                </tr>
                </thead>
                <tbody>
                {shows && shows.map((show) => {        
                    if (show.venueId === auth.uid && show.venueDecision === true) {
                        return (
                            <tr>
                                <td id={show.id}><button className="btn btn-warning" id={show.id} onClick={ViewShow}>{show.id}</button></td>
                                <td id={show.id}>show Accepted</td>
                                <td ><button className="btn btn-warning" id={show.id} onClick={() => {
                                    props.updateVenue(show, false);
                                    props.activateShow(show, false);
                                }}>Reject</button></td>
                                
                                
                            </tr>
                        )
                    } else if (show.venueId === auth.uid && show.venueDecision === false) {
                        return (
                            <tr>
                                <td id={show.id}><button className="btn btn-warning" id={show.id} onClick={ViewShow}>{show.id}</button></td>
                                <td id={show.id}><button className="btn btn-warning" id={show.id} onClick={pushPrice}>Accept</button></td>
                                <td id={show.id}>show Rejecetd</td>
                                
                                
                            </tr>
                        )
                    } else if (show.venueId === auth.uid) {
                        return (
                            <tr>
                                <td id={show.id}><button className="btn btn-warning" id={show.id} onClick={ViewShow}>{show.id}</button></td>
                                <td id={show.id}>
                                
                                <Dropdown >
                                  <Dropdown.Toggle className="dropdown-basic" variant="warning" id="dropdown-basic"
                                  >
                                      Accept
                                  </Dropdown.Toggle>
                                  <Dropdown.Menu>
                                        <Dropdown.Item href="#/action-1">  
                                            <label for="price"></label>
                                            <input type="text" id="price" placeholder="$" />
                                            <button className="btn btn-warning" id={show.id} onClick={pushPrice}>Accept</button>
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                
                                </td>
                                <td><button className="btn btn-warning" id={show.id} onClick={() => {
                                    props.updateVenue(show, false);
                                    props.activateShow(show, false);
                                }}>Reject</button></td>
                                
                            </tr>
                        ) 
                    } 
                })}
                </tbody>
            </Table>
        </div>
        <div className="profile-border">
            <br/>
            <div className="text-center border bg-light">
                Band Invites
            </div>
            <br/>
            <Table hover>
                <thead >
                    <tr>
                        <th>Band Details</th>
                        <th>Accept</th>
                        <th>Reject</th>
                    </tr>
                </thead>
                    
                {bands && bands.map((band) => {
                    if ((band.ids.includes(auth.uid))) {
                        return (
                            <tbody>
                                {band.members.map((member) => {
                                    if (member.id === auth.uid && member.accepted === true) {
                                        return (
                                            <tr>
                                                <td id={band.id}><button className="btn btn-warning" id={band.id} onClick={ViewBand}>{band.id}</button></td>
                                                <td id={band.id}>band Accepted</td>
                                                <td ><button className="btn btn-warning" id={band.id} onClick={() => {
                                                    props.updateMember(band, member, false);
                                                    band.members.map((secondMember) => {
                                                        if (secondMember.accepted === true && !memberCount.includes(secondMember.id)) {
                                                            memberCount.push(secondMember.id);                   
                                                        }
                                                    })
                                                    BandDecision(band, member, false);
                                                }}>Reject</button></td>
                                                
                                            </tr>
                                        )
                                    } else if (member.id === auth.uid && member.accepted === false) {
                                        return (
                                            <tr>
                                                <td id={band.id}><button className="btn btn-warning" id={band.id} onClick={ViewBand}>{band.id}</button></td>
                                                <td id={band.id}><button className="btn btn-warning" id={band.id} onClick={() => {
                                                    props.updateMember(band, member, true);
                                                    band.members.map((secondMember) => {
                                                        if (secondMember.accepted === true && !memberCount.includes(secondMember.id)) {
                                                            memberCount.push(secondMember.id);                   
                                                        }
                                                    })
                                                    BandDecision(band, member, true);
                                                }}>Accept</button></td>
                                                <td id={band.id}>band Rejecetd</td>
                                                
                                            </tr>
                                        )
                                    } else if (member.id === auth.uid) {
                                        return (
                                            <tr>
                                                <td id={band.id}><button className="btn btn-warning" id={band.id} onClick={ViewBand}>{band.id}</button></td>
                                                <td id={member}><button className="btn btn-warning" id={member} onClick={() => {
                                                    BandDecision(band, member, true);
                                                }}>Accept</button></td>
                                                <td><button className="btn btn-warning" id={band.id} onClick={() => {
                                                    BandDecision(band, member, false);
                                                }}>Reject</button></td>
                                            </tr>
                                        ) 
                                    } 
                                })}

                            </tbody>
                        ) 
                    }
                })}
            </Table>
        </div>
        </div>
      )
    }

}

const mapStateToProps = (state) => {
    return {
      auth: state.firebase.auth,
      users: state.firestore.ordered.users,
      shows: state.firestore.ordered.shows,
      bands: state.firestore.ordered.bands
    }
}

const mapDispatchToProps = dispatch => {
    return {
      updateArtist: (show, artist, decision) => dispatch(updateArtist(show, artist, decision)),
      updateMember: (band, member, decision) => dispatch(updateMember(band, member, decision)),
      updateVenue: (show, decision) => dispatch(updateVenue(show, decision)),
      activateShow: (show, decision) => dispatch(activateShow(show, decision)),
      activateBand: (band, decision) => dispatch(activateBand(band, decision))
    }
}


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'users' },
        { collection: 'shows' },
        { collection: 'bands'}
    ])
  )(Invites);