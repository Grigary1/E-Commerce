import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  // Placeholder images - replace with your actual images
  const images = [
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&h=800&fit=crop'
  ]
  const navigate=useNavigate();
  const [idx, setIdx] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setIdx((prevIdx) => (prevIdx + 1) % images.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);

  const categories = [
    { 
      name: "Men's Collection", 
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1000&fit=crop',
      subtitle: "Refined Style",
      color: "from-blue-600 to-indigo-900"
    },
    { 
      name: "Women's Fashion", 
      image: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800&h=1000&fit=crop',
      subtitle: "Elegant Designs",
      color: "from-rose-500 to-purple-700"
    },
    { 
      name: "Kids' Wear", 
      image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=800&h=1000&fit=crop',
      subtitle: "Playful & Comfy",
      color: "from-amber-500 to-orange-600"
    },
    { 
      name: "Accessories", 
      image: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=800&h=1000&fit=crop',
      subtitle: "Perfect Details",
      color: "from-teal-500 to-cyan-700"
    },
  ];

  return (
    <div className="relative bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Banner Section */}
      <div className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Image Carousel */}
        <div className="absolute inset-0">
          <div className="relative w-full h-full">
            {images.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1500 ${
                  index === idx ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <img 
                  src={image} 
                  alt={`Fashion ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
              </div>
            ))}
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 py-20">
          <div className={`max-w-2xl transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-3"></span>
              <span className="text-white text-sm font-medium">New Collection 2024</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Elevate Your
              <span className="block bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">
                Fashion Game
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-gray-200 mb-10 leading-relaxed">
              Discover our curated collection of premium clothing that defines modern elegance. 
              From timeless classics to contemporary trends.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group relative px-8 py-4 bg-white text-black font-semibold rounded-full overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                <span className="relative z-10">Shop Now</span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-pink-500 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Shop Now →
                </span>
              </button>
              
              <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-full backdrop-blur-sm hover:bg-white hover:text-black transition-all duration-300 hover:shadow-xl">
                View Lookbook
              </button>
            </div>

            {/* Stats */}
            <div className="flex gap-12 mt-16">
              <div className="text-white">
                <div className="text-3xl font-bold">500+</div>
                <div className="text-sm text-gray-300">Premium Brands</div>
              </div>
              <div className="text-white">
                <div className="text-3xl font-bold">50K+</div>
                <div className="text-sm text-gray-300">Happy Customers</div>
              </div>
              <div className="text-white">
                <div className="text-3xl font-bold">24/7</div>
                <div className="text-sm text-gray-300">Support</div>
              </div>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
          {images.map((_, index) => (
            <button
              key={index}
              className={`transition-all duration-300 ${
                index === idx 
                  ? 'w-12 h-2 bg-white rounded-full' 
                  : 'w-2 h-2 bg-white/50 rounded-full hover:bg-white/75'
              }`}
              onClick={() => setIdx(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 right-8 text-white animate-bounce">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* Category Section */}
      <div className="py-20 px-6 sm:px-12 lg:px-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our diverse collections designed for every style and occasion
            </p>
          </div>

          {/* Category Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
            {categories.map(({ name, image, subtitle, color }, index) => (
              <div
                key={index}
                onClick={()=>navigate('/collection')} 
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Image Container */}
                <div className="relative h-96 sm:h-80 lg:h-96 overflow-hidden">
                  <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${color} opacity-0 group-hover:opacity-80 transition-opacity duration-500`} />
                  
                  {/* Content Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  
                  {/* Text Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-transform duration-500 translate-y-2 group-hover:translate-y-0">
                    <p className="text-sm text-white/80 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      {subtitle}
                    </p>
                    <h3 className="text-2xl font-bold text-white mb-3">
                      {name}
                    </h3>
                    
                    {/* Shop Button */}
                    <div className="flex items-center text-white opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                      <span className="text-sm font-medium">Explore Collection</span>
                      <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>

                  {/* Corner Badge */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="text-xs font-bold text-gray-900">NEW</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="group">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-yellow-400 to-pink-500 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Premium Quality</h3>
              <p className="text-gray-400 text-sm">Handpicked materials and expert craftsmanship</p>
            </div>
            
            <div className="group">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Fast Shipping</h3>
              <p className="text-gray-400 text-sm">Free delivery on orders above $100</p>
            </div>
            
            <div className="group">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-400 to-teal-500 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Easy Returns</h3>
              <p className="text-gray-400 text-sm">30-day hassle-free return policy</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero


// import React, { useEffect, useState } from 'react'
// import hero_icon from './../assets/hero_icon.jpg'
// import banner1 from './../assets/banner1.jpg'
// import banner2 from './../assets/banner2.webp'
// // import { assets } from './../assets/assets.js'

// const Hero = () => {
//   const images = [hero_icon, banner1, banner2]
//   const [idx, setIdx] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setIdx((prevIdx) => (prevIdx + 1) % images.length);
//     }, 3000);
    
//     return () => clearInterval(interval);
//   }, []); // Added empty dependency array

//   return (
//     <div>
//       {/* Hero Banner Section */}
//       <div className='flex flex-col sm:flex-row border border-gray-400'>
//         <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
//           <div className='text-[#414141]'>
//             <div className='flex items-center gap-2'>
//               <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
//               <p className='font-medium text-sm md:text-base'>OUR BESTSELLERS</p>
//             </div>
//             <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'>Latest Arrivals</h1>
//             <div className='flex items-center gap-2'>
//               <p className='font-semibold text-sm md:text-base'>SHOP NOW</p>
//               <p className='w-8 md:w-11 h-[1px] bg-[#414141]'></p>
//             </div>
//           </div>
//         </div>
        
//         {/* Image container with smooth sliding transition */}
//         <div className='w-full sm:w-1/2 relative overflow-hidden'>
//           <div 
//             className='flex transition-transform duration-1000 ease-in-out'
//             style={{ transform: `translateX(-${idx * 100}%)` }}
//           >
//             {images.map((image, index) => (
//               <img 
//                 key={index}
//                 className='w-full h-64 sm:h-80 md:h-96 object-cover flex-shrink-0' 
//                 src={image} 
//                 alt={`Banner ${index + 1}`} 
//               />
//             ))}
//           </div>
          
//           {/* Optional: Add navigation dots */}
//           <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2'>
//             {images.map((_, index) => (
//               <button
//                 key={index}
//                 className={`w-2 h-2 rounded-full transition-colors duration-300 ${
//                   index === idx ? 'bg-white' : 'bg-white/50'
//                 }`}
//                 onClick={() => setIdx(index)}
//                 aria-label={`Go to slide ${index + 1}`}
//               />
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Category Grid Section - Fixed to use placeholder images */}
//       <div className="flex justify-center items-center min-h-screen bg-white p-4">
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 max-w-4xl w-full">
//           {[
//             { src: hero_icon, label: "Men" }, // Using available images as placeholders
//             { src: banner1, label: "Women" },
//             { src: banner2, label: "Kids" },
//             { src: hero_icon, label: "Accessories" },
//           ].map(({ src, label }, index) => (
//             <div
//               key={index}
//               className="p-1 rounded-2xl bg-gradient-to-r from-cyan-600 via-blue-600 to-yellow-500"
//             >
//               <div className="relative overflow-hidden rounded-xl shadow-lg h-64 hover:cursor-pointer transition-transform duration-300 hover:scale-105">
//                 <img
//                   src={src}
//                   alt={label}
//                   className="w-full h-full object-cover"
//                 />
//                 {/* Gradient fade at bottom */}
//                 <div className="absolute bottom-0 left-0 w-full h-[50%] bg-gradient-to-t from-black to-transparent" />
//                 {/* Text on gradient */}
//                 <div className="absolute bottom-2 left-0 w-full text-center px-2">
//                   <span className="text-white font-semibold text-3xl md:text-4xl lg:text-5xl pb-3">{label}</span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Hero