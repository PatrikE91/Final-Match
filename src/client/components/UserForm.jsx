import { useState } from "react";
// import { Navigate } from "react-dom";

export default function UserForm(props) {
  const { handleSubmit } = props;
  const [user, setUser] = useState({ username: "", password: "" });

  const handleSubmitDecorator = (e) => {
    e.preventDefault();
    handleSubmit(user);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  return (
    <form onSubmit={handleSubmitDecorator} className="login-form">
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={user.username}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={user.password}
        onChange={handleChange}
      />
      <button type="submit" className="login-button">Submit</button>
    </form>
  );
}
