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
        <Route path="/create-playlist">
          <HomePage />
          <div>test</div>
        </Route>
        {/* <Route path="/create-playlist">{access_token ? <HomePage /> : <Redirect exact from="/create-playlist" to="/" />}</Route> */}
        <Route path="/">{!access_token ? <LoginPage /> : <Redirect to="/create-playlist" />}</Route>
      </Switch>
    </Router>
  );
}
