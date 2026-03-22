import React from 'react'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

export const MainLayout = () => {
    return (
        <div className="min-h-screen flex flex-col">

            <Header />

            <main className="container mx-auto p-4 flex-1">
                <Toaster position="top-center" />
                <Outlet />
            </main>

            <Footer />

        </div>
    );
};