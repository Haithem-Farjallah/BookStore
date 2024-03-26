import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import UserComments from "./UserComments";

const BookComments = ({ id }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [date, setDate] = useState("");

  useEffect(() => {
    const getAllcomments = async () => {
      try {
        const result = await fetch(
          `http://localhost:5000/api/comment/getComments/${id}`
        );
        const data = await result.json();
        setAllComments(data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllcomments();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await fetch("http://localhost:5000/api/comment/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: comment,
          userId: currentUser._id,
          bookId: id,
        }),
        credentials: "include",
      });
      const data = await result.json();
      setAllComments([data, ...allComments]);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" mx-5 ">
      <h1 className="text-darkblue text-3xl mt-5 font-semibold">Comments : </h1>
      <div className="max-w-2xl mx-auto p-3 ">
        {currentUser ? (
          <div className="flex items-center gap-1 mt-5 mb-1 ">
            <p className="font-medium text-darkblue ">Signed in as :</p>
            <img
              src={currentUser.profileImg}
              alt="profile image"
              className="h-6 w-6 object-cover rounded-full"
            />
            <Link
              to="/profile/userDetails"
              className="text-sm text-pgray hover:underline font-semibold "
            >
              @{currentUser.username} {currentUser.familyname}{" "}
            </Link>
          </div>
        ) : (
          <p className="text-lg ">
            You must{" "}
            <NavLink to="/login" className="text-bgreen underline">
              Sign In
            </NavLink>{" "}
            to add comment{" "}
          </p>
        )}
        {currentUser && (
          <form className=" p-3  " onSubmit={handleSubmit}>
            <textarea
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add comment ..."
              rows="3"
              maxLength="200"
              className=" w-full  h-32 resize-none px-4 pt-4 rounded-lg text-darkblue border border-gray-400 focus:border-gray-500 focus:ring-0 focus:outline-none placeholder:text-[#9F9F9F]"
            ></textarea>
            <div className="flex justify-between items-center px-1  ">
              <p className="text-gray-500 text-xs font-medium">
                {200 - comment.length} characters remaining
              </p>
              <button
                type="submit"
                className=" cursor-pointer bg-bgreen  px-5 py-2 rounded-xl  text-white font-medium text-center"
              >
                Submit
              </button>
            </div>
          </form>
        )}
        {allComments.length === 0 ? (
          <p>No comments yet !</p>
        ) : (
          <>
            <div className=" flex items-center gap-1">
              {" "}
              <p className="font-medium text-darkblue ">total comments:</p>
              <div className="border border-gray-400 py-1 px-2 rounded-sm text-sm">
                <p>{allComments.length}</p>
              </div>
            </div>
            {allComments.map((comment) => (
              <UserComments comment={comment} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default BookComments;
