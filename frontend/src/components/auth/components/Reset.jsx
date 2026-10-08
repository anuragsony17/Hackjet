// import React, { useEffect, useState } from "react";
// import { IoMdClose, IoMdLock } from "react-icons/io";
// import { useDispatch, useSelector } from "react-redux";
// import { useForm } from "react-hook-form";

// import {
//     resetPasswordAsync,
//     selectError,
//     selectPasswordReset,
// } from "../authSlices";

// const ResetPasswordModal = () => {
//     const dispatch = useDispatch();
//     const error = useSelector(selectError);
//     const passwordReset = useSelector(selectPasswordReset);

//     const query = new URLSearchParams(window.location.search);
//     const token = query.get("token");
//     const email = query.get("email");

//     const {
//         register,
//         handleSubmit,
//         watch,
//         formState: { errors },
//     } = useForm();

//     const password = watch("password");

//     const [isOpen, setIsOpen] = useState(false);
//     const [showModal, setShowModal] = useState(true);

//     useEffect(() => {
//         setShowModal(true);
//         setTimeout(() => setIsOpen(true), 50);
//     }, []);
//     const openModal = () => {
//         setShowModal(true);
//         setTimeout(() => setIsOpen(true), 50);
//     };

//     const closeModal = () => {
//         setIsOpen(false);
//         setTimeout(() => setShowModal(false), 300);
//     };

//     if (!email || !token) {
//         return (
//             <p className="text-center text-red-500 mt-20">
//                 Invalid or expired reset link
//             </p>
//         );
//     }




//     return (
//         <div
//             className="flex justify-center min-h-screen bg-cover bg-no-repeat"
//             style={{
//                 backgroundImage: "url('https://imgs.search.brave.com/OqobzaQMeppw7WbUwxed01HNZz6Tkrqt_PYdOBJxtNs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXM0LmFscGhhY29k/ZXJzLmNvbS8xMTAv/dGh1bWJiaWctMTEw/ODE3MS53ZWJw')"
//             }}
//         >


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
//                     className={`relative w-[400px] mt-[100px]
//           max-[430px]:w-[340px] max-[380px]:w-[280px]
//           h-[420px] bg-transparent border-2 border-white/50
//           backdrop-blur-[20px] shadow-[0_0_30px_rgba(0,0,0,0.5)]
//           flex justify-center items-center overflow-hidden rounded-[20px]
//           transition-all duration-300 transform
//           ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
//                 >
//                     {/* CLOSE */}
//                     <span
//                         className="absolute top-0 right-0 w-[45px] h-[45px]
//             bg-[#162938] text-white flex justify-center
//             items-center cursor-pointer rounded-bl-[20px]"
//                         onClick={closeModal}
//                     >
//                         <IoMdClose />
//                     </span>

//                     <div className="w-full px-10">
//                         <h2 className="text-3xl text-gray-200 mb-4">
//                             Reset Password
//                         </h2>

//                         <form
//                             noValidate
//                             onSubmit={handleSubmit((data) => {
//                                 dispatch(
//                                     resetPasswordAsync({
//                                         email,
//                                         token,
//                                         password: data.password,
//                                     })
//                                 );
//                             })}
//                         >
//                             {/* NEW PASSWORD */}
//                             <div className="relative w-full h-[50px] border-b-2 border-[#162938] my-4">
//                                 <span className="absolute top-1/2 -translate-y-1/2 right-0 text-xl text-gray-300 pointer-events-none">
//                                     <IoMdLock />
//                                 </span>

//                                 <input
//                                     type="password"
//                                     placeholder=" "
//                                     {...register("password", {
//                                         required: "Password is required",
//                                         pattern: {
//                                             value:
//                                                 /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
//                                             message:
//                                                 "Min 8 chars, 1 uppercase, 1 lowercase, 1 number",
//                                         },
//                                     })}
//                                     className="w-full h-full pl-1.5 pr-8
//                   bg-transparent text-white outline-none peer"
//                                 />

//                                 <label className="absolute left-2 top-1/2 -translate-y-1/2
//                   text-gray-300 transition-all
//                   peer-placeholder-shown:top-1/2
//                   peer-focus:top-0 peer-focus:text-sm
//                   peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-sm">
//                                     New Password
//                                 </label>
//                             </div>

//                             {errors.password && (
//                                 <p className="text-red-400 text-sm">
//                                     {errors.password.message}
//                                 </p>
//                             )}

//                             {/* CONFIRM PASSWORD */}
//                             <div className="relative w-full h-[50px] border-b-2 border-[#162938] my-4">
//                                 <input
//                                     type="password"
//                                     placeholder=" "
//                                     {...register("confirmPassword", {
//                                         required: "Confirm password required",
//                                         validate: (value) =>
//                                             value === password || "Passwords do not match",
//                                     })}
//                                     className="w-full h-full pl-1.5 pr-2
//                   bg-transparent text-white outline-none peer"
//                                 />

//                                 <label className="absolute left-2 top-1/2 -translate-y-1/2
//                   text-gray-300 transition-all
//                   peer-placeholder-shown:top-1/2
//                   peer-focus:top-0 peer-focus:text-sm
//                   peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-sm">
//                                     Confirm Password
//                                 </label>
//                             </div>

//                             {errors.confirmPassword && (
//                                 <p className="text-red-400 text-sm">
//                                     {errors.confirmPassword.message}
//                                 </p>
//                             )}

//                             {passwordReset && (
//                                 <p className="text-green-400 text-sm mb-2">
//                                     Password reset successful ✅
//                                 </p>
//                             )}

//                             {error && (
//                                 <p className="text-red-400 text-sm mb-2">
//                                     {error}
//                                 </p>
//                             )}

//                             <button
//                                 type="submit"
//                                 className="w-full h-[50px] border-2 border-white
//                 rounded-md text-white text-[1.1em]
//                 hover:bg-white hover:text-[#162938]
//                 transition duration-500 mt-2"
//                             >
//                                 Reset Password
//                             </button>
//                         </form>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ResetPasswordModal;


import React, { useEffect, useState } from "react";
import { IoMdClose, IoMdLock } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import {
    resetPasswordAsync,
    selectError,
    selectPasswordReset,
} from "../authSlices";
import { Link, useNavigate } from "react-router-dom";

const ResetPasswordModal = () => {
    const dispatch = useDispatch();
    const error = useSelector(selectError);
    const passwordReset = useSelector(selectPasswordReset);
    const navigate = useNavigate();
    const query = new URLSearchParams(window.location.search);
    const token = query.get("token");
    const email = query.get("email");

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const password = watch("password");

    const [isOpen, setIsOpen] = useState(false);
    const [showModal, setShowModal] = useState(true);

    useEffect(() => {
        setShowModal(true);
        setTimeout(() => setIsOpen(true), 50);
    }, []);

    const openModal = () => {
        setShowModal(true);
        setTimeout(() => setIsOpen(true), 50);
    };

    const closeModal = () => {
        setIsOpen(false);
        setTimeout(() => setShowModal(false), 300);
    };

    // ✅ SUCCESS TOAST
    useEffect(() => {
        if (passwordReset) {  // ye selector se aayega
            toast.success("✅ Password reset successful!");
            setTimeout(() => {
                navigate("/auth-login"); // ya jaha bhejna hai
            }, 1500); // 1.5s baad navigate
        }
    }, [passwordReset, navigate]);


    // ❌ ERROR TOAST
    useEffect(() => {
        if (error) {
            toast.error(`❌ ${error}`);
        }
    }, [error]);

    if (!email || !token) {
        return (
            <p className="text-center text-red-500 mt-20">
                Invalid or expired reset link
            </p>
        );
    }

    return (
        <div
            className="flex justify-center min-h-screen bg-cover bg-no-repeat"
            style={{
                backgroundImage: "url('https://imgs.search.brave.com/OqobzaQMeppw7WbUwxed01HNZz6Tkrqt_PYdOBJxtNs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXM0LmFscGhhY29k/ZXJzLmNvbS8xMTAv/dGh1bWJiaWctMTEw/ODE3MS53ZWJw')"
            }}
        >
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
                    className="w-[170px] h-[45px] bg-transparent border-2 border-white rounded-md text-white hover:bg-white hover:text-[#162938] transition"
                    onClick={openModal}
                >
                    Reset Password
                </button>
            </header>

            {showModal && (
                <div
                    className={`relative w-[400px] mt-[100px]
          max-[430px]:w-[340px] max-[380px]:w-[280px]
          h-[420px] bg-transparent border-2 border-white/50
          backdrop-blur-[20px] shadow-[0_0_30px_rgba(0,0,0,0.5)]
          flex justify-center items-center overflow-hidden rounded-[20px]
          transition-all duration-300 transform 
          ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
                >
                    {/* CLOSE */}
                    <span
                        className="absolute top-0 right-0 w-[45px] h-[45px]
            bg-[#162938] text-white flex justify-center
            items-center cursor-pointer rounded-bl-[20px]"
                        onClick={closeModal}
                    >
                        <IoMdClose />
                    </span>

                    <div className="w-full px-10 mt-10"> {/* mt-6 se thoda upar shift */}
                        <h2 className="text-3xl text-gray-200 mb-8">
                            Reset Password
                        </h2>

                        <form
                            noValidate
                            onSubmit={handleSubmit((data) => {
                                dispatch(
                                    resetPasswordAsync({
                                        email,
                                        token,
                                        password: data.password,
                                    })
                                );
                            })}
                        >
                            {/* NEW PASSWORD */}
                            <div className="relative w-full h-[50px] border-b-2 border-[#162938] my-4">
                                <span className="absolute top-1/2 -translate-y-1/2 right-0 text-xl text-gray-300 pointer-events-none">
                                    <IoMdLock />
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
                                    className="w-full h-full pl-1.5 pr-8
                bg-[rgba(4,0,30,0.2)] text-white outline-none peer
                backdrop-blur-[10px] rounded-md"
                                />

                                <label className="absolute left-2 top-1/2 -translate-y-1/2
                text-gray-300 text-lg font-medium transition-all duration-300
                peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-lg
                peer-focus:top-0 peer-focus:text-xl peer-focus:text-white
                peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-xl peer-not-placeholder-shown:text-white">
                                    New Password
                                </label>
                            </div>

                            {errors.password && (
                                <p className="text-red-400 text-sm">{errors.password.message}</p>
                            )}

                            {/* CONFIRM PASSWORD */}
                            <div className="relative w-full h-[50px] border-b-2 border-[#162938] my-4">
                                {/* New icon for confirm password */}
                                <span className="absolute top-1/2 -translate-y-1/2 right-0 text-xl text-gray-300 pointer-events-none">
                                    <IoMdLock />{/* ya aap koi bhi React icon use kar sakte ho */}
                                </span>

                                <input
                                    type="password"
                                    placeholder=" "
                                    {...register("confirmPassword", {
                                        required: "Confirm password required",
                                        validate: (value) =>
                                            value === password || "Passwords do not match",
                                    })}
                                    className="w-full h-full pl-1.5 pr-8
                bg-[rgba(4,0,30,0.2)] text-white outline-none peer
                backdrop-blur-[10px] rounded-md"
                                />

                                <label className="absolute left-2 top-1/2 -translate-y-1/2
                text-gray-300 text-lg font-medium transition-all duration-300
                peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-lg
                peer-focus:top-0 peer-focus:text-xl peer-focus:text-white
                peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-xl peer-not-placeholder-shown:text-white">
                                    Confirm Password
                                </label>
                            </div>

                            {errors.confirmPassword && (
                                <p className="text-red-400 text-sm">{errors.confirmPassword.message}</p>
                            )}

                            <button
                                type="submit"
                                className="w-full h-[50px] border-2 border-white
            rounded-md text-white text-[1.1em]
            hover:bg-white hover:text-[#162938]
            transition duration-500 mt-4"
                            >
                                Reset Password
                            </button>
                        </form>
                    </div>

                </div>
            )}
        </div>
    );
};

export default ResetPasswordModal;
