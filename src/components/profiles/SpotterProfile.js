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
   const [active, setActive] = useState(true);
   const [spotters, setSpotters] = useState(null);

    const handleClick = (e) => {
        e.preventDefault();
        setOpen(open + 1);
        console.log(open);
    }

    const pushProfile = () => {
      navigate('/spotters');
    }

    const toggleStatus = (e) => {
      e.preventDefault();
      const songBtn = document.querySelector(".my-purchased-songs");
      const ticketBtn = document.querySelector(".my-purchased-tickets");
      if (e.target.id === "my-purchased-tickets") {
        ticketBtn.classList.add("btn-primary");
        ticketBtn.classList.remove("btn-warning");
        songBtn.classList.add("btn-warning");
        songBtn.classList.remove("btn-primary");
        setActive(false);
      } else if (e.target.id === "my-purchased-songs") {
        ticketBtn.classList.add("btn-warning");
        ticketBtn.classList.remove("btn-primary");
        songBtn.classList.add("btn-primary");
        songBtn.classList.remove("btn-warning");
        setActive(true);
      }
    }
  
    const pushShow = (e) => {
        navigate('/tickets/' + e.target.id);
      }

    const pushInvites = () => {
      navigate('/invites');
    }

    const pushSpotters = () => {
      navigate('/spotters');
    }
    
    const pushArtistSignup = (e) => {
      e.preventDefault();
      navigate('/artistSignup');
    }

    const pushArtistProfile = (e) => {
      e.preventDefault();
      navigate('/artistProfile');
    }

    useEffect(() => {
      if (spotters === true) {
        navigate('/artists');
      }
      if (spotters === false) {
        navigate('/spotters');
      }
    })

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
                      <br/>   
                      <div className="text-center">
                        {(() => {
                          if (active) {
                            return <h4>PURHCASED SONGS</h4>
                          } else {
                            return <h4>PURCHASED SHOWS</h4>
                          }
                        })()}       
                        <br/>
                        <div className="tab-border">
                          <button className="spotter btn btn-warning" onClick={pushSpotters}>spotters</button>
                          <button className="my-purchased-songs btn btn-primary" onClick={toggleStatus} id="my-purchased-songs">purchased songs</button>
                          <button className="my-purchased-tickets btn btn-warning" onClick={toggleStatus} id="my-purchased-tickets">purhcased tickets</button>
                          <button className="artist btn btn-warning" onClick={pushArtistProfile}>artist Profile</button>
                        </div>
                      </div>
                      <br/>
                      <br/>
                      {(() => {
                      if (user.id === auth.uid && user.purchasedSongs && active === true) {
                        return (
                          <Table  hover>
                            <thead >
                                <tr>
                                <th>Artist Name</th>
                                <th>Price</th>
                                <th>title</th>
                                </tr>
                            </thead>
                            {user.purchasedSongs.map((song) => {
                                return (
                                <tbody>
                                    <tr>
                                    <td>{song.artist}</td>
                                    <td>{song.price}</td>
                                    <td>{song.title}</td>
                                    </tr>
                                </tbody>
                                                        
                              )
                            })}
                          </Table>
                        ) 
                      } else if (user.id === auth.uid && user.purchasedTickets && active === false) {
                        return (
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
                        )  
                      }
                    })()}
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
    {  collection: 'shows' }
])
  )(SpotterProfile);