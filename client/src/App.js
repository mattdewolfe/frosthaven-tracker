import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/global.css';

import Pages from './pages';
import RouteMap from './routes';
import { Background, Navbar } from './components';
import EnumProvider from './contexts/EnumProvider';
import PlayerProvider from './contexts/PlayerProvider';

export function App() {

    // We will use this when we have initial data to fetch.
    const [loading, setLoading] = useState(false);

    return (
        <EnumProvider>
            <PlayerProvider>
                <BrowserRouter>
                    <Navbar />
                    <Background />
                    <div style={{ width: '100%', height: '100%' }}>
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
                                <Route path='example' element={<Pages.Example />} />
                                <Route exact path={RouteMap.DEBUG} element={<Pages.Debug />} />
                                <Route path='*' element={<Pages.NotFound />} />
                            </Routes>
                        }
                    </div>
                </BrowserRouter>
            </PlayerProvider>
        </EnumProvider>
    );
}