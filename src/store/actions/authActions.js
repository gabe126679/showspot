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
            purchasedSongs: [
              {
                artist: "Tom Petty",
                artistId: "EaW4JkM7I1foFyPisILTvDzFpsk1",
                title: "Free Fallin",
                song: "https://firebasestorage.googleapis.com/v0/b/dream-project-1040a.appspot.com/o/songs%2FTom_Petty_-_Free_Fallin_(getmp3.pro).mp3?alt=media&token=c6e362f4-2869-4705-88ec-e3e79bec61d8"
              },
              {
                artist: "Tom Petty",
                artistId: "EaW4JkM7I1foFyPisILTvDzFpsk1",
                title: "You Don't Know How It Feels",
                song: "https://firebasestorage.googleapis.com/v0/b/dream-project-1040a.appspot.com/o/songs%2FTom_Petty_-_You_Dont_Know_How_It_F_(getmp3.pro).mp3?alt=media&token=9567c526-87e7-4072-9609-9a5372a4d14d"
              }
            ]
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

export const addPlaylist = (playlist) => {
  return async (dispatch, getState, { getFirestore }) => {
      const firestore = getFirestore();
      
      firestore.collection('playlists').add({
          name: playlist.name,
          creator: playlist.creator,
          followers: firestore.FieldValue.arrayUnion(playlist.creator)
      })
      .then(() => {
          dispatch({ type: 'ADD_PLAYLIST_SUCCESS' });
      }).catch((err) => {
          console.log(err);
          dispatch({ type: 'ADD_PLAYLIST_ERROR', err });
      });

  }
}

export const addPlaylistSong = (song) => {
  return async (dispatch, getState, { getFirestore }) => {
      const firestore = getFirestore();
      
      firestore.collection('playlists').doc(song.playlist).update({
        songs: firestore.FieldValue.arrayUnion(song.song)
      })
      .then(() => {
          dispatch({ type: 'ADD_PLAYLIST_SONG_SUCCESS' });
      }).catch((err) => {
          console.log(err);
          dispatch({ type: 'ADD_PLAYLIST_SONG_ERROR', err });
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

export const addBandSong = (song) => {
  return async (dispatch, getState, { getFirestore }) => {
      const firestore = getFirestore();
      
      firestore.collection('bands').doc(song.id).update({
          songs: firestore.FieldValue.arrayUnion(song)
      })
      .then(() => {
          dispatch({ type: 'ADD_BAND_SONG_SUCCESS' });
      }).catch((err) => {
          dispatch({ type: 'ADD_BAND_SONG_ERROR', err });
      });

  }
}

export const updateCart = (item) => {
  return async (dispatch, getState, { getFirestore }) => {
      const firestore = getFirestore();
      const cartHolder = getState().firebase.auth.uid;

      firestore.collection('users').doc(cartHolder).update({
        cartItems: firestore.FieldValue.arrayRemove(item)
      }).then(() => {
          dispatch({ type: 'DELETE_CART_SUCCESS' });
      }).catch((err) => {
          dispatch({ type: 'DELETE_CART_ERROR', err });
      });

  }
}

export const updateCartSong = (song) => {
  return async (dispatch, getState, { getFirestore }) => {
      const firestore = getFirestore();
      const cartHolder = getState().firebase.auth.uid;

      firestore.collection('users').doc(cartHolder).update({
        cartItems: firestore.FieldValue.arrayRemove(song)
      }).then(() => {
          dispatch({ type: 'DELETE_CART_SONG_SUCCESS' });
      }).catch((err) => {
          dispatch({ type: 'DELETE_CART_SONG_ERROR', err });
      });

  }
}

export const updateRating = (raters, artistRating, artistRatings, artist) => {
  return async (dispatch, getState, { getFirestore }) => {
      const firestore = getFirestore();

      firestore.collection('users').doc(artist).update({
        averageRating: artistRating,
        ratings: artistRatings,
        raters: raters 
      }).then(() => {
          dispatch({ type: 'UPDATE_RATING_SUCCESS' });
      }).catch((err) => {
          dispatch({ type: 'UPDATE_RATING_ERROR', err });
      });

  }
}

export const updateBandRating = (raters, bandRating, bandRatings, band) => {
  return async (dispatch, getState, { getFirestore }) => {
      const firestore = getFirestore();

      firestore.collection('bands').doc(band).update({
        averageRating: bandRating,
        ratings: bandRatings,
        raters: raters 
      }).then(() => {
          dispatch({ type: 'UPDATE_BAND_RATING_SUCCESS' });
      }).catch((err) => {
          dispatch({ type: 'UPDATE_BAND_RATING_ERROR', err });
      });

  }
}

export const updateBandSongVote = (band, songs) => {
  return async (dispatch, getState, { getFirestore }) => {
      const firestore = getFirestore();

      firestore.collection('bands').doc(band).update({
        songs: songs
      }).then(() => {
          dispatch({ type: 'UPDATE_BAND_SONG_VOTE_SUCCESS' });
      }).catch((err) => {
          dispatch({ type: 'UPDATE_BAND_SONG_VOTE_ERROR', err });
      });

  }
}

export const activateBandSong = (band, activatedSongs) => {
  return async (dispatch, getState, { getFirestore }) => {
      const firestore = getFirestore();

      firestore.collection('bands').doc(band).update({
        songs: activatedSongs
      }).then(() => {
          dispatch({ type: 'ACTIVATE_BAND_SONG_SUCCESS' });
      }).catch((err) => {
          dispatch({ type: 'ACTIVATE_BAND_SONG_ERROR', err });
      });
  }
}

export const addPlaylistListener = (playlist, listener) => {
  return async (dispatch, getState, { getFirestore }) => {
      const firestore = getFirestore();

      firestore.collection('playlists').doc(playlist).update({
        listeners: firestore.FieldValue.arrayUnion(listener)
      }).then(() => {
          dispatch({ type: 'ADD_PLAYLIST_LISTENER_SUCCESS' });
      }).catch((err) => {
          dispatch({ type: 'ADD_PLAYLIST_LISTENER_ERROR', err });
      });
  }
}

export const removePlaylistListener = (playlist, listener) => {
  return async (dispatch, getState, { getFirestore }) => {
      const firestore = getFirestore();

      firestore.collection('playlists').doc(playlist).update({
        listeners: firestore.FieldValue.arrayRemove(listener)
      }).then(() => {
          dispatch({ type: 'REMOVE_PLAYLIST_LISTENER_SUCCESS' });
      }).catch((err) => {
          dispatch({ type: 'REMOVE_PLAYLIST_LISTENER_ERROR', err });
      });
  }
}



