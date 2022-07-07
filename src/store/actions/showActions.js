export const createShow = (show, venue) => {
    return (dispatch, getState, { getFirestore }) => {
      const firestore = getFirestore();
      const profile = getState().firebase.profile;
      const promoterId = getState().firebase.auth.uid;

      firestore.collection('shows').add({
        artists: firestore.FieldValue.arrayUnion(...show),
        venueName: venue.name,
        venueId: venue.id,
        promoterUserName: profile.userName,
        promoterId: promoterId,
        backlines: [],
        voteCount: 0,
        votedOn: [],
        createdAt: new Date()
      }).then(() => {
        dispatch({ type: 'CREATE_SHOW_SUCCESS' });
      }).catch((err) => {
        dispatch({ type: 'CREATE_SHOW_ERROR', err });
      });
    }
  };

export const updateTicket = (ticket) => {
  return async (dispatch, getState, { getFirestore }) => {
      const firestore = getFirestore();

      firestore.collection('shows').doc(ticket.title).update({
          ticketPrice: ticket.price,
      }).then(() => {
          dispatch({ type: 'UPDATE_TICKET_SUCCESS' });
      }).catch((err) => {
          dispatch({ type: 'UPDATE_TICKET_ERROR', err });
      });

  }
}

export const updateArtist = (show, artist, decision) => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const currentShows = getState().firestore.ordered.shows;
    const currentArtists = [];


    currentShows.map((currentShow) => {
      if (currentShow.id === show.id) {
        currentShow.artists.map(async (currentArtist) => {
          if (currentArtist.id !== artist.id) {
            currentArtists.push(currentArtist);
            const artistObject = {
              firstName: artist.firstName,
              id: artist.id,
              lastName: artist.lastName,
              number: artist.number,
              accepted: decision
            }
            if (currentArtists.length === (currentShow.artists.length - 1)) {
              firestore.collection("shows").doc(show.id).update({
                artists: [...currentArtists, artistObject]
              })
              .then(() => {
                dispatch({ type: 'UPDATE_ARTIST_SUCCESS' });
              }).catch((err) => {
                dispatch({ type: 'UPDATE_ARTIST_ERROR', err });
              });
            } else {
              console.log("test")
            }
          }
        })
      }
    })

  };
};

export const updateVenue = (show, decision) => {
  return async (dispatch, getState, { getFirestore }) => {
      const firestore = getFirestore();

      firestore.collection('shows').doc(show.id).update({
          venueDecision: decision
      }).then(() => {
          dispatch({ type: 'UPDATE_VENUE_SUCCESS' });
      }).catch((err) => {
          dispatch({ type: 'UPDATE_VENUE_ERROR', err });
      });

  }
}

export const createBackline = (backline) => {
  return async (dispatch, getState, { getFirestore }) => {
      const firestore = getFirestore();

      firestore.collection('shows').doc(backline.title).update({
          backlines: firestore.FieldValue.arrayUnion({
            title: backline.title,
            artist: backline.artist,
            firstName: backline.firstName,
            lastName: backline.lastName,
            voteCount: backline.voteCount,
            votedOn: backline.votedOn,
          })
      }).then(() => {
          dispatch({ type: 'CREATE_BACKLINE_SUCCESS' });
      }).catch((err) => {
          dispatch({ type: 'CREATE_BACKLINE_ERROR', err });
      });

  }
}

export const updateBackline = (backline, oldBackline) => {
  return async (dispatch, getState, { getFirestore }) => {
      const firestore = getFirestore();


      
      firestore.collection('shows').doc(backline.title).update({
        backlines: firestore.FieldValue.arrayRemove(oldBackline)
      }).then(() => {
        firestore.collection('shows').doc(backline.title).update({
          backlines: firestore.FieldValue.arrayUnion(backline)
        })
      })
      .then(() => {
          dispatch({ type: 'UPDATE_BACKLINE_SUCCESS' });
      }).catch((err) => {
          dispatch({ type: 'UPDATE_BACKLINE_ERROR', err });
      });

  }
}

export const createBand = (band, name, ids) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const creatorId = getState().firebase.auth.uid;

    firestore.collection('bands').add({
      members: firestore.FieldValue.arrayUnion(...band),
      bandName: name,
      creatorUserName: profile.userName,
      ids: ids,
      creatorId: creatorId,
      createdAt: new Date()
    }).then(() => {
      dispatch({ type: 'CREATE_BAND_SUCCESS' });
    }).catch((err) => {
      dispatch({ type: 'CREATE_BAND_ERROR', err });
    });
  }
};

export const updateVote = (voter, show) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const currentShows = getState().firestore.ordered.shows;

    currentShows.map(doc => {
      if (!doc.votedOn.includes(voter) && (doc.id === show)) {
        firestore.collection('shows').doc(doc.id).update({
          votedOn: [...doc.votedOn, voter],
          voteCount: firestore.FieldValue.increment(1)
        }).then(() => {
          dispatch({ type: 'UPDATE_VOTE_SUCCESS' });
        }).catch((err) => {
          dispatch({ type: 'UPDATE_VOTE_ERROR', err });
        });
       }
      }
    );
  };
};

export const updateMember = (band, member, decision) => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const currentBands = getState().firestore.ordered.bands;
    const mates = [];


    currentBands.map((currentBand) => {
      if (currentBand.id === band.id) {
        currentBand.members.map((mate) => {
          if (mate.id !== member.id) {
            mates.push(mate);
            const memberObject = {
              firstName: member.firstName,
              id: member.id,
              lastName: member.lastName,
              number: member.number,
              accepted: decision
            }
            if (mates.length === (currentBand.members.length - 1)) {
              firestore.collection("bands").doc(band.id).update({
                members: [...mates, memberObject]
              })
              .then(() => {
                dispatch({ type: 'UPDATE_MEMBER_SUCCESS' });
              }).catch((err) => {
                dispatch({ type: 'UPDATE_MEMBER_ERROR', err });
              });
            } 
          }
        })
      }
    })

  };
};

export const activateShow = (show, decision) => {
  return async (dispatch, getState, { getFirestore }) => {
      const firestore = getFirestore();

      firestore.collection('shows').doc(show.id).update({
          activated: decision
      }).then(() => {
          dispatch({ type: 'SHOW_ACTIVATION_SUCCESS' });
      }).catch((err) => {
          dispatch({ type: 'SHOW_ACTIVATION_ERROR', err });
      });

  }
}

export const activateBand = (band, decision) => {
  return async (dispatch, getState, { getFirestore }) => {
      const firestore = getFirestore();

      firestore.collection('bands').doc(band.id).update({
          activated: decision
      }).then(() => {
          dispatch({ type: 'BAND_ACTIVATION_SUCCESS' });
      }).catch((err) => {
          dispatch({ type: 'BAND_ACTIVATION_ERROR', err });
      });

  }
}


export const createSongPurchase = (purchase) => {
  return async (dispatch, getState, { getFirestore }) => {
      const firestore = getFirestore();
      const currentUsers = getState().firestore.ordered.users;
      const newSongs = [];
      const purchasedSongs = [];

      const newPrice = purchase.price.split('$').join('');
      const newNumber = parseInt(newPrice);
      const songObject = {
        price: purchase.price,
        song: purchase.url,
        title: purchase.title,
        buyerCount: purchase.count,
        buyers: [purchase.buyer],
        revenue: newNumber
      }

      currentUsers.map((user) => {
        if (user.id === purchase.artistId) {
          user.songs.map((track) => {
            if (track.song !== purchase.url && !newSongs.includes(track)) {
              newSongs.push(track);
            }
            else if (track.song === purchase.url) {
              newSongs.push(songObject);                    
            } 
            if (track.buyers) {
              track.buyers.map((buyer) => {
                if (buyer === purchase.buyer && track.song !== purchase.url) {
                  purchasedSongs.push(track);
                }
              })
            }
          })
        }
      })

      firestore.collection('reciepts').add({
        purchaseType: purchase.purchaseType, 
        artist: purchase.artist,
        artistId: purchase.artistId,
        buyer: purchase.buyer,
        buyerCreditChange: purchase.buyerCreditChange,
        count: purchase.count,
        price: purchase.price,
        title: purchase.title,
        url: purchase.url,
        createdAt: new Date(),
        creatorId: purchase.buyer
      })
      .then(() => {
        firestore.collection('users').doc(purchase.artistId).update({
          songs: [...newSongs],
          artistCredit: newNumber
        })
      })
      .then(() => {
        firestore.collection('users').doc(purchase.buyer).update({
          cartItems: [],
          purchasedSongs: [...purchasedSongs, songObject]
        })
      })
      .then(() => {
          dispatch({ type: 'CREATE_SONG_PURCHASE_SUCCESS' });
      }).catch((err) => {
          console.log(err)
          dispatch({ type: 'CREATE_SONG_PURCHASE_ERROR', err });
      });

  }
}

export const createShowPurchase = (purchase) => {
  return async (dispatch, getState, { getFirestore }) => {
      const firestore = getFirestore();
      const currentShows = getState().firestore.ordered.shows;
      const tickets = [];

      currentShows.map((show => {
        if (show.id === purchase.id) {
          const showObject = {
            purchaseType: purchase.purchaseType, 
            artists: purchase.artists,
            buyer: purchase.buyer,
            buyerCreditChange: purchase.buyerCreditChange,
            count: purchase.count,
            price: purchase.price,
            venue: purchase.venue,
            createdAt: new Date(),
            creatorId: purchase.buyer
          }
          tickets.push(showObject);                    
        }
      }))

      firestore.collection('reciepts').add({
        purchaseType: purchase.purchaseType, 
        id: purchase.id,
        artists: purchase.artists,
        buyer: purchase.buyer,
        buyerCreditChange: purchase.buyerCreditChange,
        count: purchase.count,
        price: purchase.price,
        venue: purchase.venue,
        createdAt: new Date(),
        creatorId: purchase.buyer
      })
      .then(() => {
        firestore.collection('users').doc(purchase.buyer).update({
          cartItems: [],
          purchasedTickets: [...tickets]
        })
      })
      .then(() => {
        firestore.collection('shows').doc(purchase.id).update({
          ticketBuyers: [purchase.buyer],
          ticketCount: purchase.count
        })
      })
      .then(() => {
          dispatch({ type: 'CREATE_SHOW_PURCHASE_SUCCESS' });
      }).catch((err) => {
          console.log(err)
          dispatch({ type: 'CREATE_SHOW_PURCHASE_ERROR', err });
      });

  }
}