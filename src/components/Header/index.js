import React, { useEffect } from 'react'
import "./style.css"
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import userImg from "../../asset/icon.png"

function Header() {
  const [user, loading] = useAuthState(auth, );
  const navigate=useNavigate()


  useEffect(()=>{
      if(user){
          navigate("/dashboard")
      }
  },[user, loading])

  function logoutFnc(){
    if(user){
      try {
        signOut(auth).then(()=>{
          toast.success("User logged out")
          navigate("/")
        }).catch((e)=>{
          toast.error(e.message)
        })
        
      } catch (error) {
        toast.error(error.message)
      }
    }else{
      toast.error("User Must be logged")
    }
    
  }
  return (
    <div className='navbar'>
      <p  className="logo" >Financly.</p>

      {user && (
        <div style={{display:"flex",alignItems:"center",gap:"0.5rem"}}>
          <img style={{borderRadius:"50%"}} src={user.photoURL? user.photoURL:userImg}
          height="30rem" alt='userIcon' width={"30rem"} />
           <p className="logo link" onClick={logoutFnc}>Logout</p>
        </div>
      )}
     
    </div>
  )
}

export default Header