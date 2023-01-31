import "../style/HomePage.css";
import PictureCards from "./PictureCards";
import MainActions from "./MainActions";
import BottomNav from "./BottomNav";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import "react-notifications-component/dist/theme.css";

export default function UserForm(props) {
  const {
    users,
    setUsers,
    getMatches,
    matches,
    setMatches,
    allMatches,
    notifyMatch,
    updateState,
    setUpdateState,
  } = props;

  useEffect(() => {
    setUpdateState(Math.floor(Math.random() * 10000));
  }, []);

  

  return (
    <>
      <main className="main">
        <h1 className="text-center main-title">Final Match</h1>
        <PictureCards users={users} setUsers={setUsers} />
        <MainActions
        allMatches={allMatches}
          users={users}
          setUsers={setUsers}
          matches={matches}
          getMatches={getMatches}
          setMatches={setMatches}
          updateState={updateState}
          setUpdateState={setUpdateState}
          notifyMatch={notifyMatch}
        />
        <BottomNav />
      </main>
    </>
  );
}
