import React, { useState, useEffect } from 'react'
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useNavigate, useParams } from "react-router-dom";
import { Table } from "react-bootstrap";
import { addToCart } from '../../store/actions/authActions'

function PublicArtist(props) {

    const { auth, users } = props;

    const { id } = useParams();

    let navigate = useNavigate();

    const [newArray, setNewArray] = useState([]);

    const addToCart = (e) => {
      e.preventDefault();
      
      users.map((user) => {
        if (user.id === id) {
          user.songs.map((song) => {
            if (song.song === e.target.id) {
              props.addToCart(song.song);
            }
          })
        }
      })
      // const button = document.querySelector(".addToCart");
      // button.style.display = "none";
      console.log(e.target.id);
      console.log(...newArray);
    }

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
  
    useEffect(() => {
      if (users) {
        users.map((secondUser) => {
          if (secondUser.id === id) {
            if (secondUser.songs) {
              secondUser.songs.map((song) => {
                if (secondUser.id === auth.uid) {
                  if (secondUser.cartItems) {
                    secondUser.cartItems.map((item) => {
                      if (item === song.song && newArray && !newArray.includes(item)) {
                        newArray.push(item);
                      }
                    })
                  }
                }
              })
            }
          }
        })
      }
      if (newArray) {
        newArray.map((item) => {
          console.log(item);
        })
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
          {users && users.map((user) => {
              if (user.id === id) {
                return (
                  <div className="profile-border">
                    <br/>
                    <div>
                        <button className="btn btn-primary " onClick={pushArtists}>
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
                      {user.songs.map((track) => {         
                          users.map((secondUser) => {
                            if (secondUser.id === id) {
                              secondUser.songs.map((song) => {
                                if (secondUser.id === auth.uid) {
                                  secondUser.cartItems.map((item) => {
                                    if (item === song.song && !newArray.includes(item)) {
                                      newArray.push(item);
                                    }
                                  })
                                }
                              })
                            }
                          })                         
                          if (newArray && !newArray.includes(track.song)) {
                            
                            return (
                              <tbody>
    
                                <tr>
                                  <td>{track.title}</td>
                                  <td>{track.price}</td>
                                  <td className=" text-center"><button className="btn btn-primary" onClick={addToCart} id={track.song}>+</button></td>
                                </tr>
                              </tbody>
                            )
                          }
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

const mapStateToProps = (state) => {
    return {
      auth: state.firebase.auth,
      users: state.firestore.ordered.users
    }
}

const mapDispatchToProps = dispatch => {
  return {
    addToCart: (item) => dispatch(addToCart(item))
  }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([{
      collection: 'users'
    }])
  )(PublicArtist);