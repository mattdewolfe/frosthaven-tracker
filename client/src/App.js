import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';
import './styles';

import bonfire3 from './assets/bonfire3.gif';

import Pages from './pages';
import { RouteMap, DynamicRoutes } from './routes';
import { Background, Navbar } from './components/core';
import EnumProvider from './contexts/EnumProvider';
import PlayerProvider from './contexts/PlayerProvider';
import { Subs, globalObserver } from './utils/Observers';

export function App() {

    // We will use this when we have initial data to fetch.
    const [loading, setLoading] = useState(false);

    const handleToast = (payload) => {
        const { message } = payload;
        toast(message, { autoClose: 1250, ...payload });
    }

    useEffect(() => {
        const toastSub = globalObserver.subscribe(Subs.REQUEST_TOAST_MESSAGE, handleToast);

        return () => {
            toastSub.remove();
        }
    }, []);

    return (
        <BrowserRouter>
            <div style={{
                width: '100vw',
                height: '100vh',
            }}>
                <Background />
                <Navbar />

                <div style={{
                    width: '100%',
                    background: 'transparent',
                    overflow: 'hidden',
                    marginTop: 60,
                }}>
                    {
                        loading === true &&
                        <div>Loading...</div>
                    }
                    {
                        loading === false &&
                        <Routes >
                            <Route path={RouteMap.HOME} element={<Pages.Home />} />
                            <Route path='*' element={<Pages.NotFound />} />
                        </Routes>
                    }
                </div>
            </div>
            <ToastContainer />
        </BrowserRouter>
    );
}