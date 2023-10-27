import React, { createContext } from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import CreateUser from './DDcomponents/CreateUser'
import Alluser from './DDcomponents/Alluser'
import Navbar from './DDcomponents/Navbar';
import { Home } from './DDcomponents/Home';
import UpdateUser from './DDcomponents/UpdateUser';
import AuthProvider from './DDcomponents/authentication/AuthProvider';
import Signup from './DDcomponents/Signup';
import Login from './DDcomponents/Login';
import Dashboard from './DDcomponents/Dashboard';
import ProtectedRoute from './DDcomponents/authentication/ProtectedRoute';


let UserContext=createContext()
const User = () => {
//   let [user,setUser]=useState('');
//   let login=(data)=>{
//     setUser(data)
// let logout=()=>{
//     setUser(null)
  return (
<UserContext.Provider>


    <BrowserRouter>
    <AuthProvider>
    <Navbar/>
    <Routes>
        <Route  path='/' element={<Home/>} />
        <Route  path='/createuser' element={
          <ProtectedRoute>
            <CreateUser/>
          </ProtectedRoute>
        } />
        <Route  path='/userlist' element={<ProtectedRoute>
          <Alluser/>
        </ProtectedRoute>} />
        
        <Route  path='/editdetails/:id' element={<UpdateUser/>} />
        <Route  path='/singupadmin' element={<Signup/>} />
        <Route  path='/login' element={<Login/>} />
        <Route  path='/dashboard' element={<Dashboard/>} />
        
    </Routes>
    </AuthProvider>
    
        
    </BrowserRouter>
    </UserContext.Provider>
  )
}

export default User