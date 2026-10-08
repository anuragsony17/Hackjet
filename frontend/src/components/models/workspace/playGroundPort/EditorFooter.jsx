import React from 'react'
import { BsChevronUp } from 'react-icons/bs'

const Editorfooter = ({ handleSubmit }) => {


  return (
      <div className='flex  mt-5  bg-neutral-700 absolute top-240  z-10 w-full'>
	<div className='mx-5 my-[10px] flex justify-between w-full'>
		<div className='mr-2 flex flex-1 flex-nowrap items-center space-x-4'>
			<button className='px-2 py-2 font-medium items-center transition-all inline-flex bg-[rgba(255,255,255,0.3)] text-sm hover:bg-[rgba(255,255,255,0.2)] text-dark-label-2 rounded-lg pl-3 pr-2'>
				Console
				<div className='ml-1 transform transition flex items-center'>
					<BsChevronUp className='fill-gray-6 mx-1 fill-dark-gray-6' />
				</div>
			</button>
		</div>
		<div className='ml-auto flex items-center space-x-4'>
			<button className='px-5 py-2 text-sm font-medium items-center whitespace-nowrap transition-all focus:outline-none inline-flex bg-[rgba(255,255,255,0.3)]  hover:bg-[rgba(255,255,255,0.2)] text-dark-label-2 rounded-lg'>
				Run
			</button>
			<button 
			 onClick={handleSubmit}
			className='px-4 py-2 font-medium items-center transition-all focus:outline-none inline-flex text-sm text-white bg-green-600 hover:bg-green-3 rounded-lg'>
				Submit
			</button>
		</div>
	</div>
</div>
  )
}

export default Editorfooter
