import React, { useEffect, useState } from 'react'
import { FaLock } from 'react-icons/fa'
import { IoMdClose, IoMdMail } from 'react-icons/io'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  
    
  const [isOpen, setIsOpen] = useState(false);   
  const [showModal, setShowModal] = useState(true); 



  const navigate = useNavigate();


  const openModal = () => {
    setShowModal(true); // Show modal in DOM
    setTimeout(() => setIsOpen(true), 50); // Trigger open animation
  };

  const closeModal = () => {
    setIsOpen(false); // Trigger close animation
    setTimeout(() => setShowModal(false), 300); // Remove modal after animation
  };


  useEffect(()=>{
    openModal(); 
  },[])
 
return (
<div
  className="flex justify-center  min-h-screen bg-cover bg-no-repeat"
  style={{
    backgroundImage: "url('https://imgs.search.brave.com/OqobzaQMeppw7WbUwxed01HNZz6Tkrqt_PYdOBJxtNs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXM0LmFscGhhY29k/ZXJzLmNvbS8xMTAv/dGh1bWJiaWctMTEw/ODE3MS53ZWJw')"
  }}
>
    
{/* <header className="
 fixed   top-0 left-0 
z-50 flex w-full justify-between  px-4 sm:px-10 md:px-20 lg:px-[100px] py-4 ">    */}
<header className="
 fixed   top-0 left-0 
z-50 flex w-full justify-between  px-4 sm:px-10 md:px-20 lg:px-[100px] py-4 ">       

         <h2 className='text-3xl text-white no-select'> Logo </h2>
         <nav className='navigation '>
   <a
  href="#"
  className="relative after:content-[''] after:absolute after:bottom-[-6px]
  text-[1em]  no-underline font-medium ml-[40px]
   after:left-0 after:h-[3px] after:w-full after:bg-white after:rounded after:origin-right
    after:scale-x-0 after:transition-transform after:duration-500
     hover:after:origin-left hover:after:scale-x-100 text-white 
     max-[480px]:hidden
     "
>
  Question
</a>

           <a href='#'
              className="relative after:content-[''] after:absolute after:bottom-[-6px]
  text-[1em]  no-underline font-medium ml-[40px]
   after:left-0 after:h-[3px] after:w-full after:bg-white after:rounded after:origin-right
    after:scale-x-0 after:transition-transform after:duration-500
     hover:after:origin-left hover:after:scale-x-100 text-white *:
     max-[480px]:hidden
     "
  
  
  >About</a>
  
      <button
  className="w-[120px] h-[45px] bg-transparent border-2 border-white rounded-md cursor-pointer text-[1.1em] text-white font-medium ml-10 transition-all duration-500 hover:bg-white hover:text-[#162938]"
     onClick={openModal}
>
  Login
</button>




         </nav>
       </header>

 {showModal && (



<div className={`relative  w-[400px]  mt-[100px]   max-[430px]:w-[340px] max-[380px]:w-[280px]  
max-[430px]:h-[400px]      h-[440px] bg-transparent border-2
 border-white/50 backdrop-blur-[20px] shadow-[0_0_30px_rgba(0,0,0,0.5)] 
 flex justify-center items-center overflow-hidden rounded-[20px]
 transition-all duration-300 transform ${
              isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
            } 
 `}>

  <span className="absolute top-0 right-0 w-[45px] h-[45px] text-[2em] bg-[#162938] text-white flex justify-center items-center cursor-pointer z-[1] rounded-bl-[20px]">
    <IoMdClose  onClick={closeModal} />
  </span>


       <div className="w-full  max-[380px]:px-[33px]   px-10">
  <h2 className="text-3xl text-gray-200 text-center  max-[380px]:text-[20px]  max-[380px]:mt-[20px]   mx-[30px]">Login</h2>


  <form action="#">
    
    {/* Email */}
    <div className="relative w-full h-[50px] border-b-2 border-[#162938] my-8">
      <span className="absolute top-1/2  max-[380px]:text-white  max-[380px]:text-[18px]    max-[430px]:text-gray-300   -translate-y-1/2 right-0 text-xl">
        <IoMdMail />
      </span>
      <input
        type="text"
        required
        className="w-full h-full pl-1.5 pr-2 bg-transparent text-white   outline-none peer"
      />
      <label className="absolute left-2 top-1/2 -translate-y-1/2 text-base text-gray-300 font-medium transition-all duration-500 peer-focus:top-0 peer-focus:text-sm peer-focus:text-white peer-valid:top-0 peer-valid:text-sm peer-valid:text-white">
        Email
      </label>
    </div>

    {/* Password */}
    <div className="relative w-full h-[50px] border-b-2 border-[#162938] my-8">
      <span className="absolute top-1/2  max-[380px]:text-[18px] max-[380px]:text-white  max-[430px]:text-gray-300   -translate-y-1/2  right-0  text-xl ">
        <FaLock />
      </span>
      <input 
        type="password"
        required
        className="w-full h-full  pl-1.5 pr-2 bg-transparent text-white outline-none peer"
      />
      <label className="absolute left-2 top-1/2 -translate-y-1/2 text-base text-gray-300 font-medium transition-all duration-500 peer-focus:top-0 peer-focus:text-sm peer-focus:text-white peer-valid:top-0 peer-valid:text-sm peer-valid:text-white">
        Password
      </label>
    </div>


 
 
        {/* Remember & Forget Section */}
<div className="text-[0.9rem] max-[380px]:text-[12px] text-blue-100 font-medium mt-[-15px] mb-4 flex justify-between items-center">
  <label className="flex items-center">
    <input
      type="checkbox"
      className="accent-blue-100 mr-1"
    />
    Remember me
  </label>
  <a
    onClick={()=> navigate('/auth-reset-password')}
    className="hover:underline"
  >
    Forget password 
  </a>
</div>

{/* Submit Button */}
<button
  type="submit"
  className="w-full h-[50px] border-2 border-white rounded-md cursor-pointer text-white font-medium text-[1.1em] mt-2 hover:bg-white hover:text-[#162938] transition duration-500"
>
  Login
</button>

{/* Register Section */}
<div className="mt-4 text-blue-100 max-[380px]:text-[13px] text-[0.9rem] text-center">
  <p>
    Don't have an account?
    <a href="/auth-singup" className="ml-1 text-blue-100 hover:underline">
      Register
    </a>
  </p>
</div>

           </form>
         </div>
       </div>

)}
 
     </div>
  )
}

export default Login




