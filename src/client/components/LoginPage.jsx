import UserForm from "./UserForm";
import { useNavigate, Link } from "react-router-dom";

export default function LoginPage(props) {
  const apiUrl = "http://localhost:4000";
  const navigate = useNavigate();

  const handleLogin = async ({ username, password }) => {
    fetch(apiUrl + "/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("token", data.data);
        localStorage.setItem("userId", data.userId);
        return data.status === "failed" ? false : navigate("/home_page");
      });
  };

  return (
    <div className="App">
      <div className="login">
        <h1>Login</h1>
        <UserForm handleSubmit={handleLogin} />
        <Link to={"/register_form"}>
          <h1>Register</h1>
        </Link>
      </div>
    </div>
  );
}
