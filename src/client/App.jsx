import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";

import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import RegisterForm from "./components/RegisterForm";
import "bootstrap/dist/css/bootstrap.min.css";
import Messages from "./components/Messages";
import Profile from "./components/Profile";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import './components/custom.scss'
function App() {
  const [users, setUsers] = useState([]);
  const [allUsers, setAlUsers] = useState([]);
  const [myself, setMyself] = useState({});

  const apiUrl = "http://localhost:4000";

  const [matches, setMatches] = useState([]);
  const [allMatches, setAllMatches] = useState([]);
  const [rejections, setRejections] = useState([]);
  const [updateState, setUpdateState] = useState(0);
  const loggedUserId = localStorage.getItem("userId");
  // const displayedUserId = localStorage.getItem("displayedUserId");
  // const notifyMatch = () => {
  //   let bool = false;
  //   matches.forEach((match) => {
  //     const isAMatch = allMatches.find(
  //       (e) => e.userIdA === match.userIdB && e.userIdB === match.userIdA
  //     );
  //     console.log("is match:", isAMatch);
  //     return isAMatch ? (bool = true) : (bool = false);
  //   });

  //   if (bool) {
  //     toast.success('Hey, is a match!', {
  //       position: "top-center",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "colored",
  //       });
  //   }
  // };

  useEffect(() => {
    getMatches();
    getRejections();
  }, [updateState]);

  useEffect(() => {
    getUser();
  }, [matches, rejections, updateState]);

  const getMatches = () => {
    fetch(apiUrl + `/match`)
      .then((res) => res.json())
      .then((data) => {
        // notifyMatch();
        setAllMatches(data.matches);
        const myMatches = [];
        data.matches.forEach((match) => {
          if (match.userIdA === Number(loggedUserId)) {
            myMatches.push(match);
            return;
          }
        });
        setMatches(myMatches);
      });
  };

  const getRejections = () => {
    fetch(apiUrl + `/rejected`)
      .then((res) => res.json())
      .then((data) => {
        // console.log("before for each", data.rejections);
        const myRejections = [];
        data.rejections.forEach((element) => {
          if (element.userIdA === Number(loggedUserId)) {
            myRejections.push(element);
            return;
          }
        });
        // console.log("data", myRejections);
        setRejections(myRejections);
        // notifyMatch();
      });
  };

  const displayUsers = (users) => {
    const usersToReturn = [];
    users.forEach((user) => {
      let bool = false;
      if (user.id === Number(loggedUserId)) {
        return;
      }
      matches.forEach((match) => {
        if (match.userIdB === user.id) bool = true;
      });
      rejections.forEach((rejection) => {
        if (rejection.userIdB === user.id) bool = true;
      });
      return bool ? true : usersToReturn.push(user);
    });

    if (usersToReturn.length) {
      localStorage.setItem("displayedUserId", usersToReturn[0].id);
    }

    return usersToReturn;
  };

  const getUser = () => {
    fetch(apiUrl + "/users")
      .then((res) => res.json())
      .then((data) => {
        // notifyMatch();
        setUsers(displayUsers(data.users));
        setAlUsers(data.users);
      });
  };

  useEffect(() => {
    const idToFind = localStorage.getItem("userId");
    const myself = allUsers.find(({ id }) => id === Number(idToFind));
    return myself ? setMyself(myself) : console.log("lol", allUsers);
  }, [allUsers]);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="register_form" element={<RegisterForm />} />
        <Route
          exact
          path="/home_page"
          element={
            <HomePage
              // notifyMatch={notifyMatch}
              getMatches={getMatches}
              users={users}
              setUsers={setUsers}
              matches={matches}
              setMatches={setMatches}
              updateState={updateState}
              setUpdateState={setUpdateState}
              allMatches={allMatches}
            />
          }
        />
        <Route
          path="/messages"
          element={<Messages users={users} setUsers={setUsers} />}
        />
        <Route path="/profile" element={<Profile myself={myself} />} />
      </Routes>
    </>
  );
}

export default App;
