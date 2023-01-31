import { useState } from "react";
import "../style/MainActions.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MainActions = (props) => {
  const { setUpdateState, allMatches } = props;
  const [currentValue, setCurrentValue] = useState("100");
  const apiUrl = "http://localhost:4000";
  const loggedUserId = localStorage.getItem("userId");
  const displayedUserId = localStorage.getItem("displayedUserId");

  const matchUser = () => {
    let urlForMatch = `/match/${loggedUserId}/${displayedUserId}`;
    fetch(apiUrl + urlForMatch, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setUpdateState(data.match.userIdB);
        notifyMatch(data.match);

        setCurrentValue(String(Number(currentValue) - 10));
      });
    return;
  };

  const notifyMatch = (match) => {
    let bool = false;
    const isAMatch = allMatches.find(
      (e) => e.userIdA === match.userIdB && e.userIdB === match.userIdA
    );
    isAMatch ? (bool = true) : (bool = false);

    if (bool) {
      toast.success("Hey, is a match!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const rejectUser = () => {
    let url = `/rejected/${loggedUserId}/${displayedUserId}`;
    fetch(apiUrl + url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setUpdateState(data.rejection.userIdB);
        setCurrentValue(String(Number(currentValue) - 10));
      });
    return;
  };

  return (
    <div className="actions-container">
      <div className="stats">
        <label className="hp" htmlFor="hp">
          Hp:{" "}
        </label>
        <progress
          id="hp"
          className="health-points"
          value={currentValue}
          max="100"
        ></progress>

        <label className="mp" htmlFor="mp">
          Mp:{" "}
        </label>
        <div id="mp" className="mana-points" value="90" max="100"></div>
      </div>

      <div className="actions">
        <button className="defense" onClick={() => rejectUser()}>
          Def
        </button>
        <button className="magic">Mgk</button>
        <button className="attack" onClick={() => matchUser()}>
          Att
        </button>
      </div>
    </div>
  );
};

export default MainActions;
