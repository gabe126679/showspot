import authReducer from './authReducer';
import showReducer from './showReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

const rootReducer = combineReducers({
    auth: authReducer,
    show: showReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
});

export default rootReducer;