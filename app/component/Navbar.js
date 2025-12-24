import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
    return (
        <nav className="bg-blue-600 w-full px-6 py-4 shadow-lg">
            <div className="max-w-6xl mx-auto flex justify-between items-center">

                {/* Logo / Brand Name */}
                <Link href="/">
                    <Image
                        src="/Teer.png"
                        alt="Vercel Logo"
                        className="shadow-lg shadow-white w-[50px h-auto]"
                        width={50}
                        height={50}
                        priority
                    />
                </Link>

                {/* Navigation Buttons */}
                <div className="flex items-center space-x-6">
                    <Link href="/">
                        <button className="text-white hover:text-black font-medium transition-colors cursor-pointer">
                            Home
                        </button>
                    </Link>
                    <Link href="/login">
                        <button className="bg-white text-blue-600 px-5 py-2 rounded-full font-bold hover:bg-red-800 hover:text-white cursor-pointer transition-all shadow-md active:scale-95">
                            Login
                        </button>
                    </Link>
                </div>

            </div>
        </nav>
    );
};

export default Navbar;