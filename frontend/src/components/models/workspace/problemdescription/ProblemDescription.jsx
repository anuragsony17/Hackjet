import axios from "axios";
import { useEffect, useState } from "react";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { BsCheck2Circle } from "react-icons/bs";
import { TiStarOutline } from "react-icons/ti";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { selectLoggedInUser } from "../../../auth/authSlices";




const ProblemDescription = ({ problem, showTik }) => {
 

  const [reaction, setReaction] = useState({
    liked: false,
    disliked: false,
    starred: false, 
    likes: 0,
    dislikes: 0,
  });


  
    

  useEffect(() => {
    if (!problem?.length) return;

    const problemId = problem[0]._id;

    const fetchReaction = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/user/reaction",
          {
            params: { problemId },
            withCredentials: true,
          }
        );

        const user = res.data;

        setReaction((prev) => ({
          ...prev,
          liked: user.likedProblems.includes(problemId),
          disliked: user.dislikedProblems.includes(problemId),
          starred: user.starredProblems.includes(problemId),
         
        }));

      } catch (err) {
        console.log(err);
      }
    };

    fetchReaction();
  }, [problem]);

  const [loading, setLoading] = useState(false);


  



   
  if (!problem || problem.length === 0) return <p>Loading...</p>;

  const currentProblem = problem[0].problemToSend[0];


  console.log(currentProblem);

  // 🔥 FIX: safeHTML define
  const safeHTML = currentProblem.problemStatement
    ?.replace(/className=/g, "class=");


  const handleLike = async () => {
    if (loading) return;

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:8080/user/like",
        { problemId: problem[0]._id },
        { withCredentials: true }
      );

      setTimeout(() => {
        setReaction((prev) => ({
          ...prev, // ⭐ preserve starred
          likes: res.data.likes,
          dislikes: res.data.dislikes,
          liked: res.data.liked,
          disliked: res.data.disliked,
        }));

        res.data.liked
          ? toast.success("Problem liked 👍")
          : toast.info("Like removed ❌");

        setLoading(false);
      }, 600);

    } catch (err) {
      console.log(err);
      toast.error("Something went wrong 😢");
      setLoading(false);
    }
  };



  const handleDislike = async () => {
    if (loading) return;

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:8080/user/dislike",
        { problemId: problem[0]._id },
        { withCredentials: true }
      );

      setTimeout(() => {
        setReaction((prev) => ({
          ...prev, // ⭐ preserve starred
          likes: res.data.likes,
          dislikes: res.data.dislikes,
          liked: res.data.liked,
          disliked: res.data.disliked,
        }));

        res.data.disliked
          ? toast.success("Problem disliked 👎")
          : toast.info("Dislike removed ❌");

        setLoading(false);
      }, 600);

    } catch (err) {
      console.log(err);
      toast.error("Something went wrong 😢");
      setLoading(false);
    }
  };

  const handleStar = async () => {
    if (loading) return;

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:8080/user/star",
        { problemId: problem[0]._id },
        { withCredentials: true }
      );

    
      // Smooth UX delay
      setTimeout(() => {
        setReaction((prev) => ({
          ...prev,
          starred: res.data.starred,
        }));

        // Toast
        if (res.data.starred) {
          toast.success("Problem starred ⭐");
        } else {
          toast.info("Star removed ❌");
        }

        setLoading(false);
      }, 600);

    } catch (err) {
      console.log(err);
      toast.error("Something went wrong 😢");
      setLoading(false);
    }
  };

 



  console.log(currentProblem.examples)
  return (
    <div className="bg-[rgba(255,255,255,0.1)]">
      {/* TAB */}
      <div className="flex h-11 w-full items-center pt-2 bg-black text-white overflow-x-hidden">
        <div className="bg-[rgba(255,255,255,0.1)] rounded-t-[5px] px-5 py-[10px] text-xs cursor-pointer">
          Description
        </div>
      </div>

      <div className="flex px-0 py-4 h-[calc(100vh-43px)] overflow-y-auto">
        <div className="px-5">
          {/* Problem heading */}
          <div className="w-full">
            <div className="flex space-x-4">
              <div className="flex-1 mr-2 text-lg text-white font-medium">
                {currentProblem.title}
              </div>
            </div>
            <div className="flex items-center mt-3">
              <div
                className={`
               inline-block rounded-[21px] bg-opacity-[.15] px-4 py-1 
               text-[15px] font-medium capitalize 
       ${currentProblem.difficulty === "Easy" ? "bg-emerald-400 text-green-700" : ""}
      ${currentProblem.difficulty === "Medium" ? "bg-yellow-400 text-yellow-700" : ""}
       ${currentProblem.difficulty === "Hard" ? "text-red-200 bg-red-700" : ""}
  `}>

                {currentProblem.difficulty || "Easy"}
              </div>
              <div className={`rounded p-[3px] ${showTik ?  "ml-4" : "ml-0" } text-lg    ${currentProblem.difficulty === "Easy" ? " text-green-700" : ""}
      ${currentProblem.difficulty === "Medium" ? " text-yellow-700" : ""}
       ${currentProblem.difficulty === "Hard" ? "text-red-700" : ""}`}>
                {showTik&& (
                <BsCheck2Circle />)
               }
               
              </div>
              {/* <div className="flex items-center cursor-pointer space-x-1 rounded p-[3px] ml-4 text-lg text-blue-400">
                <AiFillLike />
                <span className="text-xs">120</span>
              </div>
              <div className="flex items-center  text-red-200 cursor-pointer space-x-1 rounded p-[3px] ml-4 text-lg text-dark-gray-6">
                <AiFillDislike />
                <span className="text-xs">2</span>
              </div>
              <div className="cursor-pointer  text-yellow-400 rounded p-[3px] ml-4 text-xl text-dark-gray-6">
                <TiStarOutline />
              </div> */}


              

                {/* LIKE */}
              <div
                onClick={() => {
                  if (!loading) handleLike();
                }}
                className={`
    flex items-center space-x-1 rounded p-[3px] ml-4 text-lg
    cursor-pointer select-none
    ${reaction?.liked ? "text-blue-500" : "text-gray-400"}
    ${loading ? "opacity-60 pointer-events-none" : ""}
  `}
              >
                {loading ? (
                  <svg
                    className="animate-spin h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l3-3-3-3v4a12 12 0 00-12 12h4z"
                    />
                  </svg>
                ) : (
                  <AiFillLike />
                )}

              
              </div>


                {/* DISLIKE */}
              <div
                onClick={() => {
                  if (!loading) handleDislike();
                }}
                className={`
    flex items-center space-x-1 rounded p-[3px] ml-4 text-lg
    cursor-pointer select-none
    ${reaction?.disliked ? "text-red-500" : "text-gray-400"}
    ${loading ? "opacity-60 pointer-events-none" : ""}
  `}
              >
                {loading ? (
                  <svg
                    className="animate-spin h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l3-3-3-3v4a12 12 0 00-12 12h4z"
                    />
                  </svg>
                ) : (
                  <AiFillDislike />
                )}
              </div>


                {/* STAR */}
              <div
                onClick={() => {
                  if (!loading) handleStar();
                }}
                className={`
    cursor-pointer rounded p-[3px] ml-4 text-xl
    select-none
    ${reaction?.starred ? "text-yellow-400" : "text-gray-400"}
    ${loading ? "opacity-60 pointer-events-none" : ""}
  `}
              >
                {loading ? (
                  <svg
                    className="animate-spin h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l3-3-3-3v4a12 12 0 00-12 12h4z"
                    />
                  </svg>
                ) : (
                  <TiStarOutline />
                )}
              </div>


            

             

            </div>

            {/* Problem Statement */}
            <div className="text-white text-sm mt-4">
              <div
                className="text-white text-sm prose"
                dangerouslySetInnerHTML={{ __html: safeHTML }}
              />
            </div>

            {/* Examples */}
            <div className="mt-4">
              {currentProblem.examples &&
                currentProblem.examples.map((ex, idx) => (
                
                  <div key={idx} className="mb-4">
                    {console.log(currentProblem.examples)}
                    {
                      ex.img && <img src={"http://localhost:8080/images/reverseLL.jpg"} alt='' className='mt-3 h-40 mb-3 rounded-2xl' />
                    }
                    <p className="font-medium text-white">Example {idx + 1}:</p>

                    <div className="example-card  rounded-md">
                      <pre className="text-sm text-gray-200">
                        <strong>Input:</strong> {ex.inputText}{"\n"}
                        <strong>Output:</strong> {ex.outputText}{"\n"}
                        {ex.explanation && (
                          <>
                            <strong>Explanation:</strong> {ex.explanation}
                          </>
                        )}
                      </pre>
                    </div>
                  </div>
                ))}
            </div>

            {/* Constraints */}
            <div className="my-5  pb-4">
              <div className="text-white text-sm font-medium">Constraints:</div>
              <div
                className="text-white text-sm mt-2  px-2  prose"
                dangerouslySetInnerHTML={{
                  __html: currentProblem.constraints.replace(/className=/g, "class="),
                }}
              />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemDescription;



