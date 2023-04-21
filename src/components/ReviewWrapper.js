import React, { useEffect, useState } from 'react'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Review from "../pages/Review"
import { getClientSecret } from '../utils/stripe_api';
import { useAuth } from './utils/auth';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);


const ReviewWrapper = () => {
    const auth = useAuth();
    const { formOneOthers } = auth
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        getClientSecret(formOneOthers.email)
            .then(secret => {
                setClientSecret(secret)
            })
            .catch(err => {
                console.log(err)
            })
    }, [formOneOthers.email])


    return (
        <div>
            {clientSecret ?
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <Review clientSecret={clientSecret} />
                </Elements>
                :
                <div />
            }
        </div>
    )
}

export default ReviewWrapper