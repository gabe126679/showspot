export const signIn = (credentials) => {
    return (dispatch, getState, {getFirebase}) => {
      const firebase = getFirebase();
      
      firebase.auth().signInWithEmailAndPassword(
        credentials.email,
        credentials.password
      ).then(() => {
        dispatch({ type: 'LOGIN_SUCCESS' });
      }).catch((err) => {
        dispatch({ type: 'LOGIN_ERROR', err });
      });
  
    }
  }
  
export const signOut = () => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();

    firebase.auth().signOut().then(() => {
      dispatch({ type: 'SIGNOUT_SUCCESS' })
    });
  }
}

export const signUp = (newUser) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    firebase.auth().createUserWithEmailAndPassword(
      newUser.email, 
      newUser.password
        ).then(resp => {

          return firestore.collection('users').doc(resp.user.uid).set({
            userName: newUser.userName,
          });
      }).then(() => {
        dispatch({ type: 'SIGNUP_SUCCESS' });
      }).catch((err) => {
        dispatch({ type: 'SIGNUP_ERROR', err});
      });
    }
}

export const artistSignUp = (newArtist) => {
  return async (dispatch, getState, { getFirestore }) => {
      const firestore = getFirestore();
      const viewerId = getState().firebase.auth.uid;
      
      firestore.collection('users').doc(viewerId).update({
          isArtist: true,
          firstName: newArtist.firstName,
          lastName: newArtist.lastName,
          mainInstrument: newArtist.mainInstrument
      })
      .then(() => {
          dispatch({ type: 'ARTIST_CREATE_SUCCESS' });
      }).catch((err) => {
          dispatch({ type: 'ARTIST_CREATE_ERROR', err });
      });

  }
}

export const venueSignUp = (newVenue) => {
  return async (dispatch, getState, { getFirestore }) => {
      const firestore = getFirestore();
      const viewerId = getState().firebase.auth.uid;
      
      firestore.collection('users').doc(viewerId).update({
          isVenue: true,
          venueName: newVenue.venueName,
          venueAddress: newVenue.venueAddress
      })
      .then(() => {
          dispatch({ type: 'VENUE_CREATE_SUCCESS' });
      }).catch((err) => {
          dispatch({ type: 'VENUE_CREATE_ERROR', err });
      });

  }
}

export const addToCart = (item) => {
  return async (dispatch, getState, { getFirestore }) => {
      const firestore = getFirestore();
      const viewerId = getState().firebase.auth.uid;
      
      firestore.collection('users').doc(viewerId).update({
          cartItems: firestore.FieldValue.arrayUnion(item)
      })
      .then(() => {
          dispatch({ type: 'UPDATE_CART_SUCCESS' });
      }).catch((err) => {
          dispatch({ type: 'UPDATE_CART_ERROR', err });
      });

  }
}

export const addSong = (song) => {
  return async (dispatch, getState, { getFirestore }) => {
      const firestore = getFirestore();
      const viewerId = getState().firebase.auth.uid;
      
      firestore.collection('users').doc(viewerId).update({
          songs: firestore.FieldValue.arrayUnion(song)
      })
      .then(() => {
          dispatch({ type: 'ADD_SONG_SUCCESS' });
      }).catch((err) => {
          dispatch({ type: 'ADD_SONG_ERROR', err });
      });

  }
}

export const updateCart = (item, price) => {
  return async (dispatch, getState, { getFirestore }) => {
      const firestore = getFirestore();
      const cartHolder = getState().firebase.auth.uid;

      firestore.collection('users').doc(cartHolder).update({
        cartItems: firestore.FieldValue.arrayRemove({
          id: item,
          price: price
        })
      }).then(() => {
          dispatch({ type: 'DELETE_CART_SUCCESS' });
      }).catch((err) => {
          dispatch({ type: 'DELETE_CART_ERROR', err });
      });

  }
}
