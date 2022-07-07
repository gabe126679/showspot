import React, { useState } from 'react'
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { addSong } from '../../store/actions/authActions';

function SpotterProfile(props) {

    const { auth, users } = props;

    const { register, handleSubmit } = useForm();

    let navigate = useNavigate();
    
   const [open, setOpen] = useState(0);

    const handleClick = (e) => {
        e.preventDefault();
        setOpen(open + 1);
        console.log(open);
    }

    const pushShows = () => {
      navigate('/spotters');
    }
  
    const pushInvites = () => {
      navigate('/invites');
    }

    if (!auth.uid) return navigate('/artistSignup');

    if (users) {
      return (
          <div>
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
                    <div>
                        <button className="btn btn-primary" onClick={pushShows}>
                            Shows
                        </button>
                        <button className="btn btn-warning float-end" onClick={pushInvites}>
                            Invites
                        </button>
                    </div>
                    
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
          <br/>
          <br/>
          {users && users.map((user) => {
              if (user.id === auth.uid && user.purchasedSongs) {
                return (
                  <div>
                    {user.purchasedSongs.map((song) => {
                        return (
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
                                <tbody>
                                    <tr>
                                    <td>artist</td>
                                    <td>{song.price}</td>
                                    <td>{song.title}</td>
                                    </tr>
                                </tbody>
                                </Table>
                            </div>
                        
                        )
                    })}
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
      users: state.firestore.ordered.users
    }
}

const mapDispatchToProps = dispatch => {
  return {
    addSong: (song) => dispatch(addSong(song))
  }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([{
      collection: 'users'
    }])
  )(SpotterProfile);