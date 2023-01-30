import "../style/HomePage.css";
// import chopper from "../../images/chopper.PNG";
import { useState, useEffect } from "react";

export default function PictureCards(props) {
  const { users } = props;
  return (
    <div className="container">
      {users.map((user, index) => {
        return (
          <div
            className={index === 0 ? "box active" : "box not-active"}
            key={user.id}
          >
            <div className="image-container">
              <img
                className="profile-image"
                alt=""
                src={user.profile.pictureId}
              />
            </div>
           
            <span className="displayed-user-info">
              {user.username} LvL {user.profile.age+'  '} </span>
          </div>
        );
      })}
    </div>
  );
}
