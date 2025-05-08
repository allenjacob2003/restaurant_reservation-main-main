import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

const Navbar = () => {
  const {user,setUser} = useContext(UserContext)
  const navigate = useNavigate();
  const loginNavigate = () => {
    navigate('/login')
  }

  const reservationNavigate = () =>{
    if(user){
      navigate('/reservations')
    }else{
      navigate('/login')
    }
  }
  return (
    <div>
      <nav className='flex justify-between p-[2rem] bg-black text-white'>
        <div>
          <h1 className='font-blod text-2x1'>Forked</h1>
        </div>
        <div>
          <ul className='flex justify-between gap-8'>
            <a href="/"><li className='font-bold text-lg cursor-pointer hover:text-amber-400'>HOME</li></a>
            <a href=""><li className='font-bold text-lg cursor-pointer hover:text-amber-400'>MENU</li></a>
            <a><li className='font-bold text-lg cursor-pointer hover:text-amber-400' onClick={()=>reservationNavigate()}>RESERVATIONS</li></a>
            {
              user && (
                <a><li className='font-bold text-lg cursor-pointer hover:text-amber-400' onClick={()=>{navigate('/account')}}>ACCOUNT</li></a>
              )
            }
            {
              !user && (
                <a><li className='font-bold text-lg cursor-pointer hover:text-amber-400' onClick={() => loginNavigate()}>LOGIN</li></a>

              )
            }
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
