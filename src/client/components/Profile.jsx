import "../style/Profile.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import BottomNav from "./BottomNav";

const Profile = (props) => {
  const { myself } = props;
  const navigate = useNavigate();
  // console.log('idToFind',allUsers)



  const logout = () => {
    navigate("/");
  };

  return (
    <div className="profile-main">
      <h1 className="text-center main-title">Final Match</h1>
      <button className="logout" onClick={logout}>
        Logout
      </button>
      { myself ? (<div className="myself-container">
        <div className="image-container">
          <img
            className="profile-image"
            alt=""
            src={myself.profile.pictureId}
          />
          <p className="displayed-user-info">
            {myself.username} LvL {myself.profile.age}
          </p>
        </div>
      </div>) : false}
      <BottomNav/>
    </div>
  );
};

export default Profile;
