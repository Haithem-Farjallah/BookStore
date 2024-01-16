import React, { useEffect,useLayoutEffect } from 'react'
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

function Search({outside}) {
  const [search,setSearch]=useState('');
  const [results,setResults]=useState([]);
  const [loading ,setLoading]=useState(true);
  useEffect(()=>{
    setLoading(true)
    fetch(`https://www.googleapis.com/books/v1/volumes?q='${search}'&key=AIzaSyDPYwZOZa8a7QJKPLJyrsnmDyvzts6HBmk`)
    .then((res)=>res.json())
    .then((data)=>{console.log(data); data.items ?setResults(data.items ):setResults([] );setLoading(false)})
    .catch((err)=>{console.log(err);setLoading(true)});
  },[search]);

  return (
    <div  className=' outside absolute top-0  bg-darkbg flex items-center justify-center  w-screen z-30 h-screen' onClick={outside}>
      <div className= ' bg-searchbg rounded-xl w-searchwidth h-searchheight flex flex-col justify-start  items-center overflow-hidden'>
       <div className='bg-white border   px-3 shadow-md my-8 '>
          <input type="text"placeholder="What are you looking for ? " value={search} onChange={(e)=>setSearch(e.target.value)} className='focus:outline-none  h-14 w-96 bg-transparent '/>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  className="w-6 h-6 inline fill-bgreen " >
                <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
          </svg>
       </div>
       <div className=' w-full  overflow-x-hidden  '>
          {loading &&
            <div className='h-48 mt-10 text-bgreen flex justify-center items-center  w-full' >
              <FontAwesomeIcon icon={faSpinner} spin   className='  h-8' />   
            </div>
          }
        
         {!loading && results.length!==0 && results.map((result,index)=>(
             result.volumeInfo && result.volumeInfo.imageLinks && result.volumeInfo.imageLinks.thumbnail&& 
             <div key={index} className=' flex items-center bg-white mb-2 px-5 py-2 space-x-5 shadow-md rounded-md hover:bg-blue-50 cursor-pointer w-listwidth mx-5'>
                <img className='h-12' src={result.volumeInfo.imageLinks.thumbnail} alt="img" />
                 <p className=' font-semibold text-md'>{result.volumeInfo.title}</p>
             </div>
          ))}
          { !loading && results.length===0 && <p className=' py-12 text-center text-bgreen mt-12'>aucune resultat</p> }
       </div>
      </div>
    </div>
  )
}

export default Search