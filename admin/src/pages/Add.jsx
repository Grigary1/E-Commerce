import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'
import { backendUrl } from '../App.jsx'

const SIZES = ["XS","S","M","L","XL","XXL"]

export default function Add({ token, sellerId }) {
  // Product‐level state
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [brand, setBrand] = useState('')
  const [tags, setTags] = useState('')  // comma-separated

  // Image state: exactly 4 images (base + 3 extras)
  const [images, setImages] = useState([null, null, null, null])

  // Variants: one entry per size/color combination (no per-variant images)
  const [variants, setVariants] = useState([
    { sku: '', size: 'M', color: '', price: '', stock: '' }
  ])

  // Compute total stock across all variants
  const totalStock = variants.reduce(
    (sum, v) => sum + (parseInt(v.stock, 10) || 0),
    0
  )

  // Handlers
  const handleImageChange = (idx, file) => {
    setImages(imgs => {
      const copy = [...imgs]
      copy[idx] = file
      return copy
    })
  }

  const updateVariant = (idx, field, value) => {
    setVariants(vs => {
      const copy = [...vs]
      copy[idx] = { ...copy[idx], [field]: value }
      return copy
    })
  }

  const addVariant = () =>
    setVariants(vs => [
      ...vs,
      { sku: '', size: 'M', color: '', price: '', stock: '' }
    ])

  const removeVariant = idx =>
    setVariants(vs => vs.filter((_, i) => i !== idx))

  const onSubmit = async e => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append('sellerId', sellerId)
      formData.append('title', title)
      formData.append('description', description)
      formData.append('category', category)
      formData.append('brand', brand)
      formData.append('tags', JSON.stringify(tags.split(',').map(t => t.trim())))

      // Append images: index 0 -> baseImage, 1->image2, 2->image3, 3->image4
      images.forEach((file, idx) => {
        if (file) {
          const fieldName = idx === 0 ? 'baseImage' : `image${idx + 1}`
          formData.append(fieldName, file)
        }
      })

      // Prepare variants payload without images
      const simpleVariants = variants.map(v => ({
        sku: v.sku,
        size: v.size,
        color: v.color,
        price: parseFloat(v.price),
        stock: parseInt(v.stock, 10)
      }))
      formData.append('variants', JSON.stringify(simpleVariants))
      console.log("Form data ",formData);
      const { data } = await axios.post(
        `${backendUrl}/api/product/add`,
        formData,
        { headers: { token, 'Content-Type': 'multipart/form-data' } }
      )
      if (data.success) {
        toast.success('Product added!')
        setTitle('')
        setDescription('')
        setCategory('')
        setBrand('')
        setTags('')
        setImages([null, null, null, null])
        setVariants([{ sku: '', size: 'M', color: '', price: '', stock: '' }])
      } else {
        toast.error('Failed to add product')
      }
    } catch (err) {
      toast.error('Server error')
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-6 max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow"
    >
      {/* Images: baseImage + 3 extras */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Product Images</h2>
        <div className="flex gap-4">
          {images.map((img, idx) => (
            <label key={idx} className="block">
              <div className="w-28 h-28 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                {img ? (
                  <img
                    src={URL.createObjectURL(img)}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <img
                    src={assets.upload_area}
                    alt="upload"
                    className="object-contain w-full h-full p-2"
                  />
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={e => handleImageChange(idx, e.target.files[0])}
              />
            </label>
          ))}
        </div>
      </div>

      {/* Top-level Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Category</label>
          <input
            value={category}
            onChange={e => setCategory(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
            className="w-full px-3 py-2.border.rounded"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Brand</label>
          <input
            value={brand}
            onChange={e => setBrand(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Tags (comma-separated)</label>
          <input
            value={tags}
            onChange={e => setTags(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
      </div>

      {/* Variants */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Variants</h2>
        {variants.map((v, i) => (
          <div key={i} className="mb-4 p-4 border rounded space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium">Variant #{i+1}</span>
              {variants.length > 1 && (
                <button
                  type="button"
                  className="text-red-500"
                  onClick={() => removeVariant(i)}
                >
                  Remove
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block mb-1">SKU</label>
                <input
                  value={v.sku}
                  onChange={e => updateVariant(i, 'sku', e.target.value)}
                  required
                  className="w-full px-2 py-1 border rounded"
                />
              </div>
              <div>
                <label className="block mb-1">Size</label>
                <select
                  value={v.size}
                  onChange={e => updateVariant(i, 'size', e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                >
                  {SIZES.map(sz => <option key={sz}>{sz}</option>)}
                </select>
              </div>
              <div>
                <label className="block mb-1">Color</label>
                <input
                  value={v.color}
                  onChange={e => updateVariant(i, 'color', e.target.value)}
                  required
                  className="w-full px-2 py-1 border.rounded"
                />
              </div>
              <div>
                <label className="block mb-1">Price</label>
                <input
                  type="number"
                  value={v.price}
                  onChange={e => updateVariant(i, 'price', e.target.value)}
                  required
                  className="w-full px-2 py-1 border rounded"
                />
              </div>
              <div>
                <label className="block mb-1">Stock</label>
                <input
                  type="number"
                  value={v.stock}
                  onChange={e => updateVariant(i, 'stock', e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                />
              </div>
            </div>
          </div>
        ))}
        <button
          type="button"
          className="px-3 py-1 bg-gray-200 rounded"
          onClick={addVariant}
        >
          + Add Variant
        </button>
      </div>

      {/* Total Stock */}
      <div className="flex justify-end text-sm font-medium">
        <span>Total Units Available:</span>
        <span className="ml-2">{totalStock}</span>
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-black text-white rounded-xl"
      >
        Save Product
      </button>
    </form>
  )
}


// import React, { useState } from 'react'
// import axios from 'axios'
// import { toast } from 'react-toastify'
// import { assets } from '../assets/assets'
// import { backendUrl } from '../App.jsx'

// const SIZES = ["XS","S","M","L","XL","XXL"]

// export default function Add({ token, sellerId }) {
//   // Product‐level state
//   const [title, setTitle] = useState('')
//   const [description, setDescription] = useState('')
//   const [category, setCategory] = useState('')
//   const [brand, setBrand] = useState('')
//   const [tags, setTags] = useState('')           // comma-separated
//   const [baseImage, setBaseImage] = useState(null)

//   // Variants: one entry per size/color combination
//   const [variants, setVariants] = useState([
//     { sku: '', size: 'M', color: '', price: '', stock: '', images: [null] }
//   ])

//   // Compute total stock across all variants
//   const totalStock = variants.reduce(
//     (sum, v) => sum + (parseInt(v.stock, 10) || 0),
//     0
//   )

//   // Handlers
//   const onBaseImageChange = file => setBaseImage(file)

//   const updateVariant = (idx, field, value) => {
//     setVariants(vs => {
//       const copy = [...vs]
//       copy[idx] = { ...copy[idx], [field]: value }
//       return copy
//     })
//   }

//   const addVariant = () =>
//     setVariants(vs => [
//       ...vs,
//       { sku: '', size: 'M', color: '', price: '', stock: '', images: [null] }
//     ])

//   const removeVariant = idx =>
//     setVariants(vs => vs.filter((_, i) => i !== idx))

//   const onSubmit = async e => {
//     e.preventDefault()
//     const formData = new FormData()
//     formData.append('sellerId', sellerId)
//     formData.append('title', title)
//     formData.append('description', description)
//     formData.append('category', category)
//     formData.append('brand', brand)
//     formData.append('tags', JSON.stringify(tags.split(',').map(t => t.trim())))
//     if (baseImage) formData.append('baseImage', baseImage)

//     // Prepare variants payload
//     const simpleVariants = variants.map(v => ({
//       sku: v.sku,
//       size: v.size,
//       color: v.color,
//       price: parseFloat(v.price),
//       stock: parseInt(v.stock, 10),
//       images: []
//     }))
//     formData.append('variants', JSON.stringify(simpleVariants))

//     // Append each variant's image file
//     variants.forEach((v, i) => {
//       if (v.images[0]) {
//         formData.append(`variantImage-${i}`, v.images[0])
//       }
//     })

//     try {
//       const { data } = await axios.post(
//         `${backendUrl}/api/product/add`,
//         formData,
//         { headers: { token, 'Content-Type': 'multipart/form-data' } }
//       )
//       if (data.success) {
//         toast.success('Product added!')
//         // Reset all fields
//         setTitle('')
//         setDescription('')
//         setCategory('')
//         setBrand('')
//         setTags('')
//         setBaseImage(null)
//         setVariants([{ sku: '', size: 'M', color: '', price: '', stock: '', images: [null] }])
//       } else {
//         toast.error('Failed to add product')
//       }
//     } catch (err) {
//       toast.error('Server error')
//     }
//   }

//   return (
//     <form
//       onSubmit={onSubmit}
//       className="space-y-6 max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow"
//     >
//       {/* Base Image */}
//       <div>
//         <label className="block mb-1 font-medium">Base Image</label>
//         <div className="w-32 h-32 bg-gray-100 rounded overflow-hidden mb-2">
//           {baseImage
//             ? <img src={URL.createObjectURL(baseImage)} className="w-full h-full object-cover"/>
//             : <img src={assets.upload_area} className="w-full h-full p-2 object-contain"/>
//           }
//         </div>
//         <input
//           type="file"
//           accept="image/*"
//           onChange={e => onBaseImageChange(e.target.files[0])}
//         />
//       </div>

//       {/* Top-level Fields */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//         <div>
//           <label className="block mb-1 font-medium">Title</label>
//           <input
//             value={title}
//             onChange={e => setTitle(e.target.value)}
//             required
//             className="w-full px-3 py-2 border rounded"
//           />
//         </div>
//         <div>
//           <label className="block mb-1 font-medium">Category</label>
//           <input
//             value={category}
//             onChange={e => setCategory(e.target.value)}
//             required
//             className="w-full px-3 py-2 border rounded"
//           />
//         </div>
//         <div className="sm:col-span-2">
//           <label className="block mb-1 font-medium">Description</label>
//           <textarea
//             value={description}
//             onChange={e => setDescription(e.target.value)}
//             required
//             className="w-full px-3 py-2 border rounded"
//           />
//         </div>
//         <div>
//           <label className="block mb-1 font-medium">Brand</label>
//           <input
//             value={brand}
//             onChange={e => setBrand(e.target.value)}
//             className="w-full px-3 py-2 border rounded"
//           />
//         </div>
//         <div>
//           <label className="block mb-1 font-medium">Tags (comma-separated)</label>
//           <input
//             value={tags}
//             onChange={e => setTags(e.target.value)}
//             className="w-full px-3 py-2 border rounded"
//           />
//         </div>
//       </div>

//       {/* Variants */}
//       <div>
//         <h2 className="text-lg font-semibold mb-2">Variants</h2>
//         {variants.map((v, i) => (
//           <div key={i} className="mb-4 p-4 border rounded space-y-2">
//             <div className="flex justify-between items-center">
//               <span className="font-medium">Variant #{i+1}</span>
//               {variants.length > 1 && (
//                 <button
//                   type="button"
//                   className="text-red-500"
//                   onClick={() => removeVariant(i)}
//                 >
//                   Remove
//                 </button>
//               )}
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//               <div>
//                 <label className="block mb-1">SKU</label>
//                 <input
//                   value={v.sku}
//                   onChange={e => updateVariant(i, 'sku', e.target.value)}
//                   required
//                   className="w-full px-2 py-1 border rounded"
//                 />
//               </div>
//               <div>
//                 <label className="block mb-1">Size</label>
//                 <select
//                   value={v.size}
//                   onChange={e => updateVariant(i, 'size', e.target.value)}
//                   className="w-full px-2 py-1 border rounded"
//                 >
//                   {SIZES.map(sz => <option key={sz}>{sz}</option>)}
//                 </select>
//               </div>
//               <div>
//                 <label className="block mb-1">Color</label>
//                 <input
//                   value={v.color}
//                   onChange={e => updateVariant(i, 'color', e.target.value)}
//                   required
//                   className="w-full px-2 py-1 border rounded"
//                 />
//               </div>
//               <div>
//                 <label className="block mb-1">Price</label>
//                 <input
//                   type="number"
//                   value={v.price}
//                   onChange={e => updateVariant(i, 'price', e.target.value)}
//                   required
//                   className="w-full px-2 py-1 border rounded"
//                 />
//               </div>
//               <div>
//                 <label className="block mb-1">Stock</label>
//                 <input
//                   type="number"
//                   value={v.stock}
//                   onChange={e => updateVariant(i, 'stock', e.target.value)}
//                   className="w-full px-2 py-1 border rounded"
//                 />
//               </div>
//               <div>
//                 <label className="block mb-1">Image</label>
//                 <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden mb-1">
//                   {v.images[0]
//                     ? <img src={URL.createObjectURL(v.images[0])} className="w-full h-full object-cover"/>
//                     : <img src={assets.upload_area} className="w-full p-1 object-contain"/>
//                   }
//                 </div>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={e => {
//                     const file = e.target.files[0]
//                     updateVariant(i, 'images', [file])
//                   }}
//                 />
//               </div>
//             </div>
//           </div>
//         ))}
//         <button
//           type="button"
//           className="px-3 py-1 bg-gray-200 rounded"
//           onClick={addVariant}
//         >
//           + Add Variant
//         </button>
//       </div>

//       {/* Total Stock */}
//       <div className="flex justify-end text-sm font-medium">
//         <span>Total Units Available:</span>
//         <span className="ml-2">{totalStock}</span>
//       </div>

//       <button
//         type="submit"
//         className="w-full py-3 bg-black text-white rounded-xl"
//       >
//         Save Product
//       </button>
//     </form>
//   )
// }
