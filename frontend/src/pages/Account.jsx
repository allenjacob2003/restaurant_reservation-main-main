import React from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { useNavigate } from 'react-router-dom';

function Account() {
    const navigate = useNavigate();
    const handleLogout = async () => {
        await axios.get(`${backendUrl}/api/user/logout`, { withCredentials: true })
            .then(() => {
                navigate('/');
                window.location.reload();
            });
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Account</h1>
            <button
                onClick={handleLogout}
                className='bg-amber-400 text-black font-bold py-3 px-6 rounded-lg hover:bg-amber-500 transtion'
            >
                Logout
            </button>
        </div>
    );
}

export default Account;