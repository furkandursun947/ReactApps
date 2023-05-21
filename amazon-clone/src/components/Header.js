import React from 'react'
import Image from 'next/image'
import { signIn, signOut, useSession} from "next-auth/react"
import { useRouter } from 'next/router';
import { selectItems } from '../slices/basketSlice';
import { useSelector } from 'react-redux';



function Header() {
  
  const router = useRouter();
  const {data: session, status} = useSession();
  const items = useSelector(selectItems);

  return (
    <header className='flex flex-col'>
        <div className='flex items-center sticky top-0 z-50 bg-amazon_blue p-1 flex-grow py-2 space-x-2'>
            <div className='mt-2 flex items-center flex-grow sm:flex-grow-0 link' onClick={() => router.push("/")}>
                <Image src='https://links.papareact.com/f90' className='cursor-pointer' style={{objectFit: 'contain', objectPosition:'left'}}  width={100} height={40} alt='logo'/>
            </div>
            <div className='hidden sm:flex items-center h-10 rounded-md flex-grow cursor-pointer bg-amazon_yellow'>
                <input type='text' placeholder='Ara Amazon.com.tr' className='p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4' />         
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="p-4 h-12">
                    <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
                </svg>
            </div>
            <div className='flex items-center text-xs space-x-4 mx-6 whitespace-nowrap text-white'>
                <div onClick={!session ? signIn: signOut} className='link'>
                    <p>
                        {session ? `Hello, ${session.user.name}`: 'Sign In'}
                    </p>
                    <p className='font-extrabold md:text-sm'>Account & Lists</p>
                </div>
                <div onClick={() => router.push("/orders")} className='link'>
                    <p>Returns</p>
                    <p className='font-extrabold md:text-sm'>& Orders</p>
                </div>
                <div className='flex items-center relative link' onClick={() => router.push("/checkout")}>
                    <span className='absolute w-4 h-4 flex font-bold items-center justify-center rounded-full p-1 bg-amazon_yellow top-0 right-0 md:right-12 text-black'>{items?.length}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-10">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>
                    <p className='hidden md:inline-flex font-extrabold md:text-sm mt-2'>Basket</p>
                </div>
            </div>
        </div>
        <div className='bg-amazon_blue-light flex items-center text-white p-2 pl-6 space-x-3 text-xs md:text-sm font-medium'>
            <p className='flex items-center menuItem'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 mr-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
                <span>All</span>
            </p>
            <p className='menuItem'>Prime Video</p>
            <p className='menuItem'>Amazon Business</p>
            <p className='menuItem'>Today's Deals</p>
            <p className='menuItem hidden lg:inline-flex'>Electronics</p>
            <p className='menuItem hidden lg:inline-flex'>Food & Grocery</p>
            <p className='menuItem hidden lg:inline-flex'>Prime</p>
            <p className='menuItem hidden lg:inline-flex'>Buy Again</p>
            <p className='menuItem hidden lg:inline-flex'>Shopper Toolkit</p>
            <p className='menuItem hidden lg:inline-flex'>Health & Personal Care</p>
        </div>
    </header>
  )
}

export default Header