import Image from 'next/image'
import React, { useState } from 'react'
import { SearchIcon, GlobeAltIcon, MenuIcon, UserCircleIcon, UsersIcon } from '@heroicons/react/solid'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { useRouter } from 'next/router';

function Header({placeholder}) {
    const [searchInput, setSearchInput] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [guest, setGuest] = useState(1);
    const router = useRouter();
    
    const handleSelect = (ranges) => {
        setStartDate(ranges.selection.startDate);
        setEndDate(ranges.selection.endDate);
    }
    
    
    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: 'selection'
    }

    const resetInputs = () => {
        setSearchInput("");
        setStartDate(new Date());
        setEndDate(new Date());
    }

    const search = () => {
        router.push({
            pathname: '/search',
            query: {
                location: searchInput,
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                guests: guest,
            }
        });
    }

    

    return (
        <header className='sticky bg-white top-0 p-5 z-50 grid grid-cols-3 shadow-md md:px-10'>
        {/* left */}
            <div onClick={() => router.push("/")} className='relative flex items-center h-10 my-auto'>
                <Image className='cursor-pointer' src="https://links.papareact.com/qd3" fill={true} style={{objectFit: "contain", objectPosition: "left"}} alt='logo'/>
            </div>

        {/* middle */}
            <div className='w-full py-2 md:border-2 rounded-full md:shadow-sm flex items-center'>
                <input className='flex-grow pl-5 text-sm text-gray-600 placeholder-gray-400 bg-transparent outline-none' type='text' value={searchInput} onChange={e => setSearchInput(e.target.value)} placeholder={placeholder || "Start your Search"}/>
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
            {searchInput && (
                <div className='flex flex-col col-span-3 mx-auto mt-4'>
                    <DateRangePicker 
                        ranges={[selectionRange]} 
                        minDate={new Date()} 
                        rangeColors={["#FD5B61"]}
                        onChange={handleSelect}
                    />
                    <div className='flex items-center border-b mb-4'>
                        <h2 className='text-2xl flex-grow font-semibold'>Number of Guests</h2>
                        <UsersIcon className='h-5'/>
                        <input value={guest} onChange={e => setGuest(e.target.value)} className='w-12 pl-2 text-lg outline-none text-red-400' type='number'/>
                    </div>
                    <div className='flex items-center'>
                        <button className='flex-grow text-gray-500' onClick={resetInputs}>Cancel</button>
                        <button onClick={search} className='flex-grow text-red-400'>Search</button>
                    </div>
                </div>
            )}
            
        </header>
    )
}

export default Header
