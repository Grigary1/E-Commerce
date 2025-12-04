import React from "react";

const About = () => {
  return (
    <div className="w-full bg-[#ffecec] py-16 px-6 md:px-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        
        {/* LEFT - Brand Story */}
        <div className="flex flex-col gap-4">
          <img 
            src="https://img.freepik.com/free-vector/gradient-company-logo-design_23-2149492359.jpg" 
            alt="GCart Logo" 
            className="w-28 h-28 object-cover rounded-full mb-2"
          />

          <h2 className="text-2xl font-semibold">About GCart</h2>

          <p className="text-gray-700 leading-relaxed">
            GCart is your trusted online shopping destination. We provide a 
            curated collection of quality products at affordable prices. 
            Our mission is to make online shopping simple, fast, and enjoyable 
            for everyone.
          </p>

          <p className="text-gray-700 leading-relaxed">
            With secure payments, fast delivery, and excellent customer support, 
            GCart aims to deliver a seamless shopping experience you can rely on.
          </p>
        </div>

        {/* RIGHT - Info */}
        <div className="flex flex-col md:flex-row justify-between gap-10">
          
          {/* <div>
            <h3 className="font-semibold text-lg mb-3">COMPANY</h3>
            <ul className="flex flex-col gap-2 text-gray-700">
              <li>Home</li>
              <li>About Us</li>
              <li>Delivery</li>
              <li>Privacy Policy</li>
            </ul>
          </div> */}

        

        </div>

      </div>
    </div>
  );
};

export default About;
