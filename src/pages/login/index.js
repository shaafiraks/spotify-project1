import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setAccessToken } from "../../reducers/AccountSlice";
import { setUserProfile } from "../../reducers/UserProfileSlice";
import { useHistory } from "react-router-dom";
import React from "react";

function LoginPage() {
  // const [searchResult, setSearchResult] = useState([]);
  // const setSearchValue = useSelector((state) => state.search.setSearchValue);
  const [userProfile, setuserProfile] = useState({});

  const CLIENT_ID = process.env.REACT_APP_SPOTIFY_API_KEY;
  const REDIRECT_URL = `http://localhost:3000/callback/`;
  const RESPONSE_TYPE = "token";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const SCOPE = "playlist-modify-private";
  const SPOTIFY_URL = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

  const dispatch = useDispatch();

  const history = useHistory();

  const handleAccess = () => {
    window.location.href = SPOTIFY_URL;
  };

  return (
    <div className="App bg-slate-600 bg-cover h-screen">
      <div className="Login flex justify-center justify-items-center">
        <button className="w-40 text-[white] bg-primary rounded-full" onClick={handleAccess}>
          Login With Spotify
        </button>
      </div>
    </div>
  );
}

// class App extends Component {
//   state = {
//     access_token: "",
//     searchResult: [],
//     searchQuery: "",
//   };

//   handleAccess = () => {
//     window.location.href = `https://accounts.spotify.com/authorize?client_id=a62c7ba9e3b04ed593ed968fbeddcc1d&response_type=token&redirect_uri=http://localhost:3000&scope=playlist-modify-private`;
//   };

//   handleSearch = async () => {
//     await fetch(`https://api.spotify.com/v1/search?q=${this.state.searchQuery.replaceAll(" ", "+")}&type=album&limit=12`, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${this.state.access_token}`,
//       },
//     })
//       .then((res) => res.json())
//       .then((res) => this.setState({ searchResult: res.albums.items }));
//   };

//   componentDidMount() {
//     const token =
//       window.location.hash &&
//       window.location.hash
//         .substring(1)
//         .split("&")
//         .find((elem) => elem.startsWith("access_token"))
//         .replace("access_token=", "");
//     if (token) {
//       this.setState({ access_token: token });
//     }
//   }

//   render() {
//     console.log(this.state.searchResult);
//     return (
//       <div className="App">
//         {this.state.access_token === "" ? <button onClick={this.handleAccess}>login</button> : <Search handleSearch={this.handleSearch} toggleFunction={(value) => this.setState({ searchQuery: value })} />}
//         {this.state.searchResult.map((item) => {
//           return (
//             <div key={item.id}>
//               <img src={item.images[1].url} />
//               <p>{item.artists[0].name}</p>
//               <p>{item.release_date}</p>
//               <p>{item.name}</p>
//             </div>
//           );
//         })}
//       </div>
//     );
//   }
// }

export default LoginPage;
