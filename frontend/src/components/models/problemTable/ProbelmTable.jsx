 import React, { useState } from 'react'
import { AiFillYoutube } from 'react-icons/ai';
import { BsCheckCircle } from 'react-icons/bs';
import { IoMdClose } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import YouTube from 'react-youtube';
import { toast } from "react-toastify";
import { useSelector } from 'react-redux';
import { selectLoggedInUser } from '../../auth/authSlices';


const ProblemTable = ({problems}) => {
  
  const user = useSelector(selectLoggedInUser);
  const navigate = useNavigate();
  const loggedInUserToken = useSelector(selectLoggedInUser);



  const [youtubePlayer, setYoutubePlayer] = useState({
    isOpen: false,
    videoId: "",
  });

  





  return (
    <>
      <tbody className="text-white">
        {problems.map((problem, index) => {
          const difficultyColor =
            problem.difficulty === "Easy"
              ? "text-green-300"
              : problem.difficulty === "Medium"
              ? "text-yellow-300"
              : "text-pink-500";

          return (
            <tr
              className={`${index % 2 === 1 ? "bg-gray-900" : ""}`}
              key={problem.createdAt}
            >
              
              <th className="px-2 py-4 font-medium whitespace-nowrap">
                <BsCheckCircle
                  fontSize="18"
                  className={user ? "text-green-300" : "text-gray-500"}
                />
              </th>
              <td className="px-6 py-4">
                <span
                  onClick={(e) => {
                    e.preventDefault(); // stop default navigation

                    if (!loggedInUserToken) {
                      toast.error("😎 Oops! Login first to crack this challenge.");
                      return;
                    }

                    if (problem.link) {
                      window.open(problem.link, "_blank");
                    } else {
                      navigate(`/problems/${problem._id}`);
                    }
                  }}
                  className="hover:text-blue-600 hover:underline cursor-pointer"
                >
                  {problem.title}
                </span>
              </td>

              <td className={`px-6 py-4 ${difficultyColor}`}>
                {problem.difficulty}
              </td>
              <td className="px-6 py-4 hover:text-blue-400 hover:underline transition duration-300 cursor-pointer">
                {problem.category}
              </td>


              <td className="px-6 py-4">
                {problem.videoId ? (
                  <AiFillYoutube
                    fontSize={"28"}
                    className="cursor-pointer hover:text-red-600"
                    onClick={() =>
                      setYoutubePlayer({ isOpen: true, videoId: problem.videoId })
                    }
                  />
                ) : (
                  <p className="text-gray-400">Coming soon</p>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>

      {/* Modal */}
      {youtubePlayer.isOpen && (
        <div className="fixed top-15 left-0 h-screen w-screen flex items-center justify-center">
          <div className="bg-black z-10 opacity-70 top-0 left-0 h-screen w-screen absolute" />
          <div className="w-full z-50 h-full px-6 relative max-w-4xl">
            <div className="w-full h-full flex items-center justify-center relative">
              <div className="w-full relative">
                <IoMdClose
                  fontSize={"35"}
                  className="cursor-pointer absolute -top-16 right-0 text-white hover:text-red-600"
                  onClick={() => setYoutubePlayer({ isOpen: false, videoId: "" })}
                />
                <YouTube
                  videoId={youtubePlayer.videoId}
                  loading="lazy"
                  iframeClassName="w-full min-h-[500px]"
                />
              </div>
            </div>
          </div>  
        </div>
      )}
    </>
  );
};

export default ProblemTable;
