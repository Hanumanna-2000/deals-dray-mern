import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import {
  SortByEmail,
  sortByDate,
  sortByUniqueId,
  sortingValue,
} from "../Helper/SortValue";
const Alluser = () => {
  let [user, setUser] = useState([]);
  let navigate = useNavigate();
  let [search, setSearch] = useState("");
  let [isvalue, setValue] = useState(0);
  let [page, setPage] = useState(0);

  let IncFun = () => {
    setValue((c) => c + 3);
    setPage((c) => c + 1);
  };

  let DecFun = () => {
    setValue((c) => c - 3);
    setPage((c) => c - 1);
  };

  let handleSearch = ({ target: { value } }) => {
    setSearch(value);
  };
  let getAll = async () => {
    try {
      let res = await axios.get("http://localhost:7000/api/dduser/getalluser");
      setUser(res.data.user);
      console.log(res.data.user);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAll();
  }, []);

  let updateNavigate = (id) => {
    navigate(`/editdetails/${id}`);
  };

  let deletehandle = async (id) => {
    try {
      let res = await axios.delete(
        `http://localhost:7000/api/dduser/deleteuser/${id}`
      );
      console.log(res);
      let result = await axios.get(
        "http://localhost:7000/api/dduser/getalluser"
      );
      setUser(result.data.user);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(search);
  let filterData = user.filter((m) => {
    return (
      m.f_Name.toLowerCase().includes(search) ||
      m.f_Email.toLowerCase().includes(search) ||
      m.createdAt.toLowerCase().includes(search)
    );
  });
  let sortByValue = () => {
    let ByName = sortingValue(user);
    setUser(ByName);
  };
  let sortByEmail = () => {
    let byEmail = SortByEmail(user);
    setUser(byEmail);
  };
  let sortByDateValue = () => {
    let date = sortByDate(user);
    setUser(date);
    for(let i=0;i<date.length;i++){
      console.log(date[i].createdAt)
    } 
    console.log(date[0].createdAt)
  };
  let sortById = () => {
    let uniqueId = sortByUniqueId(user);
    setUser(uniqueId);
  };
  console.log(filterData);
  let backToDashboard = () => {
    navigate("/dashboard");
  };
  return (
    <div>
      <br />
      <br />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <button onClick={backToDashboard}> Back </button>
        <input
          style={{ width: "300px", height: "30px" }}
          placeholder="Search here"
          type="text"
          onChange={handleSearch}
        />
     <div style={{width:'500px'}} >
     <button
          style={{ width: "100px", height: "30px" }}
          onClick={sortByValue}
        >
          SortByName
        </button>{" "}
        <button
          style={{ width: "100px", height: "30px" }}
          onClick={sortByEmail}
        >
          SortByEmail
        </button>
        <button
          style={{ width: "100px", height: "30px" }}
          onClick={sortByDateValue}
        >
          SortByDate
        </button>
        
        <button style={{ width: "100px", height: "30px" }} onClick={sortById}>
          SortById
        </button>
     </div>
        <h3>Total User: {user.length}</h3>
        <NavLink to="/createuser">Create User</NavLink>
      </div>
      <br />

      <table cellPadding={10} cellSpacing={5} style={{ margin: "auto" }}>
        <thead>
          <tr>
            <th>Unique_ID</th>
            <th>Photo</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>CreateDate</th>
            <th>Designation</th>
            <th>Gender</th>
            <th>Course</th>
            <th>Action</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filterData
            .map((m, index) => {
              return (
                <>
                  <tr>
                    <td>
                      {index + 1} {m._id.slice(0, 7)}
                    </td>
                    <td>
                      {" "}
                      <img
                      style={{borderRadius:'20%'}}
                        src={m.f_image}
                        alt="no"
                        height={100}
                        width={100}
                      />{" "}
                      {/* <video height={100} controls
                        width={100} src={m.f_image}></video> */}
                    </td>
                    <td>{m.f_Name}</td>
                    <td>{m.f_Email}</td>
                    <td>{m.f_Mobile}</td>
                    <td>{m.createdAt.slice(0, 10)}</td>
                    <td>{m.f_Designation}</td>

                    <td>{m.f_Gender}</td>
                    <td>{m.f_Course}</td>
                    <td>
                      <button style={{backgroundColor:'lightblue'}} onClick={() => updateNavigate(m._id)}>
                        Edit
                      </button>{" "}
                    </td>
                    <td>
                      <button style={{backgroundColor:'lightpink'}} onClick={() => deletehandle(m._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                </>
              );
            })
            .slice(isvalue, isvalue + 3)}
        </tbody>
      </table>

      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <button onClick={DecFun} style={{ backgroundColor: "lightcoral" }}>
          back
        </button>
        {page === 1 ? (
          <button style={{ background: "white", width: "30px" }}>1</button>
        ) : (
          <button style={{ width: "30px" }}>1</button>
        )}
        {page === 2 ? (
          <button style={{ background: "white", width: "30px" }}>2</button>
        ) : (
          <button style={{ width: "30px" }}>2</button>
        )}
        {page === 3 ? (
          <button style={{ background: "white", width: "30px" }}>3</button>
        ) : (
          <button style={{ width: "30px" }}>3</button>
        )}
        {/* {page === 4 ? (
          <button style={{ background: "white", width: "30px" }}>4</button>
        ) : (
          <button style={{ width: "30px" }}>4</button>
        )} */}
        
        <button onClick={IncFun} style={{ backgroundColor: "lightcoral" }}>
          next
        </button>{" "}
      </div>
    </div>
  );
};

export default Alluser;
