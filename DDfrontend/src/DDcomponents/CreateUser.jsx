import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/register.css";
import { useForm } from "react-hook-form";
const CreateUser = () => {
  let [user, setUser] = useState({
    name: "",
    email: "",
    mobile: "",
    gender: "",
    designation: "",
    course: "",
  });
  let [isNamerr, setNamerr] = useState("");
  let [isEmailerr, setEmailerr] = useState("");
  let [isPasserr, setPasserr] = useState("");

  let [file, setFile] = useState({});
  let [message, setMessage] = useState("");
  let navigate = useNavigate();

  let fileHandle = (e) => {
    setFile(e.target.files[0]);
  };

  let handleChange = ({ target: { value, name } }) => {
    setUser({ ...user, [name]: value });
    console.log(value);
  };

  let handleSubmitUser = async (e) => {
    e.preventDefault();
    try {
      if (!(user.name.length > 4 && user.name.length < 10)) {
        setNamerr("Name should min 4 and max 10");
      } else {
        setNamerr("");
      }
      if (!user.email.includes("@")) {
        setEmailerr("");
      } else {
      }
      if (!(user.mobile.length === 10)) {
        setPasserr("mobile should 10 number");
      } else {
        setPasserr("");
      }
      let formData = new FormData();
      formData.append("f_Name", user.name);
      formData.append("f_Email", user.email);
      formData.append("f_Mobile", user.mobile);
      formData.append("f_Designation", user.designation);
      formData.append("f_Gender", user.gender);
      formData.append("f_Course", user.course);
      formData.append("f_image", file);

      let res = await axios.post(
        "http://localhost:7000/api/dduser/createuser",
        formData
      );
      setMessage(res.data.message);
      console.log(res.data.message);
    } catch (error) {
      console.log(error.response.data.message);
      setMessage(error.response.data.message);
    }
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  let backToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <section className="create">
      <h3>Create User</h3>
      <form className="reg" action="" onSubmit={handleSubmitUser}>
        <div>
          <label htmlFor="">
            Name: <br />
            <input
              required
              style={{ height: "30px", width: "250px" }}
              type="text"
              name="name"
              onChange={handleChange}
              pattern="[A-Za-z]+"
              title="Please enter alphabets only"
            />
          </label>
          <br />
          <span style={{ fontSize: "13px" }}>
            {isNamerr === "" ? "" : isNamerr}
          </span>
          <br /> <br />
          <label htmlFor="">
            Email: <br />
            <input
              required
              style={{ height: "30px", width: "250px" }}
              type="email"
              name="email"
              onChange={handleChange}
            />
          </label>
          <span style={{ fontSize: "13px" }}>
            {isEmailerr === "" && isEmailerr}
          </span>
          <br />
          <br />
          <label htmlFor="">
            Mobile: <br />
            <input
              required
              style={{ height: "30px", width: "250px" }}
              type="tel"
              name="mobile"
              onChange={handleChange}
              pattern="[654321789][0-9]{9}"
              title="please enter number only and length is 10"
            />
          </label>
          <span style={{ fontSize: "13px" }}>
            {isPasserr === "" && isPasserr}
          </span>
          <br />
          <br />
          <label htmlFor="">
            Gender: <br />
            <div className="check">
              <input
                type="radio"
                value="MALE"
                name="gender"
                onChange={handleChange}
              />{" "}
              Male
              <input
                type="radio"
                value="FEMALE"
                name="gender"
                onChange={handleChange}
              />
              Female
              <input
                type="radio"
                value="OTHERS"
                name="gender"
                onChange={handleChange}
              />
              Others
            </div>
          </label>
        </div>
        <br />
        <br />
        <div>
          <label htmlFor="">
            Designation:
            <select
              required
              style={{ height: "25px", width: "100px" }}
              name="designation"
              onClick={handleChange}
              id=""
            >
              <option value="">--select--</option>
              <option value="HR">HR</option>
              <option value="SALES">SALES</option>
              <option value="MANAGER">MANAGER</option>
            </select>
          </label>
          <br />
          <br />
          <label htmlFor="">
            Course: <br />
            <div className="check">
              <input
                type="checkbox"
                value="MCA"
                name="course"
                onChange={handleChange}
              />
              MCA
              <input
                type="checkbox"
                value="BCA"
                name="course"
                onChange={handleChange}
              />
              BCA
              <input
                type="checkbox"
                value="BSC"
                name="course"
                onChange={handleChange}
              />
              BSC
            </div>
          </label>
          <br />
          <br />
          <label htmlFor="">
            Image Upload: <br />
            <input required type="file" name="image" onChange={fileHandle} />
          </label>
          <br />
          <br />
          <button type="submit">submit</button>
          <button
            style={{ backgroundColor: "rgb(248, 140, 140)" }}
            onClick={backToDashboard}
          >
            Cancel
          </button>
        </div>
      </form>
      {/* <br /> */}
      <span style={{color:'red',fontWeight:'bold'}} >{message}</span>
      {/* <input type="file" onChange={(e)=>setFile(e.target.files[0])} />
      <br />
      <button onClick={submitUpload} >upload</button> */}
    </section>
  );
};

export default CreateUser;
