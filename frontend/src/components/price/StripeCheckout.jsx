import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../price/CheckoutPage";
import { useLocation } from "react-router-dom";




const stripePromise = loadStripe(
    "pk_test_51QIJu1EDyIGp3ib4HrxAPweWfgOJzwQr5R5wSR66W8JrhsyUvhkNaF2YhjwHQQ1H005dCdhF6f2fashpytFWxiVK00OAhK9zaE"
);

export default function StripeCheckout() {
    const { state } = useLocation();
    const { plan, amount } = state;
    const location = useLocation();
    const { clientSecret } = location.state || {};

    if (!clientSecret) return <div>Payment initialization failed</div>;

    const options = { clientSecret, appearance: { theme: "stripe" } };

    return (
        <Elements options={options} stripe={stripePromise}>
            <CheckoutForm plan={plan} amount={amount} />
        </Elements>
    );
}
