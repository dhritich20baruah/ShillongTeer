import { parseISO, format } from "date-fns";
import Image from "next/image";

const CommonNumber = () => {
    const today = new Date().toISOString().split("T")[0]
    const parsedDate = parseISO(today)
    const formatted_date = format(parsedDate, "dd/MM/yyyy")
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
                        <div className="h-20 bg-gray-800 text-white border-2 border-gray-800 flex items-center justify-center rounded-t-lg shadow-sm text-lg" aria-label="Direct">
                            Direct
                        </div>
                        <div className="h-20 bg-white font-semibold border-2 border-gray-800 flex items-center justify-center rounded-b-lg shadow-sm text-lg">
                            61
                        </div>
                    </div>
                    <div id="m-house" className="">
                        <div className="h-20 bg-gray-800 text-white border-2 border-gray-800 flex items-center justify-center rounded-t-lg shadow-sm text-lg" aria-label="House">
                            House
                        </div>
                        <div className="h-20 bg-white font-semibold border-2 border-gray-800 flex justify-evenly rounded-b-lg shadow-sm text-lg">
                            <div className="flex items-center justify-center">62</div>
                            <div className="flex items-center justify-center">45</div>
                        </div>
                    </div>
                    <div id="m-ending" className="">
                        <div className="h-20 bg-gray-800 text-white border-2 border-gray-800 flex items-center justify-center rounded-t-lg shadow-sm text-lg" aria-label="Ending">
                            Ending
                        </div>
                        <div className="h-20 bg-white font-semibold border-2 border-gray-800 flex justify-evenly rounded-b-lg shadow-sm text-lg">
                            <div className="flex items-center justify-center">62</div>
                            <div className="flex items-center justify-center">45</div>
                        </div>
                    </div>
                </div>
                <div className="md:col-span-3 h-10 text-white flex items-center justify-center rounded-lg shadow-md font-bold text-lg">
                    EVENING
                </div>
                <div className="grid grid-cols-3 gap-2 my-5">
                    <div id="e-direct" className="">
                        <div className="h-20 bg-gray-800 text-white border-2 border-gray-800 flex items-center justify-center rounded-t-lg shadow-sm text-lg" aria-label="Direct">
                            Direct
                        </div>
                        <div className="h-20 bg-white font-semibold border-2 border-gray-800 flex items-center justify-center rounded-b-lg shadow-sm text-lg">
                            61
                        </div>
                    </div>
                    <div id="e-house" className="">
                        <div className="h-20 bg-gray-800 text-white border-2 border-gray-800 flex items-center justify-center rounded-t-lg shadow-sm text-lg" aria-label="House">
                            House
                        </div>
                        <div className="h-20 bg-white font-semibold border-2 border-gray-800 flex justify-evenly rounded-b-lg shadow-sm text-lg">
                            <div className="flex items-center justify-center">62</div>
                            <div className="flex items-center justify-center">45</div>
                        </div>
                    </div>
                    <div id="e-ending" className="">
                        <div className="h-20 bg-gray-800 text-white border-2 border-gray-800 flex items-center justify-center rounded-t-lg shadow-sm text-lg" aria-label="Ending">
                            Ending
                        </div>
                        <div className="h-20 bg-white font-semibold border-2 border-gray-800 flex justify-evenly rounded-b-lg shadow-sm text-lg">
                            <div className="flex items-center justify-center">62</div>
                            <div className="flex items-center justify-center">45</div>
                        </div>
                    </div>
                </div>
                <div className="md:col-span-3 h-10 text-white flex items-center justify-center rounded-lg shadow-md font-bold text-lg">
                    NIGHT
                </div>
                <div className="grid grid-cols-3 gap-2 my-5">
                    <div id="n-direct" className="">
                        <div className="h-20 bg-gray-800 text-white border-2 border-gray-800 flex items-center justify-center rounded-t-lg shadow-sm text-lg" aria-label="Direct">
                            Direct
                        </div>
                        <div className="h-20 bg-white font-semibold border-2 border-gray-800 flex items-center justify-center rounded-b-lg shadow-sm text-lg">
                            61
                        </div>
                    </div>
                    <div id="n-house" className="">
                        <div className="h-20 bg-gray-800 text-white border-2 border-gray-800 flex items-center justify-center rounded-t-lg shadow-sm text-lg" aria-label="House">
                            House
                        </div>
                        <div className="h-20 bg-white font-semibold border-2 border-gray-800 flex justify-evenly rounded-b-lg shadow-sm text-lg">
                            <div className="flex items-center justify-center">62</div>
                            <div className="flex items-center justify-center">45</div>
                        </div>
                    </div>
                    <div id="n-ending" className="">
                        <div className="h-20 bg-gray-800 text-white border-2 border-gray-800 flex items-center justify-center rounded-t-lg shadow-sm text-lg" aria-label="Ending">
                            Ending
                        </div>
                        <div className="h-20 bg-white font-semibold border-2 border-gray-800 flex justify-evenly rounded-b-lg shadow-sm text-lg">
                            <div className="flex items-center justify-center">62</div>
                            <div className="flex items-center justify-center">45</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CommonNumber