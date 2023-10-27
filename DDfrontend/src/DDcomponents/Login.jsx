import React, { useState } from 'react'
import  axios  from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './authentication/AuthProvider';
import '../css/register.css'
const Login = () => {
    let [signup,setSignup]=useState({f_userName:'',f_pwd:''})
    let [messge,setMessage]=useState('')
    let navigate=useNavigate()
    let {login}=useAuth()


    let handleChange=({target:{value,name}})=>{
        setSignup({...signup,[name]:value})
    }

    let handleSubmit=async(e)=>{
        e.preventDefault()
        try {
            let res=await axios.post('http://localhost:7000/api/loginadmin/login',signup)
            console.log(res.data.isExistOrNot)
            if(res.status===200){
                navigate('/dashboard')
            }
            else{
                
            }
            login(res.data.isExistOrNot.f_userName)
            localStorage.setItem('f_userName',res.data.isExistOrNot.f_userName)
        } catch (error) {
            console.log(error)
            alert('invalid credential')
        }
        setTimeout(()=>{
            setMessage("")
        },2000)
    }
    let navigateSignUp=()=>{
        navigate('/singupadmin')
    }
  return (
    <section>
        <form style={{width:'30%',display:'flex',flexDirection:'column',alignItems:'center',fontSize:'20px'}} className='login' action=""  onSubmit={handleSubmit} >
            <h3>Login</h3>

            <label htmlFor="">UserName: <br />
            <input style={{height:'30px',width:'250px'}} name='f_userName' type="email" placeholder='Enter your email id' onChange={handleChange} /> 
            </label>
           
            <label htmlFor="">Password: <br />
            <input style={{height:'30px',width:'250px'}} name='f_pwd' type="password"  placeholder='enter your password' onChange={handleChange}  />
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
            Login
          </button>
          <button onClick={navigateSignUp} style={{ width: "110px", backgroundColor: "lightblue" }}>
            Swap to SignUp
          </button>
        </div>
        </form>
    </section>
  )
}

export default Login