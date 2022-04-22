import React from "react";
import { useSelector } from "react-redux";
import NavBar from "./NavBar";

function UserProfile() {
  // const access_token = useSelector((state) => state.account.accessToken);
  const userProfile = useSelector((state) => state.userprofile.setUserProfileValue);
  console.log(userProfile);

  const profile = JSON.parse(localStorage.getItem("profile"));
  console.log(profile);
  return (
    <div>
      <nav>
        <NavBar />
      </nav>
      <body className="bg-fullbg min-h-screen p-8">
        <div className="bg-fullbg font-sans w-full h-screen flex flex-row justify-center items-center">
          <div className=" w-96 mx-auto bg-white  shadow-xl hover:shadow">
            <img className="w-32 mx-auto rounded-full -mt-20 border-8 border-white" src={profile.images[0].url} alt="" />
            <div className="text-center mt-2 text-3xl font-medium">{profile.display_name}</div>
            <div className="px-6 text-center mt-2 font-light text-sm"></div>
            {/* <hr className="mt-8"> */}
            <div className="flex p-4">
              <div className="w-full text-center">
                <span className="font-bold">{profile.followers.total}</span> Followers
              </div>
            </div>
          </div>
        </div>
      </body>
    </div>
  );
}

export default UserProfile;
