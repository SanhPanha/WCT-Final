import 'firebase/auth';
import 'firebase/firestore';
import firebaseConfig from './firebaseConfiguration';


// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app(); // if already initialized, use that one
  }