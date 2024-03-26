import React, { useEffect, useState } from "react";
import moment from "moment";

const UserComments = ({ comment }) => {
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const result = await fetch(
          `http://localhost:5000/api/user/getUser/${comment.userId}`
        );
        const data = await result.json();
        setUserDetails(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
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
      <div className="  w-full">
        <div className="flex items-center justify-between ">
          <p className="text-sm text-pgray hover:underline font-semibold ">
            @{userDetails.username} {userDetails.familyname}{" "}
          </p>
          <p className="text-sm text-darkgray font-medium">
            {moment(comment.createdAt).fromNow()}
          </p>
        </div>
        <p className="p-1 font-medium text-darkblue ">{comment.content} </p>
      </div>
    </div>
  );
};

export default UserComments;
