"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { parseISO, format } from "date-fns";

const GameCode = () => {
  const today = new Date().toISOString().split("T")[0]
  const parsedDate = parseISO(today)
  const formatted_date = format(parsedDate, "dd/MM/yyyy")
  return (
    <div className="flex flex-col min-h-screen items-center text-black w-full">
      {/* Background Image Layer */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/Teer.png"
          alt="Shillong Teer Background"
          fill
          priority
          className="object-cover"
        />
        {/* Dark overlay to make text pop */}
        <div className="absolute inset-0 bg-gray-900/60" />
      </div>
      <h1 className="m-10 text-4xl text-white font-bold text-center shadow-lg shadow-black bg-black p-3 opacity-90">SHILLONG TEER GAME CODE</h1>
      <p className=" m-5 text-xl font-semibold m-2 text-white shadow-black shadow-lg bg-black p-3 opacity-90">DATE: {formatted_date}</p>
      <div className='m-5 w-full flex items-center justify-center bg-white'>
        <p className='py-32 text-5xl font-bold text-black'>2894563</p>
      </div>
    </div>
  )
}

export default GameCode;