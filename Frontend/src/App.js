import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Users from "./user/Pages/Users";
import MainNavigation from "./shared/Components/Navigation/MainNavigation";
import UserPlaces from "./places/Pages/UserPlaces";
import NewPlace from "./places/Pages/NewPlace";
import UpdatePlace from "./places/Pages/UpdatePlace";
import Auth from "./user/Pages/Auth";
import { AuthContext } from "./shared/context/auth-context";
import React, { useState, useCallback } from "react";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId,setUserId] = useState(false);

  const login = useCallback((uid) => {
    setIsLoggedIn(true);
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
  }, []);

  let routes;

  if (isLoggedIn)
  {
    routes = (
      <Switch>
          <Route path="/" exact>
            <Users />
          </Route>
          <Route exact path="/:userId/places">
                <UserPlaces />
          </Route>
          <Route path="/places/new" exact>
            <NewPlace />
          </Route>
          <Route path="/places/:placeId" exact>
            <UpdatePlace />
          </Route>
        <Redirect to="/" />
    </Switch>
    );
  }
  else{
    routes = (
      <Switch>
          <Route path="/" exact>
            <Users />
          </Route>
          <Route exact path="/:userId/places">
                <UserPlaces />
              </Route>
          <Route path="/auth" exact>
            <Auth />
          </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn,userId:userId, login: login, logout: logout }}
    >
      <Router>
        <MainNavigation />
        <main>          
            {routes}        
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
