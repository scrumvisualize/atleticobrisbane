import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';

const TeamGenerator = () => {
  const [input, setInput] = useState('');
  const [teamOrange, setTeamOrange] = useState([]);
  const [teamGreen, setTeamGreen] = useState([]);
  const [savedTeams, setSavedTeams] = useState(JSON.parse(localStorage.getItem('savedTeams')) || []);
  const [error, setError] = useState(null);
  const captureRef = useRef(null);

  const sanitizeInput = (input) => {
    return input.replace(/[^a-zA-Z0-9-\n\s]/g, '');
  };

  const handleInputChange = (e) => {
    const sanitizedInput = sanitizeInput(e.target.value);
    setInput(sanitizedInput);
  };

  const splitTeams = () => {
    if (!input.trim()) {
      setError('The input field cannot be empty. Please enter player names!');
      return;
    }

    const players = input.split('\n').map(player => player.trim()).filter(player => player);
    const defencePlayers = players.filter(player => player.includes('-D-'));
    const midfieldPlayers = players.filter(player => player.includes('-M-'));
    const forwardPlayers = players.filter(player => player.includes('-F-'));

    const balanceTeams = (players) => {
      const categories = ['D', 'M', 'F']; // Defence, Midfield, Forward
      const grades = ['A', 'B', 'C']; // Grades A, B, C
  
      // Initialize teams
      const teams = {
          teamOrange: { D: { A: [], B: [], C: [] }, M: { A: [], B: [], C: [] }, F: { A: [], B: [], C: [] } },
          teamGreen: { D: { A: [], B: [], C: [] }, M: { A: [], B: [], C: [] }, F: { A: [], B: [], C: [] } },
      };
  
      // Distribute players by category and grade
      categories.forEach((category) => {
          grades.forEach((grade) => {
              const playersByCategoryAndGrade = players.filter(player => player.includes(`-${category}-${grade}`));
  
              // Distribute players to teams ensuring no more than 2 players of each grade per team
              const teamOrangePlayers = [];
              const teamGreenPlayers = [];
  
              playersByCategoryAndGrade.forEach((player, index) => {
                  if (index % 2 === 0) {
                      teamOrangePlayers.push(player);
                  } else {
                      teamGreenPlayers.push(player);
                  }
              });
  
              teams.teamOrange[category][grade] = teamOrangePlayers;
              teams.teamGreen[category][grade] = teamGreenPlayers;
          });
      });
  
      // Flatten the teams to get the final player lists
      const flattenTeam = (team) => {
          return [].concat(...categories.map(cat => [].concat(...grades.map(grad => team[cat][grad]))));
      };
  
      return {
          teamOrange: flattenTeam(teams.teamOrange),
          teamGreen: flattenTeam(teams.teamGreen),
      };
  };
  

    const balancedDefence = balanceTeams(defencePlayers);
    const balancedMidfield = balanceTeams(midfieldPlayers);
    const balancedForward = balanceTeams(forwardPlayers);

    let finalTeamOrange = [...balancedDefence.teamOrange, ...balancedMidfield.teamOrange, ...balancedForward.teamOrange];
    let finalTeamGreen = [...balancedDefence.teamGreen, ...balancedMidfield.teamGreen, ...balancedForward.teamGreen];

    const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

    finalTeamOrange = shuffleArray(finalTeamOrange);
    finalTeamGreen = shuffleArray(finalTeamGreen);

    while (finalTeamOrange.length < finalTeamGreen.length - 1) {
      finalTeamOrange.push(finalTeamGreen.pop());
    }

    while (finalTeamGreen.length < finalTeamOrange.length - 1) {
      finalTeamGreen.push(finalTeamOrange.pop());
    }

    setTeamOrange(finalTeamOrange);
    setTeamGreen(finalTeamGreen);
    setError(null);

    const newSavedTeams = [...savedTeams, { teamOrange: finalTeamOrange, teamGreen: finalTeamGreen }];
    setSavedTeams(newSavedTeams);
    localStorage.setItem('savedTeams', JSON.stringify(newSavedTeams));
  };

  const sortPlayers = (players) => {
    return players.sort((a, b) => {
      const [aCategory, aGrade] = a.split('-').slice(1);
      const [bCategory, bGrade] = b.split('-').slice(1);
  
      const categoryOrder = ['D', 'M', 'F'];
      const gradeOrder = ['A', 'B', 'C'];
  
      if (aCategory !== bCategory) {
        return categoryOrder.indexOf(aCategory) - categoryOrder.indexOf(bCategory);
      }
  
      return gradeOrder.indexOf(aGrade) - gradeOrder.indexOf(bGrade);
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
    setTeamOrange(team.teamOrange);
    setTeamGreen(team.teamGreen);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center text-[#002d75] mb-4">Create Teams</h1>
      <textarea
        value={input}
        onChange={handleInputChange}
        className="w-full h-40 p-2 border rounded"
        placeholder="Enter player names, ex: John-D-A or Mark-M-B or Damian-F-A, each player on a new line..."
        title="Enter player names in the format: Name-Position-Category (e.g., John-D-A, Mark-M-B, Damian-F-A or Rod-D-B). Each player should be on a new line."
      />
      <button
        onClick={splitTeams}
        className="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded"
      >
        Generate Teams
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {teamOrange.length > 0 && teamGreen.length > 0 && (
        <>
          <button
            onClick={downloadImage}
            className="w-full mt-4 bg-green-500 text-white py-2 px-4 rounded"
          >
            Download Teams Image
          </button>
          <div ref={captureRef} className="flex mt-4 border p-2">
            <div className="w-1/2 p-4 bg-gray-100 border border-gray-300 rounded-lg shadow-md">
              <h2 className="text-2xl text-orange-600 font-extrabold mb-4 border-b-2 border-orange-600 pb-2">Team Orange</h2>
              <ul className="list-none p-0">
                {sortPlayers(teamOrange).map((player, index) => (
                  <li className="bg-white text-gray-800 font-semibold text-lg rounded-md mb-2 p-3 shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out cursor-pointer" key={index}>
                    {player.replace(/-(A|B|C)/, '')}
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-1/2 p-4 bg-gray-100 border border-gray-300 rounded-lg shadow-md">
              <h2 className="text-2xl text-green-600 font-extrabold mb-4 border-b-2 border-green-600 pb-2">Team Green</h2>
              <ul className="list-none p-0">
                {sortPlayers(teamGreen).map((player, index) => (
                  <li className="bg-white text-gray-800 font-semibold text-lg rounded-md mb-2 p-3 shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out cursor-pointer" key={index}>
                    {player.replace(/-(A|B|C)/, '')}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
      {savedTeams.length > 0 && (
  <div className="mt-8">
    <h2 className="text-xl font-bold mb-4">Saved Teams</h2>
    <div className="flex flex-wrap -m-1 gap-2">
      {savedTeams.map((teams, index) => (
        <div
          key={index}
          className="relative hover:scale-105 transition-transform duration-300 bg-cover bg-center bg-no-repeat bg-gray-100 p-4 border border-gray-300 rounded-lg shadow-md flex flex-col items-center justify-center h-40 w-40 cursor-pointer"
          style={{ backgroundImage: 'url("images/savedicon.PNG")' }}
          onClick={() => loadSavedTeam(index)}
        >
          <div className="absolute bottom-1 w-full text-center">
            <h3 className="text-base font-bold text-white text-bottom">Option-{index}</h3>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteSavedTeam(index);
            }}
            className="absolute top-2 right-2 text-red-600 hover:text-red-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  </div>
)}

    </div>
  );
};

export default TeamGenerator;

