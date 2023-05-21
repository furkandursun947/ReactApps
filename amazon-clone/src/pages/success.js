import React from 'react'
import Header from '../components/Header'
import { useRouter } from 'next/router'

function Success() {
    const router = useRouter();
  return (
    <div className='bg-gray-100 h-screen'>
        <Header />
        <main className='max-w-screen-lg mx-auto'>
            <div className='flex flex-col p-10 bg-white'>
                <div className='flex items-center space-x-2 mb-5'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-10 text-green-500">
                        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                    </svg>
                    <h1 className='text-3xl'>Thank you, your order has been confirmed!</h1>
                </div>
                <p>
                    Thank you for shopping with us. We'll send a confirmation once your item has shipped, if you would like to check the status of your order(s) please press the link below.
                </p>
                <button onClick={() => router.push('/orders') } className='button mt-8'>Go to my orders</button>
            </div>
        </main>
    </div>
  )
}

export default Success