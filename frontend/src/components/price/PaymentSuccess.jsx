import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";

const PaymentSuccess = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const plan = searchParams.get("plan") || "Pro";
    const amount = searchParams.get("amount") || "0";

    return (
        <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-4">
            <div className="bg-[rgba(255,255,255,0.08)] backdrop-blur-xl 
            border border-green-400/40 rounded-3xl p-10 max-w-md w-full text-center
            shadow-2xl animate-fadeIn">

                {/* Icon */}
                <div className="flex justify-center mb-5">
                    <FaCheckCircle className="text-green-400 text-6xl animate-bounce" />
                </div>

                {/* Title */}
                <h1 className="text-3xl font-bold text-white mb-2">
                    Payment Successful 🎉
                </h1>

                <p className="text-gray-300 mb-6">
                    Your subscription has been activated successfully.
                </p>

                {/* Info Card */}
                <div className="bg-black/40 rounded-xl p-4 text-sm text-gray-200 mb-6 space-y-1">
                    <p>
                        <span className="text-gray-400">Status:</span>{" "}
                        <span className="text-green-400 font-semibold">Completed</span>
                    </p>

                    <p>
                        <span className="text-gray-400">Plan:</span>{" "}
                        <span className="capitalize font-semibold">{plan}</span>
                    </p>

                   
                </div>

                {/* Buttons */}
                <div className="flex gap-4">
                    <button
                        onClick={() => navigate("/")}
                        className="flex-1 py-3 rounded-xl font-semibold
                        bg-indigo-600 hover:bg-indigo-500 transition"
                    >
                        Go to Home
                    </button>

                    <button
                        onClick={() => navigate("/profile")}
                        className="flex-1 py-3 rounded-xl font-semibold
                        border border-indigo-400 hover:bg-indigo-600/20 transition"
                    >
                        View Profile
                    </button>
                </div>

            </div>
        </div>
    );
};

export default PaymentSuccess;
