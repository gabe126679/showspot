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
    const [active, setActive] = useState(true);
    const [count, setCount] = useState(0);
    const [showCount, setShowCount] = useState(0);

    const toggleStatus = (e) => {
        e.preventDefault();
        const artistBtn = document.querySelector(".my-artist-invites");
        const bandBtn = document.querySelector(".my-band-invites");
        const venueBtn = document.querySelector(".my-venue-invites");
        const artistInvites = document.querySelector(".artist-invites");
        const bandInvites = document.querySelector(".band-invites");
        const venueInvites = document.querySelector(".venue-invites");
        if (e.target.id === 'my-band-invites') {
          bandBtn.classList.add("btn-primary");
          bandBtn.classList.remove("btn-warning");
          artistBtn.classList.remove("btn-primary");
          artistBtn.classList.add("btn-warning");
          venueBtn.classList.remove("btn-primary");
          venueBtn.classList.add("btn-warning");
          artistInvites.classList.add("d-none");
          bandInvites.classList.remove("d-none");
          venueInvites.classList.add("d-none");
          setActive(false);
        } else if (e.target.id === 'my-artist-invites') {
          artistBtn.classList.add("btn-primary");
          artistBtn.classList.remove("btn-warning");
          bandBtn.classList.remove("btn-primary");
          bandBtn.classList.add("btn-warning");
          venueBtn.classList.remove("btn-primary");
          venueBtn.classList.add("btn-warning");
          bandInvites.classList.add("d-none");
          artistInvites.classList.remove("d-none");
          venueInvites.classList.add("d-none");
          setActive(true);
        } else if (e.target.id === "my-venue-invites") {
            venueBtn.classList.add("btn-primary");
            venueBtn.classList.remove("btn-warning");
            artistBtn.classList.remove("btn-primary");
            artistBtn.classList.add("btn-warning");
            bandBtn.classList.remove("btn-primary");
            bandBtn.classList.add("btn-warning");
            artistInvites.classList.add("d-none");
            bandInvites.classList.add("d-none");
            venueInvites.classList.remove("d-none");
            setActive("venue");
        }
      }

    const handleView = (e) => {
        e.preventDefault();
        navigate('/bandInvites/' + e.target.id);
      }

    const pushArtistProfile = () => {
        navigate('/artistProfile');
    }

    const pushBand = (e) => {
        e.preventDefault();
        navigate('/band/' + e.target.id);
    }

    const pushVenueProfile = () => {
        navigate('/venueProfile');
    }

    const pushVenueSignup = () => {
    navigate('/venueSignup');
    }

    const pushPrice = (e) => {
        navigate('/ticketPrice/' + e.target.id);
      }
    const pushBands = (e) => {
        navigate('/bands');
    }

    const pushInvites = (e) => {
        navigate('/invites');
    }

    if (!auth.uid) return navigate('/artistSignup');

    if (users) {
      return (
      <div>

        <div className="profile-border">
 
            <div className="text-center">
                {(() => {
                if (active === true) {
                    return <h4>ARTIST INVITES</h4>
                } else if (active === false) {
                    return <h4>BAND INVITES</h4>
                } else if (active === "venue") {
                    return <h4>VENUE INVITES</h4>
                }
                })()}       
                <br/>
                <div className="tab-border">
                    <button className="spotter btn btn-warning" onClick={pushArtistProfile}>artist profile</button>
                    <button className="my-artist-invites btn btn-primary" onClick={toggleStatus} id="my-artist-invites">artist Invites</button>
                    <button className="my-band-invites btn btn-warning" onClick={toggleStatus} id="my-band-invites">band Invites</button>
                    <button className="my-venue-invites btn btn-warning" onClick={toggleStatus} id="my-venue-invites">venue Invites</button>
                </div>
            </div>
            <br/>
            <Table className="artist-invites text-center" hover>
                <thead >
                <tr>
                    
                    <th>Show Details</th>
                    <th>Accept</th>
                    <th>Reject</th>
                </tr>
                </thead>
                {shows && shows.map((show) => {
                    return (
                        <tbody>
                            {show.artists.map((artist) => {
                                
                                if (artist.id === auth.uid && artist.accepted === true) {

                                    return (
                                        <tr>
                                            
                                            <td className="text-center" id={show.id}><button className="btn btn-primary" id={show.id} >view</button></td>
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
                                            
                                            <td className="text-center" id={show.id}><button className="btn btn-primary" id={show.id} >view</button></td>
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
                                            
                                            
                                        </tr>
                                    )
                                } else if (artist.id === auth.uid) {
                                    return (
                                        <tr>
                                            
                                            <td className="text-center" id={show.id}><button className="btn btn-primary" id={show.id} >view</button></td>
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
                                            
                                        </tr>
                                    ) 
                                } 
                            })}

                        </tbody>
                    )
                })}
            </Table>
            <Table className="venue-invites d-none text-center" hover>
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
                                <td className="text-center" id={show.id}><button className="btn btn-primary" id={show.id} >view</button></td>
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
                                <td className="text-center" id={show.id}><button className="btn btn-primary" id={show.id} >view</button></td>
                                <td id={show.id}><button className="btn btn-warning" id={show.id} onClick={pushPrice}>Accept</button></td>
                                <td id={show.id}>show Rejecetd</td>
                                
                                
                            </tr>
                        )
                    } else if (show.venueId === auth.uid) {
                        return (
                            <tr>
                                <td className="text-center" id={show.id}><button className="btn btn-primary" id={show.id} >view</button></td>
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
            <Table className="band-invites d-none text-center" hover>
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
                                                
                                                <td className ="text-center" id={band.id}><button className="btn btn-primary" id={band.id} onClick={handleView}>{band.bandName}</button></td>
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
                                                
                                                <td id={band.id}><button className="btn btn-primary" id={band.id} onClick={handleView}>{band.bandName}</button></td>
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
                                                
                                                <td id={band.id}><button className="btn btn-primary" id={band.id} onClick={handleView}>{band.bandName}</button></td>
                                                <td id={member}><button className="btn btn-warning" id={member} onClick={() => {
                                                    const newArray = [];
                                                    props.updateMember(band, member, true)
                                                    .then(() => {
                                                        
                                                        band.members.map((secondMember) => {
                                                            
                                                            if (secondMember.id !== auth.uid && (secondMember.accepted === false || !secondMember.accepted)) {
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
        <br/>
        <br/>
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