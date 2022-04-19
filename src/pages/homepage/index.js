import React, { useState, useCallback, useContext } from "react";
import { useSelector } from "react-redux";
import Search from "../../components/Search";
import CreatePlaylist from "../../components/CreatePlaylist";

function HomePage() {
  const [searchResult, setSearchResult] = useState([]);
  const setSearchValue = useSelector((state) => state.search.setSearchValue);
  const access_token = useSelector((state) => state.account.accessToken);
  console.log("token", access_token);
  const [listID, setlistID] = useState([]);
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
      {/* <CreatePlaylist /> */}
    </div>
  );
}

export default HomePage;
