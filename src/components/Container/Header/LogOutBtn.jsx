import React from 'react'
import { useDispatch } from 'react-redux'
import authservice  from '../../../Appwrite/auth';


function Logoutbtn() {
    const dispatch = useDispatch();
    const ButtonFunction = () => {
        authservice.logout().then(()=>{
            dispatch(logout())
        })


    }


  return (
   <button 
   onClick={ButtonFunction}
   className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
   >LogOut</button>
  )
}

export default Logoutbtn
