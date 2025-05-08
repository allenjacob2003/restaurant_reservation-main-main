import React, { useState } from 'react'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Signup = ({ setToken }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')

    const OnsubmitHandler = async (e) => {
        try {
            e.preventDefault();

            await axios.post(backendUrl + '/api/user/signup', { name,email, password })
            .then((response) => {
                navigate('/login')
              })
              .catch((error) => {
                toast.error(error.response.data.message)
              })
        

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <div className='flex justify-center items-center min-h-screen bg-gray-100'>
                <div className='bg-white p-8 rounded-lg shadow-md w-96 px-8 py-6 w-full max-w-md'>
                    <h1 className='text-2xl font-bold text-center text-gray-800 mb-4'>Register</h1>
                    <form onSubmit={OnsubmitHandler}>
                        <div className='mb-4'>
                            <p className='text-sm font-semibold text-gray-600 mb-2'>Name</p>
                            < input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter the Name" required className='w[95%] px-3 py-2 border-gray-300 rounded-md text-sm focus:outline-none focus:border-b-gray-800' />
                        </div>
                        <div className='mb-4'>
                            <p className='text-sm font-semibold text-gray-600 mb-2'>Email Address</p>
                            < input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" required className='w[95%] px-3 py-2 border-gray-300 rounded-md text-sm focus:outline-none focus:border-b-gray-800' />
                        </div>
                        <div className='mb-4'>
                            <p className='text-sm font-semibold text-gray-600 mb-2'>Password</p>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" required className='w[95%] px-3 py-2 border-gray-300 rounded-md text-sm focus:outline-none focus:border-b-gray-800' />
                        </div>
                        <button type='submit' className='w-full px-3 py-2 text-lg font-bold bg-amber-500 rounded-md'>Signup</button>
                        <div className='mb-4'>
                            <p className='text-sm font-semibold text-gray-600 mb-2'>Already have an account? <a onClick={() => { navigate('/login') }} className='text-blue'>Login</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup
