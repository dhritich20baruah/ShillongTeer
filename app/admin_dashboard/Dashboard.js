"use client"
import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase-client'

const Dashboard = () => {
    const [roundData, setRoundData] = useState({});

    const handleRoundUpdate = async (session, round, value) => {
        const today = new Date().toISOString().split('T')[0];

        const { error } = await supabase.from('round_results')
            .upsert({
                result_date: today,
                session_name: session,
                round_type: round,
                value: parseInt(value)
            }, { onConflict: 'result_date, session_name, round_type' });

        if (error) alert(error.message)
        else alert(`${session} ${round} updated!`)
    }

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

    //ALL GAME CODE
    const generateTimeSlots = () => {
        const slots = [];
        let current = new Date();
        current.setHours(10, 0, 0);
        const end = new Date();
        end.setHours(22, 0, 0);

        while (current <= end) {
            slots.push(
                current.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            );
            current.setMinutes(current.getMinutes() + 30);
        }
        return slots;
    }
    const timeSlots = generateTimeSlots();

    const [results, setResults] = useState({});
    const [gameCode, setGameCode] = useState(0);

    // ALL GAME
    const handleAdd = async (time, value) => {
        if (!value) return alert("Please enter a number")
        const { data, error } = await supabase.from('all_game')
            .upsert({
                time_slot: time,
                result: parseInt(value),
                result_date: new Date().toISOString().split('T')[0] // YYYY-MM-DD
            }, { onConflict: 'result_date, time_slot' });

        if (error) {
            console.error("Error updating: ", error.message)
        } else {
            alert(`Saving result for ${time}:`, results[time]);
            // This is where you would trigger your Postgres/Supabase update
        }
    };

    const fetchAllGame = async () => {
        const today = new Date().toISOString().split('T')[0];

        const { data, error } = await supabase.from('all_game')
            .select('time_slot, result')
            .eq('result_date', today);

        if (data) {
            const formatted = data.reduce((acc, curr) => ({
                ...acc, [curr.time_slot]: curr.result
            }), {});
            setResults(formatted)
        }
    };

    useEffect(() => {
        fetchAllGame();
        fetchGameCode();
        fetchRounds();
    }, [])

    //GAME CODE
    const handleGameCode = async (e) => {
        e.preventDefault();
        const { data, error } = await supabase.from('game_code')
            .upsert({
                code_date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
                code: parseInt(gameCode),
            }, { onConflict: 'code_date' });

        if (error) {
            console.error("Error updating: ", error.message)
        } else {
            alert(`Saving Game Code`);
            // This is where you would trigger your Postgres/Supabase update
        }
    }

    const fetchGameCode = async () => {
        const today = new Date().toISOString().split('T')[0];
        const { data, error } = await supabase
            .from('game_code')
            .select('code')
            .eq('code_date', today)
            .single();

        if (data) {
            setGameCode(data.code)
        }
    }

    return (
        <>
            <div className='flex md:flex-row flex-col my-5'>
                <div className="flex flex-col items-center text-black md:w-1/3 w-full p-2 m-2 shadow-lg shadow-blue-900 rounded-lg">
                    <h1 className='font-semibold text-lg'>HOME PAGE</h1>
                    <div className='space-y-2'>
                        {rounds.map((round) => (
                            <div key={round.id} className='flex justify-between w-full my-2 items-center'>
                                <label htmlFor="morning-fr" className="w-44 block text-md font-medium text-gray-800 m-2">{round.label}</label>
                                <input type="number" value={roundData[round.id] || ''} onChange={(e) => setRoundData({...roundData, [round.id]: e.target.value})} className="px-4 py-3 w-20 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" placeholder='----' />
                                <button className="p-2 bg-orange-600 text-white mx-1 rounded-md cursor-pointer hover:bg-orange-700" onClick={() => handleRoundUpdate(round.session, round.type, roundData[round.id])}>ADD</button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='md:w-2/3 w-full m-2 p-2 shadow-lg shadow-blue-900 rounded-lg'>
                    <div className="p-2 w-full">
                        <h1 className='font-semibold text-lg text-center'>COMMON NUMBERS</h1>
                        <div className="w-full h-10 text-black flex items-center justify-center rounded-lg shadow-md font-bold text-lg">
                            MORNING
                        </div>
                        <div className="grid grid-cols-3 gap-1">
                            <div id="m-direct" className="">
                                <div className="h-10 bg-gray-800 text-white border-2 border-gray-800 flex items-center justify-center rounded-t-lg shadow-sm text-lg" aria-label="Direct">
                                    Direct
                                </div>
                                <input type="number" className="h-10 bg-white border-2 w-full border-gray-800 flex items-center justify-center rounded-b-lg shadow-sm text-lg px-10" placeholder='----' />
                            </div>
                            <div id="m-house" className="">
                                <div className="h-10 bg-gray-800 text-white border-2 border-gray-800 flex items-center justify-center rounded-t-lg shadow-sm text-lg" aria-label="House">
                                    House
                                </div>
                                <div className="h-10 bg-white border-2 border-gray-800 flex justify-evenly rounded-b-lg shadow-sm text-lg">
                                    <input type="number" className="flex items-center justify-center border-r-2 border-gray-800 w-full px-10" placeholder='----' />
                                    <input type="number" className="flex items-center justify-center border-l-2 border-gray-800 w-full px-10" placeholder='----' />
                                </div>
                            </div>
                            <div id="m-ending" className="">
                                <div className="h-10 bg-gray-800 text-white border-2 border-gray-800 flex items-center justify-center rounded-t-lg shadow-sm text-lg" aria-label="Ending">
                                    Ending
                                </div>
                                <div className="h-10 bg-white border-2 border-gray-800 flex justify-evenly rounded-b-lg shadow-sm text-lg">
                                    <input type="number" className="flex items-center justify-center border-r-2 border-gray-800 w-full px-10" placeholder='----' />
                                    <input type="number" className="flex items-center justify-center border-l-2 border-gray-800 w-full px-10" placeholder='----' />
                                </div>
                            </div>
                        </div>
                        <div className="md:col-span-3 h-10 text-black flex items-center justify-center rounded-lg shadow-md font-bold text-lg">
                            EVENING
                        </div>
                        <div className="grid grid-cols-3 gap-2 my-5">
                            <div id="m-direct" className="">
                                <div className="h-10 bg-gray-800 text-white border-2 border-gray-800 flex items-center justify-center rounded-t-lg shadow-sm text-lg" aria-label="Direct">
                                    Direct
                                </div>
                                <input type="number" className="h-10 bg-white px-10 border-2 w-full border-gray-800 flex items-center justify-center rounded-b-lg shadow-sm text-lg" placeholder='----' />
                            </div>
                            <div id="m-house" className="">
                                <div className="h-10 bg-gray-800 text-white border-2 border-gray-800 flex items-center justify-center rounded-t-lg shadow-sm text-lg" aria-label="House">
                                    House
                                </div>
                                <div className="h-10 bg-white border-2 border-gray-800 flex justify-evenly rounded-b-lg shadow-sm text-lg">
                                    <input type="number" className="flex items-center justify-center border-r-2 border-gray-800 w-full px-10" placeholder='----' />
                                    <input type="number" className="flex items-center justify-center border-l-2 border-gray-800 w-full px-10" placeholder='----' />
                                </div>
                            </div>
                            <div id="m-ending" className="">
                                <div className="h-10 bg-gray-800 text-white border-2 border-gray-800 flex items-center justify-center rounded-t-lg shadow-sm text-lg" aria-label="Ending">
                                    Ending
                                </div>
                                <div className="h-10 bg-white font-semibold border-2 border-gray-800 flex justify-evenly rounded-b-lg shadow-sm text-lg">
                                    <input type="number" className="flex items-center justify-center border-r-2 border-gray-800 w-full px-10" placeholder='----' />
                                    <input type="number" className="flex items-center justify-center border-l-2 border-gray-800 w-full px-10" placeholder='----' />
                                </div>
                            </div>
                        </div>
                        <div className="md:col-span-3 h-10 text-black flex items-center justify-center rounded-lg shadow-md font-bold text-lg">
                            NIGHT
                        </div>
                        <div className="grid grid-cols-3 gap-2 my-5">
                            <div id="m-direct" className="">
                                <div className="h-10 bg-gray-800 text-white border-2 border-gray-800 flex items-center justify-center rounded-t-lg shadow-sm text-lg" aria-label="Direct">
                                    Direct
                                </div>
                                <input type="number" className="h-10 bg-white border-2 w-full border-gray-800 flex items-center justify-center rounded-b-lg shadow-sm text-lg px-10" placeholder='----' />
                            </div>
                            <div id="m-house" className="">
                                <div className="h-10 bg-gray-800 text-white border-2 border-gray-800 flex items-center justify-center rounded-t-lg shadow-sm text-lg" aria-label="House">
                                    House
                                </div>
                                <div className="h-10 bg-white border-2 border-gray-800 flex justify-evenly rounded-b-lg shadow-sm text-lg">
                                    <input type="number" className="flex items-center justify-center border-r-2 border-gray-800 w-full px-10" placeholder='----' />
                                    <input type="number" className="flex items-center justify-center border-l-2 border-gray-800 w-full px-10" placeholder='----' />
                                </div>
                            </div>
                            <div id="m-ending" className="">
                                <div className="h-10 bg-gray-800 text-white border-2 border-gray-800 flex items-center justify-center rounded-t-lg shadow-sm text-lg" aria-label="Ending">
                                    Ending
                                </div>
                                <div className="h-10 bg-white border-2 border-gray-800 flex justify-evenly rounded-b-lg shadow-sm text-lg">
                                    <input type="number" className="flex items-center justify-center border-r-2 border-gray-800 w-full px-10" placeholder='----' />
                                    <input type="number" className="flex items-center justify-center border-l-2 border-gray-800 w-full px-10" placeholder='----' />
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3">
                            <div className="md:col-span-2 h-10 bg-blue-800 text-white flex items-center justify-center rounded-l-lg shadow-md font-bold text-lg">
                                TODAY'S TARGET
                            </div>
                            <div className="h-10 text-blue-800 bg-white border-2 border-blue-800 flex items-center justify-center rounded-r-lg shadow-md font-bold text-lg">
                                <input type="number" className="flex items-center justify-center w-full px-10" placeholder='----' />
                                <span>to</span>
                                <input type="number" className="flex items-center justify-center w-full px-10" placeholder='----' />
                            </div>
                        </div>
                        <button className="p-2 bg-orange-600 text-white my-3 w-full rounded-md cursor-pointer hover:bg-orange-700">ADD / UPDATE</button>
                    </div>
                </div>
            </div>
            <div className="flex md:flex-row flex-col my-5">
                <div className='md:w-2/3 w-full m-2 p-2 shadow-lg shadow-blue-900 rounded-lg'>
                    <h1 className='font-semibold text-lg text-center'>ALL GAME</h1>
                    <div className='flex flex-wrap'>
                        {timeSlots.map((time) => (
                            <div key={time} className='flex m-2 p-2 bg-blue-700'>
                                <label className="block text-md font-medium text-white m-2">{time}</label>
                                <input type="number" defaultValue={results[time] || ''} onChange={(e) => setResults({ ...results, [time]: e.target.value })} className="p-1 w-15 h-10 rounded-lg border border-gray-600 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" placeholder='--' />
                                <button onClick={() => handleAdd(time, results[time])} className="p-2 bg-orange-600 text-white mx-1 rounded-md cursor-pointer hover:bg-orange-700">ADD</button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='md:w-1/3 w-full m-2 p-2 shadow-lg shadow-blue-900 rounded-lg'>
                    <h1 className='font-semibold text-lg text-center'>GAME CODE</h1>
                    <form onSubmit={handleGameCode} className='space-y-2'>
                        <div className='flex flex-col justify-center items-center w-full my-10'>
                            <label htmlFor="gameCode" className="block text-md font-medium text-black m-2">Enter Game Code</label>
                            <input type="number" name="gameCode" id="gameCode" value={gameCode} onChange={(e) => setGameCode(e.target.value)} className="px-4 py-3 w-full rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" placeholder='Game code' />
                            <button className="p-2 bg-orange-600 text-white my-3 w-full rounded-md cursor-pointer hover:bg-orange-700" type='submit'>ADD / UPDATE</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Dashboard