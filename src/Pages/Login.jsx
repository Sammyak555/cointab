import React, { useState } from 'react'
import "../Styles/Login.css"
import { Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getLogin, getregister } from '../Redux/Auth/action'

const Login = () => {
    const [register, setregister] = useState({})
    const[login, setLogin] = useState({})
    const loggeddata=useSelector((store)=>store.auth)
    const dispatch = useDispatch()

    const handleRegchange = (e) => {
        const {name, value} = e.target
        setregister({...register,[name]:value})
    }

    const handleRegSubmit = (e) => {
        e.preventDefault();
        dispatch(getregister(register))
    }
    const handleLogchange = (e) => {
        const {name, value} = e.target
        setLogin({...login,[name]:value})
    }

    const handleLogSubmit = (e) => {
        e.preventDefault();
        dispatch(getLogin(login))
    }
    if (loggeddata.isAuth&&loggeddata.logindata.usertoken) {
        return <Navigate to="/home" />;
      }
  return (
    <div className='loginpage'>
        <div className='regisreation'>
            <h3>Registration</h3>

            <form onSubmit={handleRegSubmit}>
            <div >
                  <label>Email </label>
                  <br />
                  <input className="form__input" type="email" name='email' id="firstName" placeholder="email" onChange={handleRegchange}/>
              </div>
              <div >
                  <label>Password </label>
                  <br />
                  <input className="form__input" type="password" name='password' id="firstName" placeholder="password" onChange={handleRegchange}/>
              </div>
              <div><button type='submit'>Register</button></div>
            </form>
        </div>
        <div className='Login'>
            <h3>Login</h3>
        <form onSubmit={handleLogSubmit}>
            <div >
                  <label>Email </label>
                  <br />
                  <input className="form__input" type="email" name='email' id="firstName" placeholder="email" onChange={handleLogchange}/>
              </div>
              <div >
                  <label>Password </label>
                  <br />
                  <input className="form__input" type="password" name='password' id="firstName" placeholder="password" onChange={handleLogchange}/>
              </div>
              <div><button type='submit'>Login</button></div>
            </form>

        </div>
    </div>
  )
}

export default Login