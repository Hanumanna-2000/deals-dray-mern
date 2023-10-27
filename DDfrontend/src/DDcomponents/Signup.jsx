import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  let [signup, setSignup] = useState({ f_userName: "", f_pwd: "" });
  let [messge, setMessage] = useState("");
  let navigate=useNavigate()

  let handleChange = ({ target: { value, name } }) => {
    setSignup({ ...signup, [name]: value });
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post(
        "http://localhost:7000/api/loginadmin/signup",
        signup
      );
      setMessage(res.data.message);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
    setTimeout(() => {
      setMessage("");
    }, 2000);
  };
  let navigateLogin=()=>{
    navigate('/login')
  }
  console.log(signup);
  return (
    <section>
      <br />
      <form
        style={{
          width: "30%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          fontSize: "20px",
        }}
        className="login"
        action=""
        onSubmit={handleSubmit}
      >
        <h3>SignUp</h3>
        <label htmlFor="">
          UserName: <br />
          <input
            style={{ height: "30px", width: "250px" }}
            name="f_userName"
            type="email"
            placeholder="Enter your email id"
            onChange={handleChange}
          />
        </label>

        <label htmlFor="">
          Password: <br />
          <input
            style={{ height: "30px", width: "250px" }}
            name="f_pwd"
            type="password"
            placeholder="enter your password"
            onChange={handleChange}
          />
        </label>

        <div>
          {" "}
          <button
            style={{
              width: "100px",
              height: "30px",
              backgroundColor: "lightblue",
            }}
            type="submit"
          >
            SignUp
          </button>
          <button onClick={navigateLogin} style={{ width: "110px", backgroundColor: "lightblue" }}>
            Swap to Login
          </button>
        </div>
      </form>
    </section>
  );
};

export default Signup;
