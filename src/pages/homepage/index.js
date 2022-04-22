import React, { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Search from "../../components/Search";
import CreatePlaylist from "../../components/CreatePlaylist";
import { setAccessToken } from "../../reducers/AccountSlice";
import axios from "axios";
import { setUserProfile } from "../../reducers/UserProfileSlice";
import { setListID } from "../../reducers/ListIDSlice";
import durationHelper from "../../_helper/DurationHelper";
import NavBar from "../../components/NavBar";

function HomePage() {
  const [searchResult, setSearchResult] = useState([]);
  const setSearchValue = useSelector((state) => state.search.setSearchValue);
  const access_token = useSelector((state) => state.account.accessToken);

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
    }).then(async (res) => {
      const data = await res.data;
      console.log("data, :", data);
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
    console.log("test", listID);
    if (listID) {
      dispatch(setListID(listID));
    }
    if (token) {
      handleGetUserProfile(token);
      dispatch(setAccessToken(token));
    }
  }, [listID]);

  return (
    <div className="">
      <nav>
        <NavBar />
      </nav>
      <body className="bg-fullbg min-h-screen p-8">
        <div className="grid place-content-center justify-center bg-fullbg">
          <div className="flex bg-fullbg">
            <Search handleSearch={handleSearch} />
          </div>
          <div className="grid bg-fullbg">
            <CreatePlaylist />
          </div>
        </div>
        <section className="flex px-2 lg:pt-0  pb-2 lg:pb- bg-fullbg justify-center">
          <div className="container w-full">
            <div className="flex flex-wrap -mx-4 justify-center">
              {searchResult.map((item) => {
                return (
                  <div key={item.id} className="justify-between w-full md:w-1/2 xl:w-1/3 px-4">
                    <div className="bg-[#CDF664] rounded-lg overflow-hidden mb-10" key={item.id}>
                      <div className="text-center font-poppins">
                        <img className="w-full" src={item.album.images[1].url} />
                        <div className="p-8 sm:p-9 md:p-7 xl:p-9 text-center">
                          <p
                            className="
                        font-semibold
                        font-poppins
                        text-black text-xl
                        sm:text-[22px]
                        md:text-xl
                        lg:text-[22px]
                        xl:text-xl
                        2xl:text-[22px]
                        mb-4
                        block
                        hover:text-primary
                        "
                          >
                            {item.artists[0].name}
                          </p>
                        </div>
                        <p className="font-semibold text-zinc-700 text-center text-body-color leading-relaxed mb-7">
                          <p>{item.name}</p>
                          <p>{durationHelper(item.duration_ms)}</p>
                        </p>
                        <button
                          className="
                     inline-block
                     py-2
                     px-7
                     m-4
                     border border-primary
                     rounded-full
                     bg-primary
                     text-black
                     font-poppins
                     font-medium
                     hover:border-secondary hover:bg-secondary hover:text-black
                     transition"
                          onClick={() => (listID.includes(item.id) ? deleteID(item.id) : addID(item.id))}
                        >
                          {listID.includes(item.id) ? "Deselect" : "Select"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </body>
    </div>
  );
}

export default HomePage;
