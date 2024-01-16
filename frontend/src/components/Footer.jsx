import React from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF ,faLinkedin ,faXTwitter} from '@fortawesome/free-brands-svg-icons'
const footer = () => {
  return (
    <div>
        <div className=' h-72 flex justify-center items-center bg-grayy'>
                <div className='grid grid-cols-4 h-[80%] '>
                    <div className=' pl-5 w-[70%] '>
                        <h2 className='text-bgreen text-2xl font-bold mb-1'>
                            E-Book.
                        </h2>
                        <p className='w-[85%] border text-pgray font-[500]  mb-2'>
                            Shopping has Another Meaning With BookStore .Visit Us and You Will Find What Makes You Happy.
                        </p>
                        <div className='flex space-x-5'>
                            <a href="https://google.com" target='_blank'><FontAwesomeIcon icon={faFacebookF}  className='text-darkblue'/></a>
                            <a href="#"><FontAwesomeIcon icon={faLinkedin}  className='text-darkblue'/></a>
                            <a href="#"><FontAwesomeIcon icon={faXTwitter} className='text-darkblue' /></a>
                        </div>
                    </div>
                    <div className='  w-[70%] -ml-8'>
                        <h1 className='text-darkblue font-bold mb-2'>Quick Links</h1>
                        <ul className=' flex flex-col space-y-1  ' >
                            <NavLink to="/" className='text-pgray  font-semibold  w-fit ' onClick={window.scrollTo({top:0 })} >Home</NavLink>
                            <NavLink to="/books"className='text-pgray   font-semibold  w-fit 'onClick={()=>window.scrollTo({top:0 })}>Books</NavLink>
                            <NavLink to="/authors"className='text-pgray  font-semibold w-fit'onClick={()=>window.scrollTo({top:0 })}>Authors</NavLink>
                            <NavLink to="/blog"className='text-pgray  font-semibold w-fit'onClick={()=>window.scrollTo({top:0 })}>Blog</NavLink>
                        </ul>

                    </div>
                    <div className=' -ml-28 w-[75%] space-y-2'>
                        <h1 className='text-darkblue font-bold mb-2'>Contact Us</h1>
                        <p className='text-pgray font-semibold '>Phone:</p>
                        <p className='text-pgray font-semibold '>+21629890620</p>
                        <h1 className='text-pgray font-semibold'>Adress:</h1>
                        <p className='text-pgray font-semibold'>haithemfarjallah2002@gmail.com</p>
                    </div>
                    <div className=' -ml-32  '>
                        <h1 className='text-darkblue font-bold mb-2'>Subscribe</h1>
                        <h1 className='text-darkblue font-bold  text-xl mb-2'>For Latest News & Updates</h1>
                        <div className='my-2'>
                        <input type="email"  placeholder='Your Email' className='w-[85%] h-9 pl-2 pb-[2px] rounded-2xl shadow-lg outline-none text-pgray font-semibold placeholder:font-medium'/>
                        <button className='-ml-[90px] rounded-2xl bg-bgreen text-white text-sm font-semibold px-2 h-8 shadow-xl '>Subscribe</button>
                        </div>

                        
                    </div>
                   

                </div>
            </div>
    </div>
  )
}

export default footer