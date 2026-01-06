"use client"
import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase-client';

const RoundsTable = () => {
    const [roundData, setRoundData] = useState({});

    // function transformRounds(data) {
    //     const initial = {
    //         'morning-fr': '--',
    //         'morning-sr': '--', 'evening-fr': '--', 'evening-sr': '--', 'night-fr': '--', 'night-sr': '--'
    //     };

    //     return data.reduce((acc, item) => {
    //         const key = `${item.session_name}-${item.round_type}`;
    //         if (key in acc) {
    //             acc[key] = item.value;
    //         }
    //         return acc;
    //     }, initial);
    // }

    // useEffect(() => {
    //     fetchRounds()
    // }, [])

    // const fetchRounds = async () => {
    //     const today = new Date().toLocaleDateString('en-CA', { timeZone: '+05:30' });

    //     const { data, error } = await supabase
    //         .from('round_results')
    //         .select('*')
    //         .eq('result_date', today);

    //     if (data) {
    //         setRoundData(transformRounds(data));
    //     }
    // };

    useEffect(() => {
        fetchResults();

        const interval = setInterval(() => {
            const now = new Date();
            const mins = now.getMinutes();
            const secs = now.getSeconds();

            if (mins === 40 || mins === 41){
                fetchResults()
            }
        }, 30000);

        return () => clearInterval(interval);
    }, [])

    const fetchResults = async () => {
        const today = new Date().toLocaleDateString('en-CA');

        const {data, error} = await supabase.rpc('get_timed_results', { target_date: today });

        if(error){
            console.error("Error fetching timed results:", error)
            return;
        }

        console.log(data)

        if (data && data.length > 0) {
            setRoundData(data[0])
        }
    }

    return (
        <div className="grid grid-cols-3 gap-1">
            <div id="Morning">
                <div className="h-20 bg-gray-800 text-white border-2 border-gray-800 flex flex-col items-center justify-center rounded-t-lg shadow-sm md:text-lg text-md text-center" aria-label="First Round Result">
                    <p>Morning Round</p>
                    <p>10:40 AM - 11:40 AM</p>
                </div>
                <div className="h-20 bg-white border-2 border-gray-800 flex justify-evenly rounded-b-lg shadow-sm text-xl font-semibold">
                    <div className="flex items-center justify-center border-r-2 border-gray-800 w-full"><p>{roundData.m_fr || '--'}</p></div>
                    <div className="flex items-center justify-center border-l-2 border-gray-800 w-full"><p>{roundData.m_sr || '--'}</p></div>
                </div>
            </div>
            <div id="Evening">
                <div className="h-20 bg-gray-800 text-white border-2 border-gray-800 flex flex-col items-center justify-center rounded-t-lg shadow-sm md:text-lg text-md text-center" aria-label="Second Round Result">
                     <p>Evening Round</p>
                    <p>3:30 PM - 4:30 PM</p>
                </div>
                <div className="h-20 bg-white border-2 border-gray-800 flex justify-evenly rounded-b-lg shadow-sm text-xl font-semibold">
                    <div className="flex items-center justify-center border-r-2 border-gray-800 w-full"><p>{roundData.e_fr || '--'}</p></div>
                    <div className="flex items-center justify-center border-l-2 border-gray-800 w-full"><p>{roundData.e_sr || '--'}</p></div>
                </div>
            </div>
            <div id="Night">
                <div className="h-20 bg-gray-800 text-white border-2 border-gray-800 flex flex-col items-center justify-center rounded-t-lg shadow-sm md:text-lg text-md text-center" aria-label="Second Round Result">
                     <p>Night Round</p>
                    <p>8:40 PM - 9:40 PM</p>
                </div>
                <div className="h-20 bg-white border-2 border-gray-800 flex justify-evenly rounded-b-lg shadow-sm text-xl font-semibold">
                    <div className="flex items-center justify-center border-r-2 border-gray-800 w-full"><p>{roundData.n_fr || '--'}</p></div>
                    <div className="flex items-center justify-center border-l-2 border-gray-800 w-full"><p>{roundData.n_sr || '--'}</p></div>
                </div>
            </div>
        </div>
    )
}

export default RoundsTable