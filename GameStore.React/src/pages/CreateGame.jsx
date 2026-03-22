import React, { useEffect, useState } from "react";
import { createGame } from "../services/gameService";
import { useNavigate } from "react-router-dom";
import { getGenres } from "../services/genreService";
import GameForm from "../components/GameForm";
import toast from "react-hot-toast";

const CreateGame = () => {

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
            await createGame(form);
            toast.success('Game successfully created!')
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
    }

    useEffect(() => {
        fetchGenres();
    }, []);

    return (
        <GameForm
            handleChange={handleChange}
            handleForm={handleForm}
            genres={genres}
            form={form}
            errors={errors}
        />
    );
};

export default CreateGame;