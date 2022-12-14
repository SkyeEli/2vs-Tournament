import React from "react";
import Game from "../components/Game/Game";


const Round16 = ({ players, getQuarterFinalists }) => {


    return (
        <div id='round'>

            <Game name={"Round of 16"} player1={players[0]} player2={players[1]} getWinners={getQuarterFinalists} />
            <Game name={"Round of 16"} player1={players[2]} player2={players[3]} getWinners={getQuarterFinalists} />
            <Game name={"Round of 16"} player1={players[4]} player2={players[5]} getWinners={getQuarterFinalists} />
            <Game name={"Round of 16"} player1={players[6]} player2={players[7]} getWinners={getQuarterFinalists} />
            <Game name={"Round of 16"} player1={players[8]} player2={players[9]} getWinners={getQuarterFinalists} />
            <Game name={"Round of 16"} player1={players[10]} player2={players[11]} getWinners={getQuarterFinalists} />
            <Game name={"Round of 16"} player1={players[12]} player2={players[13]} getWinners={getQuarterFinalists} />
            <Game name={"Round of 16"} player1={players[14]} player2={players[15]} getWinners={getQuarterFinalists} />
        </div>
    )


}

export default Round16

    ;