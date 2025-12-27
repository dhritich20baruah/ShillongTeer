"use client"
import React, { useState } from 'react'

const Dashboard = () => {
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

    const handleInputChange = (time, value) => {
        setResults({ ...results, [time]: value })
    }

    const handleAdd = (time) => {
        alert(`Saving result for ${time}:`, results[time]);
        // This is where you would trigger your Postgres/Supabase update
    };

    return (
        <>
            <div className='flex my-5'>
                <div className="flex flex-col items-center text-black w-1/3 p-2 m-2 shadow-lg shadow-blue-900 rounded-lg">
                    <h1 className='font-semibold text-lg'>Home Page</h1>
                    <form action="" className='space-y-2'>
                        <div className='flex justify-between w-full my-2'>
                            <label htmlFor="morning-fr" className="block text-md font-medium text-gray-800 m-2">Morning First Round</label>
                            <input type="number" name="morning-fr" id="morning-fr" className="px-4 py-3 w-20 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" />
                        </div>
                        <div className='flex justify-between w-full my-2'>
                            <label htmlFor="morning-sr" className="block text-md font-medium text-gray-800 m-2">Morning Second Round</label>
                            <input type="number" name="morning-sr" id="morning-sr" className="px-4 py-3 w-20 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" />
                        </div>
                        <div className='flex justify-between w-full my-2'>
                            <label htmlFor="evening-fr" className="block text-md font-medium text-gray-800 m-2">Evening First Round</label>
                            <input type="number" name="morning-fr" id="morning-fr" className="px-4 py-3 w-20 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" />
                        </div>
                        <div className='flex justify-between w-full my-2'>
                            <label htmlFor="evening-sr" className="block text-md font-medium text-gray-800 m-2">Evening Second Round</label>
                            <input type="number" name="evening-fr" id="evening-fr" className="px-4 py-3 w-20 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" />
                        </div>
                        <div className='flex justify-between w-full my-2'>
                            <label htmlFor="night-fr" className="block text-md font-medium text-gray-800 m-2">Night First Round</label>
                            <input type="number" name="morning-fr" id="morning-fr" className="px-4 py-3 w-20 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" />
                        </div>
                        <div className='flex justify-between w-full my-2'>
                            <label htmlFor="night-fr" className="block text-md font-medium text-gray-800 m-2">Night Second Round</label>
                            <input type="number" name="night-fr" id="night-fr" className="px-4 py-3 w-20 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" />
                        </div>
                    </form>
                </div>
                <div className='w-2/3 m-2 p-2 shadow-lg shadow-blue-900 rounded-lg'>
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
                                <input type="number" className="h-10 bg-white font-semibold border-2 w-full border-gray-800 flex items-center justify-center rounded-b-lg shadow-sm text-lg" />
                            </div>
                            <div id="m-house" className="">
                                <div className="h-10 bg-gray-800 text-white border-2 border-gray-800 flex items-center justify-center rounded-t-lg shadow-sm text-lg" aria-label="House">
                                    House
                                </div>
                                <div className="h-10 bg-white font-semibold border-2 border-gray-800 flex justify-evenly rounded-b-lg shadow-sm text-lg">
                                    <input type="number" className="flex items-center justify-center border-r-2 border-gray-800 w-full" />
                                    <input type="number" className="flex items-center justify-center border-l-2 border-gray-800 w-full" />
                                </div>
                            </div>
                            <div id="m-ending" className="">
                                <div className="h-10 bg-gray-800 text-white border-2 border-gray-800 flex items-center justify-center rounded-t-lg shadow-sm text-lg" aria-label="Ending">
                                    Ending
                                </div>
                                <div className="h-10 bg-white font-semibold border-2 border-gray-800 flex justify-evenly rounded-b-lg shadow-sm text-lg">
                                    <input type="number" className="flex items-center justify-center border-r-2 border-gray-800 w-full" />
                                    <input type="number" className="flex items-center justify-center border-l-2 border-gray-800 w-full" />
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
                                <input type="number" className="h-10 bg-white font-semibold border-2 w-full border-gray-800 flex items-center justify-center rounded-b-lg shadow-sm text-lg" />
                            </div>
                            <div id="m-house" className="">
                                <div className="h-10 bg-gray-800 text-white border-2 border-gray-800 flex items-center justify-center rounded-t-lg shadow-sm text-lg" aria-label="House">
                                    House
                                </div>
                                <div className="h-10 bg-white font-semibold border-2 border-gray-800 flex justify-evenly rounded-b-lg shadow-sm text-lg">
                                    <input type="number" className="flex items-center justify-center border-r-2 border-gray-800 w-full" />
                                    <input type="number" className="flex items-center justify-center border-l-2 border-gray-800 w-full" />
                                </div>
                            </div>
                            <div id="m-ending" className="">
                                <div className="h-10 bg-gray-800 text-white border-2 border-gray-800 flex items-center justify-center rounded-t-lg shadow-sm text-lg" aria-label="Ending">
                                    Ending
                                </div>
                                <div className="h-10 bg-white font-semibold border-2 border-gray-800 flex justify-evenly rounded-b-lg shadow-sm text-lg">
                                    <input type="number" className="flex items-center justify-center border-r-2 border-gray-800 w-full" />
                                    <input type="number" className="flex items-center justify-center border-l-2 border-gray-800 w-full" />
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
                                <input type="number" className="h-10 bg-white font-semibold border-2 w-full border-gray-800 flex items-center justify-center rounded-b-lg shadow-sm text-lg" />
                            </div>
                            <div id="m-house" className="">
                                <div className="h-10 bg-gray-800 text-white border-2 border-gray-800 flex items-center justify-center rounded-t-lg shadow-sm text-lg" aria-label="House">
                                    House
                                </div>
                                <div className="h-10 bg-white font-semibold border-2 border-gray-800 flex justify-evenly rounded-b-lg shadow-sm text-lg">
                                    <input type="number" className="flex items-center justify-center border-r-2 border-gray-800 w-full" />
                                    <input type="number" className="flex items-center justify-center border-l-2 border-gray-800 w-full" />
                                </div>
                            </div>
                            <div id="m-ending" className="">
                                <div className="h-10 bg-gray-800 text-white border-2 border-gray-800 flex items-center justify-center rounded-t-lg shadow-sm text-lg" aria-label="Ending">
                                    Ending
                                </div>
                                <div className="h-10 bg-white font-semibold border-2 border-gray-800 flex justify-evenly rounded-b-lg shadow-sm text-lg">
                                    <input type="number" className="flex items-center justify-center border-r-2 border-gray-800 w-full" />
                                    <input type="number" className="flex items-center justify-center border-l-2 border-gray-800 w-full" />
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3">
                            <div className="md:col-span-2 h-10 bg-blue-800 text-white flex items-center justify-center rounded-l-lg shadow-md font-bold text-lg">
                                TODAY'S TARGET
                            </div>
                            <div className="h-10 text-blue-800 bg-white border-2 border-blue-800 flex items-center justify-center rounded-r-lg shadow-md font-bold text-lg">81 to 30</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex my-5">
                <div className='w-2/3 m-2 p-2 shadow-lg shadow-blue-900 rounded-lg'>
                    <h1 className='font-semibold text-lg text-center'>ALL GAME</h1>
                    <div className='flex flex-wrap'>
                        {timeSlots.map((time) => (
                             <div key={time} className='flex m-2 p-2 bg-blue-700'>
                            <label htmlFor={time} className="block text-md font-medium text-white m-2">{time}</label>
                            <input type="number" name={time} id={time} onChange={(e)=>handleInputChange(time, e.target.value)} className="p-1 w-15 h-10 rounded-lg border border-gray-600 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" placeholder='--'/>
                            <button onClick={()=>handleAdd(time)} className="p-2 bg-orange-600 text-white mx-1 rounded-md">ADD</button>
                        </div>
                        ))}               
                    </div>
                </div>
                <div className='w-1/3 m-2 p-2 shadow-lg shadow-blue-900 rounded-lg'>
                    <h1 className='font-semibold text-lg text-center'>GAME CODE</h1>
                       <form action="" className='space-y-2'>
                        <div className='flex flex-col justify-center items-center w-full my-10'>
                            <label htmlFor="morning-fr" className="block text-md font-medium text-black m-2">Enter Game Code</label>
                            <input type="number" name="morning-fr" id="morning-fr" className="px-4 py-3 w-full rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" placeholder='Game code' />
                            <button className="p-2 bg-orange-600 text-white my-3 w-full rounded-md">SUBMIT</button>
                        </div>
                        </form>
                </div>
            </div>
        </>
    )
}

export default Dashboard