import React, { useState } from "react";
import "../App/App.css";
import { Switch, Route } from "react-router-dom";
import Main from "../pages/Main/Main";
import Movies from "../pages/Movies/Movies";
import SavedMovies from "../pages/SavedMovies/SavedMovies";
import Profile from "../pages/Profile/Profile";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import NotFound from "../pages/NotFound/NotFound";


function App() {
  const [menuActive, setMenuActive] = useState(false);

  // function handleSignOut() {
  //   localStorage.removeItem("jwt");
  //   setUserEmail("");
  // }

  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/movies">
          <Movies active={menuActive} setActive={setMenuActive}
          />
        </Route>
        <Route path="/saved-movies">
          <SavedMovies active={menuActive} setActive={setMenuActive}
          />
        </Route>
        <Route path="/profile">
          <Profile active={menuActive} setActive={setMenuActive}
          />
        </Route>
        <Route path="/signup">
          <Register/>
        </Route>
        <Route path="/signin">
          <Login />
        </Route>
        <Route path="/notfound">
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
