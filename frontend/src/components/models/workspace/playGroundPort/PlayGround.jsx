import React from 'react'

import Split from "react-split";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import EditorFotter from "../playGroundPort/EditorFooter";
import Prefernce from './preference/Prefernce';
import { useState } from 'react';

import axios from "axios";
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { selectLoggedInUser } from '../../../auth/authSlices';
import useLocalStorage from '../../setting/useLocal';
const PlayGround = ({ problem,  setShowTik , setSucess, setShowConfetti  }) => {

  if (!problem || problem.length === 0) return <p>Loading...</p>;
  const currentProblem = problem[0].problemToSend[0];
  const [activeCase, setActiveCase] = useState(0); 
  const user = useSelector(selectLoggedInUser);
  const userId =  user.id;



  const [fontSize, setFontSize] = useLocalStorage("lcc-fontSize", "16px");
  const[setting , setSetSetting] = useState({
    fontSize: fontSize,
    settingsModelIsopen: false,
    dropdownIsOpen : false,
  })

 
  const storageKey = `code_${userId}_${currentProblem._id}`;


  const [code, setCode] = useState(() => {
    const savedCode = localStorage.getItem(storageKey);
    return savedCode || currentProblem?.starterCode || "";
  });



 

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/user/submit",
        {
          problemId: currentProblem._id,
          userCode: code
        },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("Congrats  test cases passed 🎉", {
          position: "top-center",   // 👈 CENTER
        }); // ✅ success toast
        setSucess(true);

        // Confetti 2s
        setShowConfetti(true);
        setShowTik(true);
        setTimeout(() => setShowConfetti(false), 5000);

      } else {
        toast.error(res.data.error); // ❌ fail toast
      }
    } catch (err) {
      toast.error("Submission failed ❌");
      console.error(err);
    }
  };

  const onChange = (value) => {
    setCode(value);
    localStorage.setItem(storageKey, value); // ✅ save
  };


  return (
     <div className="flex flex-col bg-[rgba(255,255,255,0.1)] relative overflow-x-hidden  h-full">
      {/* Preferences */}
      <Prefernce setting={setting} setSetSetting={setSetSetting} />

      {/* Code Editor + Testcases Split */}
      <Split
        className="flex-1"
        direction="vertical"
        sizes={[50 , 40]}
        minSize={60}
        gutterSize={6}
      >
        {/* Code Editor */}
        <div className="w-full overflow-auto p-2">
          <CodeMirror
            height='400px'    
            value={code}
            extensions={[javascript()]}
            onChange={onChange}
            theme="dark"
            style={{ fontSize: setting.fontSize, height: "100%" }}
          />
        </div>


        <div className="w-full px-5 h-10 mt-7 ">
          {/* testcase heading */}
          <div className="flex h-7 items-center space-x-6">
            <div className="relative flex h-full flex-col justify-center cursor-pointer">
              <div className="text-sm font-medium leading-5  text-white">
                Testcases
              </div>
              <hr className="absolute bottom-0 h-0.5 w-full rounded-full border-none bg-white" />
            </div>
          </div>

       

        
        
    




 <div className="flex flex-wrap mt-5">
              {currentProblem?.examples?.map((example, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveCase(idx)}
                  className={`font-medium transition-all inline-flex 
                  relative rounded-lg px-5 py-2 cursor-pointer whitespace-nowrap mr-2 mb-2
                  ${
                    activeCase === idx
                      ? "bg-gray-600 text-gray-400"
                      : "bg-gray-500 hover:bg-gray-400 text-white"
                  }`}
                >
                  Case {idx + 1}
                </button>
              ))}
            </div>

   
            {currentProblem?.examples?.length > 0 && (
              <div className="font-semibold my-5 border-b border-gray-600 pb-4 w-full">
                <p className="text-sm font-medium mt-4 text-white">
                  Input {activeCase + 1}:
                </p>
                <div className="w-full rounded-lg border px-3  py-[10px] bg-[rgba(255,255,255,0.1)] text-white mt-4">
                  {currentProblem.examples[activeCase].inputText}
                </div>

                <p className="text-sm font-medium mt-5 text-white">Output:</p>
                <div className="w-full rounded-lg border px-3 py-[10px] bg-[rgba(255,255,255,0.1)] text-white mt-4">
                  {currentProblem.examples[activeCase].outputText}
                </div>

                {currentProblem.examples[activeCase].explanation && (
                  <>
                    <p className="text-sm font-medium mt-5 text-white">
                      Explanation:
                    </p>
                    <div className="w-full rounded-lg border px-3 py-[10px] bg-[rgba(255,255,255,0.1)] text-white mt-4">
                      {currentProblem.examples[activeCase].explanation}
                    </div>
                  </>
                )}
              </div>
            )}

        </div>
      </Split>
<div className="mt-26" >
     <EditorFotter handleSubmit ={handleSubmit} />
  </div>
    </div>
  )
}

export default PlayGround



