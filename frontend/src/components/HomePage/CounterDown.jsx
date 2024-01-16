import React, { useState, useEffect } from "react";

function CountdownTimer() {
  const initialTime = JSON.parse(localStorage.getItem("countdownTime")) || {
    days: 12,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    const interval = setInterval(() => {
      if (
        time.days === 0 &&
        time.hours === 0 &&
        time.minutes === 0 &&
        time.seconds === 0
      ) {
        clearInterval(interval);
      } else {
        if (time.hours === 0 && time.minutes === 0 && time.seconds === 0) {
          setTime({
            days: time.days - 1,
            hours: 23,
            minutes: 59,
            seconds: 59,
          });
        } else if (time.minutes === 0 && time.seconds === 0) {
          setTime({
            ...time,
            hours: time.hours - 1,
            minutes: 59,
            seconds: 59,
          });
        } else if (time.seconds === 0) {
          setTime({
            ...time,
            minutes: time.minutes - 1,
            seconds: 59,
          });
        } else {
          setTime({
            ...time,
            seconds: time.seconds - 1,
          });
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [time]);

  useEffect(() => {
    localStorage.setItem("countdownTime", JSON.stringify(time));
  }, [time]);

  return (
    <>
      {/* <div className='flex justify-center space-x-12  text-xl font-semibold border border-black w-64'>
            <div className='border border-black'> {time.days}</div>
            <div> {time.hours}</div>
            <div> {time.minutes}</div>
            <div> {time.seconds}</div>
        </div>
        <div className='flex space-x-5 items-center w-fit text-darkblue text-lg font-semibold'>
                            <p className=' '>DAYS</p>
                            <p className=' '>HOUR</p>
                            <p className=''>MINT</p>
                            <p className=' '>SEC</p>
  </div>*/}
      <div className="my-2 grid grid-cols-4 w-[85%]   font-bold text-center text-darkblue uppercase">
        <div>
          <div className="text-bggreen text-5xl"> {time.days}</div>
          <p className="text-2xl">days</p>
        </div>
        <div>
          <div className="text-bggreen text-5xl"> {time.hours}</div>
          <p className="text-2xl ">Hour</p>
        </div>
        <div>
          <div className="text-bggreen text-5xl"> {time.minutes}</div>
          <p className="text-2xl ">Mint</p>
        </div>
        <div>
          <div className="text-bggreen text-5xl"> {time.seconds}</div>
          <p className=" text-2xl">Sec</p>
        </div>
      </div>
    </>
  );
}

export default CountdownTimer;
