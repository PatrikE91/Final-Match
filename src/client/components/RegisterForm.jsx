import { useState } from "react";
import "../style/RegisterForm.css";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const [user, setUser] = useState({
    username: "",
    password: "",
    firstName: "",
    email: "",
    lastName: "",
    age: "",
    pictureId: "",
  });
  const [userPicture, setUserPicture] = useState("");
  const apiUrl = "http://localhost:4000";
  const navigate = useNavigate();

  function subtractYears(numOfYears, today = new Date()) {
    today.setFullYear(today.getFullYear() - numOfYears);

    return today;
  }
  const calculateDate = () => {
    const newDate = subtractYears(18);

    let day = newDate.getDate();
    let month = newDate.getMonth();
    let year = newDate.getFullYear();
    if (day < 10) {
      day = "0" + day.toString();
    }
    if (month < 10) {
      month = "0" + month.toString();
    }
    let maxDate = year + "-" + month + "-" + day;
    return maxDate;
  };

  const handleRegister = async (user, picture) => {
    function getAge(dateString) {
      let today = new Date();
      let birthDate = new Date(dateString);
      let age = today.getFullYear() - birthDate.getFullYear();
      let m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return Number(age);
    }

    const formData = new FormData();

    formData.append("username", user.username);
    formData.append("password", user.password);
    formData.append("firstName", user.firstName);
    formData.append("lastName", user.lastName);
    formData.append("email", user.email);
    formData.append("age", getAge(user.age));
    formData.append("pictureId", URL.createObjectURL(picture));
    fetch(apiUrl + "/users/register", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    handleRegister(user, userPicture);
    navigate("/");
  };

  return (
    <div className="registration-form">
      <h1 className="text-center main-title">Final Match</h1>
      <form
        onSubmit={handleSubmit}
        method="POST"
        className="registration-login-form"
        encType="multipart/form-data"
      >
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={user.username}
          onChange={handleChange}
        />
        <label htmlFor="email">Email:</label>

        <input
          type="text"
          name="email"
          placeholder="email"
          value={user.email}
          onChange={handleChange}
        />
        <label htmlFor="password">Password:</label>

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
        />
        <label htmlFor="firstName">First Name:</label>

        <input
          type="text"
          name="firstName"
          placeholder="name"
          onChange={handleChange}
        />
        <label htmlFor="lastName">Last Name:</label>

        <input
          type="text"
          name="lastName"
          placeholder="last name"
          onChange={handleChange}
        />
        <label htmlFor="date">Date of Birth:</label>

        <input
          type="date"
          name="age"
          placeholder="age"
          max={calculateDate()}
          onChange={handleChange}
        />
        <label htmlFor="image">Profile Picture:</label>

        <input
          className="upload-input"
          type="file"
          name="image"
          placeholder="picture"
          onChange={(e) => setUserPicture(e.target.files[0])}
        />
        <div></div>
        <button className="submit-button-registration" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
