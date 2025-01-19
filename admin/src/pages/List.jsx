import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import './../loader/loader.css'
import { toast } from 'react-toastify'

const List = ({ token }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [list, setList] = useState([])
  const fetchItems = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list');
      if (response.data.success) {
        console.log(response)
        setList(response.data.products)
        setIsLoaded(true)
      }
      else {
        console.log("Success false")
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log("Error in listing")
      toast.error(error.message)
    }
  }
  const handleRemove=async(id)=>{
    try {
      const response=await axios.post(backendUrl+'/api/product/remove',{id},{headers:{token}})
      if (response.data.success){
        toast.success(response.data.message)
        await fetchItems()
      }
      else{
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  useEffect(() => {
    fetchItems()
  }, [])
  return (
    <>
  {/* Title */}
  <p className="mb-4 text-lg font-semibold">All Products List</p>

  {/* Product List Container */}
  <div className="flex flex-col gap-2">
    {/* List Table Title (Header Row) */}
    <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-3 border bg-gray-100 text-sm font-medium">
      <b className="text-center">Image</b>
      <b>Name</b>
      <b>Category</b>
      <b>Price</b>
      <b className="text-center">Action</b>
    </div>

    {/* Product List */}
    {list.map((item, index) => (
      <div
        key={index}
        className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-2 px-3 border text-sm"
      >
        {/* Product Image */}
        <img
          className="w-12 h-12 object-cover mx-auto"
          src={item.image[0]}
          alt={item.name || "Product Name"}
        />

        {/* Product Name */}
        <p className="truncate">{item.name}</p>

        {/* Product Category */}
        <p className="truncate text-gray-600">{item.category}</p>

        {/* Product Price */}
        <p className="font-medium">
          {currency}
          {item.price}
        </p>

        {/* Action (Remove Button) */}
        <button
          className="text-right md:text-center text-lg text-red-500 hover:text-red-700 cursor-pointer"
          onClick={()=>handleRemove(item._id)} // Ensure you have a `handleRemove` function
          aria-label={`Remove ${item.name}`}
        >

          X
        </button>
      </div>
    ))}
  </div>
</>

  )
}
export default List