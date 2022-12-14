import React, { useState } from 'react';
import "./PlayerSelection.css"
import Player from './Player';

import { Link } from 'react-router-dom';


const PlayerSelection = ({ players, onCreate, addPlayer, populateTournament }) => {

    const [statePlayer, setStatePlayer] = useState(
        {
            name: "",
        }
    )

    const allPlayers = players.map((player, index) => {

        return (<div className='player-btns'>
            <Player
                player={player}
                key={player.id}
                addPlayer={addPlayer} />
        </div>)
    })

    const handleChange = function (event) {
        let propertyName = event.target.name;
        let copiedPlayer = { ...statePlayer }
        copiedPlayer[propertyName] = event.target.value;
        setStatePlayer(copiedPlayer)
    }

    const handleSubmit = function (event) {
        event.preventDefault();
        onCreate(statePlayer)
    }

    const handleClick = () => {
        console.log("test")
        populateTournament()
    }

    return (
        <>

            <h3>Select Players:</h3>

            <div id='conatainer'>
                {allPlayers}
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    id='input-name-box'
                    className="input-box"
                    type="text"
                    placeholder="Enter Player Name"
                    name="name"
                    value={statePlayer.name}
                    onChange={handleChange}
                    required minLength="1" />
                <button id='button-general' className='add-btn' type="add-new-player">Add</button>
            </form>
            <Link to="/tournament/show"><button id='button-general' onClick={handleClick} >Generate Tournament</button></Link>
        </>
    )
}

export default PlayerSelection;