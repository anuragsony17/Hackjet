import React, { useEffect, useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";

export default function CheckoutForm({ plan, amount }) {
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState("");
    const [status, setStatus] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!stripe) return;

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        if (!clientSecret) return;

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            if (!paymentIntent) return;

            if (paymentIntent.status === "succeeded") {
                setStatus("success");
                setMessage("🎉 Payment successful! Plan activated.");
            }
        });
    }, [stripe]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `http://localhost:5173/payment-success?plan=${plan}&amount=${amount}`
            },
        });

        if (error) {
            setStatus("error");
            setMessage(error.message);
        }

        setIsLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0f172a] px-4">
            <div
                className="w-full max-w-md rounded-3xl p-8
    bg-[rgba(255,255,255,0.08)]
    backdrop-blur-xl
    border border-white/20
    shadow-[0_20px_60px_rgba(0,0,0,0.4)]
    animate-fadeIn"
            >
                {/* Header */}
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-white tracking-wide">
                        Secure Checkout
                    </h2>
                    <p className="text-sm text-gray-300 mt-1">
                        Complete your payment securely with Stripe
                    </p>
                </div>

                {/* Payment Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-white rounded-xl p-3">
                        <PaymentElement />
                    </div>

                    <button
                        disabled={isLoading || !stripe || !elements}
                        className={`w-full py-3 rounded-xl font-semibold text-lg tracking-wide
        transition-all duration-300
        ${isLoading
                                ? "bg-indigo-400 cursor-not-allowed"
                                : "bg-indigo-600 hover:bg-indigo-500 hover:scale-[1.02]"
                            }`}
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center gap-2">
                                <span className="h-5 w-5 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
                                Processing…
                            </div>
                        ) : (
                            "Pay Securely"
                        )}
                    </button>

                    {/* Message */}
                    {message && (
                        <div
                            className={`text-center text-sm font-medium
          ${status === "error"
                                    ? "text-red-400"
                                    : "text-green-400"
                                }`}
                        >
                            {message}
                        </div>
                    )}
                </form>

                {/* Footer */}
                <div className="mt-6 text-center text-xs text-gray-400">
                    🔒 Payments are encrypted & secured by Stripe
                </div>
            </div>
        </div>

    );
}
