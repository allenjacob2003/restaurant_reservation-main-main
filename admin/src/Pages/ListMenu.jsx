import React, { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useState} from 'react'
import { backendUrl } from '../App'
import axios from 'axios'
import { MdDeleteForever } from 'react-icons/md'


const ListMenu = ({token}) => {
  const [list, setList] = useState([])

  const deleteMenuItem=async(id)=>{
    try {
      await axios.delete(`${backendUrl}/api/product/deleteMenuItem/${id}`)
      .then((response)=>{
        toast.success(response.data.message)
      })
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    }
  }

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list',{Headers:{token}})
      if (response.data.success){
        setList(response.data.products)
      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    fetchList()
  },[])
  return (
    <div>
      <p className='mb-2 font-bold text-2xl'>Menu List</p>
      <div className='flex flex-col gap-2'>
        <div className='grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center p-2 border-b-2 border-gray-300 text-lg font-semibold'>
          <b>Image</b>
          <b>Name</b>
          <b>category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>

        {list.map((item,index)=>
        <div key={index} className='grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center p-2 border-b-2 border-gray-300 text-lg'>
          <img src={`${backendUrl}/menu_images/${item.Image}`} alt=""  className='w-[50px] h-auto'/>
          <p>{item.name}</p>
          <p>{item.category}</p>
          <p>{item.price}</p>
          <MdDeleteForever className='ml-10 text-[28px] cursor-pointer text-red-700' onClick={()=>deleteMenuItem(item._id)}/>

          </div>
        )}

      </div>
    </div>
  )
}

export default ListMenu