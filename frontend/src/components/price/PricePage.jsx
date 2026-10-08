import React from "react";
import { FaCheck } from "react-icons/fa";
import TopBar from "../models/topbar/TopBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const plans = [
    {
        id: "free",
        name: "Free",
        price: 0,
        displayPrice: "₹0",
        desc: "For beginners",
        features: [
            "Solve limited problems",
            "Basic editor",
            "Community access",
        ],
        btn: "Get Started",
        highlight: false,
    },
    {
        id: "pro",
        name: "Pro",
        price: 299,
        displayPrice: "₹299",
        desc: "Best for serious coders",
        features: [
            "Unlimited problems",
            "AI hints",
            "Contest access",
            "Detailed analytics",
        ],
        btn: "Buy Pro",
        highlight: true,
    },
    {
        id: "premium",
        name: "Premium",
        price: 699,
        displayPrice: "₹699",
        desc: "For professionals",
        features: [
            "Everything in Pro",
            "1:1 mentor support",
            "Private contests",
            "Certificate",
        ],
        btn: "Go Premium",
        highlight: false,
    },
];





const Pricing = () => {
    const navigate = useNavigate();
    const handlePlanClick = async (plan) => {
        if (plan.id === "free") {
            navigate("/dashboard");
            return;
        }

        try {
            const res = await axios.post(
                "http://localhost:8080/payment/create",
                { plan: plan.id },
                { withCredentials: true }
            );
          

            // 🔹 Use Stripe Checkout clientSecret flow
            navigate("/checkout", { state: { clientSecret: res.data.clientSecret, plan: plan.id, amount: plan.price  } });
        } catch (err) {
            console.log(err);
            alert("Payment initiation failed");
        }
    };




    return (
        <>
            <div className="h-18">
                <TopBar />
            </div>

            <div className="min-h-screen bg-[#0f172a] text-white py-8 px-6">
                <h1 className="text-4xl font-bold text-center mb-4">
                    Choose Your Plan
                </h1>
                <p className="text-center text-gray-400 mb-12">
                    Simple pricing, no hidden charges
                </p>

                <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
                    {plans.map((plan) => (
                        <div
                            key={plan.id}
                            className={`relative p-8 rounded-3xl border backdrop-blur-xl
              transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl
              ${plan.highlight
                                    ? "bg-gradient-to-br from-indigo-600 to-purple-600 border-indigo-400 scale-105"
                                    : "bg-[rgba(17,24,39,0.7)] border-gray-700"
                                }`}
                        >
                            {plan.highlight && (
                                <span className="absolute -top-3 right-6 bg-yellow-400 text-black 
                text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                                    MOST POPULAR
                                </span>
                            )}

                            <h2 className="text-2xl font-bold mb-1">{plan.name}</h2>
                            <p className="text-gray-300 mb-5">{plan.desc}</p>

                            <div className="flex items-end gap-1 mb-6">
                                <h3 className="text-4xl font-extrabold">
                                    {plan.displayPrice}
                                </h3>
                                <span className="text-sm text-gray-300">/month</span>
                            </div>

                            <ul className="space-y-3 mb-8">
                                {plan.features.map((f, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm">
                                        <span className="bg-green-500/20 text-green-400 p-1 rounded-full">
                                            <FaCheck size={12} />
                                        </span>
                                        <span>{f}</span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => handlePlanClick(plan)}
                                className={`w-full py-3 rounded-xl font-semibold tracking-wide
                transition duration-300
                ${plan.highlight
                                        ? "bg-white text-indigo-600 hover:bg-gray-100"
                                        : "bg-indigo-600 hover:bg-indigo-500"
                                    }`}
                            >
                                {plan.btn}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Pricing;
