    // import React from 'react'
    // import Split from "react-split";
    // import ProblemDescription from "./problemdescription/ProblemDescription";
    // import PlayGround from "./playGroundPort/PlayGround";




    // const WorkSpace = ({problem}) => {
    //   return (
    // <>



    //   <Split className="split h-[100vh] "  minSize={0}  >
    //       <ProblemDescription problem = {problem} /> 
    //       <PlayGround problem ={problem} />
    //   </Split>
    // </>
    
    
    //   )
    // }

    // export default WorkSpace




  import React, { useState, useEffect } from "react";
  import Split from "react-split";
  import ProblemDescription from "./problemdescription/ProblemDescription";
  import PlayGround from "./playGroundPort/PlayGround";
  import axios from "axios";
  import { useParams } from "react-router-dom";
  import TopBar from "../topbar/TopBar";
  import Confetti from "react-confetti";

  const WorkSpace = () => {
    const { id } = useParams();
    const [problem, setProblem] = useState([]);
    const [success , setSucess] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [showTik , setShowTik] = useState(false);   
    const [profile, setProfile] = useState(null);
    

  


   


    useEffect(() => {
      const fetchProblem = async () => {
        try {
          const res = await axios.get(
            `http://localhost:8080/problem-table/${id}`,
            { withCredentials: true }
          );

          const data = res?.data?.data;

          // 🔥 force array
          setProblem(Array.isArray(data) ? data : [data]);

        } catch (err) {
          console.error("Error fetching problem:", err);
        }
      };

      fetchProblem();
    }, [id]);

    






    useEffect(() => {
      const fetchProfile = async () => {
        try {
          const res = await axios.get(
            "http://localhost:8080/user/profile",
            { withCredentials: true }
          );
          setProfile(res.data);
        } catch (err) {
          console.log(err);
        }
      };

      fetchProfile();
    }, []);



    useEffect(() => {
      if (!profile || !problem.length) return;

      const currentId = problem[0].problemToSend[0]._id.toString();
      let solved = false;

      for (let i = 0; i < profile.solvedProblems.length; i++) {
        if (profile.solvedProblems[i].toString() === currentId) {
          solved = true;
          break;
        }
      }

      if (solved) {
        setShowTik(true);
      } else {
        setShowTik(false);
      }

    }, [profile, problem]);




    const [sizes, setSizes] = useState([50, 50]); // default 50-50

    // 🔹 Refresh ke baad localStorage se sizes wapas le aao
    useEffect(() => {
      const savedSizes = localStorage.getItem("split-sizes");
      if (savedSizes) {
        setSizes(JSON.parse(savedSizes));
      }
    }, []);

    // 🔹 Jab resize ho, toh save kar do
    const handleDragEnd = (newSizes) => {
      setSizes(newSizes);
      localStorage.setItem("split-sizes", JSON.stringify(newSizes));
    };

  
    return (
      <>

      <TopBar/>
      <Split
        className="split h-[100vh] flex"
        sizes={sizes}
        minSize={0}
        gutterSize={6}
        onDragEnd={handleDragEnd}
      >
        <div>
            <ProblemDescription showTik={showTik}  problem={problem} />
        </div>
          <div>
            <PlayGround problem={problem} setShowTik={setShowTik}  setSucess={setSucess} setShowConfetti={setShowConfetti} />
            {showConfetti && (
              <Confetti gravity={0.3} tweenDuration={2000} />
            )}
      </div>
      </Split>
      </>
    );
  };

  export default WorkSpace; 
