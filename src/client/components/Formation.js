import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const ItemType = 'PLAYER';

const Player = ({ player, onEdit, style }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType,
    item: { id: player.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`p-2 bg-gradient-to-r from-[#f21624] to-[#1a1e91] text-white shadow-lg rounded-full flex items-center justify-center border ${
        isDragging ? 'opacity-50' : 'opacity-100'
      } cursor-move`}
      style={{
        width: '30px',
        height: '30px',
        borderRadius: '15px',
        position: 'absolute',
        ...style,
      }}
    >
      <div className="text-center">
        <input
          type="text"
          className="font-semibold text-[8px] text-center w-10 bg-transparent"
          value={player.name}
          onChange={(e) => onEdit(player.id, 'name', e.target.value)}
        />
        <input
          type="text"
          className="text-[10px] text-center w-10 bg-transparent"
          value={player.number}
          onChange={(e) => onEdit(player.id, 'number', e.target.value)}
        />
      </div>
    </div>
  );
};

const SoccerField = ({ players, onDropPlayer, onEditPlayer }) => {
  const [, drop] = useDrop(() => ({
    accept: ItemType,
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset();
      if (offset) {
        onDropPlayer(item.id, offset);
      }
    },
  }));

  return (
    <div
      ref={drop}
      className="bg-green-500 border-4 border-white relative w-full max-w-[400px] h-[510px] flex-shrink-0 mx-auto"
      style={{
        backgroundImage: 'url(images/field.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        border: '4px solid white',
      }}
    >
      {players.map((player) => (
        <Player
          key={player.id}
          player={player}
          onEdit={onEditPlayer}
          style={{
            left: player.position ? `${player.position.x}px` : '0px',
            top: player.position ? `${player.position.y}px` : '0px',
          }}
        />
      ))}
    </div>
  );
};

const SoccerApp = () => {
  const [players, setPlayers] = useState([
    { id: 1, name: 'Jibi', number: '10', position: { x: 55, y: 350 } },
    { id: 2, name: 'Joji', number: '8', position: { x: 175, y: 375 } },
    { id: 3, name: 'Aby', number: '5', position: { x: 295, y: 350 } },
    { id: 4, name: 'Vinod', number: '11', position: { x: 100, y: 260 } },
    { id: 5, name: 'Prince', number: '77', position: { x: 250, y: 260 } },
    { id: 6, name: 'Saju', number: '7', position: { x: 175, y:180 } },
    { id: 7, name: 'Prakash', number: '1', position: { x: 175, y: 450 } },
  ]);

  const handleDropPlayer = (id, position) => {
    const fieldRect = document.querySelector('.bg-green-500').getBoundingClientRect();
    const newX = position.x - fieldRect.left - 30; // Adjust for player width
    const newY = position.y - fieldRect.top - 30;  // Adjust for player height

    setPlayers((prev) =>
      prev.map((player) =>
        player.id === id ? { ...player, position: { x: newX, y: newY } } : player
      )
    );
  };

  const handleEditPlayer = (id, field, value) => {
    setPlayers((prev) =>
      prev.map((player) =>
        player.id === id ? { ...player, [field]: value } : player
      )
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col items-center mt-4 md:mt-4">
        <SoccerField 
          players={players} 
          onDropPlayer={handleDropPlayer} 
          onEditPlayer={handleEditPlayer} 
        />
      </div>
    </DndProvider>
  );
};

export default SoccerApp;
