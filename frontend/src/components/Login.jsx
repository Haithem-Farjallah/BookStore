import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import google from '../images/Google.svg'
import books from '../images/12331.jpg'
import circle from '../images/circle.png'
import lines from '../images/lines.png'


const Login = () => {

  const [required,setRequired]=useState({
    email:false,
    password:false
  });

  let [forms,setForms]=useState({
    email:"",
    password:"",
    remember:false
  })
  const handleChange=(e)=> {
    setRequired({...required,[e.target.name]:false})
    setForms({...forms,[e.target.name]:e.target.type==="checkbox" ? e.target.checked:e.target.value});
    console.log(forms);
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    if(!forms.email){
      setRequired({...required,email:true})
    }
    else if(!forms.password){
      setRequired({...required,password:true})
    }
  }
  return (
    <div className=' overflow-hidden  h-screen bg-gradient-to-tl from-bgreen to-green-300 flex justify-center items-center '>
        <img src={circle} alt=""  className='absolute top-0 right-0  '/>
        <div  className='  bg-bgcolor h-[82%]  w-[45%] flex flex-col justify-center items-center rounded-l-3xl drop-shadow-2xl'>
          <h1  className=' text-[#5f5f7e] font-semibold uppercase text-4xl '>Welcome Back</h1>
          <p className='text-pgray  text-lg my-2'>Welcome back! Please enter your details.</p>
            <form onSubmit={handleSubmit} method='post' className="flex flex-col justify-center items-start mt-5 space-y-2  w-[55%]">
                <label htmlFor="email" className="text-pgray font-semibold">Email</label>
                <input type="email" id="email" name="email" onChange={handleChange} placeholder='Enter your email' className="w-full font-meduim placeholder:font-normal py-1 px-2 text-green-700  rounded-lg outline-none shadow-test focus:shadow-testhover"/>
                {required.email && <p className='text-red-500 text-xs font-bold pl-2'>*Email is required!</p> }
                <label htmlFor="password" className="text-pgray font-semibold">Password</label>
                <input type="password" id="password" name="password" onChange={handleChange} placeholder='********'  className="w-full py-1 px-2 text-green-700  outline-none rounded-lg shadow-test focus:shadow-testhover"/>
                {required.password && <p className='text-red-500 text-xs font-bold pl-2'>*Password is required!</p> }
                <div className=" flex justify-between items-start mt-5  w-full h-10">
                  <div className=" space-x-2">
                    <input type="checkbox" name='remember' id="remember" onChange={handleChange} className=" align-middle outline-none mb-[1px] ml-2 "/>
                    <label htmlFor="remember" className="text-sm  text-pgray outline-none">Remember me</label>
                  </div>
                  <NavLink to="/" className="text-sm text-pgray hover:text-bgreen hover:underline outline-none mt-1 mr-1 ">Forgot password</NavLink>
                </div>
                <button className="bg-bgreen w-full rounded-xl py-2  text-white outline-green-800 shadow-test hover:shadow-testhover ">Sign In</button>
            </form>
            <button className='flex justify-center space-x-2 mt-3 mb-5 w-[55%] font-[450] rounded-xl py-2 shadow-test hover:shadow-testhover bg-white text-darkblue outline-gray-500'>
               <span><img src={google} alt="google"  /></span><p>Sign in with  google</p>
              </button>
            <div className='flex justify-center space-x-2 text-xs w-[60%] '>
              <p className='text-[#5f5f7e] font-semibold'>Don't have an account? </p>
              <span className='text-bgreen font-semibold drop-shadow-sm '><NavLink to="/register">Sign up for free !</NavLink></span>
            </div>

        </div>
        <div className='bg-darkbg  h-[82%] w-[45%] rounded-r-3xl drop-shadow-2xl overflow-hidden '>
           <img src={books} alt="books" className='bg-contain h-full opacity-80' />
        </div>
        <img src={lines} alt=""  className='absolute bottom-0 left-48  '/>

    </div>
  )
}

export default Login