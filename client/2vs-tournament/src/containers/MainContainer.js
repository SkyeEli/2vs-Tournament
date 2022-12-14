import React, { useEffect, useState } from 'react';
import './MainContainer.css';
import HomePageContainer from './HomePageContainer';
import TournamentContainer from './TournamentContainer'
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import Header from '../components/Header/Header';
import PlayerDetail from '../components/players/PlayerDetail';
import Request from "../helpers/request";
import ShowTournamentContainer from './ShowTournament';
import About from '../components/About/About';




const MainContainer = () => {

  const [players, setPlayers] = useState([])
  const [selectedPlayers, setSelectedPlayers] = useState([])

  const [round16, setRound16] = useState([{ name: "" }, { name: "" }, { name: "" }, { name: "" }, { name: "" }, { name: "" }, { name: "" }, { name: "" }, { name: "" }, { name: "" }, { name: "" }, { name: "" }, { name: "" }, { name: "" }, { name: "" }, { name: "" }])
  const [quarterFinalists, setQurterFinalists] = useState([{ name: "" }, { name: "" }, { name: "" }, { name: "" }, { name: "" }, { name: "" }, { name: "" }, { name: "" }])
  const [finalists, setFinalists] = useState([{ name: "" }, { name: "" }])
  const [semiFinalists, setSemiFinalists] = useState([{ name: "" }, { name: "" }, { name: "" }, { name: "" }])



  useEffect(() => {
    getPlayers()
  }, [])

  const getPlayers = () => {
    fetch("http:///localhost:8080/api/players")
      .then(res => res.json())
      .then(playersData => setPlayers(playersData))
  }

  const createPlayer = (player) => {
    console.log("create player called", player);
    const request = new Request();
    request.post("http://localhost:8080/api/players", player)
      .then(() => window.location = '/tournament')
  }

  const handleDelete = (id) => {
    const request = new Request();
    const url = "http://localhost:8080/api/players/" + id;
    request.delete(url).then(() => {
      window.location = '/tournament';
    });
  }

  const findPlayerById = (id) => {
    return players.find((player) => {
      return player.id === parseInt(id);
    })
  }

  const PlayerDetailWrapper = () => {
    const { id } = useParams();
    let foundPlayer = findPlayerById(id)
    return <PlayerDetail player={foundPlayer} handleDelete={handleDelete} />;
  }

  const addPlayer = (player) => {
    let selectedPlayersCopy = [...selectedPlayers];
    selectedPlayersCopy.push(player)
    let filteredSelectedPlayers = selectedPlayersCopy.filter(player => player.selected === true);
    setSelectedPlayers(filteredSelectedPlayers)
  }

  const populateTournament = () => {


    const BYE = { name: "BYE" }
    const selectedPlayersRandom = selectedPlayers.sort(() => Math.random() - 0.5)

    let data = {
      "name": "React Test",
      "noOfRounds": 2,
      "players": selectedPlayers
    }

    const request = new Request();
    request.post("http://localhost:8080/api/tournaments", data)

    if (selectedPlayers.length == 2) {

      setFinalists(selectedPlayersRandom)
      return
    }
    if (selectedPlayers.length < 4) {
      let c = 4 - selectedPlayers.length
      for (let i = 0; i < c; i++) {
        selectedPlayers.splice(i * 2, 0, BYE)
      }
    }
    if (selectedPlayers.length == 4) {
      setSemiFinalists(selectedPlayersRandom)
      return
    }
    if (selectedPlayers.length < 8) {
      let c = 8 - selectedPlayers.length
      for (let i = 0; i < c; i++) {
        selectedPlayers.splice(i * 2, 0, BYE)
      }
    }
    if (selectedPlayers.length == 8) {

      setQurterFinalists(selectedPlayersRandom)
      return
    }

    if (selectedPlayers.length < 16) {
      let c = 16 - selectedPlayers.length
      for (let i = 0; i < c; i++) {
        selectedPlayers.splice(i * 2, 0, BYE)
      }
    }
    if (selectedPlayers.length == 16) {


      setRound16(selectedPlayersRandom)
      return
    }

    return
  }

  const getfinalists = (winner) => {

    const finalistsCopy = [...finalists]
    for (let i = 0; i < finalistsCopy.length; i++) {
      if (finalistsCopy[i].name === winner.name) {
        return
      }
      if (finalistsCopy[i].name === "") {
        finalistsCopy[i] = winner
        setFinalists(finalistsCopy)
        return
      }
    }
    return
  }

  const getSemiFinalists = (winner) => {
    const semiFinalistsCopy = [...semiFinalists]
    for (let i = 0; i < semiFinalistsCopy.length; i++) {
      if (semiFinalistsCopy[i].name === winner.name) {
        return
      }
      if (semiFinalistsCopy[i].name === "") {
        semiFinalistsCopy[i] = winner
        setSemiFinalists(semiFinalistsCopy)
        return
      }
    }
    return

  }


  const getQuarterFinalists = (winner) => {
    const quarterFinalistsCopy = [...quarterFinalists]

    for (let i = 0; i < quarterFinalistsCopy.length; i++) {
      if (quarterFinalistsCopy[i].name === winner.name) {
        return
      }
      if (quarterFinalistsCopy[i].name === "") {
        quarterFinalistsCopy[i] = winner
        setQurterFinalists(quarterFinalistsCopy)
        return
      }
    }
    return

  }


  function saveTournament(winner) {
    console.log("This is save tournament")
    console.log(selectedPlayers)
    console.log(quarterFinalists)
    console.log(semiFinalists)
    console.log(finalists)
    let data = {
      "name": "React Test",
      "noOfRounds": 2
    }
    const request = new Request();
    request.post("http://localhost:8080/api/tournaments", data)
  }

  return (
    <>

      <Router>
      <Header />

        <Routes>
          {/*  ___________________________________________HOME______________________________________________________ */}
          <Route path="/" element={

            <HomePageContainer />} />


          {/*  ___________________________________________TOURNAMENT_________________________________________________*/}

          <Route path='/tournament' element={

            <TournamentContainer
              players={players}
              onCreate={createPlayer}
              addPlayer={addPlayer}
              populateTournament={populateTournament} />} />


          <Route path="/tournament/show" element={<ShowTournamentContainer selectedPlayers={selectedPlayers} finalists={finalists}
            semiFinalists={semiFinalists} quarterFinalists={quarterFinalists} getSemiFinalists={getSemiFinalists}
            getfinalists={getfinalists} saveTournament={saveTournament} round16={round16} getQuarterFinalists={getQuarterFinalists} />} />


          {/*  ___________________________________________PLAYER_________________________________________________*/}

          <Route path="/players/:id" element={

            <PlayerDetailWrapper />} />

          {/*  ___________________________________________ABOUT_________________________________________________*/}


          <Route path="/about" element={
            <About />} />

        </Routes>
      </Router>
    </>
  )

}

export default MainContainer;