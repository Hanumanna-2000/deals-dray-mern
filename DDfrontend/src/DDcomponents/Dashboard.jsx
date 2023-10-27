import React from 'react'
import { NavLink } from 'react-router-dom'


const Dashboard = () => {
  return (
    <section>
      <span style={{color:'lightgreen',fontWeight:'bold',fontSize:"20px"}}> DASHBORAD</span>
    <div style={{border:'2px solid red',display:"flex",height:'40px',width:"100%",flexDirection:"row",alignItems:'center',justifyContent:'space-evenly',margin:"auto",backgroundColor:'lightpink'}} >
       <NavLink to='/createuser' >Registrations</NavLink>
        <NavLink to='/userlist' >User List</NavLink>
    </div>
    <div style={{width:'100%',height:'71vh',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'50px',backgroundColor:'azure',color:'lightpink'}} >
    Welcome to Admin panel
    </div>

    </section>
  )
}

export default Dashboard