import React, { useEffect, useState } from "react";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { domain } from "../domain";

const UserComments = ({
  comment,
  handleLikes,
  updatecomments,
  handleDelete,
}) => {
  const [userDetails, setUserDetails] = useState({});
  const [edited, setEdited] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);

  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const result = await fetch(
          `${domain}/api/user/getUser/${comment.userId}`
        );
        const data = await result.json();
        setUserDetails(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserDetails();
  }, [comment]);
  const handleEdit = async () => {
    try {
      setLoading(true);
      const result = await fetch(domain + "/api/comment/editComment", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          commentId: comment._id,
          content: editContent,
          userId: currentUser._id,
        }),
        credentials: "include",
      });
      const data = await result.json();
      console.log(data);
      updatecomments(data.content, comment._id);
      setEdited(false);
      setLoading(false);
    } catch (error) {
      setEdited(false);
      setLoading(false);
      console.log(error);
    }
  };
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
          <p className="text-sm text-pgray  font-semibold ">
            @{userDetails.username} {userDetails.familyname}{" "}
          </p>
          <p className="text-sm text-darkgray font-medium">
            {moment(comment.createdAt).fromNow()}
          </p>
        </div>
        {edited ? (
          <>
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              maxLength="200"
              className=" w-full  h-32 resize-none px-4 pt-4 rounded-lg text-darkblue border border-gray-400 focus:border-gray-500 focus:ring-0 focus:outline-none placeholder:text-[#9F9F9F]"
            ></textarea>
            <div className="flex items-center justify-end gap-2 mr-2">
              <button
                onClick={handleEdit}
                disabled={loading}
                className=" cursor-pointer bg-bgreen  px-5 py-2 rounded-xl  text-white font-medium text-sm text-center disabled:opacity-90 "
              >
                {loading ? "Saving..." : "Save"}
              </button>
              <button
                onClick={() => setEdited(false)}
                className=" cursor-pointer border border-bgreen  px-5 py-2 rounded-xl  text-bgreen font-medium text-xs text-center"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="p-1 font-medium text-darkblue ">{comment.content} </p>
            <div className="flex items-center p-1 ">
              <FaThumbsUp
                className={`${
                  currentUser && comment.likes.includes(currentUser._id)
                    ? "text-bgreen"
                    : "text-pgray"
                }  h-4 w-5  cursor-pointer `}
                onClick={() => handleLikes(comment._id)}
              />

              <p className="text-sm font-semibold text-darkblue">
                {comment.numberOfLikes}{" "}
                {comment.numberOfLikes > 1 ? "likes" : "like"}
              </p>
              {currentUser && currentUser._id === comment.userId && (
                <>
                  <p
                    className="text-sm font-semibold text-bgreen mx-4 cursor-pointer"
                    onClick={() => setEdited(true)}
                  >
                    <FontAwesomeIcon icon={faPenToSquare} className="mr-1" />
                    Edit
                  </p>
                  <p
                    className="text-sm font-semibold text-red-500  cursor-pointer"
                    onClick={() => {
                      handleDelete(comment._id);
                    }}
                  >
                    <FontAwesomeIcon icon={faTrash} className="mr-1" />
                    Delete
                  </p>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserComments;
