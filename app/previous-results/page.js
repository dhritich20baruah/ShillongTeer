"use client"
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase-client";

export default function PreviousResults() {
    const [results, setResults] = useState([
        { "date": "24-12-2025", "morning-sr": 34, "morning-fr": 34, "evening-sr": 45, "evening-fr": 45, "night-sr": 89, "night-fr": 89 },
        { "date": "23-12-2025", "morning-sr": 12, "morning-fr": 34, "evening-sr": 67, "evening-fr": 45, "night-sr": 89, "night-fr": 5 },
        { "date": "22-12-2025", "morning-sr": 88, "morning-fr": 34, "evening-sr": 23, "evening-fr": 45, "night-sr": 89, "night-fr": 41 },
        { "date": "21-12-2025", "morning-sr": 56, "morning-fr": 34, "evening-sr": 90, "evening-fr": 45, "night-sr": 89, "night-fr": 72 },
        { "date": "20-12-2025", "morning-sr": 31, "morning-fr": 34, "evening-sr": 54, "evening-fr": 45, "night-sr": 89, "night-fr": 18 },
        { "date": "19-12-2025", "morning-sr": 90, "morning-fr": 34, "evening-sr": 11, "evening-fr": 45, "night-sr": 89, "night-fr": 63 },
        { "date": "18-12-2025", "morning-sr": 47, "morning-fr": 34, "evening-sr": 82, "evening-fr": 45, "night-sr": 89, "night-fr": 29 },
        { "date": "17-12-2025", "morning-sr": 2,  "morning-fr": 34, "evening-sr": 36, "evening-fr": 45, "night-sr": 89, "night-fr": 95 },
        { "date": "16-12-2025", "morning-sr": 74, "morning-fr": 34, "evening-sr": 15, "evening-fr": 45, "night-sr": 89, "night-fr": 50 },
        { "date": "15-12-2025", "morning-sr": 21, "morning-fr": 34, "evening-sr": 99, "evening-fr": 45, "night-sr": 89, "night-fr": 7 },
        { "date": "14-12-2025", "morning-sr": 65, "morning-fr": 34, "evening-sr": 38, "evening-fr": 45, "night-sr": 89, "night-fr": 44 },
        { "date": "24-12-2025", "morning-sr": 34, "morning-fr": 34, "evening-sr": 45, "evening-fr": 45, "night-sr": 89, "night-fr": 89 },
        { "date": "23-12-2025", "morning-sr": 12, "morning-fr": 34, "evening-sr": 67, "evening-fr": 45, "night-sr": 89, "night-fr": 5 },
        { "date": "22-12-2025", "morning-sr": 88, "morning-fr": 34, "evening-sr": 23, "evening-fr": 45, "night-sr": 89, "night-fr": 41 },
        { "date": "21-12-2025", "morning-sr": 56, "morning-fr": 34, "evening-sr": 90, "evening-fr": 45, "night-sr": 89, "night-fr": 72 },
        { "date": "20-12-2025", "morning-sr": 31, "morning-fr": 34, "evening-sr": 54, "evening-fr": 45, "night-sr": 89, "night-fr": 18 },
        { "date": "19-12-2025", "morning-sr": 90, "morning-fr": 34, "evening-sr": 11, "evening-fr": 45, "night-sr": 89, "night-fr": 63 },
        { "date": "18-12-2025", "morning-sr": 47, "morning-fr": 34, "evening-sr": 82, "evening-fr": 45, "night-sr": 89, "night-fr": 29 },
        { "date": "17-12-2025", "morning-sr": 2,  "morning-fr": 34, "evening-sr": 36, "evening-fr": 45, "night-sr": 89, "night-fr": 95 },
        { "date": "16-12-2025", "morning-sr": 74, "morning-fr": 34, "evening-sr": 15, "evening-fr": 45, "night-sr": 89, "night-fr": 50 },
        { "date": "15-12-2025", "morning-sr": 21, "morning-fr": 34, "evening-sr": 99, "evening-fr": 45, "night-sr": 89, "night-fr": 7 },
        { "date": "14-12-2025", "morning-sr": 65, "morning-fr": 34, "evening-sr": 38, "evening-fr": 45, "night-sr": 89, "night-fr": 44 }
    ])

     const [roundData, setRoundData] = useState([]);
    
        const fetchRounds = async () => {
            const { data } = await supabase
                .from('round_results')
                .select('*')
                .order('result_date', {ascending: true});
    
            if (data) {
                const formatted = data.reduce((acc, row) => ({
                    ...acc, [`${row.session_name}-${row.round_type}`]: row.value, date: row.result_date
                }), {});
                console.log(formatted)
                // setRoundData(formatted)
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
        <div className="flex flex-col min-h-screen items-center bg-white text-black w-full">
            <h1 className="mt-10 text-4xl text-gray-700 font-bold text-center">SHILLONG TEER PREVIOUS RESULTS</h1>
            <div className="grid grid-cols-4 w-full mt-10 md:w-[95%] bg-blue-800 h-fit p-1 sticky top-0">
                <div className="text-white flex items-center justify-center text-center text-sm shadow-md md:font-bold md:text-md">
                    DATE
                </div>
                <div className="text-white flex flex-col items-center justify-center text-center text-sm shadow-md md:font-bold md:text-md">
                    <p>
                    MORNING RESULTS
                    </p>
                    <div className="flex justify-around font-light w-full">
                        <p>First Round</p>
                        <p>Second Round</p>
                    </div>
                </div>
                <div className="text-white flex flex-col items-center justify-center text-center text-sm shadow-md md:font-bold md:text-md">
                    <p>
                    EVENING RESULTS
                    </p>
                    <div className="flex justify-around font-light w-full">
                        <p>First Round</p>
                        <p>Second Round</p>
                    </div>
                </div>
                <div className="text-white flex flex-col items-center justify-center text-center text-sm shadow-md md:font-bold md:text-md">
                    <p>
                    NIGHT RESULTS
                    </p>
                    <div className="flex justify-around font-light w-full">
                        <p>First Round</p>
                        <p>Second Round</p>
                    </div>
                </div>
            </div>
            {roundData.map((item, index) => {
                return (
                    <div className="grid grid-cols-4 w-full md:w-[95%]" key={index}>
                        <div className="h-12 border-2 border-blue-800 bg-white text-black flex items-center justify-center text-center text-sm shadow-md md:font-bold md:text-md">
                            {item.date}
                        </div>
                        <div className="h-12 border-2 border-blue-800 bg-white text-black flex items-center justify-around text-center text-sm shadow-md md:font-bold md:text-md">
                            <p>{roundData[rounds[0].id]?.toString().padStart(2, '0') || ''}</p>
                            <p>{roundData[rounds[1].id]?.toString().padStart(2, '0') || ''}</p>
                        </div>
                        <div className="h-12 border-2 border-blue-800 bg-white text-black flex items-center justify-around text-center text-sm shadow-md md:font-bold md:text-md">
                            <p>{roundData[rounds[2].id]?.toString().padStart(2, '0') || ''}</p>
                            <p>{roundData[rounds[3].id]?.toString().padStart(2, '0') || ''}</p>
                        </div>
                        <div className="h-12 border-2 border-blue-800 bg-white text-black flex items-center justify-around text-center text-sm shadow-md md:font-bold md:text-md">
                            <p>{roundData[rounds[4].id]?.toString().padStart(2, '0') || ''}</p>
                            <p>{roundData[rounds[5].id]?.toString().padStart(2, '0') || ''}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}