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

    const [acceptedCount, setAcceptedCount] = useState([])
  
    const [count, setCount] = useState(0);
    const [showCount, setShowCount] = useState(0);



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
                                            <td id={show.id}><button className="btn btn-warning" id={show.id} >{show.id}</button></td>
                                            <td id={show.id}>show Accepted</td>
                                            <td ><button className="btn btn-warning" id={show.id} onClick={() => {
                                                    props.updateArtist(show, artist, false).then(() => {
                                                        setShowCount(showCount + 1);
                                                        show.artists.map((secondArtist) => {
                                                            if (secondArtist.id !== auth.uid && secondArtist.accepted === false) {
                                                                setShowCount(showCount + 1); 
                                                            } 
                                                        })
                                                        props.activateShow(show, false)
                                                        setShowCount(0);
                                                    })

                                                }}>Reject</button></td>
                                            
                                            
                                        </tr>
                                    )
                                } else if (artist.id === auth.uid && artist.accepted === false) {
                                    return (
                                        <tr>
                                            <td id={show.id}><button className="btn btn-warning" id={show.id} >{show.id}</button></td>
                                            <td id={show.id}><button className="btn btn-warning" id={show.id} onClick={() => {
                                                    const newArray = [];
                                                    props.updateArtist(show, artist, true)
                                                    .then(() => {
                                                        show.artists.map((secondArtist) => {

                                                            if (secondArtist.id !== auth.uid && (secondArtist.accepted === false || !secondArtist.accepted)) {
                                                                newArray.push(secondArtist.id);
                                                                                
                                                            }
                                                            
                                                        })
                                                        if (newArray.length === 0) {
                                                            props.activateShow(show, true);
                                                            
                                                            
                                                        } else if (newArray.length > 0) {
                                                            props.activateShow(show, false)
                                                           
                                                        }
                                                    });
                                                }}>Accept</button></td>
                                            <td id={show.id}>show Rejecetd</td>
                                            <td>{artist.number}</td>
                                            
                                        </tr>
                                    )
                                } else if (artist.id === auth.uid) {
                                    return (
                                        <tr>
                                            <td id={show.id}><button className="btn btn-warning" id={show.id} >{show.id}</button></td>
                                            <td id={artist}><button className="btn btn-warning" id={artist} onClick={() => {
                                                    const newArray = [];
                                                    props.updateArtist(show, artist, true)
                                                    .then(() => {
                                                        show.artists.map((secondArtist) => {

                                                            if (secondArtist.id !== auth.uid && (secondArtist.accepted === false || !secondArtist.accepted)) {
                                                                newArray.push(secondArtist.id);
                                                                                
                                                            }
                                                            
                                                        })
                                                        if (newArray.length === 0) {
                                                            props.activateShow(show, true);
                                                            
                                                            
                                                        } else if (newArray.length > 0) {
                                                            props.activateShow(show, false)
                                                           
                                                        }
                                                    });
                                                }}>Accept</button></td>
                                            <td><button className="btn btn-warning" id={show.id} onClick={() => {
                                                    props.updateArtist(show, artist, false).then(() => {
                                                        setShowCount(showCount + 1);
                                                        show.artists.map((secondArtist) => {
                                                            if (secondArtist.id !== auth.uid && secondArtist.accepted === false) {
                                                                setShowCount(showCount + 1); 
                                                            } 
                                                        })
                                                        props.activateShow(show, false)
                                                        setShowCount(0);
                                                    })

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
                                <td id={show.id}><button className="btn btn-warning" id={show.id} >{show.id}</button></td>
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
                                <td id={show.id}><button className="btn btn-warning" id={show.id} >{show.id}</button></td>
                                <td id={show.id}><button className="btn btn-warning" id={show.id} onClick={pushPrice}>Accept</button></td>
                                <td id={show.id}>show Rejecetd</td>
                                
                                
                            </tr>
                        )
                    } else if (show.venueId === auth.uid) {
                        return (
                            <tr>
                                <td id={show.id}><button className="btn btn-warning" id={show.id} >{show.id}</button></td>
                                <td id={show.id}><button className="btn btn-warning" id={show.id} onClick={pushPrice}>Accept</button></td>
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
                                                <td id={band.id}><button className="btn btn-warning" id={band.id} >{band.id}</button></td>
                                                <td id={band.id}>band Accepted</td>
                                                <td ><button className="btn btn-warning" id={band.id} onClick={() => {
                                                    props.updateMember(band, member, false).then(() => {
                                                        setCount(count + 1);
                                                        band.members.map((secondMember) => {
                                                            if (secondMember.id !== auth.uid && secondMember.accepted === false) {
                                                                setCount(count + 1); 
                                                            } 
                                                        })
                                                        props.activateBand(band, false)
                                                        setCount(0);
                                                    })

                                                }}>Reject</button></td>
                                                
                                            </tr>
                                        )
                                    } else if (member.id === auth.uid && member.accepted === false) {
                                        return (
                                            <tr>
                                                <td id={band.id}><button className="btn btn-warning" id={band.id} >{band.id}</button></td>
                                                <td id={band.id}><button className="btn btn-warning" id={band.id} onClick={() => {
                                                    const newArray = [];
                                                    props.updateMember(band, member, true)
                                                    .then(() => {
                                                        band.members.map((secondMember) => {

                                                            if (secondMember.id !== auth.uid && (secondMember.accepted === false || !secondMember.accepted)) {
                                                                newArray.push(secondMember.id);
                                                                                
                                                            }
                                                            
                                                        })
                                                        if (newArray.length === 0) {
                                                            props.activateBand(band, true);
                                                            
                                                            
                                                        } else if (newArray.length > 0) {
                                                            props.activateBand(band, false)
                                                           
                                                        }
                                                    });
                                                }}>Accept</button></td>
                                                <td id={band.id}>band Rejecetd</td>
                                                
                                            </tr>
                                        )
                                    } else if (member.id === auth.uid) {
                                        return (
                                            <tr>
                                                <td id={band.id}><button className="btn btn-warning" id={band.id} >{band.id}</button></td>
                                                <td id={member}><button className="btn btn-warning" id={member} onClick={() => {
                                                    const newArray = [];
                                                    props.updateMember(band, member, true)
                                                    .then(() => {
                                                        
                                                        band.members.map((secondMember) => {
                                                            
                                                            if (secondMember.id !== auth.uid && secondMember.accepted === false) {
                                                                console.log(secondMember.id);
                                                                newArray.push(secondMember.id);
                                                                                
                                                            }
                                                            
                                                        })
                                                        if (newArray.length === 0) {
                                                            props.activateBand(band, true);
                                                            
                                                            
                                                        } else if (newArray.length > 0) {
                                                            props.activateBand(band, false)
                                                           
                                                        }
                                                    });
                                                }}>Accept</button></td>
                                                <td><button className="btn btn-warning" id={band.id} onClick={() => {
                                                    props.updateMember(band, member, false).then(() => {
                                                        setCount(count + 1);
                                                        band.members.map((secondMember) => {
                                                            if (secondMember.id !== auth.uid && secondMember.accepted === false) {
                                                                setCount(count + 1); 
                                                            } 
                                                        })
                                                        props.activateBand(band, false)
                                                        setCount(0);
                                                    })

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