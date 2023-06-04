import React, { useState } from "react";


const Players = ({name = "unknown", charname = "n/a", level = 0}) => {
    return (
        <>
            <h1>Name: {name}</h1>
            <h2>Character: {charname}</h2>
            <h3>Level: {level}</h3>
        </>
    )
}

const PlayersPage = () => {
    return (
        <div>
            <h3>The Players Page</h3>
            <h3>now to figure out how to navigate here and not open a new tab</h3>
            <h4>example placeholders</h4>
            <Players name={'Matthew'} charname={'Not Andrew'} level={'3'} />
            <Players name={'Gord'} charname={'Def not Andrew'} level={'5'} />
            <Players/>
        </div >
    );
};

export default PlayersPage;