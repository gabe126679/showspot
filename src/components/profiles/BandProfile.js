import React, { useState, useEffect } from 'react'
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useNavigate, Link, useParams  } from "react-router-dom";
import { Table, Dropdown } from "react-bootstrap";

function BandProfile(props) {

    const { auth, bands, shows } = props;

    const { id } = useParams();

    const [active, setActive] = useState(true);
    const [song, setSong] = useState(true);
    const [songs, setSongs] = useState([]);
    const [artistShows, setArtistShows] = useState([]);
    const [currentName, setCurrentName] = useState("");

    let navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        navigate("/band/" + e.target.id);
    }

    const toggleStatus = (e) => {
        e.preventDefault();
        const showBtn = document.querySelector(".my-shows");
        const songBtn = document.querySelector(".my-songs");
        const bandBtn = document.querySelector(".my-bands");
        const shows = document.querySelector(".band-shows");
        const songs = document.querySelector(".band-songs");
        if (e.target.id === "my-songs") {
          songBtn.classList.add("btn-primary");
          songBtn.classList.remove("btn-warning");
          showBtn.classList.add("btn-warning");
          showBtn.classList.remove("btn-primary");
          shows.classList.add("d-none");
          songs.classList.remove("d-none");
          setActive(false);
        } else if (e.target.id === "my-shows") {
          songBtn.classList.add("btn-warning");
          songBtn.classList.remove("btn-primary");
          showBtn.classList.add("btn-primary");
          showBtn.classList.remove("btn-warning");
          songs.classList.add("d-none");
          shows.classList.remove("d-none");
          setActive(true);
        } else if (e.target.id === "my-bands") {
          songBtn.classList.add("btn-warning");
          songBtn.classList.remove("btn-primary");
          showBtn.classList.add("btn-warning");
          showBtn.classList.remove("btn-primary");
          songs.classList.add("d-none");
          shows.classList.add("d-none");
          setActive("bands");
        }
      }

    const pushBands = (e) => {
        e.preventDefault();
        navigate('/artists');
    }

    const pushInvites = () => {
        navigate('/invites');
    }

    const pushFormBand = () => {
        navigate('/formBand');
    }
  
    useEffect(() => {
        if (bands) {
            bands.map((band) => {
                if (band.id === id) {
                    setCurrentName(band.bandName);
                    console.log(currentName);
                }
                if (shows) {
                    shows.map((show) => {
                        show.artists.map((artist) => {
                            
                            if (artist.bandName && artist.bandName === currentName && !artistShows.includes(show)) {
                                
                                artistShows.push(show);
                            }
                        })
                    })
                }
                if (band.ids.includes(auth.uid) && band.songs) {
                    
                    band.songs.map((song) => {
                        if (!songs.includes(song)) {
                            songs.push(song)
                        }
                        
                    })
                }
            })
        }
        console.log(currentName);
    })

    if (!auth.uid) return navigate('/artistSignup');

    if (bands && artistShows) {
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
            <br/>   
            <div className="text-center">
                {(() => {
                if (active === true) {
                    return <h4>MY SHOWS</h4>
                } else if (active === false) {
                    return <h4>MY SONGS</h4>
                } else if (active === "bands") {
                    return <h4>MY BANDS</h4>
                }
                })()}       
                <br/>
                <div  className="tab-border">
                <button className="my-bands btn btn-warning" onClick={pushBands} id="my-bands">all bands</button>
                <button className="my-shows btn btn-primary" onClick={toggleStatus} id="my-shows">my shows</button>
                <button className="my-songs btn btn-warning" onClick={toggleStatus} id="my-songs">my songs</button>
                <button className="artist btn btn-warning" onClick={pushInvites}>Invites</button>
                </div>
            </div>
            <br/>
            <Table className="band-shows" hover>
                <thead >
                    <tr>
                        <th >Band</th>
                        <th>Members</th>
                        <th>Creator</th>
                    </tr>
                </thead>
                    {artistShows && artistShows.map((show) => {
                        
                            
                        return (
                            <tbody>
                            <tr>
                                <td onClick={handleClick} id={show.id}>view</td>
                                <td>                      
                                <Dropdown >
                                    <Dropdown.Toggle className="dropdown-basic" variant="warning" id="dropdown-basic"
                                    >
                                    {(() => {
                                        if (!show.artists[0].bandName) {
                                            return <div>{show.artists[0].firstName} {show.artists[0].lastName}</div>
                                        } else {
                                            return <div>{show.artists[0].bandName}</div>
                                        }
                                    })()}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                    {show.artists.map((artist) => {
                                        return (
                                            <Dropdown.Item href="#/action-1">                           
                                                <Link to={"/artist/" + artist.id}>
                                                {(() => {
                                                    if (!artist.bandName) {
                                                        return <div>{artist.firstName} {artist.lastName}</div>
                                                    } else {
                                                        return <div>{artist.bandName}</div>
                                                    }
                                                })()}
                                                </Link>
                                            </Dropdown.Item>
                                        )
                                    })}
                                    </Dropdown.Menu>
                                </Dropdown>
                                </td>
                                {(() => {
                                    if (show.activated === true) {
                                        return <td>active</td>
                                    } else {
                                        return <td>pending</td>
                                    }
                                })()}
                                
                            </tr>
                            </tbody>
                        )
                        
                    })}
            </Table>
            <Table className="band-songs d-none" hover>
                <thead >
                <tr>
                    <th >Song</th>
                    <th>Vote Count</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                    {songs && songs.map((track) => {
                        return (
                            <tr>
                                <td onClick={handleClick} id={track.id}>{track.title}</td>
                                <td>                      
                               
                                </td>
                                {(() => {
                                    
                                    if (track.activated === true) {
                                        return <td>active</td>
                                    } else {
                                        return <td>pending</td>
                                    }
                                        
                                })()}
                            </tr>
                        )       
                    })}
                </tbody>
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
      bands: state.firestore.ordered.bands,
      shows: state.firestore.ordered.shows
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'bands' },
      { collection: 'shows' }
    ])
  )(BandProfile);