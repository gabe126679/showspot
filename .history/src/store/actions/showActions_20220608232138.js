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

export const updateHeadliner = (headliner) => {
  return async (dispatch, getState, { getFirestore }) => {
      const firestore = getFirestore();

      firestore.collection('shows').doc(headliner.title).update({
          headlinerDecision: headliner.decision,
      }).then(() => {
          dispatch({ type: 'UPDATE_HEALINER_SUCCESS' });
      }).catch((err) => {
          dispatch({ type: 'UPDATE_HEALINER_ERROR', err });
      });

  }
}

export const updateFourth = (fourth) => {
  return async (dispatch, getState, { getFirestore }) => {
      const firestore = getFirestore();

      firestore.collection('shows').doc(fourth.title).update({
          openerDecision: fourth.decision
      }).then(() => {
          dispatch({ type: 'UPDATE_FOURTH_SUCCESS' });
      }).catch((err) => {
          dispatch({ type: 'UPDATE_FOURTH_ERROR', err });
      });

  }
}

export const updateThird = (third) => {
  return async (dispatch, getState, { getFirestore }) => {
      const firestore = getFirestore();

      firestore.collection('shows').doc(third.title).update({
          thirdDecision: third.decision,
      }).then(() => {
          dispatch({ type: 'UPDATE_THIRD_SUCCESS' });
      }).catch((err) => {
          dispatch({ type: 'UPDATE_THIRD_ERROR', err });
      });

  }
}

export const updateSecond = (second) => {
  return async (dispatch, getState, { getFirestore }) => {
      const firestore = getFirestore();

      firestore.collection('shows').doc(second.title).update({
          secondDecision: second.decision,
      }).then(() => {
          dispatch({ type: 'UPDATE_SECOND_SUCCESS' });
      }).catch((err) => {
          dispatch({ type: 'UPDATE_SECOND_ERROR', err });
      });

  }
}

export const updateOpener = (opener) => {
  return async (dispatch, getState, { getFirestore }) => {
      const firestore = getFirestore();

      firestore.collection('shows').doc(opener.title).update({
          openerDecision: opener.decision
      }).then(() => {
          dispatch({ type: 'UPDATE_OPENER_SUCCESS' });
      }).catch((err) => {
          dispatch({ type: 'UPDATE_OPENER_ERROR', err });
      });

  }
}

export const updateVenue = (venue) => {
  return async (dispatch, getState, { getFirestore }) => {
      const firestore = getFirestore();

      firestore.collection('shows').doc(venue.title).update({
          venueDecision: venue.decision
      }).then(() => {
          dispatch({ type: 'UPDATE_VENUE_SUCCESS' });
      }).catch((err) => {
          dispatch({ type: 'UPDATE_VENUE_ERROR', err });
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