import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';

const TeamGenerator = () => {
  const [input, setInput] = useState('');
  const [teamOrange, setTeamOrange] = useState([]);
  const [teamGreen, setTeamGreen] = useState([]);
  const [error, setError] = useState(null);
  const captureRef = useRef(null);

// Function to sanitize input
const sanitizeInput = (input) => {
    return input.replace(/[^a-zA-Z0-9-\n\s]/g, ''); // Allow only alphanumeric characters, hyphens, new lines, and spaces
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

    const balanceTeams = (categoryPlayers) => {
      const teamOrange = [];
      const teamGreen = [];
      
      const categories = ['A', 'B', 'C'];
      const subcategoryPlayers = {};

      // Group players by subcategory
      categories.forEach(category => {
        subcategoryPlayers[category] = categoryPlayers.filter(player => player.includes(`-${category}`));
      });

      // Distribute players evenly across two teams
      Object.keys(subcategoryPlayers).forEach(category => {
        const players = subcategoryPlayers[category];
        const half = Math.ceil(players.length / 2);
        let teamA = [];
        let teamB = [];
        
        // Split evenly across teams
        players.forEach((player, index) => {
          if (index < half) {
            teamA.push(player);
          } else {
            teamB.push(player);
          }
        });

        // Alternate assignment to teamOrange and teamGreen
        teamOrange.push(...teamA);
        teamGreen.push(...teamB);
      });

      return { teamOrange, teamGreen };
    };

    const balancedDefence = balanceTeams(defencePlayers);
    const balancedMidfield = balanceTeams(midfieldPlayers);
    const balancedForward = balanceTeams(forwardPlayers);

    let finalTeamOrange = [...balancedDefence.teamOrange, ...balancedMidfield.teamOrange, ...balancedForward.teamOrange];
    let finalTeamGreen = [...balancedDefence.teamGreen, ...balancedMidfield.teamGreen, ...balancedForward.teamGreen];

    const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

    finalTeamOrange = shuffleArray(finalTeamOrange);
    finalTeamGreen = shuffleArray(finalTeamGreen);

    // Balance the number of players in each team if necessary
    while (finalTeamOrange.length < finalTeamGreen.length - 1) {
      finalTeamOrange.push(finalTeamGreen.pop());
    }

    while (finalTeamGreen.length < finalTeamOrange.length - 1) {
      finalTeamGreen.push(finalTeamOrange.pop());
    }

    setTeamOrange(finalTeamOrange);
    setTeamGreen(finalTeamGreen);
    setError(null);
  };

  const sortPlayers = (players) => {
    return players.sort((a, b) => {
      const [aCategory, aGrade] = a.split('-').slice(1); // Extract category and grade
      const [bCategory, bGrade] = b.split('-').slice(1); // Extract category and grade
  
      // Define the order for categories and grades
      const categoryOrder = ['D', 'M', 'F'];
      const gradeOrder = ['A', 'B', 'C'];
  
      // Compare categories
      if (aCategory !== bCategory) {
        return categoryOrder.indexOf(aCategory) - categoryOrder.indexOf(bCategory);
      }
  
      // Compare grades
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
          <div ref={captureRef} className="flex mt-4 border p-4">
            <div className="w-1/2 p-4">
              <h2 className="text-xl text-orange-500 font-bold">Team Orange</h2>
              <ul>
                {sortPlayers(teamOrange).map((player, index) => (
                  <li className="text-base ml-2 text-[#418ee0] font-semibold" key={index}>
                    {player.replace(/-(D|M|F)-(A|B|C)/, '')}
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-1/2 p-4">
              <h2 className="text-xl text-green-500 font-bold">Team Green</h2>
              <ul>
                {sortPlayers(teamGreen).map((player, index) => (
                  <li className="text-base ml-2 text-[#418ee0] font-semibold" key={index}>
                    {player.replace(/-(D|M|F)-(A|B|C)/, '')}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TeamGenerator;