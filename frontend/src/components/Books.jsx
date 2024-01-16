import React,{Fragment,useState,useEffect} from 'react'
import Slider from 'react-slider';
import { NavLink } from 'react-router-dom';
import bookImg from '../images/book.jpg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons'


import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

const people = [
  { name: 'All' },
  { name: 'Arlene Mccoy' },
  { name: 'Devon Webb' },
  { name: 'Tom Cook' },
  { name: 'Tanya Fox' },
  { name: 'Hellen Schmidt' },
]


function Books() {
  const [selected, setSelected] = useState(people[0])

  const [search,setSearch]=useState('');
  const [results,setResults]=useState([]);
  const [loading ,setLoading]=useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  let show=false;

  useEffect(()=>{
    setLoading(true)
    fetch(`https://www.googleapis.com/books/v1/volumes?q='${search}'&startIndex=${(currentPage-1)*8}&maxResults=8&key=AIzaSyDPYwZOZa8a7QJKPLJyrsnmDyvzts6HBmk`)
    .then((res)=>res.json())
    .then((data)=>{console.log(data); data.items ?setResults(data ):setResults([] );setLoading(false);show=true;})
    .catch((err)=>{console.log(err);setLoading(true)});
  },[currentPage]);
  
  const [Values, setValues] = useState([0,200]);
 
  return (
    <>
     <div className='h-bookheight     '>
        {/*<div>
          <img src="https://books.google.com/books/content?id=WN-1CgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api" alt="" />
          <div>
            <p>Catherine</p>
            <p>The House at The edge</p>
            <p>Drama</p>
          </div>
  </div>*/}

      </div>
      <div className='flex mx-8 px-8 -mt-12  relative rounded-xl'>
          <div className=' rounded-2xl bg-grayy  w-56 h-screen py-5 px-2 mr-5'> 
            <div className='mb-5'>
              <h1 className='font-semibold text-xl text-darkgray mb-2'>Categories</h1>
              <>
                <Listbox value={selected} onChange={setSelected}>
                  <div className="relative mt-1">
                    <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                      <span className="block truncate">{selected.name}</span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </span>
                    </Listbox.Button>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {people.map((person, personIdx) => (
                          <Listbox.Option
                            key={personIdx}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                              }`
                            }
                            value={person}
                          >
                            {({ selected }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selected ? 'font-medium' : 'font-normal'
                                  }`}
                                >
                                  {person.name}
                                </span>
                                {selected ? (
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
              </>

            </div>
            <div className='mb-5'>
              <h1 className='font-semibold text-xl mb-2 text-darkgray'>Publish Date</h1>
              <select name="" id="" className='w-48'>
                <option value="">1992</option>
                <option value="">1993</option>
                <option value="">1994</option>
                <option value="">1995</option>
                <option value="">1996</option>
                <option value="">1997</option>
                <option value="">1998</option>
              </select>
            </div>
            <div className=''>
              <h1 className='font-semibold text-xl text-darkgray mb-2'>Language</h1>
              <div className='flex flex-col justify-center '>
              <div><input type="radio" name='group'id='option1'  /><label className='ml-1'  htmlFor='option1'>English</label> </div>
              <div><input type="radio" name='group' id='option2'  /><label className='ml-1' htmlFor='option2'>French</label> </div>
              <div><input type="radio" name='group' id='option3' /><label  className='ml-1' htmlFor='option3'>Arabic</label> </div>
              </div>
            </div>

            <div>
              <h1 className='font-semibold text-xl text-darkgray my-2'>Price</h1>
              <div className='space-x-2 flex  mb-5 '>
                <p className=' px-2 py-1 bg-bgcolor rounded-lg'>${Values[0]}</p>
                <p className='mt-1 font-semibold  text-darkgray'>to </p>
                <p className=' px-2 py-1  bg-bgcolor rounded-lg'>${Values[1]}</p>
              </div>
              
              <Slider className='slider w-48 h-doubleRange bg-bgreen'
                value={Values}
                min='0'
                max='200'
                onChange={setValues}
                thumbClassName='bg-bgcolor rounded-full -mt-2 w-4 h-4 cursor-grab '
                
              />
      
            </div>
          </div>
        
        <div className='flex flex-col ml-12  w-full  '>
          {loading &&
              <div className='h-[100%] mt-10 text-bgreen flex justify-center items-center  w-full' >
                <FontAwesomeIcon icon={faSpinner} spin   className='  h-8' /> 
              </div>
            }
          <div className='   grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-12'>
            {!loading && results.items.length!==0 && results.items.map((result,index)=>(
              
              <div key={index} className='bg-whitebg  w-52 h-96  mt-1   flex flex-col  shadow-my-custom-shadow rounded-xl overflow-hidden'>
               { result.volumeInfo.imageLinks ?  <img src={result.volumeInfo.imageLinks.thumbnail} alt=""  className='h-60 w-full  brightness-95'/>: <img src={bookImg} className='h-60 w-full  brightness-95' /> }
                
                
                <div className='flex my-2  ml-2  h-14'>
                      {Array.from({length:(result.volumeInfo.averageRating ?Math.floor(result.volumeInfo.averageRating):3)},(v,i)=>(
                        <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} stroke="" className="w-4 h-4 fill-bggreen stroke-bggreen ">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                        </svg>
                    ))}
                    {Array.from({length:5-(result.volumeInfo.averageRating ?Math.floor(result.volumeInfo.averageRating):3)},(v,i)=>(
                        <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} stroke="" className="w-4 h-4 fill-white stroke-bggreen">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                        </svg>
                    ))}
                  </div> 
                <div className=' h-full  w-full '> 
                  <p className='text-xs font-semibold text-pgray w-full pb-1 ml-3 '>{result.volumeInfo.categories?result.volumeInfo.categories[0]:'Not mentioned'}</p>      
                  <p className='text-md font-semibold h-fit  text-darkgray w-48 truncate mb-1 ml-3 '>{result.volumeInfo.title}</p>      
                  <p  className='text-xs font-semibold  text-pgray truncate w-48 mb-3  ml-3 '>{result.volumeInfo.authors?result.volumeInfo.authors[0]:'unknow'} </p>
                  <NavLink to="" className=' flex justify-center text-sm text-bgreen  font-semibold '><span className='hover:border-b border-bgreen '>Details {`>`} </span></NavLink>
                </div>
            </div>)) }

            

              
          </div>
         { !show &&
              <div className="flex justify-center mt-4 mb-12  ">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                className={`mx-2 px-3 py-1 rounded ${
                  currentPage === 1 ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-bgreen text-white hover:bg-green-600'
                }`}
                disabled={currentPage === 1}
              >
              Prev
            </button>
            <div className='flex text-center items-center justify-center space-x-2'>
              {Array.from({length:6},(v,i)=> 
                      <p onClick={()=>setCurrentPage(i+1)}
                        className={`px-4 py-2 rounded cursor-pointer  text-darkgray ${currentPage-1 !== i && 'bg-gray-200'} ${currentPage-1 === i && 'bg-bgreen text-white font-semibold'}` } >
                        {i+1}
                      </p> )}
            </div>
            <button loading='lazy'
              onClick={() => setCurrentPage(currentPage + 1)}
              className={`mx-2 px-3 py-1 rounded ${
                currentPage === 6 ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-bgreen text-whitebg hover:bg-green-600'
              }`}
              disabled={currentPage === 6}
            >
              Next
            </button>
          </div>
         }
    </div>
        </div>
    
    
    </>
    
  )
}

export default Books