import React, { useEffect, useState } from 'react'
import { Form } from 'react-router-dom'
import { assets } from '../assets/assets'

const Add = ({ token }) => {

  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  console.log(name);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  console.log(category);
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestSeller, setBestSeller] = useState(false);
  const [sizes, setSizes] = useState([]);
  useEffect(()=>{
    console.log("sizes",sizes);
  },[sizes])
  return (
    <form className='flex flex-col w-full items-start gap-3'>
      <div>
        <p className='mb-2'>Upload Image</p>
        <div className='flex gap-2'>
          <label htmlFor="image1">
            <img className='w-28' src={image1 ? URL.createObjectURL(image1) : assets.upload_area} alt="" />
            <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" hidden />
          </label>
          <label htmlFor="image2">
            <img className='w-28' src={image2 ? URL.createObjectURL(image2) : assets.upload_area} alt="" />
            <input onChange={(e) => setImage2(e.target.files[0])} type="file" id="image2" hidden />
          </label>
          <label htmlFor="image3">
            <img className='w-28' src={image3 ? URL.createObjectURL(image3) : assets.upload_area} alt="" />
            <input onChange={(e) => setImage3(e.target.files[0])} type="file" id="image3" hidden />
          </label>
          <label htmlFor="image4">
            <img className='w-28' src={image4 ? URL.createObjectURL(image4) : assets.upload_area} alt="" />
            <input onChange={(e) => setImage4(e.target.files[0])} type="file" id="image4" hidden />
          </label>
        </div>
      </div>

      {/* Product Name */}
      <div className='w-full'>
        <p className='mb-2'>Product Name</p>
        <input onChange={(e) => setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type Here' required />
      </div>

      {/* Description */}
      <div className='w-full'>
        <p className='mb-2'>Product Description</p>
        <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2' type="Write content here" placeholder='Type Here' required />
      </div>

      {/* Product Category */}
      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div>
          <p className='mb-2'>Product Category</p>
          <select onChange={(e) => setCategory(e.target.value)} className="w-full px-3 py-2">
            <option value="" disabled>Select a category</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>

        </div>

        {/* Sub Category */}
        <div>
          <p className='mb-2'>Sub Category</p>
          <select onChange={(e)=>setSubCategory(e.target.value)} className='w-full px-3 py-2'>
          <option value="" disabled>Select subCategory</option>
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select> 
        </div>


        <div> 
          <p className='mb-2'>Product Price</p>
          <input onChange={(e)=>setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px]' type="number" placeholder='25' required />
        </div>
      </div>
      <div>
        <p  className='mb-2'>Product Sizes</p>
        <div className='flex gap-3'>
          <div onClick={()=>{setSizes(prev=>prev.includes("S")?prev.filter((item)=>item!=='S'):[...prev,"S"])}}>
            <p className={`${sizes.includes("S")?'bg-pink-100':'bg-slate-200'} px-3 py-1 cursor-pointer `}>S</p>
          </div>
          <div onClick={()=>{setSizes(prev=>prev.includes("M")?prev.filter((item)=>item!=='M'):[...prev,"M"])}}>
            <p className={`${sizes.includes("M")?'bg-pink-100':'bg-slate-200'} px-3 py-1 cursor-pointer `}>M</p>
          </div>
          <div onClick={()=>{setSizes(prev=>prev.includes("L")?prev.filter((item)=>item!=='L'):[...prev,"L"])}}>
            <p className={`${sizes.includes("L")?'bg-pink-100':'bg-slate-200'} px-3 py-1 cursor-pointer `}>L</p>
          </div>
          <div onClick={()=>{setSizes(prev=>prev.includes("XL")?prev.filter((item)=>item!=='XL'):[...prev,"XL"])}}>
            <p className={`${sizes.includes("XL")?'bg-pink-100':'bg-slate-200'} px-3 py-1 cursor-pointer `}>XL</p>
          </div>
          <div onClick={()=>{setSizes(prev=>prev.includes("XXL")?prev.filter((item)=>item!=='XXL'):[...prev,"XXL"])}}>
            <p className={`${sizes.includes("XXL")?'bg-pink-100':'bg-slate-200'} px-3 py-1 cursor-pointer `}>XXL</p>
          </div>
        </div>
      </div>

      <div className='flex gap-2 mt-2'>
        <input type="checkbox" name="" id="" />
        <label className='cursor-pointer' htmlFor="bestSeller">Add to bestSeller</label>
      </div>
      <button className='w-28 py-3 mt-4 bg-black text-white' type="submit">ADD</button>
    </form>
  )
}

export default Add