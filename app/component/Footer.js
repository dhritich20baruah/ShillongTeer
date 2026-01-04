import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <div className="bg-blue-600 w-full px-6 py-4 shadow-lg flex justify-between items-center">
        <p className='text-white'>&#169; 2026. All rights reserved by Shillong Live.</p>
        <p className='text-white'>Developed by <Link href="https://www.dhritibaruah.in/">dhritibaruah.in</Link></p>
    </div>
  )
}

export default Footer