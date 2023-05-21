import Image from 'next/image'
import React from 'react'
import Currency from 'react-currency-formatter';
import { useDispatch } from 'react-redux';
import { addToBasket, removeFromBasket } from '../slices/basketSlice';

function CheckoutProduct({id, title, price, rating, description, category, image, hasPrime}) {
    console.log(id)
    const dispatch = useDispatch();
    const addItemToBasket = () => {
        const product = {
            id, title, price, rating, description, image, hasPrime
        }
        dispatch(addToBasket(product))
    }
    const removeItemFromBasket = () => {
        dispatch(removeFromBasket({id}))
    }
    return (
        <div className='grid grid-cols-5'>
            <Image src={image} width={200} height={200} alt='checkoutImage' style={{objectFit: 'contain'}}/>
            <div className='col-span-3 mx-5'>
                <p>{title}</p>
                <div className='flex'>
                    {Array(rating).fill().map((_, i) => (
                        <svg xmlns="http://www.w3.org/2000/svg" key={i} viewBox="0 0 24 24" fill="currentColor" className="h-5 text-yellow-500">
                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                        </svg>  
                    ))}
                </div>
                <p className='text-xs my-2 line-clamp-3'>{description}</p>
                <Currency quantity={price} currency='GBP'/>
                {hasPrime && (
                    <div className='flex items-center space-x-2'>
                        <img loading='lazy' className='w-12' src='https://assets.stickpng.com/images/5f7f75fa3dd424000436e50e.png' alt='primeIcon'/>
                        <p className='text-xs text-gray-500'>FrEE Next-day Delivery</p>
                    </div>
                )}
            </div>
            <div className='flex flex-col space-y-2 my-auto justify-self-end'>
                <button className='button' onClick={e => addItemToBasket()}>Add to Basket</button>
                <button className='button' onClick={e => removeItemFromBasket()}>Remove from Basket</button>
            </div>
        </div>
    )
}

export default CheckoutProduct