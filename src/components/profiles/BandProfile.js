import React, { useState, useEffect } from 'react'
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useNavigate, Link  } from "react-router-dom";
import { Table, Dropdown } from "react-bootstrap";

function BandProfile(props) {

    const { auth, bands } = props;

    const [active, setActive] = useState(true);
    const [song, setSong] = useState(true);
    const [songs, setSongs] = useState([]);

    let navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        navigate("/band/" + e.target.id);
    }

    const toggleStatus = (e) => {
        e.preventDefault();
        const activeButton = document.querySelector(".active");
        const pendingButton = document.querySelector(".pending");
        if (active === true) {
          pendingButton.classList.add("btn-primary");
          pendingButton.classList.remove("btn-warning");
          activeButton.classList.add("btn-warning");
          activeButton.classList.remove("btn-primary");
          setActive(false);
        } else {
          pendingButton.classList.add("btn-warning");
          pendingButton.classList.remove("btn-primary");
          activeButton.classList.add("btn-primary");
          activeButton.classList.remove("btn-warning");
          setActive(true);
        }
      }
    
    const toggleSong = (e) => {
        e.preventDefault();
        e.preventDefault();
        const activeButton = document.querySelector(".active-song");
        const pendingButton = document.querySelector(".pending-song");
        if (song === true) {
          pendingButton.classList.add("btn-primary");
          pendingButton.classList.remove("btn-warning");
          activeButton.classList.add("btn-warning");
          activeButton.classList.remove("btn-primary");
          setSong(false);
        } else {
          pendingButton.classList.add("btn-warning");
          pendingButton.classList.remove("btn-primary");
          activeButton.classList.add("btn-primary");
          activeButton.classList.remove("btn-warning");
          setSong(true);
        }
    }

    const pushBands = () => {
        navigate('/bands');
    }

    const pushFormBand = () => {
        navigate('/formBand');
    }
  
    useEffect(() => {
        if (bands) {
            bands.map((band) => {
                if (band.ids.includes(auth.uid) && band.songs) {
                    band.songs.map((song) => {
                        if (!songs.includes(song)) {
                            songs.push(song)
                        }
                        
                    })
                }
            })
        }
        console.log(songs);
    })

    if (!auth.uid) return navigate('/artistSignup');

    if (bands) {
      return (
          <div>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
          <div className="profile-border">
            <br/>
                <div>
                    <button className="btn btn-primary" onClick={pushBands}>
                        Bands
                    </button>
                    <button className="btn btn-warning float-end" onClick={pushFormBand}>
                        Form a Band
                    </button>
                </div>
                <br/>
                <div className="text-center">
                    {(() => {
                        if (active) {
                        return <h4>MY ACTIVE BANDS</h4>
                        } else {
                        return <h4>MY PENDING BANDS</h4>
                        }
                    })()}       
                    <br/>
                    <button className="active btn btn-primary" onClick={toggleStatus}>active</button>
                    <button className="pending btn btn-warning" onClick={toggleStatus}>pending</button>
                    
                </div>
            <br/>
            <Table  hover>
                <thead >
                <tr>
                    <th >Band</th>
                    <th>Members</th>
                    <th>Creator</th>
                </tr>
                </thead>
            {bands && bands.map((band) => {
              if (band.ids.includes(auth.uid) && band.activated === true && active === true) {
                
                return (
                    <tbody>
                    <tr>
                        <td onClick={handleClick} id={band.id}>{band.bandName}</td>
                        <td>                      
                        <Dropdown >
                            <Dropdown.Toggle className="dropdown-basic" variant="warning" id="dropdown-basic"
                            >
                            {band.members[0].firstName} {band.members[0].lastName}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                            {band.members.map((artist) => {
                                return (
                                    <Dropdown.Item href="#/action-1">                           
                                        <Link to={"/artist/" + artist.id}>
                                            {artist.firstName} {artist.lastName}
                                        </Link>
                                    </Dropdown.Item>
                                )
                            })}
                            </Dropdown.Menu>
                        </Dropdown>
                        </td>
                        <td>{band.creatorUserName}</td>
                    </tr>
                    </tbody>
                )
              } else if (band.ids.includes(auth.uid) && !band.activated  && active === false) {                
                return (
                    <tbody>
                    <tr>
                        <td onClick={handleClick} id={band.id}>{band.bandName}</td>
                        <td>                      
                        <Dropdown >
                            <Dropdown.Toggle className="dropdown-basic" variant="warning" id="dropdown-basic"
                            >
                            {band.members[0].firstName} {band.members[0].lastName}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                            {band.members.map((artist) => {
                                return (
                                    <Dropdown.Item href="#/action-1">                           
                                        <Link to={"/artist/" + artist.id}>
                                            {artist.firstName} {artist.lastName}
                                        </Link>
                                    </Dropdown.Item>
                                )
                            })}
                            </Dropdown.Menu>
                        </Dropdown>
                        </td>
                        <td>{band.creatorUserName}</td>
                    </tr>
                    </tbody>
                )
              }
            })}
            </Table>
            </div>
            <br/>
            <div className="profile-border">
            <br/>
                <div className="text-center">
                    {(() => {
                        if (song) {
                        return <h4>MY ACTIVE SONGS</h4>
                        } else {
                        return <h4>MY PENDING SONGS</h4>
                        }
                    })()}       
                    <br/>
                    <button className="active-song btn btn-primary" onClick={toggleSong}>active</button>
                    <button className="pending-song btn btn-warning" onClick={toggleSong}>pending</button>
                    
                </div>
            <br/>
           
            
            <Table  hover>
                <thead >
                <tr>
                    <th >Song</th>
                    <th>Vote Count</th>
                    <th >Vote</th>
                    
                </tr>
                </thead>
            {songs && songs.map((track) => {
              if (track.activated === true && song === true) {
                
                return (
                    <tbody>
                    <tr>
                        <td onClick={handleClick} id={track.id}>{track.title}</td>
                        <td>                      
                        {track.voters.length}
                        </td>
                        {
                            track.voters.map((voter) => {
                                if (voter === auth.uid) {
                                    return <td>Voted</td>
                                } else {
                                    return <td>vote</td>
                                }
                            }) 
                        }
                    </tr>
                    </tbody>
                )
              } else if (!track.activated  && song === false) {                
                return (
                    <tbody>
                    <tr>
                        <td onClick={handleClick}>{track.title}</td>
                        <td>                      
                        {track.voters.length}
                        </td>
                        {
                            track.voters.map((voter) => {
                                if (voter === auth.uid) {
                                    return <td>Voted</td>
                                } else {
                                    return <td>vote</td>
                                }
                            }) 
                        }
                    </tr>
                    </tbody>
                )
              }
            })}
            </Table>          
            </div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
          </div>
      )
    }

}

const mapStateToProps = (state) => {
    return {
      auth: state.firebase.auth,
      bands: state.firestore.ordered.bands
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'bands'}
    ])
  )(BandProfile);