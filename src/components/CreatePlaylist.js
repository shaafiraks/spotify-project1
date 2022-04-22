import React, { useState } from "react";
import * as VscIcons from "react-icons/vsc";
import axios from "axios";
import { useSelector } from "react-redux";
import { FiAlignCenter } from "react-icons/fi";

function CreatePlaylist() {
  // const [access_token, listID, , , userIDProfile] = useContext(userID);

  const access_token = useSelector((state) => state.account.accessToken);
  const listID = useSelector((state) => state.listid.listIDValue);
  const userIDProfile = useSelector((state) => state.userprofile.setUserProfileValue);

  const [openForm, setOpenForm] = useState(false);
  const [createdPlaylist, setCreatedPlaylist] = useState([]);
  const [disableButton, setDisableButton] = useState(false);

  console.log(userIDProfile);
  const addItem = async (id) => {
    await axios({
      method: "POST",
      url: `https://api.spotify.com/v1/playlists/${id}/tracks`,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      data: {
        uris: listID.map((item) => `spotify:track:${item}`),
      },
    }).then((res) => {
      console.log(res);
    });
  };

  console.log(listID);
  const openFormHandler = (e) => {
    e.preventDefault();
    setOpenForm(!openForm);
  };

  const initialFormData = Object.freeze({
    name: "",
    desc: "",
  });

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // console.log(formData.desc.length);
    if (formData.name.length < 10) {
      setDisableButton(true);
    } else {
      setDisableButton(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios({
      method: "POST",
      url: `https://api.spotify.com/v1/users/${userIDProfile.id}/playlists`,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      data: {
        name: formData.name,
        description: formData.desc,
        public: false,
        collaborative: false,
      },
    }).then((res) => setCreatedPlaylist((prevState) => [...prevState, res.data]));
  };

  return (
    <div className="text-center">
      <form className="" onSubmit={handleSubmit}>
        <div className="flex flex-row justify-center p-2">
          <VscIcons.VscDiffAdded
            className="icon"
            style={{
              FiAlignCenter,
            }}
            color="white"
            size="25px"
          />
          <button className="createPlaylist-btn text-[16px] font-medium text-[#CDF664] hover:text-[rgb(210,279,150)] " onClick={openFormHandler}>
            Create Playlist
          </button>
        </div>
      </form>
      {openForm && (
        <form className="border-2 border-[#FFAFAF] rounded-md bg-[#FFAFAF] p-[2px]">
          <div>
            <label className="title-form text-[16px] font-medium text-[#CDF664]">Title</label>
            <div className="">
              <input name="name" className="bg-[#B8D8D8] w-64 h-8 rounded placeholder-gray-600 placeholder-opacity-75" type="text" onChange={handleChange} placeholder="Add a title"></input>
            </div>
          </div>

          <div>
            <label className="desc-form text-[16px] font-medium text-[#CDF664]">Description</label>
            <div className="">
              <input name="desc" className="bg-[#B8D8D8] w-64 h-40 rounded placeholder-gray-600 placeholder-opacity-75" type="text" onChange={handleChange} placeholder="Add an optional description"></input>
            </div>
          </div>
          <button
            className="
            submitPlaylist-btn
            bg-white 
            w-24 h-7 m-2 text-[13px] 
            font-poppins 
            font-medium 
            text-[#282828] 
            rounded-full 
            hover:border-slate-200 hover:bg-slate-200 hover:text-black
            hover:shadow-lg
            "
            onClick={handleSubmit}
            type="submit"
            disabled={disableButton}
          >
            SAVE
          </button>
        </form>
      )}
      <div className="text-center">
        {createdPlaylist &&
          createdPlaylist.map((playlist) => (
            <div key={playlist.id} className="w-full h-24 bg-yellow-100">
              <h3>{playlist.name}</h3>
              <p>{playlist.description}</p>
              <button
                onClick={() => {
                  addItem(playlist.id);
                }}
              >
                Submit
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default CreatePlaylist;
