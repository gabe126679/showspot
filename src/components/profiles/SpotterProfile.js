import React, { useState, useEffect } from 'react'
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useNavigate, Link } from "react-router-dom";
import { Table, Dropdown } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { addSong } from '../../store/actions/authActions';

function SpotterProfile(props) {

    const { auth, users, shows} = props;

    const { register, handleSubmit } = useForm();

    let navigate = useNavigate();
    
   const [open, setOpen] = useState(0);
   const [artist, setArtist] = useState("");

    const handleClick = (e) => {
        e.preventDefault();
        setOpen(open + 1);
        console.log(open);
    }

    const pushShows = () => {
      navigate('/spotters');
    }
  
    const pushShow = (e) => {
        navigate('/tickets/' + e.target.id);
      }

    const pushInvites = () => {
      navigate('/invites');
    }
    
    const pushArtistSignup = (e) => {
      e.preventDefault();
      navigate('/artistSignup');
    }

    const pushArtistProfile = (e) => {
      e.preventDefault();
      navigate('/artistProfile');
    }

    // useEffect(() => {
    //     if (users) {
    //         users.map((user) => {
    //             if (user.songs) {
    //                 user.songs.map((newSong) => {
    //                     if (newSong.song === song.song) {
    //                         setArtist(user.firstName + user.lastName);
    //                     }
    //                 })
    //             }
    //         })
    //     }
    // })

    if (!auth.uid) return navigate('/artistSignup');

    if (users) {
      return (
          <div>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
          {users && users.map((user) => {
              if (user.id === auth.uid) {
                return (
                  <div>
                  <div className="profile-border">
                    <br/>
                        {users && users.map((user) => {
                            
                            if (user.id === auth.uid && user.isArtist === true) {
                                
                                return (
                                    <div>
                                        <button className="btn btn-primary" id={user.id} onClick={pushArtistProfile}>
                                            My Artist Profile
                                        </button>
                                        <button className="btn btn-warning float-end" onClick={pushShows}>
                                            Shows
                                        </button>
                                    </div>
                                )
                            } else if (user.id === auth.uid) {
                                return (
                                    <div>
                                        <button className="btn btn-primary" onClick={pushArtistSignup}>
                                            Become an Artist
                                        </button>
                                        <button className="btn btn-warning float-end" onClick={pushShows}>
                                            Shows
                                        </button>
                                    </div>

                                )
                            }
                        })}
                    
                    <br/>
                    <Table  hover>
                      <thead >
                        <tr>
                          <th>User Name</th>
                          <th>View Shows</th>
                          <th>View Songs</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{user.userName}</td>
                          <td><button className="btn btn-primary" onClick={handleClick}>view</button></td>
                          <td><button className="btn btn-primary" onClick={handleClick}>view</button></td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                  </div>
              ) 
              }
            })}

            {users && users.map((user) => {
              if (user.id === auth.uid && user.purchasedSongs) {

                return (
                <div>
                    <div className="profile-border">
                        <br/>
                        <div className="container border text-center bg-warning text-white">
                            <p>purchased songs</p>
                        </div>
                        <br/>
                        <br/>
                        <Table  hover>
                        <thead >
                            <tr>
                            <th>Artist Name</th>
                            <th>Price</th>
                            <th>title</th>
                            </tr>
                        </thead>
                        {user.purchasedSongs.map((song) => {
                            users.map((user) => {
                                if (user.songs) {
                                    user.songs.map((newSong) => {
                                        if (newSong.song === song.song && artist !== (user.firstName + " " + user.lastName)) {
                                            setArtist(user.firstName + " " + user.lastName);
                                        }
                                    })
                                }
                            })
                            return (
                            <tbody>
                                <tr>
                                <td>{artist}</td>
                                <td>{song.price}</td>
                                <td>{song.title}</td>
                                </tr>
                            </tbody>
                                                    
                                )
                        })}
                        </Table>
                        </div>

                    </div>
                ) 
                }
            })}
            {users && users.map((user) => {
              if (user.id === auth.uid && user.purchasedTickets) {

                return (
                <div>
                    <div className="profile-border">
                        <br/>
                        <div className="container border text-center bg-warning text-white">
                            <p>purchased shows</p>
                        </div>
                        <br/>
                        <br/>
                        <Table  hover>
                        <thead >
                            <tr>
                            <th>Artists</th>
                            <th>Venue</th>
                            <th>Status</th>
                            </tr>
                        </thead>
                        {shows && shows.map((ticket) => {
                            if (ticket.ticketBuyers && ticket.ticketBuyers.includes(auth.uid)) {
                                return (
                                    <tbody>
                                        <tr>
                                        <td>    
                                            <Dropdown >
                                                <Dropdown.Toggle className="dropdown-basic" variant="warning" id="dropdown-basic"
                                                >
                                                {ticket.artists[0].firstName} {ticket.artists[0].lastName}
                                                </Dropdown.Toggle>
                    
                                                <Dropdown.Menu>
                                                    {ticket.artists.map((artist) => {
                                                        return (
                                                        <div>
                                                        <Dropdown.Item href="#/action-1">                             
                                                            <Link to={"/artist/" + artist.id}>
                                                                {artist.firstName} {artist.lastName}
                                                            </Link>
                                                        </Dropdown.Item>
                                                        </div>
                                            
                                                            )
        
                                                        })}
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </td>
                                        <td>{ticket.venueName}</td>
                                        <td><button class="btn btn-primary" id={ticket.id} onClick={pushShow}>purchased</button></td>
                                        </tr>
                                    </tbody>
                                                            
                                )
                            }
                        })}
                        </Table>
                        </div>

                    </div>
                ) 
                }
            })}
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
      users: state.firestore.ordered.users,
      shows: state.firestore.ordered.shows
    }
}

const mapDispatchToProps = dispatch => {
  return {
    addSong: (song) => dispatch(addSong(song))
  }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
    {  collection: 'users' },
    {  collection: 'shows' },
])
  )(SpotterProfile);