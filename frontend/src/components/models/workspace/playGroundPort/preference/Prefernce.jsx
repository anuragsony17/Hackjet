import React, { useEffect, useState } from "react";
import { AiOutlineFullscreen, AiOutlineFullscreenExit, AiOutlineSetting } from "react-icons/ai";
import SettingsModal from "../../../setting/SettingModel";


const Prefernce = ({ setting, setSetSetting }) => {

  const [isFullScreen , setisFullScreen] = useState(false);
  const handleFullScreen =() =>{
    if(isFullScreen){
      document.exitFullscreen()
    }else{
      document.documentElement.requestFullscreen();
    }
    setisFullScreen(!isFullScreen)
  }



   useEffect(()=>{
      function exitHandler (){
        if(!document.fullscreenElement){
          setisFullScreen(false);
          return
        }
        setisFullScreen(true);
      }

      if(document.addEventListener){
        document.addEventListener("fullscreenchange" , exitHandler );
        document.addEventListener("webkitfullscreenchange", exitHandler);
        document.addEventListener("mozfullscreenchange" ,exitHandler );
        document.addEventListener("MsFullscreenChange" ,  exitHandler)
      }
   }, [isFullScreen])



  return (
    <div className="flex items-center justify-between bg-black h-11 w-full">
      <div className="flex items-center text-white">
        <button className="flex cursor-pointer items-center rounded focus:outline-none bg-[rgba(255,255,255,0.3)]  text-white hover:bg-[rgba(255,255,255,0.2)]  px-2 py-2 font-medium">
          <div className="flex items-center px-1">
            <div className="text-xs text-label-2 dark:text-dark-label-2">
              JavaScript
            </div>
          </div>
        </button>
      </div>

      <div className="flex items-center m-2">
        <button
          className="relative rounded px-2 py-1.5 font-medium items-center transition-all focus:outline-none inline-flex  ml-auto p-1 mr-2 hover:bg-dark-fill-3;
	 group" onClick={() => setSetSetting({
     ...setting,
     settingsModelIsopen: true
   })}
        >
          <div className="h-5 w-5 text-dark-gray-6 font-bold text-lg">
            <AiOutlineSetting />
          </div>
          <div
            className="absolute w-auto p-2 text-sm m-2  min-w-max translate-x-1  right-0 top-5 z-10 rounded-md shadow-md
		text-black bg-gray-200  origin-center scale-0 transition-all duration-100 ease-linear group-hover:scale-100"
          >
            Settings
          </div>
        </button>

        <button
          className="relative rounded px-2 py-1.5 font-medium items-center transition-all focus:outline-none inline-flex  ml-auto p-1 mr-2 hover:bg-dark-fill-3;
	group"   onClick={handleFullScreen}
        >
          <div className="h-5 w-5 text-dark-gray-6 font-bold text-lg">
            {!isFullScreen ? <AiOutlineFullscreen /> : <AiOutlineFullscreenExit/>  } 
          </div>
          <div
            className="absolute w-auto p-2 text-sm m-2  min-w-max translate-x-3  right-0 top-5 z-10 rounded-md shadow-md
		text-black bg-gray-200  origin-center scale-0 transition-all duration-100 ease-linear group-hover:scale-100
"
          >
            Full Screen
          </div>
        </button>
        {setting.settingsModelIsopen && <SettingsModal settings={setting} setSettings={setSetSetting} />}
       
      </div>
    </div>
  )
}

export default Prefernce
