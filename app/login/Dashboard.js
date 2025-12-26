import React from 'react'

const Dashboard = () => {
    return (
        <div className="flex flex-col min-h-screen items-center text-black w-full">
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
    )
}

export default Dashboard