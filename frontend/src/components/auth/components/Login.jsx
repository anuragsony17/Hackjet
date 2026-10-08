import React, { useState } from 'react';
import { FaLock } from 'react-icons/fa';
import { IoMdClose, IoMdMail } from 'react-icons/io';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { toast } from "react-toastify";

import { loginUserAsync, selectError } from '../authSlices';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const error = useSelector(selectError);

    const { register, handleSubmit, formState: { errors } } = useForm();
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

    const onSubmit = (data) => {
        dispatch(loginUserAsync({ email: data.email, password: data.password }))
            .unwrap() // 👈 unwrap to handle resolved/rejected promise
            .then(() => {
                toast.success("🎉 Login successful! Welcome back!");
                setTimeout(() => navigate("/"), 1200);
            })
            .catch(() => {
                toast.error("❌ Login failed! Please check credentials.");
            });
    };

    return (
        <div
            className="flex justify-center min-h-screen bg-cover bg-no-repeat"
            style={{
                backgroundImage:
                    "url('https://imgs.search.brave.com/OqobzaQMeppw7WbUwxed01HNZz6Tkrqt_PYdOBJxtNs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXM0LmFscGhhY29k/ZXJzLmNvbS8xMTAv/dGh1bWJiaWctMTEw/ODE3MS53ZWJw')",
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

                <nav>
                    <button
                        className="w-[120px] h-[45px] bg-transparent border-2 border-white rounded-md cursor-pointer text-[1.1em] text-white font-medium ml-10 transition-all duration-500 hover:bg-white hover:text-[#162938]"
                        onClick={openModal}
                    >
                        Login
                    </button>
                </nav>
            </header>

            {showModal && (
                <div
                    className={`relative w-[400px] mt-[100px]
                    max-[430px]:w-[340px] max-[380px]:w-[280px]
                    h-[440px] bg-transparent border-2 border-white/50
                    backdrop-blur-[20px] shadow-[0_0_30px_rgba(0,0,0,0.5)]
                    flex justify-center items-center overflow-hidden rounded-[20px]
                    transition-all duration-300 transform
                    ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
                >
                    {/* CLOSE */}
                    <span
                        onClick={closeModal}
                        className="absolute top-0 right-0 w-[45px] h-[45px] text-[2em] bg-[#162938] text-white flex justify-center items-center cursor-pointer rounded-bl-[20px]"
                    >
                        <IoMdClose />
                    </span>

                    <div className="w-full px-10 max-[380px]:px-[33px]">
                        <h2 className="text-3xl text-gray-200 text-center mb-6">
                            Login
                        </h2>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            {/* EMAIL */}
                            <div className="relative w-full h-[50px] border-b-2 border-[#162938] my-6">

                                {/* ICON */}
                                <span className="absolute top-1/2 -translate-y-1/2 right-0
                                            text-xl text-gray-300
                                            transition-colors duration-300
                                            peer-focus:text-white">
                                    <IoMdMail />
                                </span>

                                {/* INPUT */}
                                <input
                                    type="email"
                                    placeholder=" "
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /\b[\w.-]+@[\w.-]+\.\w{2,4}\b/,
                                            message: "Invalid email address",
                                        },
                                    })}
                                    className="w-full h-full pl-1.5 pr-8
                                        bg-transparent text-white outline-none peer"
                                />

                                {/* LABEL */}
                                <label
                                    className="absolute left-2 top-1/2 -translate-y-1/2
        text-gray-300 font-medium transition-all duration-300
        text-lg  /* ✅ Bada text */
        peer-placeholder-shown:top-1/2
        peer-placeholder-shown:text-lg   /* placeholder jab dikhe tab bhi same size */
        peer-focus:top-0  peer-focus:text-xl peer-focus:text-white  /* focus pe aur bada */
        peer-not-placeholder-shown:top-0
        peer-not-placeholder-shown:text-xl peer-not-placeholder-shown:text-white"
                                >
                                    Email
                                </label>


                                {errors.email && (
                                    <p className="text-red-400 text-sm mt-1">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>




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
                                            message: "Min 8 chars, 1 uppercase, 1 lowercase, 1 number",
                                        },
                                    })}
                                    className="w-full h-full pl-1.5 pr-8 bg-transparent
                                        text-white outline-none peer"
                                />

                                <label
                                    className="absolute left-2 top-1/2 -translate-y-1/2
        text-gray-300 font-medium transition-all duration-300
        text-lg  /* ✅ Bada text */
        peer-placeholder-shown:top-1/2
        peer-placeholder-shown:text-lg   /* placeholder jab dikhe tab bhi same size */
        peer-focus:top-0 peer-focus:text-xl peer-focus:text-white  /* focus pe aur bada */
        peer-not-placeholder-shown:top-0
        peer-not-placeholder-shown:text-xl peer-not-placeholder-shown:text-white"
                                >
                                    Password
                                </label>

                                {errors.password && (
                                    <p className="text-red-400 text-sm mt-1">
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>

                         

                            {/* FORGOT */}
                            <div className="flex justify-end text-sm text-blue-100 mb-4">
                                <Link to="/auth-forget" className="hover:underline">
                                    Forget password?
                                </Link>
                            </div>

                            {/* SUBMIT */}
                            <button
                                type="submit"
                                className="w-full h-[50px] border-2 border-white rounded-md text-white text-[1.1em] hover:bg-white hover:text-[#162938] transition duration-500"
                            >
                                Login
                            </button>

                            {/* REGISTER */}
                            <div className="mt-4 text-blue-100 text-sm text-center">
                                Don&apos;t have an account?
                                <Link to="/auth-singup" className="ml-1 hover:underline">
                                    Register
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;
