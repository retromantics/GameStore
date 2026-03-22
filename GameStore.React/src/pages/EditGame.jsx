import React, { useEffect, useState } from "react";
import { createGame, editGame, getGame } from "../services/gameService";
import { useNavigate, useParams } from "react-router-dom";
import { getGenres } from "../services/genreService";
import GameForm from "../components/GameForm";
import toast from "react-hot-toast";

const EditGame = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [errors, setErrors] = useState({});
    const [genres, setGenres] = useState([]);
    const [form, setForm] = useState({
        name: "",
        genreId: "",
        price: "",
        releaseDate: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setErrors({});
        setForm(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleForm = async (e) => {
        e.preventDefault();
        setErrors({});

        try {
            await editGame(id, form);
            toast.success('Game successfully edited !')
            navigate("/games");
        } catch (err) {
            setErrors(err.errors || { general: [err.message] });
        } finally {
            //setLoading(false);
        }
    };

    const fetchGenres = async () => {
        try {
            const data = await getGenres();
            setGenres(data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchGame = async () => {
        try {
            const data = await getGame(id);
            setForm({
                name: data.name,
                genreId: data.genreId,
                price: data.price,
                releaseDate: data.releaseDate
            });
        } catch (error) {
            setErrors(error.errors || { general: [error.message] });
        }
    }

    useEffect(() => {
        fetchGenres();
        fetchGame();
    }, []);

    return (
        <GameForm
            id={id}
            handleChange={handleChange}
            handleForm={handleForm}
            genres={genres}
            form={form}
            errors={errors}
        />
    );
};

export default EditGame;