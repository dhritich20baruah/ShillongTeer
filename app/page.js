import { parseISO, format } from "date-fns";
import Link from "next/link";
import Image from "next/image";
import RoundsTable from "./component/RoundsTable";
import UploadedImage from "./component/UploadedImage";

export async function generateMetadata() {
  const today = new Date().toLocaleDateString('en-GB'); // e.g., 23/12/2025

  return {
    title: `Shillong Teer Result Today - ${today} (Live Updates)`,
    description: `Get the latest Shillong Teer First Round (F/R) and Second Round (S/R) results for ${today}. Fast and accurate manual updates from the Polo Ground.`,
    keywords: ["Shillong Teer", "Teer Result Today", "Shillong Teer S/R", "Shillong Teer F/R"],
    openGraph: {
      title: `Shillong Teer Result Today - ${today}`,
      description: `Live Shillong Teer results for ${today}.`,
      type: 'website',
    },
  }
}

export const revalidate = 60;

export default function Home() {
  const today = new Date().toISOString().split("T")[0]
  const parsedDate = parseISO(today)
  const formatted_date = format(parsedDate, "dd/MM/yyyy")
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
      <h1 className="mt-10 text-4xl text-yellow-300 font-bold shadow-lg shadow-black bg-black p-3 opacity-90">SHILLONG TEER</h1>
      <p className="text-md font-semibold m-2 text-yellow-300 shadow-lg shadow-black bg-black p-3 opacity-90">DATE: {formatted_date}</p>
      <div className="p-2 md:p-4 w-full">
        <RoundsTable />
        <Link href="/previous-results">
          <div className="w-full my-10 cursor-pointer h-10 hover:bg-red-700 bg-orange-700 text-white flex items-center justify-center rounded-lg shadow-2xl shadow-black font-bold text-md">
            CLICK TO VIEW PREVIOUS RESULTS
          </div>
        </Link>
        <div className="grid grid-cols-3 gap-2 my-5">
          <Link href="/common_number">
            <div id="Common" className="h-32 bg-blue-800 text-white hover:bg-red-600 flex items-center justify-center rounded-lg shadow-2xl shadow-black md:text-lg text-md text-center cursor-pointer" aria-label="Common Number">
              Common Number
            </div>
          </Link>
          <Link href="/all_game">
            <div id="AllGame" className="h-32 bg-blue-800 text-white hover:bg-red-600 flex items-center justify-center rounded-lg shadow-2xl shadow-black md:text-lg text-md text-center cursor-pointer" aria-label="All Game Result">
              All Game
            </div>
          </Link>
          <Link href="/game-code">
            <div id="GameCode" className="h-32 bg-blue-800 text-white hover:bg-red-600 flex items-center justify-center rounded-lg shadow-2xl shadow-black md:text-lg text-md text-center cursor-pointer" aria-label="Second Round Result">
              Game Code
            </div>
          </Link>
        </div>
        <div className="p-5 w-full flex items-center justify-center">
          <UploadedImage/>
        </div>
      </div>
    </div>
  );
}
