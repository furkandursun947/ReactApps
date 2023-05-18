import Image from 'next/image'
import React from 'react'

function MediumCard({img, title}) {
  return (
    <div className='cursor-pointer transform duration-150 ease-out transition hover:scale-105'>
        <div className='relative h-80 w-80 '>
            <Image src={img} fill className='rounded-xl' alt='cardImage2' />
        </div>
        <h3 className='font-medium text-2xl mt-3'>{title}</h3>
    </div>
  )
}

export default MediumCard