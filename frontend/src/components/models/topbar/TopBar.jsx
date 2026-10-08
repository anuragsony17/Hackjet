import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BsList } from "react-icons/bs";
import Timer from "../timer/Timer";
import { Link, useNavigate } from "react-router-dom";
import { selectLoggedInUser, signOutAsync } from "../../auth/authSlices";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";




const TopBar = ({ problemPage }) => {


    const location = useLocation();
    const isProblemPage = location.pathname.startsWith("/problems/");
    const isPricingPage = location.pathname.startsWith("/price");

    const user = useSelector(selectLoggedInUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        toast.success("🙏 Thank you for visiting! See you again!");
        dispatch(signOutAsync());
        navigate("/auth-login");
    };

    return (
  


        <nav className="sticky top-0 z-50 backdrop-blur-xl bg-neutral-900/80 border-b border-white/10 shadow-lg">
            <div className="flex items-center h-[64px] px-6 max-w-[1200px] mx-auto justify-between">

                {/* LOGO */}
                <Link to="/" className="flex items-center gap-5 group">
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

                {/* PROBLEM CONTROLS */}
                {isProblemPage && (
                    <div className="hidden md:flex items-center gap-4">
                    

                        <Link
                            to="/"
                            className="flex items-center gap-2 px-4 py-1.5 
              rounded-full bg-neutral-800 hover:bg-neutral-700 transition"
                        >
                            <BsList />
                            <span className="text-sm">Problem List</span>
                        </Link>
                    </div>
                )}

                {/* RIGHT */}
                <div className="flex items-center gap-3">

                    {/* PREMIUM / BACK */}
                    {!isProblemPage ? (
                        user ? (
                            user.role === "admin" ? (
                                /* ADMIN BUTTON */
                                <span
                                    onClick={() => navigate("/admin")}
                                    className="
          px-4 py-1.5 rounded-full
          bg-gradient-to-r from-indigo-500 to-purple-500
          text-white font-semibold
          hover:scale-105 transition
          cursor-pointer select-none
        "
                                >
                                    Admin ⚙️
                                </span>
                            ) : (
                                /* PREMIUM BUTTON */
                                <span
                                    onMouseDown={(e) => {
                                        e.preventDefault();
                                        navigate("/price");
                                    }}
                                    className="
          px-4 py-1.5 rounded-full
          bg-gradient-to-r from-orange-500 to-yellow-500
          text-black font-semibold
          hover:scale-105 transition
          cursor-pointer select-none
        "
                                >
                                    Premium ✨
                                </span>
                            )
                        ) : (
                            /* NOT LOGGED */
                            <span
                                onMouseDown={(e) => {
                                    e.preventDefault();
                                    toast.error("🔥 Login first to access Premium!");
                                }}
                                    className="
          px-4 py-1.5 rounded-full
          bg-gradient-to-r from-orange-500 to-yellow-500
          text-black font-semibold
          hover:scale-105 transition
          cursor-pointer select-none
        "
                            >
                                    Premium ✨
                            </span>
                        )
                    ) : (
                        /* PROBLEM PAGE */
                        <button
                            onClick={() => window.history.back()}
                            className="
      px-4 py-1.5 rounded-full 
      bg-neutral-700 hover:bg-neutral-600
      transition
    "
                        >
                            ⬅ Go Back
                        </button>
                    )}



                    {isProblemPage && <Timer />}

                    {/* AVATAR + SHUTTER */}
                    <div className="relative group">

                        <img
                            src="/avatar.png"
                            className="w-9 h-9 rounded-full border-2 
              border-indigo-500 shadow-md cursor-pointer"
                        />

                        {/* SHUTTER MENU */}
                        <div
                            className="absolute left-[-50px] mt-3 w-44
  bg-neutral-900/90 backdrop-blur-xl
  border border-white/10 rounded-xl
  shadow-xl overflow-hidden
  scale-y-0 origin-top
  group-hover:scale-y-100
  transition-transform duration-300"
                        >
                            <span
                                onMouseDown={(e) => {
                                    e.preventDefault();

                                    if (!user) {
                                        toast.error("😎 Login first to view your profile!");
                                        return;
                                    }

                                    navigate("/profile");
                                }}
                                className="block px-4 py-2 text-sm
  hover:bg-neutral-800 cursor-pointer"
                            >
                                👤 My Profile
                            </span>

                       
                        </div>

                    </div>

                    {/* SIGN OUT BUTTON (OUTSIDE) */}
                    {user ? (
                        <button
                            onClick={handleLogout}
                            className="px-4 py-1.5 rounded-full
    bg-gradient-to-r from-red-500 to-pink-500
    hover:opacity-90 transition"
                        >
                            Sign Out
                        </button>
                    ) : (
                        <Link
                            to="/auth-login"
                            className="px-4 py-1.5 rounded-full
    bg-gradient-to-r from-indigo-500 to-purple-500
    hover:opacity-90 transition"
                        >
                            Sign In
                        </Link>
                    )}


                </div>
            </div>
        </nav>
    );
};

export default TopBar;

