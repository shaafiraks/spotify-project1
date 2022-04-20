import React from "react";
import LoginPage from "./pages/login";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
// import PlaylistNew from "./components/PlaylistNew";
import { useSelector } from "react-redux";
import HomePage from "./pages/homepage";
// import CreatePlaylistPage from "./pages/CreatePlaylistPage";

export default function App() {
  const access_token = useSelector((state) => state.account.accessToken);
  console.log(access_token);
  return (
    <Router>
      <Switch>
        {/* <Route path="/">{!access_token ? <LoginPage /> : <Redirect to="/callback/" />}</Route> */}
        <Route exact path="/">
          <LoginPage/>
        </Route>
        {/* <Route path="/create-playlist">{access_token ? <div>TEST</div> : <Redirect exact from="/create-playlist" to="/" />}</Route> */}
        <Route path="/callback/">
          <HomePage />
          <div>test</div>
        </Route>
      </Switch>
    </Router>
  );
}
