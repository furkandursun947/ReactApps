import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { useRouter } from 'next/router'
import {format} from "date-fns"
import React from 'react'
import https from 'https';
import fetch from 'node-fetch';
import InfoCard from '@/components/InfoCard'



const agent = new https.Agent({
    rejectUnauthorized: false,
});

export default function Search({searchResults}) {

    const router = useRouter();
    const {location, startDate, endDate, guests} = router.query;
    const formattedStartDate = format(new Date(startDate), "dd MMMM yyyy");
    const formattedEndDate = format(new Date(endDate), "dd MMMM yyyy");
    const range = `${formattedStartDate} - ${formattedEndDate}`;
    console.log(searchResults)
    return (
    <div>
        <Header placeholder={`${location} | ${range} | ${guests} guests`}/>
        <main className='flex'>
            <section className='flex-grow pt-14 px-6'>
                <p className='text-xs'>300+ Stays - {range} - for {guests}</p>
                <h1 className='text-3xl font-semibold mt-2 mb-6'>Stays in {location}</h1>

                <div className='hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap'>
                    <p className='button'>Cancellation Flexibility</p>
                    <p className='button'>Type of Place</p>
                    <p className='button'>Price</p>
                    <p className='button'>Room and Beds</p>
                    <p className='button'>More Filters+</p>
                </div>
                <div className='flex flex-col flex-grow'>
                    {searchResults.map(({img, location, title, description, star, price, total}, index) => (
                        <InfoCard 
                        key={index}
                        img={img}
                        location={location}
                        title={title}
                        description={description}
                        star={star}
                        price={price}
                        total={total}
                        />  
                    ))}
                </div>
            </section>
        </main>
        <Footer/>
    </div>
    )
}

export async function getServerSideProps() {
    const searchResults = await fetch("https://links.papareact.com/isz", {agent}).then((res) => res.json()).catch((err) => {
        console.log(error);
    }) ;


    return {
        props: {
            searchResults
        }
    }
}