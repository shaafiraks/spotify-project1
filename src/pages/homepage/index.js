import React, { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Search from "../../components/Search";
import CreatePlaylist from "../../components/CreatePlaylist";
import { setAccessToken } from "../../reducers/AccountSlice";
import axios from "axios";
import { setUserProfile } from "../../reducers/UserProfileSlice";
import { setListID } from "../../reducers/ListIDSlice";

function HomePage() {
  const [searchResult, setSearchResult] = useState([]);
  const setSearchValue = useSelector((state) => state.search.setSearchValue);
  const access_token = useSelector((state) => state.account.accessToken);
  // console.log("token", access_token);

  const [listID, setlistID] = useState([]);
  const dispatch = useDispatch();

  const addID = (id) => {
    setlistID((prevState) => [...prevState, id]);
  };

  const deleteID = (id) => {
    setlistID((prevState) => prevState.filter((selectedID) => selectedID !== id));
  };

  const handleSearch = useCallback(async () => {
    await fetch(`https://api.spotify.com/v1/search?q=${setSearchValue.replaceAll(" ", "+")}&type=track&limit=12`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => setSearchResult(res.tracks.items));
  }, [setSearchValue, access_token]);

  const handleGetUserProfile = async (token) => {
    await axios({
      method: "GET",
      url: "https://api.spotify.com/v1/me",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then( async(res) => {
      const data = await res.data;
      console.log('data, :', data);
      dispatch(setUserProfile(data));
      // return await data
    });
  };

  useEffect(() => {
    const token =
      window.location.hash &&
      window.location.hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .replace("access_token=", "");
    console.log("test", listID)
    if(listID){
      dispatch(setListID(listID));
    }
    if (token) {
      handleGetUserProfile(token)
      dispatch(setAccessToken(token));
    }
  }, [listID]);

  return (
    <div>
      <div>
        <Search handleSearch={handleSearch} />
      </div>
      {searchResult.map((item) => {
        return (
          <div key={item.id} className="justify-between">
            <div className="flex min-h-screen w-full items-center justify-center bg-slate-500" key={item.id}>
              <div className="justify-center text-white">
                <img src={item.album.images[1].url} />
                <p>{item.artists[0].name}</p>
                <p>{item.album.release_date}</p>
                <p>{item.name}</p>
                <button className="bg-primary w-24 rounded-full text-black" onClick={() => (listID.includes(item.id) ? deleteID(item.id) : addID(item.id))}>
                  {listID.includes(item.id) ? "Deselect" : "Select"}
                </button>
              </div>
            </div>
          </div>
        );
      })}
      <CreatePlaylist />
    </div>
  );
}

export default HomePage;
