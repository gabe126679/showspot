import React, { useEffect } from 'react'
import { Table, Dropdown } from 'react-bootstrap';
import { firestoreConnect } from 'react-redux-firebase';
import { useNavigate, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ArtistProfile from './profiles/ArtistProfile'

function Artists(props) {
    const { auth, users } = props;
  
    const navigate = useNavigate();
  
    const handleSignUp = () => {
        navigate('/artistSignup');
    }

    const pushProfile = () => {
        navigate('/artistProfile');
    }

    const pushBands = () => {
        navigate('/bands');
    }
  
    useEffect(() => {

      if (!auth.uid) {
          navigate("/spotterLogin");
      }
    });

    
    if (users) {
        return (
            <div>
            <br/>
            <br/>
            <br/>

            <div className="profile-border">
                    <br/>
                        {users && users.map((user) => {
                            
                            if (user.id === auth.uid && user.isArtist === true) {
                                return (
                                    <div>
                                        <button className="btn btn-primary" onClick={pushProfile}>
                                            My Profile
                                        </button>
                                        <button className="btn btn-warning float-end" onClick={pushBands}>
                                            Bands
                                        </button>
                                    </div>
                                )
                            } else if (user.id === auth.uid) {
                                return (
                                    <button className="btn btn-primary" onClick={handleSignUp}>
                                        Become an Artist
                                    </button>
                                )
                            }
                        })}
                        <br/>
                        <br/>
                        <p className="text-center border bg-dark text-white">active artists:</p>
                        
                    <br/>
                    <Table hover>
                        <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Main Instrument</th>
                        </tr>
                        </thead>
                    {users && users.map((user) => {
                        if (user.isArtist) {
                            return (
                                <tbody >
                                <tr>
                                    <td id={user.id} >                      
                                      <Link to={'/artist/' + user.id}>
                                        {user.firstName}
                                      </Link>
                                    </td>

                                    <td onClick={pushProfile}>{user.lastName}</td>
                                    <td>{user.mainInstrument}</td>
                                </tr>
                                </tbody>
                            ) 
                        }
                    })}
                    </Table>
            </div>
            </div>
        )
    } else {
        return <div> 
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            loading ... 
            </div>
    }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    users: state.firestore.ordered.users,
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{
    collection: 'users'
  }])
)(Artists);