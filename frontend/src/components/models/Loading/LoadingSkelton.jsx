import React from 'react'

const LoadingSkelton = () => {
  return (

              <div className="flex items-center space-x-12 mt-4 px-6 animate-pulse">
                  {/* Checkbox */}
          <div className="w-6 h-6 rounded-full bg-[#2d2d2d]"></div>

                  {/* Title */}
          <div className="h-4 w-42 rounded-full bg-[#2d2d2d]"></div>

                  {/* Difficulty */}
          <div className="h-4 w-24 rounded-full bg-[#2d2d2d]"></div>

                  {/* Category */}
          <div className="h-4 w-32 rounded-full bg-[#2d2d2d]"></div>

                  {/* Solution */}
          <div className="h-4 w-36 rounded-full pl-10 bg-[#2d2d2d]"></div>
              </div>
          );
      };
export default LoadingSkelton
