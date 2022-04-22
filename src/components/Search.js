import React from "react";
import * as FiIcons from "react-icons/fi";
// import CreatePlaylist from "./CreatePlaylist";
import { setSearch } from "../reducers/SearchSlice";
import { useDispatch } from "react-redux";
import { IconContext } from "react-icons";
import { FiAlignCenter } from "react-icons/fi";

// eslint-disable-next-line react/prop-types
function Search({ handleSearch }) {
  const dispatch = useDispatch();
  // const searchQuery = useSelector((state) => state.searchQuery.value);

  return (
    <IconContext.Provider value={{ color: "#fff" }}>
      <div className="">
        <input className=" w-64 h-9 bg-gray-100 rounded-full placeholder:pl-2" placeholder="Artists, songs, or podcasts" onChange={(e) => dispatch(setSearch(e.target.value))}></input>
        <div className="flex flex-row justify-center p-2">
          <FiIcons.FiSearch
            className="icon"
            style={{
              FiAlignCenter,
            }}
            color="white"
            size="25px"
          />
          <button
            id="search-btn"
            className="
            font-poppins 
            font-semibold 
            text-slate-800
            hover:text-black"
            onClick={() => {
              handleSearch();
            }}
          >
            Search
          </button>
        </div>

        {/* <CreatePlaylist /> */}
      </div>
    </IconContext.Provider>
  );
}

export default Search;
