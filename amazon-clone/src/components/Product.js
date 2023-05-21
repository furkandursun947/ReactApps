import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Currency from 'react-currency-formatter';
import { useDispatch } from 'react-redux';
import { addToBasket } from '../slices/basketSlice';


function Product({id, title, price, description, category, image}) {
    const [domLoaded, setDomLoaded] = useState(false);
    const [rating, setRating] = useState(Math.floor(Math.random() * (5 - 1 + 1)) + 1);
    const [hasPrime, setHasPrime] = useState(Math.random() < 0.5);
    const dispatch = useDispatch();
    

    useEffect(() => {
        setDomLoaded(true);
    }, []);

    const addItemToBasket = () => {
        const product = {
            id, 
            title, 
            price, 
            rating,
            description, 
            category,
            image, 
            hasPrime
        }
        dispatch(addToBasket(product));
    }

    return (
        <>
        {domLoaded && (
            <div className='bg-white relative flex flex-col m-5 z-30 p-10'>
                <p className='absolute top-2 right-2 italic text-gray-400'>{category}</p>
                <div className='flex items-center justify-center'>
                    <Image style={{objectFit: 'contain'}} src={image} width={200} height={200} alt='productImage'/>
                </div>
                <h4 className='my-3'>{title}</h4>
                <div className='flex'>
                    {Array(rating).fill().map((_, index) => (
                        <svg key={index} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 text-yellow-500">
                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                        </svg>   
                    ))}
                </div>
                <p className='text-xs my-2 line-clamp-2'>{description}</p>
                <div className='mb-5'>
                    <Currency quantity={price} currency='GBP'/>
                </div>
                {hasPrime && (
                    <div className='flex items-center space-x-2 -mt-5'>
                        <img loading='lazy' className='w-12' src='https://assets.stickpng.com/images/5f7f75fa3dd424000436e50e.png' alt='primeImage'/>
                        <p className='text-xs text-gray-500'>FREE Next-day Delivery</p>
                    </div>
                )}
                <div>
                    <button onClick={e => addItemToBasket()} className='mt-auto button'>Add to basket</button>
                </div>
            </div>
        )}
        </>
        
    )
}

export default Product