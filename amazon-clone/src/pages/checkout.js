import React from 'react'
import Header from '../components/Header'
import Image from 'next/image'
import Currency from 'react-currency-formatter';
import { useSelector } from 'react-redux'
import { selectItems, selectTotal } from '../slices/basketSlice'
import CheckoutProduct from '../components/CheckoutProduct'
import { useSession } from 'next-auth/react';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

const stripePromise = loadStripe(process.env.stripe_public_key);

function Checkout() {
    const total = useSelector(selectTotal);
    const items = useSelector(selectItems);
    const {data: session} = useSession();
    const createCheckoutSession = async () => 
    {
        const stripe = await stripePromise;
        const checkoutSession = await axios.post("/api/create-checkout-session", 
        {
            items: items,
            email: session.user.email
        })
        const result = await stripe.redirectToCheckout({
            sessionId: checkoutSession.data.id
        })
        if (result.error){
            console.log(result.error.message)
            alert(result.error.message);
        }
    }
    return (
        <div className='bg-gray-100'>
            <Header/>
            <main className='lg:flex max-w-screen-2xl mx-auto justify-center'>
                <div className='flex-grow m-5 shadow-sm'>
                    <Image src="https://links.papareact.com/ikj" alt='bannerCheckout' width={1020} height={250} style={{objectFit:'contain'}}/>
                    <div className='flex flex-col p-5 space-y-10 bg-white'>
                        <h1 className='text-3xl border-b pb-4'>
                            {items.length === 0 ? 'Your Amazon basket is empty.': 'Shopping Basket'}
                        </h1>

                        {items.map(({id, title, price, rating, description, image, hasPrime}, index) => (
                            <CheckoutProduct key={index} id={id} title={title} price={price} rating={rating} description={description} image={image} hasPrime={hasPrime}/>
                        ))}
                    </div>
                </div>
                <div className='flex flex-col bg-white p-10 shadow-md'>
                    {items.length > 0 && (
                        <div>
                            <h2 className='whitespace-nowrap'>Subtotal ({items.length} items): {" "}
                                <span>
                                    <Currency quantity={total} currency="GBP"/>
                                </span>
                            </h2>
                            <button onClick={e => createCheckoutSession()} role='link' disabled={!session} className={`w-full button mt-2 ${!session && 'from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed'}`}>
                                {!session ? 'Sign in to checkout': 'Proceed to checkout'}
                            </button>
                        </div>
                    )}
                </div>            
            </main>
        </div>
    )
}

export default Checkout