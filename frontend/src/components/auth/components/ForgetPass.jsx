// import React, { useEffect, useState } from "react";
// import { IoMdClose, IoMdMail } from "react-icons/io";
// import { useForm } from "react-hook-form";
// import { useDispatch, useSelector } from "react-redux";
// import {
//     resetPasswordRequestAsync,
//     selectMailSent,
// } from "../authSlices";

// const ForgotPasswordModal = () => {
//     const dispatch = useDispatch();
//     const mailSent = useSelector(selectMailSent);

//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//     } = useForm();

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

//     const onSubmit = (data) => {
//         dispatch(resetPasswordRequestAsync(data.email));
//     };

//     return (
//         <div
//             className="flex justify-center min-h-screen bg-cover bg-no-repeat"
//             style={{
//                 backgroundImage:
//                     "url('https://imgs.search.brave.com/OqobzaQMeppw7WbUwxed01HNZz6Tkrqt_PYdOBJxtNs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXM0LmFscGhhY29k/ZXJzLmNvbS8xMTAv/dGh1bWJiaWctMTEw/ODE3MS53ZWJw')",
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
//                     className={`relative w-[400px] mt-[100px] h-[400px]
//           bg-transparent border-2 border-white/50
//           backdrop-blur-[20px] shadow-[0_0_30px_rgba(0,0,0,0.5)]
//           flex justify-center items-center overflow-hidden rounded-[20px]
//           transition-all duration-300 transform
//           ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
//                 >
//                     {/* ❌ Close */}
//                     <span
//                         className="absolute top-0 right-0 w-[45px] h-[45px]
//             text-[2em] bg-[#162938] text-white flex
//             justify-center items-center cursor-pointer
//             rounded-bl-[20px]"
//                         onClick={closeModal}
//                     >
//                         <IoMdClose />
//                     </span>

//                     <div className="w-full px-10">
//                         <h2 className="text-3xl text-gray-200">
//                             Forgot Password
//                         </h2>

//                         <p className="text-sm mt-6 text-gray-200">
//                             Enter your email and we’ll send you a reset link
//                         </p>

//                         <form
//                             noValidate
//                             onSubmit={handleSubmit(onSubmit)}
//                         >
//                             {/* 📧 Email */}
//                             <div className="relative w-full h-[50px] border-b-2 border-[#162938] my-6">
//                                 {/* ⚠️ IMPORTANT FIX */}
//                                 <span className="absolute top-1/2 -translate-y-1/2 right-0 
//                 text-xl text-white pointer-events-none">
//                                     <IoMdMail />
//                                 </span>

//                                 <input
//                                     type="email"
//                                     placeholder=" "
//                                     {...register("email", {
//                                         required: "Email is required",
//                                         pattern: {
//                                             value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/,
//                                             message: "Invalid email address",
//                                         },
//                                     })}
//                                     className="w-full h-full pl-1.5 pr-8
//                   bg-transparent text-white outline-none peer"
//                                 />

//                                 <label
//                                     className="absolute left-2 top-1/2 -translate-y-1/2
//                   text-base text-gray-300 transition-all duration-300
//                   peer-placeholder-shown:top-1/2
//                   peer-focus:top-0 peer-focus:text-sm
//                   peer-not-placeholder-shown:top-0
//                   peer-not-placeholder-shown:text-sm"
//                                 >
//                                     Email
//                                 </label>
//                             </div>

//                             {/* ❌ Error */}
//                             {errors.email && (
//                                 <p className="text-red-400 text-sm">
//                                     {errors.email.message}
//                                 </p>
//                             )}

//                             {/* ✅ Success */}
//                             {mailSent && (
//                                 <p className="text-green-400 text-sm">
//                                     Reset email sent successfully ✅
//                                 </p>
//                             )}

//                             <button
//                                 type="submit"
//                                 className="w-full h-[50px] border-2 border-white
//                 rounded-md cursor-pointer text-white font-medium
//                 text-[1.1em] mt-4 hover:bg-white
//                 hover:text-[#162938] transition duration-500"
//                             >
//                                 Send Reset Email
//                             </button>
//                         </form>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ForgotPasswordModal;
import React, { useEffect, useState } from "react";
import { IoMdClose, IoMdMail } from "react-icons/io";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import {
    resetPasswordRequestAsync,
    selectMailSent,
    selectError
} from "../authSlices";
import { Link } from "react-router-dom";

const ForgotPasswordModal = () => {
    const dispatch = useDispatch();
    const mailSent = useSelector(selectMailSent);
    const error = useSelector(selectError);

    const { register, handleSubmit, formState: { errors } } = useForm();

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

    const onSubmit = (data) => {
        dispatch(resetPasswordRequestAsync(data.email));
    };

    // ✅ SUCCESS TOAST
    useEffect(() => {
        if (mailSent) {
            toast.success("✅ Reset email sent successfully!");
        }
    }, [mailSent]);

    // ❌ ERROR TOAST
    useEffect(() => {
        if (error) {
            toast.error("❌ Failed to send reset email!");
        }
    }, [error]);

    return (
        <div
            className="flex justify-center min-h-screen bg-cover bg-no-repeat"
            style={{
                backgroundImage:
                    "url('https://imgs.search.brave.com/OqobzaQMeppw7WbUwxed01HNZz6Tkrqt_PYdOBJxtNs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXM0LmFscGhhY29k/ZXJzLmNvbS8xMTAv/dGh1bWJiaWctMTEw/ODE3MS53ZWJw')",
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
                    Forgot Password
                </button>
            </header>

            {showModal && (
                <div
                    className={`relative w-[400px] mt-[100px] h-[400px]
          bg-transparent border-2 border-white/50
          backdrop-blur-[20px] shadow-[0_0_30px_rgba(0,0,0,0.5)]
          flex justify-center items-center overflow-hidden rounded-[20px]
          transition-all duration-300 transform
          ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
                >
                    {/* ❌ Close */}
                    <span
                        className="absolute top-0 right-0 w-[45px] h-[45px]
            text-[2em] bg-[#162938] text-white flex
            justify-center items-center cursor-pointer
            rounded-bl-[20px]"
                        onClick={closeModal}
                    >
                        <IoMdClose />
                    </span>

                    <div className="w-full px-10">
                        <h2 className="text-3xl text-gray-200">
                            Forgot Password
                        </h2>

                        <p className="text-sm mt-6 text-gray-200">
                            Enter your email and we’ll send you a reset link
                        </p>

                        <form
                            noValidate
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            {/* 📧 Email */}
                            <div className="relative w-full h-[50px] border-b-2 border-[#162938] my-6">
                                <span className="absolute top-1/2 -translate-y-1/2 right-0 
                text-xl text-white pointer-events-none">
                                    <IoMdMail />
                                </span>

                                <input
                                    type="email"
                                    placeholder=" "
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/,
                                            message: "Invalid email address",
                                        },
                                    })}
                                    className="w-full h-full pl-1.5 pr-8
                  bg-transparent text-white outline-none peer"
                                />

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
                            </div>

                            {/* ❌ Error */}
                            {errors.email && (
                                <p className="text-red-400 text-sm">
                                    {errors.email.message}
                                </p>
                            )}

                            <button
                                type="submit"
                                className="w-full h-[50px] border-2 border-white
                rounded-md cursor-pointer text-white font-medium
                text-[1.1em] mt-4 hover:bg-white
                hover:text-[#162938] transition duration-500"
                            >
                                Send Reset Email
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ForgotPasswordModal;
