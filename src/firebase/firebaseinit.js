import firebase from 'firebase/app';
import 'firebase/firestore'

var firebaseConfig = {
  apiKey: "AIzaSyD8jPONUcI6HQacaulxIMLp_Zoc54NfpU8",
  authDomain: "weatherapp-ccc2e.firebaseapp.com",
  projectId: "weatherapp-ccc2e",
  storageBucket: "weatherapp-ccc2e.appspot.com",
  messagingSenderId: "736337694477",
  appId: "1:736337694477:web:4ce4b94a97b018b796ea44"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp.firestore();