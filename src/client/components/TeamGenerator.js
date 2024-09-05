import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useForm } from 'react-hook-form';

const playersdef = [
  "1. Joji-D-A",
  "2. Saju-F-A",
  "3. Clitus-D-B",
  "4. Mak-M-B",
  "5. Rejin-M-A",
  "6. Sam-D-B",
];

const otherSet = [
  "1. Thomas-GK-A",
  "2. Aji-M-A",
  "3. Deepu-D-A",
  "4. Reji-D-A",
  "5. Mittu-D-B",
  "6. Jerril-D-A",
  "7. Sreekesh-M-A",
  "8. Veenu-F-B",
  "9. Brone-F-A",
  "10. Frank-F-A",
  "11. Sajin-D-A",
  "12. Aaron-D-A",
  "13. Mahesh-D-A",
  "14. Adin-M-A",
  "15. Shebin-F-A",
  "16. Chinnappa-M-B",
  "17. Felix-GK-A",
  "18. Jacob-M-A",
  "19. Johns-M-A",
  "20. Melvin-D-A",
  "21. Athul-D-A",
  "22. Rafiq-F-A",
  "23. Delvin-F-A",
  "24. Rony-F-B",
  "25. Aaryan-F-A",
  "26. Narinder-GK-A",
  "27. Unnikuttan-M-B",
  "28. Reyhan-M-B",
  "29. Ashik-M-B",
  "30. Sunil-F-B",
];


const TeamGenerator = () => {
  const [inputPlayers, setInputPlayers] = useState(playersdef.join('\n'));
  const [playersList, setPlayersList] = useState([]);
  const [numTeams, setNumTeams] = useState(2);
  const [teamSize, setTeamSize] = useState(7);
  const [teamNames, setTeamNames] = useState({ team1: 'Green', team2: 'Orange', team3: 'Red' });
  const [teams, setTeams] = useState([[], []]);
  const [subs, setSubs] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [activeTab, setActiveTab] = useState("suggested"); // State for active tab

  const { handleSubmit, register, getValues} = useForm();

  const suggestedPlayers = ["Vinod-M-A", "Prakash-GK-A", "Kiran-F-A", "Sharan-M-A", "Noyal-M-A", "AmalP-F-B", "Jibi-D-A", "Arun-D-A", "Sibin-M-B", "Joseph-D-A", "Elon-M-A", "Aby-D-A", "Elias-F-A", "Rajesh-GK-A", "Arun Tom-D-B", "PrinceV-M-A", "George-GK-A", "Sayu-M-A", "Sanju-D-B", "Amal S-M-B", "Vineeth-F-A", "Dravid-M-A", "Jinto-D-A",  "Jayadeep-D-B", "Shine-D-B"];

  // Filter out suggested players already in the default player list
  const filteredPlayers = suggestedPlayers.filter(
    (player) => !playersdef.some((defPlayer) => defPlayer.includes(player))
  );

  const onSubmit = (data) => {
    // Get selected players from the form
    const selectedPlayers = Object.keys(data).filter((player) => data[player]);

    // Create new numbered players to be added
    const newPlayers = selectedPlayers.map((player, index) => {
      const number = playersdef.length + index + 1;
      return `${number}. ${player}`;
    });

    // Update the player list with new players
    setInputPlayers([...playersdef, ...newPlayers].join('\n'));
    setShowPopup(false); // Close popup after adding players
  };


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
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const shuffleAndDistributePlayers = () => {
    const positionCategories = { GK: [], D: [], M: [], F: [] };
    const repeatPlayers = [];
    const nonRepeatPlayers = [];

    playersList.forEach(player => {
      if (player.endsWith('-R')) {
        repeatPlayers.push(player);
      } else {
        const position = player.split('-')[1];
        if (positionCategories[position]) {
          positionCategories[position].push(player);
        }
      }
    });

    const orderedPlayers = [
      ...positionCategories.GK,
      ...positionCategories.D,
      ...positionCategories.M,
      ...positionCategories.F
    ];

    const totalPlayers = numTeams * teamSize;
    const availablePlayers = orderedPlayers.slice(0, totalPlayers);

    const newTeams = Array.from({ length: numTeams }, () => []);

    availablePlayers.forEach((player, index) => {
      newTeams[index % numTeams].push(player);
    });

    const teamIndices = Array.from({ length: numTeams }, (_, i) => i);
    repeatPlayers.forEach((player, index) => {
      let availableTeams = teamIndices.filter(i => i !== index % numTeams);

      if (availableTeams.length === 1) {
        availableTeams = [index % numTeams, availableTeams[0]];
      }

      const [team1, team2] = availableTeams;
      newTeams[team1].push(player);
      newTeams[team2].push(player);
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
    const newNumTeams = Number(e.target.value);
    setNumTeams(newNumTeams);
    setTeams(Array.from({ length: newNumTeams }, () => []));
  };

  const handleTeamSizeChange = (e) => {
    setTeamSize(Number(e.target.value));
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceIndex = source.droppableId === "subs" ? "subs" : parseInt(source.droppableId.replace("team", "")) - 1;
    const destinationIndex = destination.droppableId === "subs" ? "subs" : parseInt(destination.droppableId.replace("team", "")) - 1;

    let sourceList = sourceIndex === "subs" ? [...subs] : [...teams[sourceIndex]];
    let destinationList = destinationIndex === "subs" ? [...subs] : [...teams[destinationIndex]];

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

  const getPlayerClass = (player) => {
    return player.endsWith('-R') ? 'player-highlight' : 'bg-white'; // Apply custom class
  };

  const getDragClass = (isDragging) => {
    return isDragging ? 'border-2 border-purple-500' : ''; // Apply purple border on dragging
  };

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-700 text-gradient">Team Generator</h1>
      <p className="text-sm text-gray-600 mb-2 italic">
        <strong>Format:</strong> Name-Position-Level (e.g., John-GK-A, Mark-D-B, Mat-M-C, Dan-F-B, Ray-F-A-R). Each player on a new line.
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
        <button
          className="bg-gradient-to-r from-blue-500 via-[#cb6ce6] to-[#cb6ce6] text-white py-2 px-4 ml-2 rounded-lg"
          onClick={() => setShowPopup(true)}
        >
          Add more players
        </button>
      </div>

      {/* Team settings section */}
      <div className="flex flex-col md:flex-row md:justify-between mb-6 gap-4">
        <div className="flex flex-col flex-1">
          <label htmlFor="numTeams" className="font-semibold text-lg mb-2">Number of Teams:</label>
          <select
            id="numTeams"
            value={numTeams}
            onChange={handleNumTeamsChange}
            className="border border-gray-300 p-2 rounded-lg"
          >
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <div className="flex flex-col flex-1">
          <label htmlFor="teamSize" className="font-semibold text-lg mb-2">Team Size:</label>
          <input
            id="teamSize"
            type="number"
            value={teamSize}
            onChange={handleTeamSizeChange}
            min="7"
            max="8"
            className="border border-gray-300 p-2 rounded-lg"
          />
        </div>
      </div>

      {/* Team names section */}
      <div className="mb-6">
        <label htmlFor="teamName1" className="font-semibold text-lg mb-2">Team Names:</label>
        <div className="flex flex-col md:flex-row md:space-x-4">
          {[1, 2, 3].map(i => (
            i <= numTeams && (
              <div key={i} className="flex flex-col mb-2 md:mb-0 flex-1">
                <input
                  id={`teamName${i}`}
                  name={`team${i}`}
                  type="text"
                  value={teamNames[`team${i}`]}
                  onChange={handleTeamNameChange}
                  className="border border-gray-300 p-2 rounded-lg"
                  placeholder={`Team ${i}`}
                />
              </div>
            )
          ))}
        </div>
      </div>

      {/* Drag and Drop Context */}
      <p className="text-sm text-gray-600 mb-2 italic">
        <strong>Drag & Drop:</strong> Drag and drop players between teams to make competitive teams !
      </p>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className={`grid ${numTeams === 2 ? 'grid-cols-2' : 'grid-cols-3'} gap-1 w-full`}>
          {teams.map((team, teamIndex) => (
            <Droppable key={`team${teamIndex + 1}`} droppableId={`team${teamIndex + 1}`}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`p-2 border border-gray-300 rounded-lg bg-gray-100 ${teamIndex === numTeams - 1 ? 'lg:col-span-1' : ''}`}
                >
                  <h2 className={`text-center text-2xl font-semibold mb-4 ${getColorClass(teamNames[`team${teamIndex + 1}`])}`}>
                    {teamNames[`team${teamIndex + 1}`]}
                  </h2>
                  {team.map((player, index) => (
                    <Draggable key={player} draggableId={player} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`text-center p-2 mb-2 rounded-lg shadow-sm ${getPlayerClass(player)} ${getDragClass(snapshot.isDragging)} hover:shadow-sm hover:shadow-green-400`}
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
          ))}
          <Droppable droppableId="subs" className="md:col-span-3">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="p-4 border border-gray-300 rounded-lg bg-gray-100"
              >
                <h2 className="text-base sm:text-base font-semibold mb-4 text-gradient">Substitutes</h2>
                {subs.length === 0 ? (
                  <p className="text-gray-500">No substitutes to display</p>
                ) :(
                subs.map((player, index) => (
                  <Draggable key={player} draggableId={player} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`p-2 mb-2 rounded-lg shadow-sm ${getPlayerClass(player)} ${getDragClass(snapshot.isDragging)}`}
                      >
                        {player}
                      </div>
                    )}
                  </Draggable>
                ))
              )}
                {provided.placeholder}

              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
      {/* Player Suggestion Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-96 max-h-96 overflow-y-auto">
            <h3 className="text-xl font-semibold mb-4 text-gradient">Suggested Players</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              {filteredPlayers.map((player) => (
                <div key={player} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    {...register(player)}
                    className="mr-2"
                  />
                  <label className="text-[12px]" >{player}</label>
                </div>
              ))}
              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 rounded mt-4"
              >
                Add to Default List
              </button>
              <button
                type="button"
                className="bg-red-500 text-white py-2 px-4 rounded mt-4 ml-2"
                onClick={() => setShowPopup(false)}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamGenerator;

