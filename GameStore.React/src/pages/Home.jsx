import React, { useEffect, useState } from "react";
import GameTable from "../components/GameTable";
import { getGames, deleteGame } from "../services/gameService";
import DeleteModal from "../components/DeleteModal";
import toast from "react-hot-toast";

const Home = () => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [selectedGame, setSelectedGame] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const fetchGames = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await getGames();
            setGames(response);
        } catch (error) {
            console.error("Error fetching games:", error.message);
            setError("Failed to fetch games. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGames();
    }, []);


    const handleDeleteClick = (game) => {
        setSelectedGame(game);
        setIsOpen(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await deleteGame(selectedGame.id);
            setGames(prev => prev.filter(g => g.id !== selectedGame.id));
            toast.success('Game successfully deleted!')

        } catch (error) {
            toast.error("Fail to delete game !")
            console.log(error);
        } finally {
            setIsOpen(false);
            setSelectedGame(null);
        }
    };

    return (
        <>
            {loading && <p>Loading games...</p>}

            {error && <p className="text-red-500">{error}</p>}

            {!loading && !error && (
                <>
                    <GameTable
                        games={games}
                        handleDeleteClick={handleDeleteClick}
                    />

                    <DeleteModal
                        isOpen={isOpen}
                        onClose={() => setIsOpen(false)}
                        onConfirm={handleConfirmDelete}
                        itemName={selectedGame?.name}
                    />
                </>

            )}
        </>
    );
};

export default Home;