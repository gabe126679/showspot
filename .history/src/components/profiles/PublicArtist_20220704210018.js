import React from 'react'
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useNavigate, useParams } from "react-router-dom";
import { Table } from "react-bootstrap";

function PublicArtist(props) {

    const { auth, users } = props;

    const { id } = useParams();

    let navigate = useNavigate();

    const pushArtists = () => {
      users.map((user) => {
        if (user.isArtist) {
          navigate('/artistProfile');
        } else {
          navigate('/artistSignup');
        }
      })
    }

    const pushBands = () => {
        navigate('/bands');
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
              if (user.id === id) {
                return (
                  <div className="profile-border">
                    <br/>
                    <div>
                        <button className="btn btn-primary" onClick={pushArtists}>
                            Become an Artist
                        </button>
                        <button className="btn btn-warning float-end" onClick={pushBands}>
                            Bands
                        </button>
                    </div>
                    <br/>
                    <Table  hover>
                      <thead >
                        <tr>
                          <th>First Name</th>
                          <th>Last Name</th>
                          <th>Main Instrument</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{user.firstName}</td>
                          <td>{user.lastName}</td>
                          <td>{user.mainInstrument}</td>
                        </tr>
                      </tbody>
                    </Table>
                    <br/>
                    <br/>
                    <br/>
                    <Table  hover>
                      <thead >
                        <tr>
                          <th>Title</th>
                          <th>Price</th>
                          <th>Add to Cart</th>
                        </tr>
                      </thead>
                      {user.songs.map((song) => {               
                        <tbody>

                          <tr>
                            <td>{song.title}</td>
                            <td>{song.price}</td>
                            <td><button className="btn btn-primary">+</button></td>
                          </tr>
                        </tbody>
                      })}
                    </Table>
                  </div>
              ) 
              }
            })}
          <br/>
          <br/>
          <br/>
            {/* <button onClick={handleClick}>hi</button> */}
          </div>
      )
    }

}

const mapStateToProps = (state, ownProps) => {
    // const id = ownProps.match.params.id;
    // const users = state.firestore.data.users;
    // const user = users ? users[id] : null
    console.log(ownProps);
    return {
      auth: state.firebase.auth,
      users: state.firestore.ordered.users
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([{
      collection: 'users'
    }])
  )(PublicArtist);