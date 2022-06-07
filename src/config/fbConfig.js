import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAs41oLwBxgq1c3JXD2llH6cP5CaJm7z00",
  authDomain: "dream-project-1040a.firebaseapp.com",
  projectId: "dream-project-1040a",
  storageBucket: "dream-project-1040a.appspot.com",
  messagingSenderId: "599105493459",
  appId: "1:599105493459:web:6fa26d91451c60bac17726"
};

firebase.initializeApp(firebaseConfig);

firebase.firestore().settings({ timestampsInSnapshots: true, merge: true });


const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectFirestore, timestamp };

export default firebase;