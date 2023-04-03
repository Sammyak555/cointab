import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { getlogout } from '../Redux/Auth/action'

const Home = () => {
   const loggeddata=useSelector((store)=>store.auth)
   const dispatch = useDispatch()
   console.log(loggeddata.logindata)
    useEffect(()=>{
       
    },[])
    if(!loggeddata.isAuth){
      return <Navigate to="/" />;
    }
  return (
    <div>
      <div>
      {
        loggeddata.logindata&&
        <>
        <h2>{loggeddata.logindata.user}</h2>
      <button onClick={()=>dispatch(getlogout())}>LOGOUT</button>
        </>
      }
      </div>
    </div>
  )
}

export default Home