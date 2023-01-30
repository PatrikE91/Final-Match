import "../style/BottomNav.css";
import { Link } from "react-router-dom";

const BottomNav = () => {
  return (
    <div className="menu">
      <Link className="tavern" to='/home_page'><img src="https://img.icons8.com/ios/512/home.png" alt="" className="icons"></img></Link>
      <Link className="messages" to="/messages"><img src="https://img.icons8.com/ios/512/communication--v1.png" alt="" className="icons"></img></Link>
      <Link  className="encounters"><img src="https://img.icons8.com/dotty/512/online-store.png" alt="" className="icons"></img></Link>
      <Link className="profile" to='/profile'><img src="https://img.icons8.com/ios/512/user-male-circle--v1.png" alt="" className="icons"></img></Link>
    </div>
  );
};

export default BottomNav;
