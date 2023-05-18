import Image from 'next/image'
import React from 'react'
import { SearchIcon, GlobeAltIcon, MenuIcon, UserCircleIcon, UsersIcon } from '@heroicons/react/solid'

function Header() {
  return (
    <header className='sticky bg-white top-0 p-5 z-50 grid grid-cols-3 shadow-md md:px-10'>
{/* left */}
        <div className='relative flex items-center h-10 my-auto'>
            <Image className='cursor-pointer' src="https://links.papareact.com/qd3" fill={true} style={{objectFit: "contain", objectPosition: "left"}} alt='logo'/>
        </div>

{/* middle */}
        <div className='w-full py-2 md:border-2 rounded-full md:shadow-sm flex items-center'>
            <input className='flex-grow pl-5 text-sm text-gray-600 placeholder-gray-400 bg-transparent outline-none' type='text' placeholder='Start your search'/>
            <SearchIcon className="hidden md:inline-flex h-8 text-white bg-red-400 rounded-full p-2 cursor-pointer mx-auto md:mx-2"/>
        </div>
{/* right */}
        <div className='flex justify-end text-gray-500 items-center space-x-4'>
            <p className='hidden md:inline-block'>Become a host</p>
            <GlobeAltIcon className='h-6 cursor-pointer'/>
            <div className='border-2 rounded-full flex items-center space-x-2 p-2 cursor-pointer'>
                <MenuIcon className='h-6'/>
                <UserCircleIcon className='h-6'/>
            </div>
        </div>
    </header>
  )
}

export default Header
