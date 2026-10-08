// import React, { useEffect, useState } from 'react';
// import { FaLock } from 'react-icons/fa';
// import { IoMdClose, IoMdMail } from 'react-icons/io';
// import { useNavigate, Navigate, Link } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { useForm } from 'react-hook-form';

// import { createUserAsync, selectLoggedInUser } from '../authSlices';

// const Signup = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const user = useSelector(selectLoggedInUser);

//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//         watch,
//     } = useForm();

//     const [isOpen, setIsOpen] = useState(false);
//     const [showModal, setShowModal] = useState(true);

//     const openModal = () => {
//         setShowModal(true);
//         setTimeout(() => setIsOpen(true), 50);
//     };

//     const closeModal = () => {
//         setIsOpen(false);
//         setTimeout(() => setShowModal(false), 300);
//     };

//     useEffect(() => {
//         openModal();
//     }, []);

//     // ✅ Already logged in
//     if (user) {
//         return <Navigate to="/" replace />;
//     }

//     return (
//         <div
//             className="flex justify-center min-h-screen bg-cover bg-no-repeat"
//             style={{
//                 backgroundImage: "url('https://imgs.search.brave.com/OqobzaQMeppw7WbUwxed01HNZz6Tkrqt_PYdOBJxtNs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXM0LmFscGhhY29k/ZXJzLmNvbS8xMTAv/dGh1bWJiaWctMTEw/ODE3MS53ZWJw')"
//             }}
//         >
//             {/* HEADER */}
//             <header className="fixed top-0 left-0 z-50 flex w-full justify-between px-4 sm:px-10 md:px-20 lg:px-[100px] py-4">
//                 <h2 className="text-3xl text-white">Logo</h2>

//                 <button
//                     className="w-[120px] h-[45px] bg-transparent border-2 border-white rounded-md text-white hover:bg-white hover:text-[#162938] transition"
//                     onClick={openModal}
//                 >
//                     Signup
//                 </button>
//             </header>

//             {showModal && (
//                 <div
//                     className={`relative w-[400px] mt-[80px]
//           max-[430px]:w-[340px] max-[380px]:w-[280px]
//           h-[480px] bg-transparent border-2 border-white/50
//           backdrop-blur-[20px] shadow-[0_0_30px_rgba(0,0,0,0.5)]
//           flex justify-center items-center overflow-hidden rounded-[20px]
//           transition-all duration-300 transform
//           ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}
//         `}
//                 >
//                     {/* CLOSE */}
//                     <span className="absolute top-0 right-0 w-[45px] h-[45px] bg-[#162938] text-white flex justify-center items-center cursor-pointer rounded-bl-[20px]">
//                         <IoMdClose onClick={closeModal} />
//                     </span>

//                     <div className="w-full px-10 max-[380px]:px-[33px]">
//                         <h2 className="text-3xl text-gray-200 text-center mb-6">
//                             Signup
//                         </h2>

//                         <form
//                             onSubmit={handleSubmit((data) => {
//                                 dispatch(
//                                     createUserAsync({
//                                         email: data.email,
//                                         password: data.password,
//                                         displayName: data.displayName,
//                                         role: 'user',
//                                     })
//                                 );
//                             })}
//                         >
                            


//                             <div className="relative w-full h-[50px] border-b-2 border-[#162938] my-6">

//                                 {/* ICON */}
//                                 <span className="absolute top-1/2 -translate-y-1/2 right-0
//                    text-xl text-gray-300
//                    transition-colors duration-300
//                    peer-focus:text-white">
//                                     <IoMdMail />
//                                 </span>

//                                 {/* INPUT */}
//                                 <input
//                                     type="email"
//                                     placeholder=" "
//                                     {...register("email", {
//                                         required: "Email is required",
//                                         pattern: {
//                                             value: /\b[\w.-]+@[\w.-]+\.\w{2,4}\b/,
//                                             message: "Invalid email address",
//                                         },
//                                     })}
//                                     className="w-full h-full pl-1.5 pr-8
//                bg-transparent text-white outline-none peer"
//                                 />

//                                 {/* LABEL */}
//                                 <label
//                                     className="absolute left-2 top-1/2 -translate-y-1/2
//                text-base text-gray-300 font-medium
//                transition-all duration-300
//                peer-placeholder-shown:top-1/2
//                peer-placeholder-shown:text-base
//                peer-focus:top-0 peer-focus:text-sm peer-focus:text-white
//                peer-not-placeholder-shown:top-0
//                peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:text-white"
//                                 >
//                                     Email
//                                 </label>


//                                 {errors.email && (
//                                     <p className="text-red-400 text-sm mt-1">
//                                         {errors.email.message}
//                                     </p>
//                                 )}
//                             </div>




//                             <div className="relative w-full h-[50px] border-b-2 border-[#162938] my-6">

//                                 <span className="absolute top-1/2 -translate-y-1/2 right-0 text-xl text-gray-300">
//                                     <FaLock />
//                                 </span>

//                                 <input
//                                     type="password"
//                                     placeholder=" "
//                                     {...register("password", {
//                                         required: "Password is required",
//                                         pattern: {
//                                             value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
//                                             message: "Min 8 chars, 1 uppercase, 1 lowercase, 1 number",
//                                         },
//                                     })}
//                                     className="w-full h-full pl-1.5 pr-8 bg-transparent
//                text-white outline-none peer"
//                                 />

//                                 <label
//                                     className="absolute left-2 top-1/2 -translate-y-1/2
//                text-gray-300 font-medium transition-all duration-300
//                peer-placeholder-shown:top-1/2
//                peer-placeholder-shown:text-base
//                peer-focus:top-0 peer-focus:text-sm peer-focus:text-white
//                peer-not-placeholder-shown:top-0
//                peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:text-white"
//                                 >
//                                     Password
//                                 </label>
//                                 {errors.password && (
//                                     <p className="text-red-400 text-sm mt-1">
//                                         {errors.password.message}
//                                     </p>
//                                 )}
//                             </div>
//                             <div className="relative w-full h-[50px] border-b-2 border-[#162938] my-6">

//                                 <span className="absolute top-1/2 -translate-y-1/2 right-0 text-xl text-gray-300">
//                                     <FaLock />
//                                 </span>

//                                 <input
//                                     type="text"
//                                     placeholder=" "
//                                     {...register("displayName", {
//                                         required: "displayName is required",
//                                     })}
//                                     className="w-full h-full pl-1.5 pr-8 bg-transparent
//                text-white outline-none peer"
//                                 />

//                                 <label
//                                     className="absolute left-2 top-1/2 -translate-y-1/2
//                text-gray-300 font-medium transition-all duration-300
//                peer-placeholder-shown:top-1/2
//                peer-placeholder-shown:text-base
//                peer-focus:top-0 peer-focus:text-sm peer-focus:text-white
//                peer-not-placeholder-shown:top-0
//                peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:text-white"
//                                 >
//                                     Display Name
//                                 </label>
//                                 {errors.password && (
//                                     <p className="text-red-400 text-sm mt-1">
//                                         {errors.password.message}
//                                     </p>
//                                 )}
//                             </div>

//                             {/* CONFIRM PASSWORD */}
                        
//                             <div className="relative w-full h-[50px] border-b-2 border-[#162938] my-6">

//                                 <span className="absolute top-1/2 -translate-y-1/2 right-0 text-xl text-gray-300">
//                                     <FaLock />
//                                 </span>

//                                 <input
//                                     type="password"
//                                     placeholder=" "
//                                     {...register("confirmPassword", {
//                                         required: "Confirm password required",
//                                         validate: (value) =>
//                                             value === watch("password") || "Password not matching",
//                                     })}
//                                     className="w-full h-full pl-1.5 pr-8 bg-transparent
//                text-white outline-none peer"
//                                 />

//                                 <label
//                                     className="absolute left-2 top-1/2 -translate-y-1/2
//                text-gray-300 font-medium transition-all duration-300
//                peer-placeholder-shown:top-1/2
//                peer-placeholder-shown:text-base
//                peer-focus:top-0 peer-focus:text-sm peer-focus:text-white
//                peer-not-placeholder-shown:top-0
//                peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:text-white"
//                                 >
//                                     Confirm Password
//                                 </label>
//                             </div>

//                             {errors.confirmPassword && (
//                                 <p className="text-red-400 text-sm mt-1">
//                                     {errors.confirmPassword.message}
//                                 </p>
//                             )}


//                             {/* SUBMIT */}
//                             <button
//                                 type="submit"
//                                 className="w-full h-[50px] border-2 border-white rounded-md text-white text-[1.1em] hover:bg-white hover:text-[#162938] transition duration-500"
//                             >
//                                 Signup
//                             </button>

//                             {/* LOGIN LINK */}
//                             <div className="mt-4 text-blue-100 text-sm text-center">
//                                 Already have an account?
//                                 <Link to="/login" className="ml-1 hover:underline">
//                                     Login
//                                 </Link>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Signup;


import React, { useState, useEffect } from 'react';
import { FaLock } from 'react-icons/fa';
import { IoMdClose, IoMdMail } from 'react-icons/io';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { toast } from "react-toastify";

import { createUserAsync, selectError } from '../authSlices';

const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const error = useSelector(selectError);

    const { register, handleSubmit, formState: { errors }, watch } = useForm();

    const [isOpen, setIsOpen] = useState(true);
    const [showModal, setShowModal] = useState(true);

    const openModal = () => {
        setShowModal(true);
        setTimeout(() => setIsOpen(true), 50);
    };

    const closeModal = () => {
        setIsOpen(false);
        setTimeout(() => setShowModal(false), 300);
    };

    useEffect(() => {
        openModal();
    }, []);

    const onSubmit = (data) => {
        if (data.password !== data.confirmPassword) {
            toast.error("❌ Passwords do not match!");
            return;
        }

        dispatch(createUserAsync({
            email: data.email,
            password: data.password,
            displayName: data.displayName,
            role: 'user',
        }))
            .unwrap()
            .then(() => {
                toast.success("🎉 Account created successfully!");
                setTimeout(() => navigate("/"), 1500);
            })
            .catch(() => {
                toast.error("❌ Signup failed!");
            });
    };

    return (
        <div
            className="flex justify-center min-h-screen bg-cover bg-no-repeat"
            style={{
                backgroundImage: "url('https://imgs.search.brave.com/OqobzaQMeppw7WbUwxed01HNZz6Tkrqt_PYdOBJxtNs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXM0LmFscGhhY29k/ZXJzLmNvbS8xMTAv/dGh1bWJiaWctMTEw/ODE3MS53ZWJw')"
            }}
        >
            {/* HEADER */}
            <header
                className="fixed top-0 left-0 z-50 
  flex w-full justify-between 
  px-4 sm:px-10 md:px-20 lg:px-[100px] py-4
  bg-black/5 backdrop-blur-xl
  border-b border-black/20
  shadow-2xl"
            >
                       
                         <Link
                                          to="/auth-login"
                                          className="flex items-center gap-5 group"
                                      >
                                          <img
                                              src="/logoRes.png"
                                              alt="Logo"
                                              className="h-10 transition-all duration-300 
                          group-hover:scale-110 
                          drop-shadow-[0_0_8px_rgba(34,197,94,0.7)]"
                                          />
                      
                                          <span
                                              className="text-2xl font-bold tracking-wide
                          bg-gradient-to-r from-green-400 to-cyan-400
                          bg-clip-text text-transparent
                          group-hover:from-cyan-400 group-hover:to-green-400
                          transition-all duration-300"
                                          >
                                              HackJet
                                          </span>
                                      </Link>
                <button
                    className="w-[120px] h-[45px] bg-transparent border-2 border-white rounded-md text-white hover:bg-white hover:text-[#162938] transition"
                    onClick={openModal}
                >
                    Signup
                </button>
            </header>

            {showModal && (
                <div
                    className={`relative w-[400px] mt-[100px]
                        max-[430px]:w-[340px] max-[380px]:w-[280px]
                        h-[520px] bg-transparent border-2 border-white/50
                        backdrop-blur-[20px] shadow-[0_0_30px_rgba(0,0,0,0.5)]
                        flex justify-center items-center overflow-hidden rounded-[20px]
                        transition-all duration-300 transform
                        ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
                >
                    {/* CLOSE */}
                    <span
                        onClick={closeModal}
                        className="absolute top-0 right-0 w-[45px] h-[45px] bg-[#162938] text-white flex justify-center items-center cursor-pointer rounded-bl-[20px]"
                    >
                        <IoMdClose />
                    </span>

                    <div className="w-full px-10 max-[380px]:px-[33px]">
                        <h2 className="text-3xl text-gray-200 text-center mb-6">
                            Signup
                        </h2>

                        <form onSubmit={handleSubmit(onSubmit)}>
{/*                          
                            <div className="relative w-full h-[50px] border-b-2 border-[#162938] my-6">
                                <span className="absolute top-1/2 -translate-y-1/2 right-0 text-xl text-gray-300">
                                    <IoMdMail />
                                </span>
                                <input
                                    type="email"
                                    placeholder=" "
                                    {...register("email", { required: "Email is required" })}
                                    className="w-full h-full pl-1.5 pr-8 bg-transparent text-white outline-none peer"
                                />
                                <label
                                    className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-300 font-medium transition-all duration-300 text-lg peer-placeholder-shown:text-lg peer-focus:text-xl peer-focus:top-0 peer-focus:text-white peer-not-placeholder-shown:text-xl peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-white"
                                >
                                    Email
                                </label>
                                {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
                            </div>

                        
                            <div className="relative w-full h-[50px] border-b-2 border-[#162938] my-6">
                                <span className="absolute top-1/2 -translate-y-1/2 right-0 text-xl text-gray-300">
                                    <FaLock />
                                </span>
                                <input
                                    type="password"
                                    placeholder=" "
                                    {...register("password", { required: "Password is required" })}
                                    className="w-full h-full pl-1.5 pr-8 bg-transparent text-white outline-none peer"
                                />
                                <label
                                    className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-300 font-medium transition-all duration-300 text-lg peer-placeholder-shown:text-lg peer-focus:text-xl peer-focus:top-0 peer-focus:text-white peer-not-placeholder-shown:text-xl peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-white"
                                >
                                    Password
                                </label>
                                {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>}
                            </div>

                            <div className="relative w-full h-[50px] border-b-2 border-[#162938] my-6">
                                <input
                                    type="text"
                                    placeholder=" "
                                    {...register("displayName", { required: "Display name required" })}
                                    className="w-full h-full pl-1.5 bg-transparent text-white outline-none peer"
                                />
                                <label
                                    className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-300 font-medium transition-all duration-300 text-lg peer-placeholder-shown:text-lg peer-focus:text-xl peer-focus:top-0 peer-focus:text-white peer-not-placeholder-shown:text-xl peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-white"
                                >
                                    Display Name
                                </label>
                            </div>

                          
                            <div className="relative w-full h-[50px] border-b-2 border-[#162938] my-6">
                                <input
                                    type="password"
                                    placeholder=" "
                                    {...register("confirmPassword", {
                                        required: "Confirm password required",
                                    })}
                                    className="w-full h-full pl-1.5 bg-transparent text-white outline-none peer"
                                />
                                <label
                                    className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-300 font-medium transition-all duration-300 text-lg peer-placeholder-shown:text-lg peer-focus:text-xl peer-focus:top-0 peer-focus:text-white peer-not-placeholder-shown:text-xl peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-white"
                                >
                                    Confirm Password
                                </label>
                            </div>
 */}


 {/* EMAIL */}
<div className="relative w-full h-[50px] border-b-2 border-[#162938] my-6">
    <span className="absolute top-1/2 -translate-y-1/2 right-0 text-xl text-gray-300">
        <IoMdMail />
    </span>

    <input
        type="email"
        placeholder=" "
        {...register("email", {
            required: "Email is required",
            pattern: {
                value: /^[\w.-]+@[\w.-]+\.\w{2,4}$/,
                message: "Invalid email address",
            },
        })}
        className="w-full h-full pl-1.5 pr-8 bg-transparent text-white outline-none peer"
    />

    <label
        className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-300 font-medium transition-all duration-300 text-lg peer-placeholder-shown:text-lg peer-focus:text-xl peer-focus:top-0 peer-focus:text-white peer-not-placeholder-shown:text-xl peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-white"
    >
        Email
    </label>

    {errors.email && (
        <p className="text-red-400 text-sm mt-1">
            {errors.email.message}
        </p>
    )}
</div>


{/* PASSWORD */}
<div className="relative w-full h-[50px] border-b-2 border-[#162938] my-6">
    <span className="absolute top-1/2 -translate-y-1/2 right-0 text-xl text-gray-300">
        <FaLock />
    </span>

    <input
        type="password"
        placeholder=" "
        {...register("password", {
            required: "Password is required",
            pattern: {
                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                message:
                    "Min 8 chars, 1 uppercase, 1 lowercase, 1 number",
            },
        })}
        className="w-full h-full pl-1.5 pr-8 bg-transparent text-white outline-none peer"
    />

    <label
        className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-300 font-medium transition-all duration-300 text-lg peer-placeholder-shown:text-lg peer-focus:text-xl peer-focus:top-0 peer-focus:text-white peer-not-placeholder-shown:text-xl peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-white"
    >
        Password
    </label>

    {errors.password && (
        <p className="text-red-400 text-sm mt-1">
            {errors.password.message}
        </p>
    )}
</div>


{/* DISPLAY NAME */}
<div className="relative w-full h-[50px] border-b-2 border-[#162938] my-6">
    <input
        type="text"
        placeholder=" "
        {...register("displayName", {
            required: "Display name required",
            minLength: {
                value: 3,
                message: "Display name must be at least 3 characters",
            },
        })}
        className="w-full h-full pl-1.5 bg-transparent text-white outline-none peer"
    />

    <label
        className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-300 font-medium transition-all duration-300 text-lg peer-placeholder-shown:text-lg peer-focus:text-xl peer-focus:top-0 peer-focus:text-white peer-not-placeholder-shown:text-xl peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-white"
    >
        Display Name
    </label>

    {errors.displayName && (
        <p className="text-red-400 text-sm mt-1">
            {errors.displayName.message}
        </p>
    )}
</div>


{/* CONFIRM PASSWORD */}
<div className="relative w-full h-[50px] border-b-2 border-[#162938] my-6">
    <input
        type="password"
        placeholder=" "
        {...register("confirmPassword", {
            required: "Confirm password required",
            validate: (value) =>
                value === watch("password") ||
                "Passwords do not match",
        })}
        className="w-full h-full pl-1.5 bg-transparent text-white outline-none peer"
    />

    <label
        className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-300 font-medium transition-all duration-300 text-lg peer-placeholder-shown:text-lg peer-focus:text-xl peer-focus:top-0 peer-focus:text-white peer-not-placeholder-shown:text-xl peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-white"
    >
        Confirm Password
    </label>

    {errors.confirmPassword && (
        <p className="text-red-400 text-sm mt-1">
            {errors.confirmPassword.message}
        </p>
    )}
</div>





                            {/* SUBMIT */}
                            <button
                                type="submit"
                                className="w-full h-[50px] border-2 border-white rounded-md text-white hover:bg-white hover:text-[#162938] transition duration-500"
                            >
                                Signup
                            </button>

                            {/* LOGIN LINK */}
                            <div className="mt-4 text-blue-100 text-sm text-center">
                                Already have an account?
                                <Link to="/auth-login" className="ml-1 hover:underline">Login</Link>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Signup;
