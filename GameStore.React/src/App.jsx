import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateGame from "./pages/CreateGame";
import GameList from "./pages/GameList";
import { MainLayout } from "./layouts/MainLayout";
import { useState } from "react";
import './App.css'
import EditGame from "./pages/EditGame";

function App() {
  const [count, setCount] = useState(0)

  return (
    // <BrowserRouter>
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<GameList />} />
        <Route path="/games/new" element={<CreateGame />} />
        <Route path="/games/edit/:id" element={<EditGame></EditGame>} />
      </Route>
    </Routes>
    // </BrowserRouter>
  )
}

export default App
