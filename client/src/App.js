import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Pages from "./pages";
import RouteMap from "./routes";

import "./styles/global.css";

export function App() {

    // We will use this when we have initial data to fetch.
    const [loading, setLoading] = useState(false);

    return (
        <BrowserRouter>
            <div style={{ width: "100%", height: "100%" }}>
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
                        <Route exact path={RouteMap.DEBUG} element={<Pages.Debug />} />
                        <Route element={<Pages.NotFound />} />
                    </Routes>
                }
            </div>
        </BrowserRouter>
    );
}