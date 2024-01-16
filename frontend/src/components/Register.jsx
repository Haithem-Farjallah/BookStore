import React, { useEffect } from 'react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import google from '../images/Google.svg'
import img7 from '../images/Vector1.png'



const Register = () => {
  
  const [required,setRequired]=useState({
    name:false,
    familyname:false,
    email:false,
    password:false,
  });
  let [forms,setForms]=useState({
    name:"",
    familyname:"",
    email:"",
    password:"",
    remember:false,
    student:false
  })
  const handleChange=(e)=> {
    setRequired({...required,[e.target.name]:false})
    setForms({...forms,[e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value,});
    console.log(forms)
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    let exe={...required}
    for(let form in forms){
      if(!forms[form]){
        exe={...exe,[form]:true}
      }
    }
    setRequired(exe)
  }
  return (
    <div className=' h-[140%] bg-gradient-to-tl from-bgreen to-green-300 overflow-hidden'>
         <img src={img7} alt="" className='float-right  -ml-48 -mt-12' />

      <div className='  h-[100%]  flex justify-center items-center '>
        <div  className='  bg-bgcolor h-[90%]  w-[60%] flex flex-col justify-center items-center rounded-3xl drop-shadow-2xl'>
          <h1  className=' text-[#5f5f7e] font-semibold uppercase text-4xl '>Create an account</h1>
          <p className='text-pgray  text-lg my-2'>Create an account to enjoy all our services.</p>
            <form onSubmit={handleSubmit} method='post' className="flex flex-col justify-center items-start mt-5 space-y-2  w-[60%]">
                <label htmlFor="name" className="text-pgray font-semibold">Name</label>
                <input type="text" id="name" name="name" onChange={handleChange} placeholder='Enter your Name' className="w-full font-meduim placeholder:font-normal py-1 px-2 text-green-700  rounded-lg outline-none shadow-test focus:shadow-testhover"/>
                {required.name && <p className='text-red-500 text-xs font-bold pl-2'>*Name is required!</p> }
                <label htmlFor="familyname" className="text-pgray font-semibold">Family Name</label>
                <input type="text" id="familyname" name="familyname" onChange={handleChange} placeholder='Enter your Family Name' className="w-full font-meduim placeholder:font-normal py-1 px-2 text-green-700  rounded-lg outline-none shadow-test focus:shadow-testhover"/>
                {required.familyname && <p className='text-red-500 text-xs font-bold pl-2'>*Family Name is required!</p> }

                <label htmlFor="email" className="text-pgray font-semibold">Email</label>
                <input type="email" id="email" name="email" onChange={handleChange} placeholder='Enter your email' className="w-full font-meduim placeholder:font-normal py-1 px-2 text-green-700  rounded-lg outline-none shadow-test focus:shadow-testhover"/>
                {required.email && <p className='text-red-500 text-xs font-bold pl-2'>*Email is required!</p> }
                <label htmlFor="password" className="text-pgray font-semibold">Password</label>
                <input type="password" id="password" name="password" onChange={handleChange} placeholder='********'  className="w-full py-1 px-2 text-green-700  outline-none rounded-lg shadow-test focus:shadow-testhover"/>
                {required.password && <p className='text-red-500 text-xs font-bold pl-2'>*Password is required!</p> }
                <label htmlFor="confirmpassword" className="text-pgray font-semibold">Confirm Password</label>
                <input type="password" id="confirmpassword" name="confirmpassword" onChange={handleChange} placeholder='********'  className="w-full py-1 px-2 text-green-700  outline-none rounded-lg shadow-test focus:shadow-testhover"/>
                { false &&<p className='text-red-500 text-xs font-bold pl-2'>*Password is required!</p> }

                <div className="  space-x-2  mt-5  w-full ">
                    <input type="checkbox" name='remember' id="remember" onChange={handleChange} className=" align-middle outline-none mb-[1px] ml-2 "/>
                    <label htmlFor="remember" className="text-sm  text-pgray outline-none">Remember me</label>
                </div>
                <div className="  space-x-2  mt-1  w-full ">
                    <input type="checkbox" name='student' id="student" onChange={handleChange} className=" align-middle outline-none mb-[1px] ml-2 "/>
                    <label htmlFor="student" className="text-sm  text-pgray outline-none">I am currently a Student.</label>
                </div>
                <button className="bg-bgreen w-full rounded-xl py-2  text-white outline-green-800 shadow-test hover:shadow-testhover ">Sign Up</button>
            </form>
            <button className='flex justify-center space-x-2 mt-3 mb-5 w-[60%] font-[450] rounded-xl py-2 shadow-test hover:shadow-testhover bg-white text-darkblue border border-gray-400 outline-gray-500'>
               <span><img src={google} alt="google"  /></span><p>Sign up with  google</p>
              </button>
            <div className='flex justify-center space-x-2 text-xs w-[60%] '>
              <p className='text-[#5f5f7e] font-semibold'>Already have an account? </p>
              <span className='text-bgreen font-semibold drop-shadow-sm '><NavLink to="/login">Sign in here !</NavLink></span>
            </div>

        </div>
    </div>
    <img src={img7} alt="" className='-mt-[250px]  rotate-180' />
   </div>
  )
}

export default Register