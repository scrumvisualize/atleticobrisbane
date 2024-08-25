import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const playersdef = [
  "1. Joji-D-A",
  "2. Saju-F-A",
  "3. Clitus-D-B",
  "4. Vinod-M-A",
  "5. Mak-M-B",
  "6. Sam-D-B",
  "14. Prakash-GK-A",
  "8. Sanju-D-B",
  "9. Sayu-M-A",
  "10. Noyal-M-A",
  "11. AmalP-F-B",
  "12. Kiran-F-A",
  "13. Sharan-M-A",
  "7. Joseph-D-A",
  "15. Rejin-M-A",
  "16. George-GK-A",
  "17. Elon-M-A",
  "18. Elias-F-A",
  "19. PrinceVaz-M-A",
  "20. Rajesh-GK-A",
  "21. Jayadeep-D-B",
  "22. Jibi-D-A",
  "23. ArunT-D-B",
];

const TeamGenerator = () => {
  const [inputPlayers, setInputPlayers] = useState(playersdef.join('\n'));
  const [playersList, setPlayersList] = useState([]);
  const [numTeams, setNumTeams] = useState(2);
  const [teamSize, setTeamSize] = useState(7);
  const [teamNames, setTeamNames] = useState({ team1: 'Team 1', team2: 'Team 2', team3: 'Team 3' });
  const [teams, setTeams] = useState([[], []]);
  const [subs, setSubs] = useState([]);

  useEffect(() => {
    if (playersList.length > 0) {
      shuffleAndDistributePlayers();
    }
  }, [playersList, numTeams, teamSize]);

  const handleInputChange = (e) => {
    setInputPlayers(e.target.value);
  };


  const handleAddPlayers = () => {
  
    const parsedPlayers = inputPlayers
      .split('\n')
      .map(player => player.trim())
      .filter(player => player)
      .map(player => player.replace(/^\d+\.\s*|\s*(-A|-B|-C)?$/g, ''));

    setPlayersList(parsedPlayers);
    //setInputPlayers('');
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const shuffleAndDistributePlayers = () => {
    const players = [...playersList];
    shuffleArray(players);

    const positionGroups = {
      GK: [],
      D: [],
      M: [],
      F: [],
    };

    players.forEach(player => {
      const position = player.split('-')[1];
      positionGroups[position] = positionGroups[position] || [];
      positionGroups[position].push(player);
    });

    const orderedPlayers = [
      ...positionGroups.GK,
      ...positionGroups.D,
      ...positionGroups.M,
      ...positionGroups.F
    ];

    const totalPlayers = numTeams * teamSize;
    const newTeams = Array.from({ length: numTeams }, () => []);
    const availablePlayers = orderedPlayers.slice(0, totalPlayers);

    availablePlayers.forEach((player, index) => {
      newTeams[index % numTeams].push(player);
    });

    const updatedSubs = orderedPlayers.length > totalPlayers
      ? orderedPlayers.slice(totalPlayers)
      : [];

    setTeams(newTeams);
    setSubs(updatedSubs);
  };

  const handleTeamNameChange = (e) => {
    const { name, value } = e.target;
    setTeamNames(prev => ({ ...prev, [name]: value }));
  };

  const handleNumTeamsChange = (e) => {
    setNumTeams(Number(e.target.value));
  };

  const handleTeamSizeChange = (e) => {
    setTeamSize(Number(e.target.value));
  };

  // const onDragEnd = (result) => {
  //   const { source, destination } = result;
  //   if (!destination) return;

  //   const { droppableId: sourceTeamId } = source;
  //   const { droppableId: destTeamId } = destination;

  //   if (sourceTeamId === destTeamId) return;

  //   const player = result.draggableId;
  //   const sourceTeamIndex = parseInt(sourceTeamId.replace('team', ''), 10) - 1;
  //   const destTeamIndex = parseInt(destTeamId.replace('team', ''), 10) - 1;

  //   const updatedTeams = [...teams];
  //   updatedTeams[sourceTeamIndex] = updatedTeams[sourceTeamIndex].filter(p => p !== player);
  //   updatedTeams[destTeamIndex].splice(destination.index, 0, player);

  //   setTeams(updatedTeams);
  // };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceIndex = source.droppableId === "subs" ? "subs" : parseInt(source.droppableId.replace("team", "")) - 1;
    const destinationIndex = destination.droppableId === "subs" ? "subs" : parseInt(destination.droppableId.replace("team", "")) - 1;

    let sourceList = sourceIndex === "subs" ? [...subs] : [...teams[sourceIndex]];
    let destinationList = destinationIndex === "subs" ? [...subs] : [...teams[destinationIndex]];

    // Moving within the same list (reordering)
    if (source.droppableId === destination.droppableId) {
        const [movedItem] = sourceList.splice(source.index, 1);
        sourceList.splice(destination.index, 0, movedItem);

        if (sourceIndex === "subs") {
            setSubs(sourceList);
        } else {
            const updatedTeams = [...teams];
            updatedTeams[sourceIndex] = sourceList;
            setTeams(updatedTeams);
        }
    } else {
        // Moving to a different list
        const [movedItem] = sourceList.splice(source.index, 1);
        destinationList.splice(destination.index, 0, movedItem);

        if (sourceIndex === "subs") {
            setSubs(sourceList);
            const updatedTeams = [...teams];
            updatedTeams[destinationIndex] = destinationList;
            setTeams(updatedTeams);
        } else if (destinationIndex === "subs") {
            setSubs(destinationList);
            const updatedTeams = [...teams];
            updatedTeams[sourceIndex] = sourceList;
            setTeams(updatedTeams);
        } else {
            const updatedTeams = [...teams];
            updatedTeams[sourceIndex] = sourceList;
            updatedTeams[destinationIndex] = destinationList;
            setTeams(updatedTeams);
        }
    }
};

  const getColorClass = (teamName) => {
    if (teamName.toLowerCase().includes('green')) {
      return 'text-green-400';
    }
    if (teamName.toLowerCase().includes('red')) {
      return 'text-red-500';
    }

    if (teamName.toLowerCase().includes('orange')) {
      return 'text-orange-400';
    }
    if (teamName.toLowerCase().includes('black')) {
      return 'text-black';
    }
    return 'text-blue-400'; // Default color
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-700">Team Generator</h1>
      <p className="text-sm text-gray-600 mb-2 italic">
        <strong >Format:</strong> Name-Position-Level (ex. John-GK-A, Mark-D-B, Mat-M-C, Dan-F-B, Ray-F-A-R). Each player on a new line.
      </p>
      <div className="mb-6">
        <textarea
          value={inputPlayers}
          onChange={handleInputChange}
          placeholder="Enter players (e.g., 1. Joji-D-A)"
          rows={8}
          className="w-full border border-gray-300 p-3 rounded-lg shadow-md"
        />
        <button
          onClick={handleAddPlayers}
          className="mt-2 bg-blue-600 text-white p-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Generate Teams
        </button>
      </div>

      <div className="flex flex-col md:flex-row md:justify-between mb-6 gap-4">
        <div className="flex flex-col flex-1">
          <label htmlFor="numTeams" className="font-semibold text-lg mb-2">Number of Teams:</label>
          <select
            id="numTeams"
            value={numTeams}
            onChange={handleNumTeamsChange}
            className="border border-gray-300 p-2 rounded-lg shadow-sm"
          >
            <option value={2}>2</option>
            <option value={3}>3</option>
          </select>
        </div>
        <div className="flex flex-col flex-1">
          <label htmlFor="teamSize" className="font-semibold text-lg mb-2">Team Size:</label>
          <select
            id="teamSize"
            value={teamSize}
            onChange={handleTeamSizeChange}
            className="border border-gray-300 p-2 rounded-lg shadow-sm"
          >
            <option value={7}>7-a-side</option>
            <option value={8}>8-a-side</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:justify-between mb-6 gap-4">
        <div className="flex flex-col flex-1">
          <label htmlFor="team1Name" className="text-center font-semibold text-lg mb-2">Team 1</label>
          <input
            type="text"
            id="team1Name"
            name="team1"
            value={teamNames.team1}
            onChange={handleTeamNameChange}
            className="border border-gray-300 p-2 rounded-lg shadow-sm"
          />
        </div>
        <div className="flex flex-col flex-1">
          <label htmlFor="team2Name" className="text-center font-semibold text-lg mb-2">Team 2</label>
          <input
            type="text"
            id="team2Name"
            name="team2"
            value={teamNames.team2}
            onChange={handleTeamNameChange}
            className="border border-gray-300 p-2 rounded-lg shadow-sm"
          />
        </div>
        {numTeams === 3 && (
          <div className="flex flex-col flex-1">
            <label htmlFor="team3Name" className="text-center font-semibold text-lg mb-2">Team 3</label>
            <input
              type="text"
              id="team3Name"
              name="team3"
              value={teamNames.team3}
              onChange={handleTeamNameChange}
              className="border border-gray-300 p-2 rounded-lg shadow-sm"
            />
          </div>
        )}
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex flex-wrap md:flex-nowrap justify-between gap-6">
          {teams.map((team, index) => (
            <Droppable droppableId={`team${index + 1}`} key={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-gray-50 border border-gray-300 rounded-lg p-4 w-full md:w-1/3"
                >
                  <h2 className={`text-center text-2xl font-bold mb-4 ${getColorClass(teamNames[`team${index + 1}`])}`}>{teamNames[`team${index + 1}`]}</h2>
                  {team.length > 0 ? (
                    team.map((player, i) => (
                      <Draggable key={player} draggableId={player} index={i}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="p-2 mb-2 bg-white border border-gray-300 rounded-lg shadow-sm"
                          >
                            {player}
                          </div>
                        )}
                      </Draggable>
                    ))
                  ) : (
                    <p className="text-gray-500">No players</p>
                  )}
                  {provided.placeholder}

                  {index === teams.length - 1 && subs.length > 0 && (
                    <div className="mt-6">
                      <Droppable droppableId="subs" key={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="bg-gray-100 border border-gray-300 rounded-lg p-4"
                          >
                            <h3 className="text-xl font-semibold mb-2 text-blue-500">Substitutes</h3>
                            {subs.map((player, i) => (
                              <Draggable key={player} draggableId={player} index={i}>
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="p-2 mb-2 bg-gray-200 border border-gray-300 rounded-lg shadow-sm"
                                  >
                                    {player}
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </div>
                  )}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default TeamGenerator;