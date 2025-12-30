"use client"
import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase-client';

const RoundsTable = () => {
    const [roundData, setRoundData] = useState({});

    const fetchRounds = async () => {
        const today = new Date().toISOString().split('T')[0];
        const { data } = await supabase
            .from('round_results')
            .select('*')
            .eq('result_date', today);

        if (data) {
            const formatted = data.reduce((acc, row) => ({
                ...acc, [`${row.session_name}-${row.round_type}`]: row.value
            }), {});
            setRoundData(formatted)
        }
    }

    const rounds = [
        { id: 'morning-fr', label: 'Morning First Round', session: 'morning', type: 'fr' },
        { id: 'morning-sr', label: 'Morning Second Round', session: 'morning', type: 'sr' },
        { id: 'evening-fr', label: 'Evening First Round', session: 'evening', type: 'fr' },
        { id: 'evening-sr', label: 'Evening Second Round', session: 'evening', type: 'sr' },
        { id: 'night-fr', label: 'Night First Round', session: 'night', type: 'fr' },
        { id: 'night-sr', label: 'Night Second Round', session: 'night', type: 'sr' },
    ]

    useEffect(() => {
        fetchRounds()
    }, [])

    return (
        <div className="grid grid-cols-3 gap-1">
            <div id="Morning">
                <div className="h-20 bg-gray-800 text-white border-2 border-gray-800 flex items-center justify-center rounded-t-lg shadow-sm md:text-lg text-md text-center" aria-label="First Round Result">
                    Morning Round
                </div>
                <div className="h-20 bg-white border-2 border-gray-800 flex justify-evenly rounded-b-lg shadow-sm text-lg font-semibold">
                    <div className="flex items-center justify-center border-r-2 border-gray-800 w-full"><p>{roundData[rounds[0].id]?.toString().padStart(2, '0') || ''}</p></div>
                    <div className="flex items-center justify-center border-l-2 border-gray-800 w-full"><p>{roundData[rounds[1].id]?.toString().padStart(2, '0') || ''}</p></div>
                </div>
            </div>
            <div id="Evening">
                <div className="h-20 bg-gray-800 text-white border-2 border-gray-800 flex items-center justify-center rounded-t-lg shadow-sm md:text-lg text-md text-center" aria-label="Second Round Result">
                    Evening Round
                </div>
                <div className="h-20 bg-white border-2 border-gray-800 flex justify-evenly rounded-b-lg shadow-sm text-lg font-semibold">
                    <div className="flex items-center justify-center border-r-2 border-gray-800 w-full"><p>{roundData[rounds[2].id]?.toString().padStart(2, '0') || ''}</p></div>
                    <div className="flex items-center justify-center border-l-2 border-gray-800 w-full"><p>{roundData[rounds[3].id]?.toString().padStart(2, '0') || ''}</p></div>
                </div>
            </div>
            <div id="Night">
                <div className="h-20 bg-gray-800 text-white border-2 border-gray-800 flex items-center justify-center rounded-t-lg shadow-sm md:text-lg text-md text-center" aria-label="Second Round Result">
                    Night Round
                </div>
                <div className="h-20 bg-white border-2 border-gray-800 flex justify-evenly rounded-b-lg shadow-sm text-lg font-semibold">
                    <div className="flex items-center justify-center border-r-2 border-gray-800 w-full"><p>{roundData[rounds[4].id]?.toString().padStart(2, '0') || ''}</p></div>
                    <div className="flex items-center justify-center border-l-2 border-gray-800 w-full"><p>{roundData[rounds[5].id]?.toString().padStart(2, '0') || ''}</p></div>
                </div>
            </div>
        </div>
    )
}

export default RoundsTable