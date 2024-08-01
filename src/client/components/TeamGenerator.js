import React, { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';

const TeamGenerator = () => {
  const [input, setInput] = useState('');
  const [team1, setTeam1] = useState([]);
  const [team2, setTeam2] = useState([]);
  const [team3, setTeam3] = useState([]);
  const [subs, setSubs] = useState([]);
  const [savedTeams, setSavedTeams] = useState(JSON.parse(localStorage.getItem('savedTeams')) || []);
  const [numTeams, setNumTeams] = useState(2);
  const [playersPerSide, setPlayersPerSide] = useState(7);
  const [error, setError] = useState(null);
  const captureRef = useRef(null);

  useEffect(() => {
    localStorage.removeItem('savedTeams');
  }, []);

  const sanitizeInput = (input) => {
    return input.replace(/[^a-zA-Z0-9-.\n\s]/g, '');
  };

  const handleInputChange = (e) => {
    const sanitizedInput = sanitizeInput(e.target.value);
    setInput(sanitizedInput);
  };

  const handleNumTeamsChange = (e) => {
    setNumTeams(Number(e.target.value));
  };

  const handlePlayersPerSideChange = (e) => {
    setPlayersPerSide(Number(e.target.value));
  };

  const splitTeams = () => {
    if (!input.trim()) {
      setError('The input field cannot be empty. Please enter player names!');
      return;
    }

    const players = input
      .split('\n')
      .map(player => player.trim())
      .filter(player => player)
      .map(player => player.replace(/^\d+\.\s*/, ''));

    // Extract goalkeepers and outfield players
    const goalkeepers = players.filter(player => player.includes('GK'));
    const outfieldPlayers = players.filter(player => !player.includes('GK'));

    // Identify repeat players (marked with -R)
    const repeatPlayers = players.filter(player => player.includes('-R')).map(player => player.replace('-R', ''));
    const uniqueRepeatPlayers = [...new Set(repeatPlayers)];

    // Remove the repeat players from the list if exists
    const cleanedPlayers = players.filter(player => !player.includes('-R'));

    // Calculate the total number of required players
    const totalRequiredPlayers = playersPerSide * numTeams;
    const totalAvailablePlayers = cleanedPlayers.length + uniqueRepeatPlayers.length;

    // Check if we have enough players, including the repeat player
    if (totalAvailablePlayers < 20) {
      setError(`Insufficient players. You need at least ${totalRequiredPlayers} players for ${numTeams} teams.`);
      return;
    }

    // Initialize teams and substitutes
    const mainTeams = Array.from({ length: numTeams }, () => []);
    const shuffledOutfieldPlayers = outfieldPlayers.sort(() => Math.random() - 0.5);
    const availablePlayers = [...cleanedPlayers, ...uniqueRepeatPlayers];

    // Distribute goalkeepers among teams
    const usedGoalkeepers = new Set();
    goalkeepers.forEach(gk => {
      if (usedGoalkeepers.size < numTeams) {
        for (let i = 0; i < numTeams; i++) {
          if (mainTeams[i].filter(player => player.includes('GK')).length === 0 && !usedGoalkeepers.has(gk)) {
            mainTeams[i].push(gk);
            usedGoalkeepers.add(gk);
            break;
          }
        }
      }
    });

    // Distribute outfield players among teams
    let currentTeamIndex = 0;
    shuffledOutfieldPlayers.forEach(player => {
      if (mainTeams[currentTeamIndex].length < playersPerSide) {
        mainTeams[currentTeamIndex].push(player);
      }
      currentTeamIndex = (currentTeamIndex + 1) % numTeams;
    });

    // Ensure repeat players are placed correctly in the white team
    const whiteTeamIndex = numTeams === 3 ? 2 : 1; // Assuming white team is the last team if there are 3 teams
    const whiteTeamPlayers = new Set(mainTeams[whiteTeamIndex]);
    uniqueRepeatPlayers.forEach(player => {
      if (!whiteTeamPlayers.has(player)) {
        if (mainTeams[whiteTeamIndex].length < playersPerSide) {
          mainTeams[whiteTeamIndex].push(player);
          whiteTeamPlayers.add(player);
        }
      }
    });

    // Collect all players currently in teams
    const allPlayersInTeams = mainTeams.flat();
    // Calculate substitutes
    const substitutePlayers = availablePlayers.filter(player => !allPlayersInTeams.includes(player));

    setTeam1(mainTeams[0]);
    setTeam2(mainTeams[1]);
    if (numTeams === 3) setTeam3(mainTeams[2]);
    setSubs(substitutePlayers);
    setError(null);

    const newSavedTeams = [...savedTeams, { team1: mainTeams[0], team2: mainTeams[1], team3: mainTeams[2] || [], subs }];
    setSavedTeams(newSavedTeams);
    localStorage.setItem('savedTeams', JSON.stringify(newSavedTeams));
  };

  const sortPlayers = (players) => {
    return players.sort((a, b) => {
      const [aCategory, aLevel] = a.split('-').slice(1);
      const [bCategory, bLevel] = b.split('-').slice(1);

      const categoryOrder = ['GK', 'D', 'M', 'F'];
      const levelOrder = ['A', 'B', 'C', 'D'];

      if (aCategory !== bCategory) {
        return categoryOrder.indexOf(aCategory) - categoryOrder.indexOf(bCategory);
      }

      return levelOrder.indexOf(aLevel) - levelOrder.indexOf(bLevel);
    });
  };

  const downloadImage = () => {
    if (captureRef.current) {
      html2canvas(captureRef.current).then(canvas => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'teams.png';
        link.click();
      });
    }
  };

  const deleteSavedTeam = (index) => {
    const newSavedTeams = savedTeams.filter((_, i) => i !== index);
    setSavedTeams(newSavedTeams);
    localStorage.setItem('savedTeams', JSON.stringify(newSavedTeams));
  };

  const loadSavedTeam = (index) => {
    const team = savedTeams[index];
    setTeam1(team.team1);
    setTeam2(team.team2);
    setTeam3(team.team3);
    setSubs(team.subs);
  };

  return (
    <div className="bg-gradient-to-r from-blue-100 to-pink-100 w-full min-h-[600px]">
      <div className="mb-2 bg-cover bg-center bg-no-repeat h-[120px]" style={{ backgroundImage: "url('images/teamgen.png')", backgroundPosition: 'center 80%' }}></div>
      <div className="text-center font-semibold text-xs">
        <h3>Home &#8594; Team Generator</h3>
      </div>

      <div className="w-full max-w-4xl mx-auto p-4">
        <textarea
          value={input}
          onChange={handleInputChange}
          className="w-full h-40 p-2 border rounded bg-white shadow-sm"
          placeholder="Enter player details. Format: Name-Position-Level (e.g., John-GK-A, Mark-D-B). Each player on a new line."
        />
        <div className="flex flex-col md:flex-row mt-4 space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-bold mb-2">Number of Teams:</label>
            <select value={numTeams} onChange={handleNumTeamsChange} className="w-full p-2 border rounded bg-white shadow-sm">
              <option value={2}>2</option>
              <option value={3}>3</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-bold mb-2">Players per Side:</label>
            <select value={playersPerSide} onChange={handlePlayersPerSideChange} className="w-full p-2 border rounded bg-white shadow-sm">
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
            </select>
          </div>
        </div>
        <button
          onClick={splitTeams}
          className="bg-blue-500 text-white py-2 px-4 rounded mt-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Generate Teams
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {team1.length > 0 && (
          <div className="mt-6" ref={captureRef}>
            <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
              <div className="flex-1 p-4 bg-white rounded shadow-md">
                <div className="text-center bg-[#d18df0]">
                  <h2 className="text-xl text-[#f00e52] font-bold p-2 mb-4">Team Red</h2>
                </div>
                <ul className="list-none p-0 m-0 space-y-2">
                  {sortPlayers(team1).map((player, index) => (
                    <li
                      key={index}
                      className="flex items-center p-2 bg-gray-100 rounded hover:bg-gray-200 transition duration-300 ease-in-out"
                    >
                      <span className="text-gray-800 text-base font-medium">{player}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex-1 p-4 bg-white rounded shadow-md">
                <div className="text-center bg-[#d18df0]">
                  <h2 className="text-xl text-[#111112] font-bold p-2 mb-4">Team Black</h2>
                </div>
                <ul className="list-none p-0 m-0 space-y-2">
                  {sortPlayers(team2).map((player, index) => (
                    <li
                      key={index}
                      className="flex items-center p-2 bg-gray-100 rounded hover:bg-gray-200 transition duration-300 ease-in-out"
                    >
                      <span className="text-gray-800 text-base font-medium">{player}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {numTeams === 3 && (
                <div className="flex-1 p-4 bg-white rounded shadow-md">
                  <div className="text-center bg-[#d18df0]">
                    <h2 className="text-xl text-[#ffffff] font-bold p-2 mb-4">Team White</h2>
                  </div>
                  <ul className="list-none p-0 m-0 space-y-2">
                    {sortPlayers(team3).map((player, index) => (
                      <li
                        key={index}
                        className="flex items-center p-2 bg-gray-100 rounded hover:bg-gray-200 transition duration-300 ease-in-out"
                      >
                        <span className="text-gray-800 text-base font-medium">{player}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            {subs.length > 0 && (
              <div className="mt-6 p-4 bg-white rounded shadow-md">
                <h2 className="text-xl font-bold mb-2">Substitutes</h2>
                <ul className="list-disc pl-5 space-y-1">
                  {sortPlayers(subs).map((player, index) => (
                    <li key={index} className="text-gray-800">{player}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="mt-6 text-center">
              <button
                onClick={downloadImage}
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Download Teams as Image
              </button>
            </div>
          </div>
        )}
        {savedTeams.length > 0 && (
          <div className="mt-6 p-4 bg-white rounded shadow-md">
            <h2 className="text-xl font-bold mb-2">Saved Teams</h2>
            <ul className="list-disc pl-5 space-y-2">
              {savedTeams.map((team, index) => (
                <li key={index} className="flex justify-between items-center mb-2">
                  <span className="text-[13px] font-semibold text-[#4491e3] bg-gray-100 p-1">Option {index + 1}</span>
                  <div>
                    <button
                      onClick={() => loadSavedTeam(index)}
                      className="bg-blue-500 text-white py-1 px-2 rounded mr-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Load
                    </button>
                    <button
                      onClick={() => deleteSavedTeam(index)}
                      className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamGenerator;