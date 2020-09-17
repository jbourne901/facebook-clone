import React, { useState } from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import "materialize-css/dist/css/materialize.min.css";
import './App.css';
import IUser from "./types/user";
import SignIn from './components/signin';
import SignUp from './components/signup';
import Feed from './components/feed';
import MenuBar from './components/menubar';
import {firebaseApp, userRef} from "./firebase";
 
const App = () => {  
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
  const [isSignIn, setIsSignIn] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState<IUser|undefined>(undefined);
  const [myUID, setMyUID] = useState<string|undefined>(undefined);

  const toggleSignInUp = () => {
    setIsSignIn(!isSignIn);
  }

  firebaseApp.auth().onAuthStateChanged( (u) => {
    if(u && u.uid) {
        console.log(`onAuthStateChange uid=${u.uid}`)
        setMyUID(u.uid);
        setLoggedIn(true);
        userRef.child(u.uid).once("value", data => {
          setUserDetails(data.val())
        });
        return;
    }   
    console.log("No user logged in ")
    setLoggedIn(false);
  });
 
  return (
    <div className="App">
      <MenuBar isLoggedIn={isLoggedIn} />
      <BrowserRouter>
          <Route path="/" exact>
              {isLoggedIn && myUID && 
                  <Feed userDetails={userDetails} myUID={myUID}/>
              }
              {!isLoggedIn && !isSignIn && 
                  <SignUp switchToSignIn = {() => toggleSignInUp()} />
              }
              {!isLoggedIn && isSignIn && 
                  <SignIn switchToSignUp = {() => toggleSignInUp()} />
              }
          </Route>           
      </BrowserRouter>
    </div>
  );
}

export default App;
