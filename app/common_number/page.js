import { parseISO, format } from "date-fns";

const CommonNumber = () => {
    const today = new Date().toISOString().split("T")[0]
    const parsedDate = parseISO(today)
    const formatted_date = format(parsedDate, "dd/MM/yyyy")
    return (
        <div className="flex flex-col min-h-screen items-center bg-white text-black w-full">
            <h1 className="mt-10 text-4xl text-gray-700 font-bold">SHILLONG TEER COMMON NUMBER</h1>
            <p className="text-xl font-semibold m-5 text-gray-700">DATE: {formatted_date}</p>
            <div className="p-4 md:p-8 bg-gray-100 w-full">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
                    <div className="md:col-span-3 h-20 bg-blue-700 text-white flex items-center justify-center rounded-lg shadow-md font-bold text-lg">
                        COMMON NUMBERS
                    </div>
                    <div id="Morning" className="">
                        <div className="h-20 bg-gray-800 text-white border-2 border-gray-800 flex items-center justify-center rounded-t-lg shadow-sm text-lg" aria-label="Direct">
                            Direct
                        </div>
                        <div className="h-20 bg-white border-2 border-gray-800 flex items-center justify-center rounded-b-lg shadow-sm text-lg">
                            61
                        </div>
                    </div>
                    <div id="Evening" className="">
                        <div className="h-20 bg-gray-800 text-white border-2 border-gray-800 flex items-center justify-center rounded-t-lg shadow-sm text-lg" aria-label="House">
                            House
                        </div>
                        <div className="h-20 bg-white border-2 border-gray-800 flex items-center justify-center rounded-b-lg shadow-sm text-lg">
                            23
                        </div>
                    </div>
                    <div id="Night" className="">
                        <div className="h-20 bg-gray-800 text-white border-2 border-gray-800 flex items-center justify-center rounded-t-lg shadow-sm text-lg" aria-label="Ending">
                            Ending
                        </div>
                        <div className="h-20 bg-white border-2 border-gray-800 flex items-center justify-center rounded-b-lg shadow-sm text-lg">
                            23
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 my-5">
                    <div id="Morning" className="">
                        <div className="h-20 bg-gray-800 text-white border-2 border-gray-800 flex items-center justify-center rounded-t-lg shadow-sm text-lg" aria-label="Direct">
                            Direct
                        </div>
                        <div className="h-20 bg-white border-2 border-gray-800 flex items-center justify-center rounded-b-lg shadow-sm text-lg">
                            61
                        </div>
                    </div>
                    <div id="Evening" className="">
                        <div className="h-20 bg-gray-800 text-white border-2 border-gray-800 flex items-center justify-center rounded-t-lg shadow-sm text-lg" aria-label="House">
                            House
                        </div>
                        <div className="h-20 bg-white border-2 border-gray-800 flex items-center justify-center rounded-b-lg shadow-sm text-lg">
                            23
                        </div>
                    </div>
                    <div id="Night" className="">
                        <div className="h-20 bg-gray-800 text-white border-2 border-gray-800 flex items-center justify-center rounded-t-lg shadow-sm text-lg" aria-label="Ending">
                            Ending
                        </div>
                        <div className="h-20 bg-white border-2 border-gray-800 flex items-center justify-center rounded-b-lg shadow-sm text-lg">
                            23
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3">
                    <div className="md:col-span-2 h-20 bg-blue-800 text-white flex items-center justify-center rounded-l-lg shadow-md font-bold text-lg">
                        TODAY'S TARGET
                    </div>
                    <div className="h-20 text-blue-800 bg-white border-2 border-blue-800 flex items-center justify-center rounded-r-lg shadow-md font-bold text-lg">81 to 30</div>
                </div>
            </div>
        </div>
    )
}

export default CommonNumber