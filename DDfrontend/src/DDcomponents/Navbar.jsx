import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import '../css/navbar.css'
import { useAuth } from './authentication/AuthProvider'
import image from '../assets/logo.jpg'
const Navbar = () => {
  let [email,setEmail]=useState('')
  let {user,logout}=useAuth()
  let navigate=useNavigate()
  let emailAdmin=()=>{
     setEmail()
  }
  // emailAdmin()
  let logoutUser=()=>{
    localStorage.removeItem("f_userName")
    logout()
    navigate('/login')
    window.location.reload()
  }
 
  return (
    <nav>
        <img  style={{height:'60px',width:'80px',borderRadius:'5px'}} width={80} src={image} alt="" />
        <NavLink to='/' >Home</NavLink>
        {user && <NavLink to='/createuser' >Registrations</NavLink>}
        {user &&<NavLink to='/userlist' >User List</NavLink>}
        {!user && <NavLink to="/login" >Login</NavLink>}
        <p style={{color:'#4e0088',fontSize:'20px'}} > {user && <span>Admin: {localStorage.getItem('f_userName')}</span> }</p>
        {user && <button style={{border:'none',background:'none',fontSize:'18px',cursor:'pointer',color:'#4e0088'}}  onClick={logoutUser} > Logout </button>}
        
    </nav>
  )
}

export default Navbar