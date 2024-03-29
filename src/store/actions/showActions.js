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

export const updateTime = (show, startDate, endDate) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const currentShows = getState().firestore.ordered.shows;

    firestore.collection('shows').doc(show.id).update({
      startTime: new Date(startDate),
      endTime: new Date(endDate)
    }).then(() => {
      dispatch({ type: 'UPDATE_TIME_SUCCESS' });
    }).catch((err) => {
      dispatch({ type: 'UPDATE_TIME_ERROR', err });
    });
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


export const createSongPurchase = (purchase, newSongs) => {
  return async (dispatch, getState, { getFirestore }) => {
      const firestore = getFirestore();

      firestore.collection('users').doc(purchase.buyer)
      .update({
        cartItems: [],
        purchasedSongs: firestore.FieldValue.arrayUnion(purchase)
      })
      .then(() => {
        firestore.collection('users').doc(purchase.artistId) 
        .update({
          songs: newSongs
        })
      })
      .then(() => {
          dispatch({ type: 'CREATED_BAND_SONG_PURCHASE_SUCCESS' });
      }).catch((err) => {
          dispatch({ type: 'CREATED_BAND_SONG_PURCHASE_ERROR', err });
          console.log(err)
      });
  }
}

export const createBandSongPurchase = (purchase, newSongs) => {
  return async (dispatch, getState, { getFirestore }) => {
      const firestore = getFirestore();

      firestore.collection('users').doc(purchase.buyer)
      .update({
        cartItems: [],
        purchasedSongs: firestore.FieldValue.arrayUnion(purchase)
      })
      .then(() => {
        firestore.collection('bands').doc(purchase.bandId) 
        .update({
          songs: newSongs
        })
      })
      .then(() => {
          dispatch({ type: 'CREATED_SONG_PURCHASE_SUCCESS' });
      }).catch((err) => {
          dispatch({ type: 'CREATED_SONG_PURCHASE_ERROR', err });
          console.log(err)
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
            buyers: purchase.buyers,
            buyerCreditChange: purchase.buyerCreditChange,
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
        buyers: purchase.buyers,
        buyerCreditChange: purchase.buyerCreditChange,
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
          ticketBuyers: [...purchase.buyers],
          ticketCount: purchase.buyer.length
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