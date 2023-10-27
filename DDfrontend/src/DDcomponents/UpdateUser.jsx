import React, { useEffect, useState } from "react";
import axios from "axios";
import '../css/register.css'
import { useNavigate, useParams } from "react-router-dom";
const UpdateUser = () => {
  let [userdd, setUser] = useState({
    name: "",
    email: "",
    mobile: "",
    gender: "",
    designation: "",
    course: "",
    image: "",
  });
  let navigate=useNavigate()
  let { id } = useParams();
  let [file, setFile] = useState({});
  let [message, setMessage] = useState("");

  let fileHandle = (e) => {
    setFile(e.target.files[0]);
  };

  let handleChange = ({ target: { value, name } }) => {
    setUser({ ...userdd, [name]: value });
    console.log(value);
  };

  let getSingleUser = async () => {
    try {
      let {
        data: {
          user: {
            f_Name,
            f_Email,
            f_Mobile,
            f_Designation,
            f_Gender,
            f_Course,
            f_image,
          },
        },
      } = await axios.get(
        `http://localhost:7000/api/dduser/getsingleuser/${id}`
      );

      setUser({
        ...userdd,
        name: f_Name,
        email: f_Email,
        mobile: f_Mobile,
        gender: f_Gender,
        designation: f_Designation,
        course: f_Course,
        image: f_image,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleUser();
  }, []);

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let formData = new FormData();
      formData.append("f_Name", userdd.name);
      formData.append("f_Email", userdd.email);
      formData.append("f_Mobile", userdd.mobile);
      formData.append("f_Designation", userdd.designation);
      formData.append("f_Gender", userdd.gender);
      formData.append("f_Course", userdd.course);
      formData.append("f_image", file);
      let res = await axios.put(
        `http://localhost:7000/api/dduser/updateuser/${id}`,
        formData
      );

      // console.log(res.data);
       setMessage(res.data.message)
      navigate("/userlist");
    } catch (error) {
      // console.log(error.response.data.message);
       setMessage(error.response.data.message)
    
    }
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };
  let backToDashboard = () => {
    navigate("/userlist");
  };
  console.log(userdd);

  return (
    <section className="create">
     
      <h3>Edit User</h3>
      <form style={{height:'350px',width:'55%'}} className="reg" action="" onSubmit={handleSubmit}>
        
        <div  >
        <label htmlFor="">
          Name: <br />
          <input
          style={{ height: "30px", width: "250px" }}
            type="text"
            value={userdd.name}
            name="name"
            onChange={handleChange}
            pattern="[A-Za-z]+"
              title="Please enter alphabets only"
          />
        </label>
        <br /> <br />
        <label htmlFor="">
          Email: <br />
          <input
          style={{ height: "30px", width: "250px" }}
            type="email"
            value={userdd.email}
            name="email"
            onChange={handleChange}
          />
        </label>
        <br />
        <br />
        <label htmlFor="">
          Mobile: <br />
          <input
            type="tel"
            style={{ height: "30px", width: "250px" }}
            value={userdd.mobile}
            name="mobile"
            onChange={handleChange}
            pattern="[654321789][0-9]{9}"
              title="please enter number only and length is 10"
          />
        </label>
        <br />
        <br />
        <label htmlFor="">
          Gender: <br />
          <div className="check" >
          <input
            type="radio"
            checked={userdd.gender === "MALE"}
            value="male"
            name="gender"
            onChange={handleChange}
          />{" "}
          Male
          <input
            type="radio"
            checked={userdd.gender === "FEMALE"}
            value="female"
            name="gender"
            onChange={handleChange}
          />
          Female
          <input
            type="radio"
            checked={userdd.gender === "OTHERS"}
            value="others"
            name="gender"
            onChange={handleChange}
          />
          Others
          </div>
        </label>
        </div>
        <br />
        <br />
        <div  >
        <label htmlFor="">
          Designation:
          <select
          required
            name="designation"
            value={userdd.designation}
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
          <div className="check" >
          <input
            type="checkbox"
            checked={userdd.course === "MCA"}
            value="mca"
            name="course"
            onChange={handleChange}
          />
          MCA
          <input
            type="checkbox"
            checked={userdd.course === "BCA"}
            value="bca"
            name="course"
            onChange={handleChange}
          />
          BCA
          <input
            type="checkbox"
            checked={userdd.course === "BSC"}
            value="bsc"
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
          <input  type="file" name="image" onChange={fileHandle} />
          <img src={userdd.image} alt="" height={40} width={40} />
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
    </section>
  );
};

export default UpdateUser;
