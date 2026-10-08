import React from 'react'
import TopBar from '../components/models/topbar/TopBar'
import WorkSpace from '../components/models/workspace/WorkSpace'
import Prefernce from '../components/models/workspace/playGroundPort/preference/Prefernce'


const Problem = ({problem}) => {
  return (
    <div>
      <TopBar/>
        <WorkSpace problem = {problem}/>    
    </div>
  )
}

export default Problem
