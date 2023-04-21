import { supabase } from "./supabase"
const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SECRET_KEY)

const getClientSecret = async (email) => {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: 1000,
        currency: "usd",
        receipt_email: email,
        automatic_payment_methods: {
            enabled: true,
        },
    });
    await supabase.from("stripe_payments").delete().eq('email', email)
    await supabase.from('stripe_payments').insert({ email, payment_intent: paymentIntent.id })
    return paymentIntent.client_secret
}

export {
    getClientSecret
}
