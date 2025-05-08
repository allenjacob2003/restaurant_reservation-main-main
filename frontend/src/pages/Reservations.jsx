import React, { useContext, useEffect, useState } from 'react'
import { backendUrl } from '../App'
import axios from 'axios';
import { toast } from 'react-toastify';
import { UserContext } from '../context/UserContext';

const Reservations = () => {
    const { user } = useContext(UserContext)
    const [reservation, setReservation] = useState([])
    const handleCancel = async (id) => {
        try {
            await axios.delete(`${backendUrl}/api/reservations/delete/${id}`)
            toast.success('Reservation Canceled successfully')
        } catch (error) {
            console.log('Error deleting reservation:')
        }
    }


    useEffect(() => {

        try {
            axios.get(backendUrl + '/api/reservations/getUserReservations/' + user._id)
                .then((response) => {
                    setReservation(response.data)
                })
        } catch (error) {
            console.log("Error fetching reservation data:");
        }

    })

    return (
        <div className='min-h-screen'>
            <h2 className='text-3xl font-bold text-gray-700 text-center mb-6 mt-5'>Your Reservations</h2>
            <div className='overflow-x-auto'>
                <table className='w-full shadow-lg rounded-xl'>
                    <thead>
                        <tr className='bg-amber-500 text-left'>
                            <th className='p-3'>Date</th>
                            <th className='p-3'>Time</th>
                            <th className='p-3'>Number of Guests</th>
                            <th className='p-3'>Cancel</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            reservation.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className='p-4 text-center'>No reservations found</td>
                                </tr>
                            ) : (
                                reservation.map((res, index) => (
                                    <tr key={index} className='border-b hover:bg-gray-50'>
                                        <td className='p-3'>{new Date(res.date).toLocaleDateString()}</td>
                                        <td className='p-3'>{res.time}</td>
                                        <td className='p-3'>{res.guests}</td>
                                        <td className='p-3'>
                                            <button onClick={() => handleCancel(res._id)} className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600'>Cancel</button>
                                        </td>

                                    </tr>

                                ))
                            )
                        }
                    </tbody>

                </table>
            </div>
        </div>
    )
}

export default Reservations
