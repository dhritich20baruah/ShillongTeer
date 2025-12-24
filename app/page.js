import { parseISO, format } from "date-fns";
import { Metadata } from 'next';
import Link from "next/link";
import Image from "next/image";

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
      <h1 className="mt-10 text-4xl text-white font-bold">SHILLONG TEER</h1>
      <p className="text-xl font-semibold m-5 text-white">DATE: {formatted_date}</p>
      <div className="p-4 md:p-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
          <div className="md:col-span-3 h-20 bg-blue-700 text-white flex items-center justify-center rounded-lg shadow-md font-bold text-lg">
            Shooting Time F/R - 3:15 PM | S/R - 4:15 PM
          </div>
          <div id="Morning">
            <div className="h-20 bg-gray-800 text-white border-2 border-gray-800 flex items-center justify-center rounded-t-lg shadow-sm text-lg" aria-label="First Round Result">
              Morning Round
            </div>
            <div className="h-20 bg-white border-2 border-gray-800 flex items-center justify-center rounded-b-lg shadow-sm text-lg">
              61
            </div>
          </div>
          <div id="Evening">
            <div className="h-20 bg-gray-800 text-white border-2 border-gray-800 flex items-center justify-center rounded-t-lg shadow-sm text-lg" aria-label="Second Round Result">
              Evening Round
            </div>
            <div className="h-20 bg-white border-2 border-gray-800 flex items-center justify-center rounded-b-lg shadow-sm text-lg">
              23
            </div>
          </div>
          <div id="Night">
            <div className="h-20 bg-gray-800 text-white border-2 border-gray-800 flex items-center justify-center rounded-t-lg shadow-sm text-lg" aria-label="Second Round Result">
              Night Round
            </div>
            <div className="h-20 bg-white border-2 border-gray-800 flex items-center justify-center rounded-b-lg shadow-sm text-lg">
              23
            </div>
          </div>
        </div>
        <Link href="/previous-results">
          <div className="w-full my-10 cursor-pointer h-10 hover:bg-red-700 bg-orange-700 text-white flex items-center justify-center rounded-lg shadow-2xl shadow-black font-bold text-md">
            CLICK TO VIEW PREVIOUS RESULTS
          </div>
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 my-5">
          <Link href="/common_number">
          <div id="Common" className="h-32 bg-blue-800 text-white hover:bg-red-600 flex items-center justify-center rounded-lg shadow-2xl shadow-black text-xl cursor-pointer" aria-label="Common Number">
              Common Number
            </div>
          </Link>
          <div id="AllGame" className="h-32 bg-blue-800 text-white hover:bg-red-600 flex items-center justify-center rounded-lg shadow-2xl shadow-black text-xl cursor-pointer" aria-label="All Game Result">
            All Game
          </div>
          <div id="GameCode" className="h-32 bg-blue-800 text-white hover:bg-red-600 flex items-center justify-center rounded-lg shadow-2xl shadow-black text-xl cursor-pointer" aria-label="Second Round Result">
            Game Code
          </div>
        </div>
      </div>
    </div>
  );
}
