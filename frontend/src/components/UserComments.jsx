import React, { useEffect, useState } from "react";
import moment from "moment";

const UserComments = ({ comment }) => {
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const result = await fetch(
          `http://localhost:5000/api/user/getUser/${comment.userId}`
        );
        const data = await result.json();
        setUserDetails(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserDetails();
  }, [comment]);

  return (
    <div className="flex p-4 border-b ">
      <div className="mr-2">
        <img
          src={userDetails.profileImg}
          alt="user image"
          className="w-10 h-10 rounded-full"
        />
      </div>
      <div className="">
        <div className="flex items-center justify-between w-full">
          <p className="text-sm text-pgray hover:underline font-semibold ">
            @{userDetails.username} {userDetails.familyname}{" "}
          </p>
          <p className="text-sm text-darkblue">
            {moment(comment.createdAt).fromNow()}
          </p>
        </div>
        <p>{comment.content} </p>
      </div>
    </div>
  );
};

export default UserComments;
