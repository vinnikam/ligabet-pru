
import * as firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyCvrrKvpbF94bPIx2XHXZmmVkCZ-1dyHZ4",
    authDomain: "ligabet-react.firebaseapp.com",
    databaseURL: "https://ligabet-react.firebaseio.com",
    projectId: "ligabet-react",
    storageBucket: "ligabet-react.appspot.com",
    messagingSenderId: "770959134815",
    appId: "1:770959134815:web:496fb8ace7833dd8554bea",
    measurementId: "G-EB0Y7YJPGJ"
  };
  // Initialize Firebase
  var fireBD = firebase.initializeApp(firebaseConfig);
  // firebase.analytics();

  export default fireBD.database().ref();
