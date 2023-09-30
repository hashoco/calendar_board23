import firebase from "firebase/compat/app"
import "firebase/compat/auth"  //파이어베이스에서 authentication 세팅후 import하기


const firebaseConfig = {
  apiKey: "AIzaSyC6av1p9zDVc9KEaBAlFiNjjFxnY9_13nI",
  authDomain: "board23.firebaseapp.com",
  projectId: "board23",
  storageBucket: "board23.appspot.com",
  messagingSenderId: "961569800731",
  appId: "1:961569800731:web:eb202607a800b0d3ad6ebe" ,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;