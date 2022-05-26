import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import cookie from 'react-cookie';
import axios from 'axios';
import UserContext from './context/UserContext';
import NavBar from './components/NavBar';
import Main from './views/Main';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import Dashboard from './views/Dashboard';
import OneDayCard from './components/OneDayCard';
import Preference from './views/Preference';
import Footer from './components/Footer';

function App() {
  //our user, if logged in
  const [user, setUser] = useState({});
  //logged in state to pass to navbar, as it will update based on whether the user is logged in or not
  const [loggedIn, setLoggedIn] = useState(false);
  //set city and weather based on user location data
  const [position, setPosition] = useState({});
  const [positionLoaded, setPositionLoaded] = useState(false);
  //set preference
  const [preference, setPreference] = useState("imperial");

  useEffect(()=>{
    //check to see if the user is logged in. If so, pass these credentials to navbar and dashboard
    if(cookie.load('usertoken') !== undefined){
      axios.get("http://localhost:8000/api/users/getuser", {withCredentials:true})
      .then(res => {
          setUser(res.data.user);
          setPreference(res.data.user.preference);
          setLoggedIn(true);
          //get geolocation data from the logged in user to populate front page
          navigator.geolocation.getCurrentPosition((pos) => {
            setPosition({ latitude: pos.coords.latitude, longitude:pos.coords.longitude });
            setPositionLoaded(true);
          });
      })
      .catch(err => {
          console.error(err);
      })
    } else {
      navigator.geolocation.getCurrentPosition((pos) => {
        setPosition({ latitude: pos.coords.latitude, longitude:pos.coords.longitude });
        setPositionLoaded(true);
      });
    }
    
  },[])

  return (
    <BrowserRouter>
        <div className="App d-flex flex-column min-vh-100 justify-content-between">
            <div className="body mb-5">
              <UserContext.Provider value={{user, setUser, loggedIn, setLoggedIn, preference, setPreference}}>
                <NavBar />
                <div className="container" id="body">
                  <Switch>
                    <Route exact path="/">
                      <Main position={ position } positionLoaded={ positionLoaded }/>
                    </Route>
                    <Route path="/register">
                      <RegistrationForm />
                    </Route>
                    <Route path="/login">
                      <LoginForm />
                    </Route>
                    <Route path="/dashboard">
                      <Dashboard user={ user }/>
                    </Route>
                    <Route path="/day/:lat/:lng">
                      <OneDayCard />
                    </Route>
                    <Route path="/user/preferences">
                      <Preference />
                    </Route>
                  </Switch>
                </div>
              </UserContext.Provider>
            </div>
            <Footer />
        </div>
    </BrowserRouter>
  );
}

export default App;
