"use client"
import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase-client';
import CommonNumberForm from './CommonNumber';
import Image from 'next/image';

const Dashboard = () => {
    //HOME PAGE
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
    const [results, setResults] = useState({});
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
    const [gameCode, setGameCode] = useState(0);
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

    const [imageUrl, setImageUrl] = useState()
    const uploadFile = async (file) => {
        if (!file) return;

        // Use a fixed name so it always replaces the previous one
        const filePath = `latest_results/today_result.jpg`;

        const { data, error } = await supabase.storage
            .from('Teer')
            .upload(filePath, file, {
                cacheControl: '0', // Set to 0 so the browser doesn't show the old image from cache
                upsert: true       // This tells Supabase to overwrite the existing file
            });

        if (error) {
            console.error('Error:', error.message);
        } else {
            const { data: urlData } = supabase.storage.from('Teer').getPublicUrl(filePath);
            // Add a timestamp to the URL to force the browser to refresh the image
            setImageUrl(`${urlData.publicUrl}?t=${Date.now()}`);
        }
    };

    return (
        <>
            <div className='flex md:flex-row flex-col my-5'>
                <div className="flex flex-col items-center text-black md:w-1/3 w-full p-2 m-2 shadow-lg shadow-blue-900 rounded-lg">
                    <h1 className='font-semibold text-lg'>HOME PAGE</h1>
                    <div className='space-y-2'>
                        {rounds.map((round) => (
                            <div key={round.id} className='flex justify-between w-full my-2 items-center'>
                                <label htmlFor="morning-fr" className="w-44 block text-md font-medium text-gray-800 m-2">{round.label}</label>
                                <input type="number" value={roundData[round.id] || ''} onChange={(e) => setRoundData({ ...roundData, [round.id]: e.target.value })} className="px-4 py-3 w-20 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" placeholder='----' />
                                <button className="p-2 bg-orange-600 text-white mx-1 rounded-md cursor-pointer hover:bg-orange-700" onClick={() => handleRoundUpdate(round.session, round.type, roundData[round.id])}>ADD</button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='md:w-2/3 w-full m-2 p-2 shadow-lg shadow-blue-900 rounded-lg'>
                    <CommonNumberForm />
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
                    <h1 className="text-center font-bold text-lg m-3">IMAGE UPLOAD</h1>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => uploadFile(e.target.files[0])}
                        className="block w-full text-sm text-gray-300 p-2 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 bg-blue-400"
                    />
                    {imageUrl && (
                        <div className="mt-4">
                            <p className="text-sm text-gray-500 mb-2">Preview:</p>
                            <img
                                src={imageUrl}
                                alt="Uploaded Teer Result"
                                className="w-64 h-auto rounded-lg shadow-md border"
                            />
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Dashboard