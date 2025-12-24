"use client"
import { useState, useEffect } from "react";

export default function PreviousResults() {
    const [results, setResults] = useState([
        { "date": "24-12-2025", "morning": 34, "evening": 45, "night": 89 },
        { "date": "23-12-2025", "morning": 12, "evening": 67, "night": 5 },
        { "date": "22-12-2025", "morning": 88, "evening": 23, "night": 41 },
        { "date": "21-12-2025", "morning": 56, "evening": 9, "night": 72 },
        { "date": "20-12-2025", "morning": 31, "evening": 54, "night": 18 },
        { "date": "19-12-2025", "morning": 90, "evening": 11, "night": 63 },
        { "date": "18-12-2025", "morning": 47, "evening": 82, "night": 29 },
        { "date": "17-12-2025", "morning": 2, "evening": 36, "night": 95 },
        { "date": "16-12-2025", "morning": 74, "evening": 15, "night": 50 },
        { "date": "15-12-2025", "morning": 21, "evening": 99, "night": 7 },
        { "date": "14-12-2025", "morning": 65, "evening": 38, "night": 44 }
    ])
    return (
        <div className="flex flex-col min-h-screen items-center bg-white text-black w-full">
            <h1 className="mt-10 text-4xl text-gray-700 font-bold text-center">SHILLONG TEER PREVIOUS RESULTS</h1>
            <div className="grid grid-cols-4 w-full mt-10 md:w-[95%]">
                <div className="h-12 border-2 border-white bg-blue-800 text-white flex items-center justify-center text-center text-sm shadow-md md:font-bold md:text-md">
                    DATE
                </div>
                <div className="h-12 border-2 border-white bg-blue-800 text-white flex items-center justify-center text-center text-sm shadow-md md:font-bold md:text-md">
                    MORNING RESULTS
                </div>
                <div className="h-12 border-2 border-white bg-blue-800 text-white flex items-center justify-center text-center text-sm shadow-md md:font-bold md:text-md">
                    EVENING RESULTS
                </div>
                <div className="h-12 border-2 border-white bg-blue-800 text-white flex items-center justify-center text-center text-sm shadow-md md:font-bold md:text-md">
                    NIGHT RESULTS
                </div>
            </div>
            {results.map((item, index) => {
                return (
                    <div className="grid grid-cols-4 w-full md:w-[95%]" key={index}>
                        <div className="h-12 border-2 border-blue-800 bg-white text-black flex items-center justify-center text-center text-sm shadow-md md:font-bold md:text-md">
                            {item.date}
                        </div>
                        <div className="h-12 border-2 border-blue-800 bg-white text-black flex items-center justify-center text-center text-sm shadow-md md:font-bold md:text-md">
                            {item.morning}
                        </div>
                        <div className="h-12 border-2 border-blue-800 bg-white text-black flex items-center justify-center text-center text-sm shadow-md md:font-bold md:text-md">
                            {item.evening}
                        </div>
                        <div className="h-12 border-2 border-blue-800 bg-white text-black flex items-center justify-center text-center text-sm shadow-md md:font-bold md:text-md">
                            {item.night}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}