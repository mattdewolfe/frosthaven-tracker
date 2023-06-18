import React, { useState } from "react";
import Card from 'react-bootstrap/Card';
import bannerman from '../assets/581588-Armor-Shield.jpg'


const Players = ({name = "unknown", charclass = "n/a", charname = "n/a", level = 0}) => {
    return (
        <>
            <h1>Name: {name}</h1>
            <h2>Character class: {charclass}</h2>
            <h2>Character: {charname}</h2>
            <h3>Level: {level}</h3>

        </>
    )
}

const PlayersPage = () => {
    return (
        <div class="text-primary">
            <div>
                <h1 className="display-4 text-center py-5 text-danger">The Ravengers!</h1>   
            </div>
            <div class="row my-5 align-items-center justify-content-center">
                <div className="div col-8 col-lg-4 col-xl-3">
                    <div className="div card border-0">
                        <div className="div card-body text-center py-4">
                            <div className="h4 card-title display-3">
                            Matt
                            </div>
                            <div className="display-6 card subtitle my2 border-0">
                               Andrew the Bannerspear   
                            </div>
                            <p class="card-text text-muted pt-4">Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                             Laboriosam at facere suscipit, sunt repudiandae eaque nemo quae saepe ex temporibus?
                             </p>
                        </div>
                    </div>
                
                </div>
                <div className="div col-8 col-lg-4 col-xl-3">
                    <div className="div card border-0">
                        <div className="div card-body text-center py-4">
                            <div className="h4 card-title display-3">
                            Gord
                            </div>
                            <div className="display-6 card subtitle my2 border-0">
                               Trashcan the Drifter   
                            </div>
                            <p class="card-text text-muted pt-4">Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                             Laboriosam at facere suscipit, sunt repudiandae eaque nemo quae saepe ex temporibus?
                             </p>
                        </div>
                    </div>
                
                </div>
                <div className="div col-8 col-lg-4 col-xl-3">
                    <div className="div card border-0">

                        <div className="div card-body text-center py-4">
                            <div className="h4 card-title display-3">
                            Mark
                            </div>
                            <div className="display-6 card subtitle my2 border-0">
                               Gimpy the Frozenfist   
                            </div>
                            <p class="card-text text-muted pt-4">Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                             Laboriosam at facere suscipit, sunt repudiandae eaque nemo quae saepe ex temporibus?
                             </p>
                        </div>
                    </div>
                
                </div>
            </div>
                    
            <h4>example placeholders</h4>
            <Players name={'Matthew'} charname={'Not Andrew'} level={'3'} />
            <Players name={'Gord'} charname={'Def not Andrew'} level={'5'} />
            <Players/>
            
        </div >
    );
};

export default PlayersPage;