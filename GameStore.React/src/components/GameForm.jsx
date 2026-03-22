import React, { useEffect, useState } from "react";

const GameForm = ({ id, handleChange, handleForm, genres, form, errors, isEdit }) => {



    return (
        <div className="bg-white shadow-md rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">{id ? "Update" : "Create"} Game</h2>
            </div>

            <form onSubmit={handleForm} className="space-y-4">
                <div>
                    <label className="block text-gray-700 mb-1" htmlFor="name">
                        Name
                    </label>
                    <input
                        className="w-full px-3 py-2 border border-gray-300 rounded hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700"
                        type="text"
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className="block text-gray-700 mb-1" htmlFor="genre">
                        Genre
                    </label>
                    <select
                        id="genreId"
                        name="genreId"
                        value={form.genreId}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700">
                        <option value="">Select a genre</option>
                        {genres.map(g => (
                            <option key={g.id} value={g.id}>{g.name}</option>
                        ))}

                    </select>
                </div>

                <div>
                    <label className="block text-gray-700 mb-1" htmlFor="price">
                        Price
                    </label>
                    <input
                        className="w-full px-3 py-2 border border-gray-300 rounded hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700"
                        type="number"
                        id="price"
                        name="price"
                        value={form.price}
                        step="0.01"
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className="block text-gray-700 mb-1" htmlFor="releaseDate">
                        Release Date
                    </label>
                    <input
                        className="w-full px-3 py-2 border border-gray-300 rounded hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700"
                        type="date"
                        id="releaseDate"
                        name="releaseDate"
                        value={form.releaseDate}
                        onChange={handleChange}
                    />
                </div>

                <button
                    className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-200"
                    type="submit"
                >
                    {id ? "Update" : "Create"} Game
                </button>

                {Object.keys(errors).length > 0 && (
                    <div className="text-red-500">
                        {Object.entries(errors).map(([field, messages]) => (
                            <p key={field}>
                                {messages.join(", ")}
                            </p>
                        ))}
                    </div>
                )}
            </form>
        </div>
    );
};

export default GameForm;