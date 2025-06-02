import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const AboutUs = () => {
   const [abhi, setAbhi] = useState([]);
   const [pawan,setPawan]=useState([])
   const [parth, setParth] = useState([]);

   useEffect(() => {
     fetch("https://api.github.com/users/akkiabhi-03")
       .then((response) => response.json())
       .then((data) => {
         //  console.log(data);
         setAbhi(data);
       });
       fetch("https://api.github.com/users/PawanKB9")
         .then((response) => response.json())
         .then((data) => {
           //  console.log(data);
           setPawan(data);
         });
          fetch("https://api.github.com/users/parth-shukla-18")
            .then((response) => response.json())
            .then((data) => {
              //  console.log(data);
              setParth(data);
            });
   }, []);
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex flex-col items-center justify-center p-6">
      <div className="max-w-5xl bg-white p-10 rounded-2xl shadow-2xl text-center ">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">About Us</h1>

        {/* Team Cards */}
        <div className="flex flex-col justify-evenly md:flex-row items-center  gap-6 mb-6 ">
          <div className="bg-gray-100 p-6 rounded-xl shadow-lg text-center w-64 transform hover:scale-105 transition duration-300 ease-in-out">
            <img
              src={pawan.avatar_url}
              className="w-24 h-24 rounded-full mx-auto mb-4"
              alt="NOT found"
            />
            <h2 className="text-xl font-semibold text-gray-800">
              {" "}
              Pawan Kumar Bind{" "}
            </h2>
            <p className="text-gray-600">pawanbhai@example.com</p>
            <div className="mt-2">
              <a href="https://www.linkedin.com/in/pawan-bind-27b126276/"  className="text-blue-500 hover:underline" target="_new">
                LinkedIn
              </a>{" "}
              |
              <a href="https://github.com/PawanKB9" className="text-blue-500 hover:underline" target="_new">
                {" "}
                Github
              </a>
            </div>
          </div>

          <div className="bg-gray-100 p-6 rounded-xl shadow-lg text-center w-64 transform hover:scale-105 transition duration-300 ease-in-out">
            <img
              src={parth.avatar_url}
              className="w-24 h-24 rounded-full mx-auto mb-4"
              alt="NOT found"
            />
            <h2 className="text-xl font-semibold text-gray-800">Parth Shukla</h2>
            <p className="text-gray-600">parthbhai@example.com</p>
            <div className="mt-2">
              <a href="#" className="text-blue-500 hover:underline">
                LinkedIn
              </a>{" "}
              |
              <a href="https://github.com/parth-shukla-18" className="text-blue-500 hover:underline" target="_new">
                {" "}
                Github
              </a>
            </div>
          </div>
          <div className="bg-gray-100 p-6 rounded-xl shadow-lg text-center w-64 transform hover:scale-105 transition duration-300 ease-in-out">
            <img
              src={abhi.avatar_url}
              className="w-24 h-24 rounded-full mx-auto mb-4"
              alt="NOT found"
            />

            <h2 className="text-xl font-semibold text-gray-800">
              {" "}
              Abhishek Sharma{" "}
            </h2>
            <p className="text-gray-600">abhishek@example.com</p>
            <div className="mt-2">
              <a href="https://www.linkedin.com/in/abhishek-sharma-b3787327a/" className="text-blue-500 hover:underline " target="_new">
                LinkedIn
              </a>{" "}
              |
              <a href="https://github.com/akkiabhi-03" className="text-blue-500 hover:underline" target="_new">
                {" "}
                Github
              </a>
            </div>
          </div>
        </div>

        <p className="mt-4 text-gray-600 text-lg leading-relaxed">
          Welcome to our platform, where creativity meets functionality! We
          provide a space for designers and developers to showcase their UI
          components, including buttons, hero sections, navbars, and more.
        </p>
        <p className="mt-4 text-gray-600 text-lg leading-relaxed">
          Our goal is to create a community-driven library of high-quality UI
          elements that can be easily reused and customized by others.
        </p>
        <p className="mt-4 text-gray-600 text-lg leading-relaxed">
          Whether you're looking for inspiration or want to contribute your own
          designs, we welcome you to be a part of our growing community.
        </p>
        <div className="mt-6">
          <button  className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-full shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out">
            Join Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;