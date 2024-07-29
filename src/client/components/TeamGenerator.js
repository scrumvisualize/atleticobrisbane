import React, { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';

const defInput = `
1.Jithu-D-A
2. Joji-D-A
3.Clitus-D-B 
4. Aby-D-A
5.Sheyon-M-A
6.Abhiram-M-A
7. Makvin-M-B
8.Elon-M-A
9.Rejin-M-B
10. Sam-D-B
11.Saju-F-A
12.Dwyane-F-A
13.Elias-F-B
14. Sanju-D-C
15.Rajesh-D-C
16. Vinod-M-B`;

const TeamGenerator = () => {
  const [input, setInput] = useState('');
  const [team1, setTeam1] = useState([]);
  const [team2, setTeam2] = useState([]);
  const [team3, setTeam3] = useState([]);
  const [subs, setSubs] = useState([]);
  const [savedTeams, setSavedTeams] = useState(JSON.parse(localStorage.getItem('savedTeams')) || []);
  const [numTeams, setNumTeams] = useState(2);
  const [playersPerSide, setPlayersPerSide] = useState(6);
  const [error, setError] = useState(null);
  const captureRef = useRef(null);

  /* In useEffect while reloading the component or during page refresh will remove the savedTeams from the localStorage */

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

    // Determine the number of players required per team
    const totalPlayers = players.length;
    const playersPerTeam = playersPerSide;
    const totalTeams = numTeams;

    // Ensure the total number of players is sufficient
    if (totalPlayers < playersPerTeam * totalTeams) {
      setError(`Insufficient players. You need at least ${playersPerTeam * totalTeams} players for ${totalTeams} teams.`);
      return;
    }

    const mainTeams = [];
    const shuffledPlayers = players.sort(() => Math.random() - 0.5);

    for (let i = 0; i < totalTeams; i++) {
      mainTeams.push(shuffledPlayers.slice(i * playersPerTeam, (i + 1) * playersPerTeam));
    }

    const totalPlayersInMainTeams = mainTeams.flat().length;
    const substitutes = shuffledPlayers.slice(totalPlayersInMainTeams);

    setTeam1(mainTeams[0]);
    setTeam2(mainTeams[1]);
    if (numTeams === 3) {
      setTeam3(mainTeams[2]);
    }
    setSubs(substitutes);
    setError(null);

    const newSavedTeams = [...savedTeams, { team1: mainTeams[0], team2: mainTeams[1], team3: mainTeams[2] || [], subs }];
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
    setTeam1(team.team1);
    setTeam2(team.team2);
    setTeam3(team.team3);
    setSubs(team.subs);
  };

  return (
    <div className="bg-gray-100 text-gray-900 bg-gradient-to-r from-blue-100 to-pink-100">
      <div className="mb-2 bg-cover bg-center bg-no-repeat h-[120px] md:h-[135px] lg:h-128" style={{ backgroundImage: "url('images/teamgen.png')", backgroundPosition: 'center 80%' }}>
      </div>
      <div className="text-center font-semibold text-xs">
        <h3>Home &#8594; Team Generator </h3>
      </div>

      <div className="max-w-4xl mx-auto p-4">
        <textarea
          value={input}
          onChange={handleInputChange}
          className="w-full h-40 p-2 border rounded"
          placeholder="Enter the player name, then position and then level of a player, for ex: John-D-A or Mark-M-B or Damian-F-A or Luke-D-C, each player on a new line."
          title="Enter player names in the format: Name-Position-Category (e.g., John-D-A, Mark-M-B, Damian-F-A or Rod-D-B). Each player should be on a new line."
        />
        <div className="flex mt-4 space-x-4">
          <div className="flex flex-col">
            <label className="text-sm font-bold mb-2">Number of Teams</label>
            <select value={numTeams} onChange={handleNumTeamsChange} className="p-2 border rounded">
              <option value={2}>2 Teams</option>
              <option value={3}>3 Teams</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-bold mb-2">Players per Side</label>
            <select value={playersPerSide} onChange={handlePlayersPerSideChange} className="p-2 border rounded">
              <option value={6}>6-a-side</option>
              <option value={7}>7-a-side</option>
              <option value={8}>8-a-side</option>
            </select>
          </div>
        </div>
        <button
          onClick={splitTeams}
          className="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded"
        >
          Generate Teams
        </button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {(team1.length > 0 || team2.length > 0 || team3.length > 0) && (
          <>
            <button
              onClick={downloadImage}
              className="w-full mt-4 bg-green-500 text-white py-2 px-4 rounded"
            >
              Download Teams Image
            </button>
            <div ref={captureRef} className={`grid gap-4 mt-4 border p-2 ${numTeams === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
              <div className="p-2 bg-gray-100 border border-gray-300 rounded-lg shadow-md">
                <h2 className="text-2xl text-center text-orange-600 font-extrabold mb-4 border-b-2 border-orange-600 pb-2">Team 1</h2>
                <ul className="list-none p-0">
                  {sortPlayers(team1).map((player, index) => (
                    <li className="bg-white text-gray-800 font-semibold text-lg rounded-md mb-2 p-3 shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out cursor-pointer" key={index}>
                      {player.replace(/-(A|B|C)/, '')}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-2 bg-gray-100 border border-gray-300 rounded-lg shadow-md">
                <h2 className="text-2xl text-center text-green-600 font-extrabold mb-4 border-b-2 border-green-600 pb-2">Team 2</h2>
                <ul className="list-none p-0">
                  {sortPlayers(team2).map((player, index) => (
                    <li className="bg-white text-gray-800 font-semibold text-lg rounded-md mb-2 p-3 shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out cursor-pointer" key={index}>
                      {player.replace(/-(A|B|C)/, '')}
                    </li>
                  ))}
                </ul>
              </div>
              {numTeams === 3 && (
                <div className="p-2 bg-gray-100 border border-gray-300 rounded-lg shadow-md">
                  <h2 className="text-2xl text-center text-blue-600 font-extrabold mb-4 border-b-2 border-blue-600 pb-2">Team 3</h2>
                  <ul className="list-none p-0">
                    {sortPlayers(team3).map((player, index) => (
                      <li className="bg-white text-gray-800 font-semibold text-lg rounded-md mb-2 p-3 shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out cursor-pointer" key={index}>
                        {player.replace(/-(A|B|C)/, '')}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            {subs.length > 0 && (
              <div className="mt-4">
                <h3 className="text-xl text-purple-600 font-extrabold mb-4 border-b-2 border-purple-600 pb-2">Substitutes</h3>
                <ul className="list-none p-0">
                  {sortPlayers(subs).map((sub, index) => (
                    <li className="bg-gray-200 text-gray-800 font-semibold text-lg rounded-md mb-2 p-3 shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out cursor-pointer" key={index}>
                      {sub.replace(/-(A|B|C)/, '')}
                    </li>
                  ))}
                </ul>
              </div>
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
          </>
        )}
      </div>
    </div>
    
  );
};

export default TeamGenerator;