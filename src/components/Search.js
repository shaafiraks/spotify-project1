import React from "react";
import CreatePlaylist from "./CreatePlaylist";
import { setSearch } from "../reducers/SearchSlice";
import { useDispatch } from "react-redux";

// eslint-disable-next-line react/prop-types
function Search({ handleSearch }) {
  const dispatch = useDispatch();
  // const searchQuery = useSelector((state) => state.searchQuery.value);

  return (
    <div>
      <input className="w-64 h-9 bg-gray-100 rounded-full " placeholder="Artists, songs, or podcasts " onChange={(e) => dispatch(setSearch(e.target.value))}></input>
      <button
        id="search-btn"
        className="-"
        onClick={() => {
          handleSearch();
        }}
      >
        Search
      </button>
      {/* <CreatePlaylist /> */}
    </div>
  );
}

export default Search;
