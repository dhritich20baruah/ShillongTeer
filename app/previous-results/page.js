"use client"
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase-client";
import Image from "next/image";

export default function PreviousResults() {
    const [roundData, setRoundData] = useState([{ "date": "--/--/----", "morning-sr": "--", "morning-fr": "--", "evening-sr": "--", "evening-fr": "--", "night-sr": "--", "night-fr": "--" }]);

    const fetchRounds = async () => {
        const { data, error } = await supabase
            .from('round_results')
            .select('*')
            .order('result_date', { ascending: false });

        if (error) {
            console.log("Fetch error:", error);
            return;
        }

        if (!data || data.length === 0) return;

        const grouped = data.reduce((acc, row) => {
            const date = row.result_date;
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(row);
            return acc;
        }, {});

        const formattedArray = Object.entries(grouped).map(([date, rows]) => {
            const obj = {
                date: date.split('-').reverse().join('/'), // convert to DD/MM/YYYY
                "morning-fr": "--",
                "morning-sr": "--",
                "evening-fr": "--",
                "evening-sr": "--",
                "night-fr": "--",
                "night-sr": "--"
            };

            for (const r of rows) {
                const key = `${r.session_name}-${r.round_type}`;
                if (key in obj) {
                    obj[key] = r.value.toString().padStart(2, "0")
                }
            }

            return obj;
        });

        setRoundData(formattedArray)
    }

    useEffect(() => {
        fetchRounds()
    }, [])

    return (
        <div className="flex flex-col min-h-screen items-center text-black w-full">
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
            <h1 className="mt-10 text-4xl text-gray-200 font-bold text-center shadow-lg shadow-black bg-black p-3 opacity-90">SHILLONG TEER PREVIOUS RESULTS</h1>
            <div className="grid grid-cols-4 w-full mt-10 md:w-[95%] bg-blue-800 h-fit p-1 sticky top-0">
                <div className="text-white flex items-center justify-center text-center text-sm shadow-md md:font-bold md:text-md">
                    DATE
                </div>
                <div className="text-white flex flex-col items-center justify-center text-center text-sm shadow-md md:font-bold md:text-md">
                    <p>
                        MORNING RESULTS
                    </p>
                    <div className="flex justify-around font-semibold w-full">
                        <p>FR</p>
                        <p>SR</p>
                    </div>
                </div>
                <div className="text-white flex flex-col items-center justify-center text-center text-sm shadow-md md:font-bold md:text-md">
                    <p>
                        EVENING RESULTS
                    </p>
                    <div className="flex justify-around font-semibold w-full">
                        <p>FR</p>
                        <p>SR</p>
                    </div>
                </div>
                <div className="text-white flex flex-col items-center justify-center text-center text-sm shadow-md md:font-bold md:text-md">
                    <p>
                        NIGHT RESULTS
                    </p>
                    <div className="flex justify-around font-semibold w-full">
                        <p>FR</p>
                        <p>SR</p>
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
                            <p>{item["morning-fr"]}</p>
                            <p>{item["morning-sr"]}</p>
                        </div>
                        <div className="h-12 border-2 border-blue-800 bg-white text-black flex items-center justify-around text-center text-sm shadow-md md:font-bold md:text-md">
                            <p>{item["evening-fr"]}</p>
                            <p>{item["evening-sr"]}</p>
                        </div>
                        <div className="h-12 border-2 border-blue-800 bg-white text-black flex items-center justify-around text-center text-sm shadow-md md:font-bold md:text-md">
                            <p>{item["night-fr"]}</p>
                            <p>{item["night-sr"]}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}