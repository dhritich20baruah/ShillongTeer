import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase-client';

const CommonNumberForm = () => {
    //MORNING
    const [mDirect, setMDirect] = useState(0);
    const [mHouse1, setMHouse1] = useState(0);
    const [mHouse2, setMHouse2] = useState(0);
    const [mEnding1, setMEnding1] = useState(0);
    const [mEnding2, setMEnding2] = useState(0);

    const handleMorning = async (e) => {
        e.preventDefault();
        const { data, error } = await supabase.from('m_common_number')
            .upsert({
                result_date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
                m_direct: parseInt(mDirect),
                m_house1: parseInt(mHouse1),
                m_house2: parseInt(mHouse2),
                m_ending1: parseInt(mEnding1),
                m_ending2: parseInt(mEnding2),
            });

        if (error) {
            console.error("Error updating: ", error.message)
        } else {
            alert(`Morning Common Numbers Saved`);
        }
    }

    const fetchMorning = async () => {
        const today = new Date().toISOString().split('T')[0];
        const { data, error } = await supabase
            .from('m_common_number')
            .select('*')
            .eq('result_date', today)
            .single();

        console.log(data)
        if (data) {
            setMDirect(data.m_direct)
            setMEnding1(data.m_ending1)
            setMEnding2(data.m_ending2)
            setMHouse1(data.m_house1)
            setMHouse2(data.m_house2)
        }
    }

    useEffect(() => {
        fetchMorning()
        fetchEvening()
        fetchNight()
    }, [])

    //EVENING
    const [eDirect, setEDirect] = useState(0);
    const [eHouse1, setEHouse1] = useState(0);
    const [eHouse2, setEHouse2] = useState(0);
    const [eEnding1, setEEnding1] = useState(0);
    const [eEnding2, setEEnding2] = useState(0);

    const handleEvening = async (e) => {
        e.preventDefault();
        const { data, error } = await supabase.from('e_common_number')
            .upsert({
                result_date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
                e_direct: parseInt(eDirect),
                e_house1: parseInt(eHouse1),
                e_house2: parseInt(eHouse2),
                e_ending1: parseInt(eEnding1),
                e_ending2: parseInt(eEnding2),
            });

        if (error) {
            console.error("Error updating: ", error.message)
        } else {
            alert(`Evening Common Numbers Saved`);
        }
    }

    const fetchEvening = async () => {
        const today = new Date().toISOString().split('T')[0];
        const { data, error } = await supabase
            .from('e_common_number')
            .select('*')
            .eq('result_date', today)
            .single();

        if (data) {
            setEDirect(data.e_direct)
            setEEnding1(data.e_ending1)
            setEEnding2(data.e_ending2)
            setEHouse1(data.e_house1)
            setEHouse2(data.e_house2)
        }
    }

    //NIGHT
    const [nDirect, setNDirect] = useState(0);
    const [nHouse1, setNHouse1] = useState(0);
    const [nHouse2, setNHouse2] = useState(0);
    const [nEnding1, setNEnding1] = useState(0);
    const [nEnding2, setNEnding2] = useState(0);

    const handleNight = async (e) => {
        e.preventDefault();
        const { data, error } = await supabase.from('n_common_number')
            .upsert({
                result_date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
                n_direct: parseInt(nDirect),
                n_house1: parseInt(nHouse1),
                n_house2: parseInt(nHouse2),
                n_ending1: parseInt(nEnding1),
                n_ending2: parseInt(nEnding2),
            });

        if (error) {
            console.error("Error updating: ", error.message)
        } else {
            alert(`Night Common Numbers Saved`);
        }
    }

    const fetchNight = async () => {
        const today = new Date().toISOString().split('T')[0];
        const { data, error } = await supabase
            .from('n_common_number')
            .select('*')
            .eq('result_date', today)
            .single();

        if (data) {
            setNDirect(data.n_direct)
            setNEnding1(data.n_ending1)
            setNEnding2(data.n_ending2)
            setNHouse1(data.n_house1)
            setNHouse2(data.n_house2)
        }
    }

    return (
        <div className="p-2 w-full">
            <h1 className='font-semibold text-lg text-center'>COMMON NUMBERS</h1>
            <div className="w-full h-10 text-black flex items-center justify-center rounded-lg shadow-md font-bold text-lg">
                MORNING
            </div>
            <form onSubmit={handleMorning}>
                <div className="grid grid-cols-3 gap-1">
                    <div >
                        <div className="h-10 bg-gray-800 text-white border-2 border-gray-800 flex items-center justify-center rounded-t-lg shadow-sm text-lg" aria-label="Direct">
                            Direct
                        </div>
                        <input type="number" id="mDirect" value={mDirect} onChange={(e) => setMDirect(e.target.value)} className="h-10 bg-white border-2 w-full border-gray-800 flex items-center justify-center rounded-b-lg shadow-sm text-lg px-1" placeholder='----' />
                    </div>
                    <div >
                        <div className="h-10 bg-gray-800 text-white border-2 border-gray-800 flex items-center justify-center rounded-t-lg shadow-sm text-lg" aria-label="House">
                            House
                        </div>
                        <div className="h-10 bg-white border-2 border-gray-800 flex justify-evenly rounded-b-lg shadow-sm text-lg">
                            <input type="number" id="mHouse1" value={mHouse1} onChange={(e) => setMHouse1(e.target.value)} className="flex items-center justify-center border-r-2 border-gray-800 w-full px-1" placeholder='----' />
                            <input type="number" id="mHouse2" value={mHouse2} onChange={(e) => setMHouse2(e.target.value)} className="flex items-center justify-center border-l-2 border-gray-800 w-full px-1" placeholder='----' />
                        </div>
                    </div>
                    <div >
                        <div className="h-10 bg-gray-800 text-white border-2 border-gray-800 flex items-center justify-center rounded-t-lg shadow-sm text-lg" aria-label="Ending">
                            Ending
                        </div>
                        <div className="h-10 bg-white border-2 border-gray-800 flex justify-evenly rounded-b-lg shadow-sm text-lg">
                            <input type="number" value={mEnding1} onChange={(e) => setMEnding1(e.target.value)} id="mEnding1" className="flex items-center justify-center border-r-2 border-gray-800 w-full px-1" placeholder='----' />
                            <input type="number" value={mEnding2} onChange={(e) => setMEnding2(e.target.value)} id="mEnding2" className="flex items-center justify-center border-l-2 border-gray-800 w-full px-1" placeholder='----' />
                        </div>
                    </div>
                </div>
                <button type='submit' className="p-2 bg-orange-600 text-white my-3 w-full rounded-md cursor-pointer hover:bg-orange-700">ADD / UPDATE</button>
            </form>
            <div className="md:col-span-3 h-10 text-black flex items-center justify-center rounded-lg shadow-md font-bold text-lg">
                EVENING
            </div>
            <form onSubmit={handleEvening}>
                <div className="grid grid-cols-3 gap-2 my-5">
                    <div>
                        <div className="h-10 bg-gray-800 text-white border-2 border-gray-800 flex items-center justify-center rounded-t-lg shadow-sm text-lg" aria-label="Direct">
                            Direct
                        </div>
                        <input id="e-direct" value={eDirect} onChange={(e) => setEDirect(e.target.value)} type="number" className="h-10 bg-white px-1 border-2 w-full border-gray-800 flex items-center justify-center rounded-b-lg shadow-sm text-lg" placeholder='----' />
                    </div>
                    <div>
                        <div className="h-10 bg-gray-800 text-white border-2 border-gray-800 flex items-center justify-center rounded-t-lg shadow-sm text-lg" aria-label="House">
                            House
                        </div>
                        <div className="h-10 bg-white border-2 border-gray-800 flex justify-evenly rounded-b-lg shadow-sm text-lg">
                            <input id="e-house1" value={eHouse1} onChange={(e) => setEHouse1(e.target.value)} type="number" className="flex items-center justify-center border-r-2 border-gray-800 w-full px-1" placeholder='----' />
                            <input id="e-house2" value={eHouse2} onChange={(e) => setEHouse2(e.target.value)} type="number" className="flex items-center justify-center border-l-2 border-gray-800 w-full px-1" placeholder='----' />
                        </div>
                    </div>
                    <div>
                        <div className="h-10 bg-gray-800 text-white border-2 border-gray-800 flex items-center justify-center rounded-t-lg shadow-sm text-lg" aria-label="Ending">
                            Ending
                        </div>
                        <div className="h-10 bg-white border-2 border-gray-800 flex justify-evenly rounded-b-lg shadow-sm text-lg">
                            <input id="e-ending1" value={eEnding1} onChange={(e) => setEEnding1(e.target.value)} type="number" className="flex items-center justify-center border-r-2 border-gray-800 w-full px-1" placeholder='----' />
                            <input id="e-ending2" value={eEnding2} onChange={(e) => setEEnding2(e.target.value)} type="number" className="flex items-center justify-center border-l-2 border-gray-800 w-full px-1" placeholder='----' />
                        </div>
                    </div>
                </div>
                <button type='submit' className="p-2 bg-orange-600 text-white my-3 w-full rounded-md cursor-pointer hover:bg-orange-700">ADD / UPDATE</button>
            </form>
            <div className="md:col-span-3 h-10 text-black flex items-center justify-center rounded-lg shadow-md font-bold text-lg">
                NIGHT
            </div>
            <form onSubmit={handleNight}>
                <div className="grid grid-cols-3 gap-2 my-5">
                    <div>
                        <div className="h-10 bg-gray-800 text-white border-2 border-gray-800 flex items-center justify-center rounded-t-lg shadow-sm text-lg" aria-label="Direct">
                            Direct
                        </div>
                        <input id="n-direct" value={nDirect} onChange={(e)=>setNDirect(e.target.value)} type="number" className="h-10 bg-white border-2 w-full border-gray-800 flex items-center justify-center rounded-b-lg shadow-sm text-lg px-1" placeholder='----' />
                    </div>
                    <div>
                        <div className="h-10 bg-gray-800 text-white border-2 border-gray-800 flex items-center justify-center rounded-t-lg shadow-sm text-lg" aria-label="House">
                            House
                        </div>
                        <div className="h-10 bg-white border-2 border-gray-800 flex justify-evenly rounded-b-lg shadow-sm text-lg">
                            <input id="n-house1" value={nHouse1} onChange={(e)=>setNHouse1(e.target.value)} type="number" className="flex items-center justify-center border-r-2 border-gray-800 w-full px-1" placeholder='----' />
                            <input id="n-house2" value={nHouse2} onChange={(e)=>setNHouse2(e.target.value)} type="number" className="flex items-center justify-center border-l-2 border-gray-800 w-full px-1" placeholder='----' />
                        </div>
                    </div>
                    <div>
                        <div className="h-10 bg-gray-800 text-white border-2 border-gray-800 flex items-center justify-center rounded-t-lg shadow-sm text-lg" aria-label="Ending">
                            Ending
                        </div>
                        <div className="h-10 bg-white border-2 border-gray-800 flex justify-evenly rounded-b-lg shadow-sm text-lg">
                            <input id="n-ending1" value={nEnding1} onChange={(e)=>setNEnding1(e.target.value)} type="number" className="flex items-center justify-center border-r-2 border-gray-800 w-full px-1" placeholder='----' />
                            <input id="n-ending2" value={nEnding2} onChange={(e)=>setNEnding2(e.target.value)} type="number" className="flex items-center justify-center border-l-2 border-gray-800 w-full px-1" placeholder='----' />
                        </div>
                    </div>
                </div>
                <button type='submit' className="p-2 bg-orange-600 text-white my-3 w-full rounded-md cursor-pointer hover:bg-orange-700">ADD / UPDATE</button>
            </form>

        </div>
    )
}

export default CommonNumberForm