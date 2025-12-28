"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { parseISO, format } from "date-fns";
import { supabase } from '../lib/supabase-client';

const AllGame = () => {
  const [results, setResults] = useState({});
  const [game, setGame] = useState([
    { time: "10:00 AM", result: 72 },
    { time: "10:30 AM", result: 14 },
    { time: "11:00 AM", result: 89 },
    { time: "11:30 AM", result: 43 },
    { time: "12:00 PM", result: 5 },
    { time: "12:30 PM", result: 61 },
    { time: "01:00 PM", result: 28 },
    { time: "01:30 PM", result: 97 },
    { time: "02:00 PM", result: 33 },
    { time: "02:30 PM", result: 50 },
    { time: "03:00 PM", result: 19 },
    { time: "03:30 PM", result: 84 },
    { time: "04:00 PM", result: 12 },
    { time: "04:30 PM", result: 66 },
    { time: "05:00 PM", result: 39 },
    { time: "05:30 PM", result: 8 },
    { time: "06:00 PM", result: 55 },
    { time: "06:30 PM", result: 91 },
    { time: "07:00 PM", result: 22 },
    { time: "07:30 PM", result: 47 },
    { time: "08:00 PM", result: 70 },
    { time: "08:30 PM", result: 31 },
    { time: "09:00 PM", result: 16 },
    { time: "09:30 PM", result: 98 },
    { time: "10:00 PM", result: 67 }]
  )
  const today = new Date().toISOString().split("T")[0];
  const parsedDate = parseISO(today);
  const formatted_date = format(parsedDate, "dd/MM/yyyy");

  const fetchAllGame = async () => {
    const today = new Date().toISOString().split('T')[0];

    const { data, error } = await supabase.from('all_game')
      .select('time_slot, result')
      .eq('result_date', today);

    if (data) {
      const formatted = data.reduce((acc, curr) => ({
        ...acc, [curr.time_slot]: curr.result
      }), {});
      console.log("results",formatted)
      setResults(formatted)
    }
  };

  useEffect(() => {
    fetchAllGame();
  }, [])
  return (
    <div className="flex flex-col min-h-screen items-center text-black w-full mb-10">
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
        <div className="absolute inset-0 bg-gray-900/40" />
      </div>
      <h1 className="mt-10 text-4xl text-white font-bold text-center shadow-lg shadow-black bg-black p-2 opacity-90">DUBAI EXPRESS</h1>
      <h2 className="text-md font-semibold m-2 text-white shadow-black shadow-lg bg-black p-2 opacity-90">ALL GAME</h2>
      <p className="text-md font-semibold m-2 text-white shadow-black shadow-lg bg-black p-2 opacity-90">DATE: {formatted_date}</p>
      <div className='w-full flex flex-col items-center justify-center'>
        <div className="flex md:w-1/2 justify-evenly bg-blue-800 text-white">
          <p>Time</p>
          <p>Result</p>
        </div>
        {game.map((item, index) => {
          return (
            <div key={index} className="flex md:w-1/2 justify-evenly items- bg-white text-black font-bold border-b-2 border-blue-700">
              <p className='flex flex-col'>{item.time}</p>
              <p className="flex flex-col">{results[item.time]}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default AllGame