import React from 'react';
import { Link } from 'react-router-dom';

export const Header = () => {
    return (
        <nav className="bg-gray-800 text-white shadow-md">
            <div className="container px-4 py-3 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Game Store Api</h1>
                <ul className="flex space-x-6">
                    <Link to="/" className="hover:text-blue-400">Home</Link>
                </ul>
            </div>
        </nav>
    );
};
