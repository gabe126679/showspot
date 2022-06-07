export const createShow = (show) => {
    return (dispatch, getState, { getFirestore }) => {
      const firestore = getFirestore();
      const profile = getState().firebase.profile;
      const promoterId = getState().firebase.auth.uid;

      firestore.collection('shows').add({
        headliner: show.headliner,
        fourth: show.fourth,
        third: show.third,
        second: show.second,
        opener: show.opener,
        venue: show.venue,
        headlinerId: show.headlinerId,
        fourthId: show.fourthId,
        thirdId: show.thirdId,
        secondId: show.secondId,
        openerId: show.openerId,
        venueId: show.venueId,
        promoterUserName: profile.userName,
        promoterId: promoterId,
        createdAt: new Date()
      }).then(() => {
        dispatch({ type: 'CREATE_SHOW_SUCCESS' });
      }).catch((err) => {
        dispatch({ type: 'CREATE_SHOW_ERROR', err });
      });
    }
  };

export const updateShow = (show) => {
  return async (dispatch, getState, { getFirestore }) => {
      const firestore = getFirestore();

      firestore.collection('shows').doc(show.title).update({
          headlinerDecision: show.headlinerDecision,
          fourthDecision: show.fourthDecision,
          thirdDecision: show.thirdDecision,
          secondDecision: show.secondDecision,
          openerDecision: show.openerDecision,
          venueDecision: show.venueDecision
      }).then(() => {
          dispatch({ type: 'UPDATE_SHOW_SUCCESS' });
      }).catch((err) => {
          dispatch({ type: 'UPDATE_SHOW_ERROR', err });
      });

  }
}

  export const createBand = (band) => {
    return (dispatch, getState, { getFirestore }) => {
      const firestore = getFirestore();
      const profile = getState().firebase.profile;
      const creatorId = getState().firebase.auth.uid;
  
      firestore.collection('bands').add({
        first: band.first,
        second: band.second,
        third: band.third,
        fourth: band.fourth,
        fifth: band.fifth,
        firstId: band.firstId,
        secondId: band.secondId,
        thirdId: band.thirdId,
        fourthId: band.fourthId,
        fifthId: band.fifthId,
        bandName: band.bandName,
        creatorUserName: profile.userName,
        creatorId: creatorId,
        createdAt: new Date()
      }).then(() => {
        dispatch({ type: 'CREATE_BAND_SUCCESS' });
      }).catch((err) => {
        dispatch({ type: 'CREATE_BAND_ERROR', err });
      });
    }
  };