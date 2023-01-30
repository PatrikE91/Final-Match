import { useEffect, useState } from "react";
import BottomNav from "./BottomNav";
import "../style/Messages.css";
import MessagesForm from "./MessagesForm";
// import { Room } from "../../server/domain/room";

const Messages = (props) => {
  const [messages, setMessages] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [roomId, setRoomId] = useState(0);
  const [deletedRooms, setDeletedRooms] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const apiUrl = "http://localhost:4000";
  const loggedUserId = localStorage.getItem("userId");

  const getAllUser = () => {
    fetch(apiUrl + "/users")
      .then((res) => res.json())
      .then((data) => {
        // console.log("ALL USERS: ", data);
        setAllUsers(data.users);
      });
  };
  useEffect(() => {
    // const interval = setInterval(() => {
    //   // getMessages()
    //   getAllUser();
    //   getRooms();
    // }, 5000);

    // return () => clearInterval(interval);
    getAllUser();
    getRooms();
  }, [deletedRooms]);

  const getMessages = (roomId) => {
    setRoomId(roomId);
    fetch(apiUrl + "/messages/" + roomId)
      .then((res) => res.json())
      .then((data) => {
        setMessages(data.messages);
      });
  };
  const getRooms = () => {
    fetch(apiUrl + `/rooms/${loggedUserId}`)
      .then((res) => res.json())
      .then((data) => {
        let rooms = [];
        data.rooms.forEach((room) => {
          const roomToIgnore = deletedRooms.find(
            (element) => element === room.id
          );
          if (roomToIgnore) {
            return;
          }
          rooms.push(room);
        });

        setRooms(rooms);
        getMessages(data.rooms[0].id);
      });
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setNewMessage({ ...newMessage, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(apiUrl + `/messages/${loggedUserId}/${roomId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: newMessage.content }),
    })
      .then((res) => res.json())
      .then((data) => {
        setNewMessage("");
        getMessages(roomId);
      })
      .catch((err) => console.log(err.response));
    event.target.reset();
  };

  const unMatch = (roomId) => {
    // console.log("deleted room", apiUrl + "/rooms/" + Number(roomId));

    // fetch(apiUrl + "/rooms/" + Number(roomId), {
    //   method: "DELETE",
    //   headers: { "Content-Type": "application/json" },
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log("deleted room", data);
    //     getRooms();
    //   });
    setDeletedRooms([...deletedRooms, roomId]);
    getRooms();
  };

  return (
    <div className="main-container">
      <h1 className="text-center main-title">Final Match</h1>
      <div className="messages-container">
        <div className="chats">
          <ul className="users text-center list-inline">
            Chats:
            {allUsers.length
              ? rooms.map((room) => {
                  const idToFind =
                    room.userA === Number(loggedUserId)
                      ? room.userB
                      : room.userA;
                  const userB = allUsers.find(({ id }) => id === idToFind);

                  return (
                    <li
                      className="user"
                      key={room.id}
                      onClick={() => getMessages(room.id)}
                    >
                      <img
                        src={userB.profile.pictureId}
                        alt=""
                        className={room.id === roomId? "room-picture active-room": "room-picture"}
                      ></img>
                      <p>{userB.username}</p>
                    </li>
                  );
                })
              : false}
          </ul>
        </div>
        <div className="conversation">
          <div className="sent-messages">
          <button className="unmatch-button" onClick={() => unMatch(roomId)}>
            UnMatch
          </button>
            {messages
              ? messages.map((message) => {
                  const roomToIgnore = deletedRooms.find(
                    (element) => element === message.roomId
                  );
                  if (roomToIgnore) {
                    return <></>;
                  }

                  return (
                    <p
                      key={message.id}
                      className={
                        message.senderId === Number(loggedUserId)
                          ? "recipient align-bottom"
                          : "sender align-bottom"
                      }
                    >
                      {message.content}
                    </p>
                  );
                })
              : false}
          </div>
          <MessagesForm
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Messages;
