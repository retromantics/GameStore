import React from 'react';
import { Link } from 'react-router-dom';

const GameTable = ({ games, isOpen, setIsOpen, handleDeleteClick, handleConfirmDelete, selectedGame }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-4">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Game List</h2>

                <Link
                    to="/games/new"
                    className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                    Add New Game
                </Link>
            </div>

            {/* Table */}
            <table className="table-auto w-full border-collapse border border-gray-200">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Genre</th>
                        <th className="px-4 py-2">Price</th>
                        <th className="px-4 py-2">Release Date</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {games.map((game, index) => (
                        <tr
                            key={game.id}
                            className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'} hover:bg-gray-300`}
                        >
                            <td className="px-4 py-2 text-gray-700">{game.name}</td>
                            <td className="px-4 py-2 text-gray-700">{game.genre}</td>
                            <td className="px-4 py-2 text-gray-700">${game.price}</td>
                            <td className="px-4 py-2 text-gray-700">{game.releaseDate}</td>

                            <td className="px-4 py-2 flex space-x-2">
                                <Link
                                    to={`/games/edit/${game.id}`}
                                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                                >
                                    Edit
                                </Link>

                                <button
                                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                    onClick={() => handleDeleteClick(game)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default GameTable;