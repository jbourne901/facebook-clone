import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyAk-54WIdPJ7u8YkClultxockyBcJIbMHg",
    authDomain: "facebook-clone-8fe88.firebaseapp.com",
    databaseURL: "https://facebook-clone-8fe88.firebaseio.com",
    projectId: "facebook-clone-8fe88",
    storageBucket: "facebook-clone-8fe88.appspot.com",
    messagingSenderId: "498142998050",
    appId: "1:498142998050:web:6c7e6e3caccdbb8de2a47b"
  };

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const userRef = firebaseApp.database().ref("users");
export const postRef = firebaseApp.database().ref("posts");
export const storageRef = firebaseApp.storage();


