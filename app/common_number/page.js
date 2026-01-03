"use client"
import { parseISO, format } from "date-fns";
import Image from "next/image";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase-client";

const CommonNumber = () => {
    const today = new Date().toISOString().split("T")[0]
    const parsedDate = parseISO(today)
    const formatted_date = format(parsedDate, "dd/MM/yyyy")
    //MORNING
    const [mDirect, setMDirect] = useState(0);
    const [mHouse1, setMHouse1] = useState(0);
    const [mHouse2, setMHouse2] = useState(0);
    const [mEnding1, setMEnding1] = useState(0);
    const [mEnding2, setMEnding2] = useState(0);

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
        <div className="flex flex-col min-h-screen items-center text-black w-full">
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
            <h1 className="mt-10 text-4xl text-white font-bold text-center shadow-black shadow-lg p-3 opacity-90 bg-black">SHILLONG TEER COMMON NUMBER</h1>
            <p className="text-xl font-semibold m-5 text-white shadow-black shadow-lg p-3 opacity-90 bg-black">DATE: {formatted_date}</p>
            <div className="p-4 md:p-8 w-full">
                <div className="w-full h-20 bg-blue-700 text-white flex items-center justify-center rounded-lg shadow-md font-bold text-lg">
                    COMMON NUMBERS
                </div>
                <div className="w-full h-10 text-white flex items-center justify-center rounded-lg shadow-md font-bold text-lg">
                    MORNING
                </div>
                <div className="grid grid-cols-3 gap-1">
                    <div id="m-direct" className="">
                        <div className="h-20 bg-gray-800 text-white border-2 border-gray-800 flex items-center justify-center rounded-t-lg shadow-sm text-lg" aria-label="Morning Common Number Direct">
                            Direct
                        </div>
                        <div className="h-20 bg-white font-semibold border-2 border-gray-800 flex items-center justify-center rounded-b-lg shadow-sm text-lg">
                            {(mDirect) ? (mDirect) : "------"}
                        </div>
                    </div>
                    <div id="m-house" className="">
                        <div className="h-20 bg-gray-800 text-white border-2 border-gray-800 flex items-center justify-center rounded-t-lg shadow-sm text-lg" aria-label="Morning Common Number House">
                            House
                        </div>
                        <div className="h-20 bg-white font-semibold border-2 border-gray-800 flex justify-evenly rounded-b-lg shadow-sm text-lg">
                            <div className="flex items-center justify-center">{(mHouse1) ? (mHouse1.toString().padStart(2, "0")) : "--"}</div>
                            <div className="flex items-center justify-center">{(mHouse2) ? (mHouse2.toString().padStart(2, "0")) : "--"}</div>
                        </div>
                    </div>
                    <div id="m-ending" className="">
                        <div className="h-20 bg-gray-800 text-white border-2 border-gray-800 flex items-center justify-center rounded-t-lg shadow-sm text-lg" aria-label="Morning Common Number Ending">
                            Ending
                        </div>
                        <div className="h-20 bg-white font-semibold border-2 border-gray-800 flex justify-evenly rounded-b-lg shadow-sm text-lg">
                            <div className="flex items-center justify-center">{(mEnding1) ? (mEnding1.toString().padStart(2, "0")) : "--"}</div>
                            <div className="flex items-center justify-center">{(mEnding2) ? (mEnding2.toString().padStart(2, "0")) : "--"}</div>
                        </div>
                    </div>
                </div>
                <div className="md:col-span-3 h-10 text-white flex items-center justify-center rounded-lg shadow-md font-bold text-lg">
                    EVENING
                </div>
                <div className="grid grid-cols-3 gap-2 my-5">
                    <div id="e-direct" className="">
                        <div className="h-20 bg-gray-800 text-white border-2 border-gray-800 flex items-center justify-center rounded-t-lg shadow-sm text-lg" aria-label="Evening Common Number Direct">
                            Direct
                        </div>
                        <div className="h-20 bg-white font-semibold border-2 border-gray-800 flex items-center justify-center rounded-b-lg shadow-sm text-lg">
                            {(eDirect) ? (eDirect) : "------"}
                        </div>
                    </div>
                    <div id="e-house" className="">
                        <div className="h-20 bg-gray-800 text-white border-2 border-gray-800 flex items-center justify-center rounded-t-lg shadow-sm text-lg" aria-label="Evening Common Number House">
                            House
                        </div>
                        <div className="h-20 bg-white font-semibold border-2 border-gray-800 flex justify-evenly rounded-b-lg shadow-sm text-lg">
                            <div className="flex items-center justify-center">{(eHouse1) ? (eHouse1.toString().padStart(2, "0")) : "--"}</div>
                            <div className="flex items-center justify-center">{(eHouse2) ? (eHouse2.toString().padStart(2, "0")) : "--"}</div>
                        </div>
                    </div>
                    <div id="e-ending" className="">
                        <div className="h-20 bg-gray-800 text-white border-2 border-gray-800 flex items-center justify-center rounded-t-lg shadow-sm text-lg" aria-label="Evening Common Number Ending">
                            Ending
                        </div>
                        <div className="h-20 bg-white font-semibold border-2 border-gray-800 flex justify-evenly rounded-b-lg shadow-sm text-lg">
                            <div className="flex items-center justify-center">{(eEnding1) ? (eEnding1.toString().padStart(2, "0")) : "--"}</div>
                            <div className="flex items-center justify-center">{(eEnding2) ? (eEnding2.toString().padStart(2, "0")) : "--"}</div>
                        </div>
                    </div>
                </div>
                <div className="md:col-span-3 h-10 text-white flex items-center justify-center rounded-lg shadow-md font-bold text-lg">
                    NIGHT
                </div>
                <div className="grid grid-cols-3 gap-2 my-5">
                    <div id="n-direct" className="">
                        <div className="h-20 bg-gray-800 text-white border-2 border-gray-800 flex items-center justify-center rounded-t-lg shadow-sm text-lg" aria-label="Night Common Number Direct">
                            Direct
                        </div>
                        <div className="h-20 bg-white font-semibold border-2 border-gray-800 flex items-center justify-center rounded-b-lg shadow-sm text-lg">
                            {(nDirect) ? (nDirect) : "------"}
                        </div>
                    </div>
                    <div id="n-house" className="">
                        <div className="h-20 bg-gray-800 text-white border-2 border-gray-800 flex items-center justify-center rounded-t-lg shadow-sm text-lg" aria-label="Night Common Number House">
                            House
                        </div>
                        <div className="h-20 bg-white font-semibold border-2 border-gray-800 flex justify-evenly rounded-b-lg shadow-sm text-lg">
                            <div className="flex items-center justify-center">{(nHouse1) ? (nHouse1.toString().padStart(2, "0")) : "--"}</div>
                            <div className="flex items-center justify-center">{(nHouse2) ? (nHouse2.toString().padStart(2, "0")) : "--"}</div>
                        </div>
                    </div>
                    <div id="n-ending" className="">
                        <div className="h-20 bg-gray-800 text-white border-2 border-gray-800 flex items-center justify-center rounded-t-lg shadow-sm text-lg" aria-label="Night Common Number Ending">
                            Ending
                        </div>
                        <div className="h-20 bg-white font-semibold border-2 border-gray-800 flex justify-evenly rounded-b-lg shadow-sm text-lg">
                            <div className="flex items-center justify-center">{(nEnding1) ? (nEnding1.toString().padStart(2, "0")) : "--"}</div>
                            <div className="flex items-center justify-center">{(nEnding2) ? (nEnding2.toString().padStart(2, "0")) : "--"}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CommonNumber