import React from 'react'
import PaginationRounded from '../components/PaginationRounded'
import { FaGithub, FaGitlab, FaLinkedin } from "react-icons/fa";
const Contact = () => {
  return (
    <div className="w-full bg-[#ffecec] py-20 px-6 md:px-20">
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-8">
        
        <h2 className="text-3xl font-semibold">Get in Touch</h2>

        <p className="text-gray-700 max-w-2xl leading-relaxed">
          Have questions, feedback, or want to connect?  
          Reach out anytime — we’d love to hear from you!
        </p>

        {/* Icons */}
        <div className="flex gap-8 text-4xl text-gray-700 mt-4">
          
          <a 
            href="https://github.com/Grigary1"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black transition"
          >
            <FaGithub />
          </a>

          <a 
            href="https://gitlab.com/grigaryvarkey16"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black transition"
          >
            <FaGitlab />
          </a>

          <a 
            href="https://www.linkedin.com/in/grigarymvarkey/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-700 transition"
          >
            <FaLinkedin />
          </a>

        </div>

      </div>
    </div>
  );
};

export default Contact;
