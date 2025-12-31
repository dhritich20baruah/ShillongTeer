"use client"
import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase-client';

const RoundsTable = () => {
     const [roundData, setRoundData] = useState({
         'morning-fr': 0,
         'morning-sr': 0, 'evening-fr': 0, 'evening-sr': 0, 'night-fr': 0, 'night-sr': 0
     });
 
     function transformRounds(data) {
         const initial = {
             'morning-fr': 0,
             'morning-sr': 0,
             'evening-fr': 0,
             'evening-sr': 0,
             'night-fr': 0,
             'night-sr': 0
         };
 
         return data.reduce((acc, item) => {
             const key = `${item.session_name}-${item.round_type}`;
             if (key in acc) {
                 acc[key] = item.value;
             }
             return acc;
         }, initial);
     }
 
     useEffect(() => {
         fetchRounds()
     }, [])
 
     const fetchRounds = async () => {
         const today = new Date().toLocaleDateString('en-CA', { timeZone: '+05:30' });
 
         const { data, error } = await supabase
             .from('round_results')
             .select('*')
             .eq('result_date', today);
 
         if (data) {
             setRoundData(transformRounds(data));
         }
     };

    return (
        <div className="grid grid-cols-3 gap-1">
            <div id="Morning">
                <div className="h-20 bg-gray-800 text-white border-2 border-gray-800 flex items-center justify-center rounded-t-lg shadow-sm md:text-lg text-md text-center" aria-label="First Round Result">
                    Morning Round 
                </div>
                <div className="h-20 bg-white border-2 border-gray-800 flex justify-evenly rounded-b-lg shadow-sm text-xl font-semibold">
                    <div className="flex items-center justify-center border-r-2 border-gray-800 w-full"><p>{(roundData["morning-fr"]??'--').toString().padStart(2, '0') || ''}</p></div>
                    <div className="flex items-center justify-center border-l-2 border-gray-800 w-full"><p>{(roundData["morning-sr"]??'--').toString().padStart(2, '0') || ''}</p></div>
                </div>
            </div>
            <div id="Evening">
                <div className="h-20 bg-gray-800 text-white border-2 border-gray-800 flex items-center justify-center rounded-t-lg shadow-sm md:text-lg text-md text-center" aria-label="Second Round Result">
                    Evening Round
                </div>
                <div className="h-20 bg-white border-2 border-gray-800 flex justify-evenly rounded-b-lg shadow-sm text-xl font-semibold">
                    <div className="flex items-center justify-center border-r-2 border-gray-800 w-full"><p>{(roundData["evening-fr"]??'--').toString().padStart(2, '0') || ''}</p></div>
                    <div className="flex items-center justify-center border-l-2 border-gray-800 w-full"><p>{(roundData["evening-sr"]??'--').toString().padStart(2, '0') || ''}</p></div>
                </div>
            </div>
            <div id="Night">
                <div className="h-20 bg-gray-800 text-white border-2 border-gray-800 flex items-center justify-center rounded-t-lg shadow-sm md:text-lg text-md text-center" aria-label="Second Round Result">
                    Night Round
                </div>
                <div className="h-20 bg-white border-2 border-gray-800 flex justify-evenly rounded-b-lg shadow-sm text-xl font-semibold">
                    <div className="flex items-center justify-center border-r-2 border-gray-800 w-full"><p>{(roundData["night-fr"]??'--').toString().padStart(2, '0') || ''}</p></div>
                    <div className="flex items-center justify-center border-l-2 border-gray-800 w-full"><p>{(roundData["night-sr"]??'--').toString().padStart(2, '0') || ''}</p></div>
                </div>
            </div>
        </div>
    )
}

export default RoundsTable