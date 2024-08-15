import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { loadStripe } from "@stripe/stripe-js";

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

let stripePromise;

const getStripe = () => {
    if (!stripePromise) {
        stripePromise = loadStripe(
            process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
        );
    }
    return stripePromise;
};

export default getStripe;
