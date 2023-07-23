import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';
import './styles';

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
        <EnumProvider>
            <PlayerProvider>
                <BrowserRouter>
                    <Navbar />
                    <Background />

                    <div style={{ width: '100%', height: '100%', overflow: 'auto' }}>
                        {
                            loading === true &&
                            <div>Loading...</div>
                        }
                        {
                            loading === false &&
                            <Routes >
                                <Route path={RouteMap.HOME} element={<Pages.Home />} />
                                <Route exact path={RouteMap.PLAYERS} element={<Pages.Players />} />
                                <Route exact path={RouteMap.SCENARIOS} element={<Pages.Scenarios />} />
                                <Route exact path={DynamicRoutes.SINGLE_SCENARIO} element={<Pages.SingleScenario />} />
                                <Route exact path={DynamicRoutes.SINGLE_CHARACTER} element={<Pages.SingleCharacter />} />

                                <Route exact path={RouteMap.DEBUG} element={<Pages.Debug />} />
                                <Route path='example' element={<Pages.Example />} />
                                <Route path='*' element={<Pages.NotFound />} />
                            </Routes>
                        }
                    </div>
                    <ToastContainer />
                </BrowserRouter>
            </PlayerProvider>
        </EnumProvider>
    );
}