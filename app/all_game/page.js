"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { parseISO, format } from "date-fns";
import { supabase } from '../lib/supabase-client';

const AllGame = () => {
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(true);

  const today = new Date().toISOString().split("T")[0];
  const parsedDate = parseISO(today);
  const formatted_date = format(parsedDate, "dd/MM/yyyy");

  const fetchAllGame = async () => {
    const today = new Date().toLocaleDateString('en-CA');

    const { data, error } = await supabase.from('all_game').select('time_slot, result')
      .eq('result_date', today);

      console.log("raw data", data)
    if (data) {
      const formatted = data.reduce((acc, curr) => ({
        ...acc, [curr.time_slot]: curr.result
      }), {});
      console.log("results",formatted)
      setResults(formatted)
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAllGame();

    const interval = setInterval(() => {
            const now = new Date();
            const mins = now.getMinutes();

            // Refresh exactly when the clock hits :00 or :30 (plus a small buffer)
            if (mins === 0 || mins === 1 || mins === 30 || mins === 31) {
                fetchTimedResults();
            }
        }, 60000);

        return () => clearInterval(interval);
  }, [])

  if (loading) return <div>Loading results...</div>;

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
      <h1 className="mt-10 text-4xl text-white font-bold text-center shadow-lg shadow-black bg-black p-2 opacity-90">SHILLONG EXPRESS</h1>
      <h2 className="text-md font-semibold m-2 text-white shadow-black shadow-lg bg-black p-2 opacity-90">ALL GAME</h2>
      <p className="text-md font-semibold m-2 text-white shadow-black shadow-lg bg-black p-2 opacity-90">DATE: {formatted_date}</p>
      <div className='w-full flex flex-col items-center justify-center'>
        <div className="flex md:w-1/2 justify-evenly bg-blue-800 text-white w-full text-xl">
          <p>Time</p>
          <p>Result</p>
        </div>
        <div className="flex flex-col justify-center items-center w-100">
            {Object.keys(results).map((time) => (
                <div key={time} className="p-3 border rounded shadow-sm bg-white flex justify-evenly items-center w-100">
                    <div className="text-xl text-gray-900">{time}</div>
                    <div className="text-xl font-bold text-blue-800">
                        {results[time] !== null 
                            ? results[time].toString().padStart(2, '0') 
                            : '--'}
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default AllGame