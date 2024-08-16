import React from 'react';
import Tree from 'react-d3-tree';

// Custom Node Component
const CustomNode = ({ nodeDatum, toggleNode }) => {
    const level = nodeDatum.__rd3t.depth !== undefined ? nodeDatum.__rd3t.depth : 0; // Default to level 0 if depth is undefined

    const colors = ['#be6ded', '#91f2b0', '#faf8cd', '#d7f2a7', '#cded95'];
    const color = colors[level % colors.length];
    const rectWidth = 80 + level * 20; // Adjust width based on level or data
    const rectHeight = 40; // Height of the rectangle
    const playerImage = nodeDatum.image || ""; // Image URL for player
    const isLeaf = !nodeDatum.children || nodeDatum.children.length === 0;

    return (
        <g onClick={toggleNode} style={{ cursor: 'pointer' }}>
            {/* Display image at the top level */}
            {level === 0 && playerImage && (
                <image
                    href={playerImage}
                    x="-25" // Adjust position to center image above the rectangle
                    y="-67" // Adjust position to place image above the rectangle
                    width="50" // Image width
                    height="50" // Image height
                    preserveAspectRatio="xMidYMid slice"
                />
            )}
            <rect
                x={`-${rectWidth / 2}`} // Center the rectangle
                y="-18"
                width={rectWidth}
                height={rectHeight}
                fill={color} // Apply color based on level
                stroke="black" // Optional: Add stroke for better visibility
                strokeWidth="1"
                rx="10" // Rounded corners for the rectangle
                ry="10" // Rounded corners for the rectangle
                style={{
                    filter: 'drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.3))', // Add shadow here
                }}
            />
            <text
                x="0"
                y="0"
                dy=".35em"
                textAnchor="middle"
                letterSpacing="2.5px" // Adjust for better spacing
                style={{ fontSize: '12px', fontFamily: 'sans-serif', fontWeight: 'lighter', fill: 'white', textRendering: 'optimizeLegibility' }} // Additional styles if needed
            >
                {nodeDatum.name}
            </text>

            {/* Display player image only for leaf nodes */}
            {isLeaf && playerImage && (
                <g>
                    <circle
                        cx="0"
                        cy="-55" // Position above the rectangle
                        r="20" // Radius of the circle
                        fill="white" // Circle color
                        stroke="black" // Circle border
                        strokeWidth="1"
                    />
                    <image
                        href={playerImage} // Use the image URL from nodeDatum
                        x="-20" // Adjust position to center image in the circle
                        y="-82" // Adjust position to center image in the circle
                        width="40" // Image width
                        height="40" // Image height
                        preserveAspectRatio="xMidYMid slice" // Maintain aspect ratio
                        clipPath="url(#clipPath)" // Apply clipping to ensure it's within the circle
                    />
                </g>
            )}
        </g>
    );
};

const TeamHierarchy = ({ data }) => {

    const isMobile = window.innerWidth < 768;

    return (
        <div className='flex justify-center items-center w-full h-full bg-gradient-to-r from-blue-100 to-pink-100' >
            <div className="w-full h-full mt-2">
                <Tree
                    data={data}
                    orientation="vertical"
                    // translate={{ x: 750, y: 60 }} // Adjust translate as needed
                    // nodeSize={{ x: 140, y: 140 }} // Adjust node size as needed
                    // separation={{ siblings: 1, nonSiblings: 1.5 }} // Adjust separation as needed
                    translate={isMobile ? { x: window.innerWidth / 2, y: 40 } : { x: 750, y: 60 }}
                    nodeSize={isMobile ? { x: 100, y: 100 } : { x: 140, y: 140 }}
                    separation={isMobile ? { siblings: 1, nonSiblings: 2 } : { siblings: 1, nonSiblings: 1.5 }}
                    initialDepth={1}
                    //svgProps={{ viewBox: '0 0 1200 800', preserveAspectRatio: 'xMidYMid meet' }}
                    svgProps={{ width: '100%', height: '100%', margin: '4px' }}
                    renderCustomNodeElement={({ nodeDatum, toggleNode }) => (
                        <CustomNode nodeDatum={nodeDatum} toggleNode={toggleNode} />
                    )}
                />
            </div>
        </div>
    );
};

const TeamDistribution = () => {
    const teamData = {
        name: "Atletico",
        image: "images/ablogo.png", // Add image here
        children: [
            {
                name: "GK",
                children: [
                    { name: "Rajesh", image: "images/rajesh.png" },
                    { name: "Prakash" }
                ]
            },
            {
                name: "Defence",
                children: [
                    {
                        name: "Open",
                        children: [
                            { name: "Jithu", image: "images/profilePhoto-1720052869162.png" },
                            { name: "Remin" },
                            { name: "Joseph" },
                            { name: "Arun", image: "images/profilePhoto-1721355636391.png" },
                            { name: "Sam" },
                            { name: "Sheyon" },
                            { name: "Clitus" },
                            { name: "Christy" },
                            { name: "Sanju" },
                        ]
                    },
                    {
                        name: "Above 40",
                        children: [

                            { name: "Jibi", image: "images/profilePhoto-1719750787979.png" },
                            { name: "Joji", image: "images/profilePhoto-1720012131829.png" },
                            { name: "Jinto" },
                            { name: "Aby" },
                            { name: "Sibin" },
                            { name: "Shine" },
                            { name: "Jayadeep" },
                            { name: "Noble" }
                        ]
                    },
                    {
                        name: "U16",
                        children: [

                            { name: "Player1" },
                            { name: "Player2" },
                            { name: "Player3" },
                            { name: "Player4" },
                        ]
                    },
                    {
                        name: "U12",
                        children: [

                            { name: "Player1" },
                            { name: "Player2" },
                            { name: "Player3" },
                            { name: "Player4" },
                        ]
                    }

                ],
            },
            {
                name: "Midfielder",
                children: [
                    {
                        name: "Open",
                        children: [
                            { name: "Sharan", image: "images/profilePhoto-1719711119811.jpeg" },
                            { name: "Abhiram" },
                            { name: "Rejin", image: "images/profilePhoto-1720673589791.png" },
                            { name: "Elon" },
                            { name: "Makvin", image: "images/profilePhoto-1719796632252.png" },
                            { name: "Atty" },
                            { name: "Amal Stephen" },
                            { name: "Sayu" }
                        ]
                    },
                    {
                        name: "Above40",
                        children: [
                            { name: "Vinod", image: "images/profilePhoto-1719717154481.jpeg" },
                            { name: "Sibin" },
                            { name: "Prince Vaz" }
                        ]
                    },
                    {
                        name: "U16",
                        children: [

                            { name: "Player1" },
                            { name: "Player2" },
                            { name: "Player3" },
                            { name: "Player4" },
                        ]
                    },
                    {
                        name: "U12",
                        children: [

                            { name: "Player1" },
                            { name: "Player2" },
                            { name: "Player3" },
                            { name: "Player4" },
                        ]
                    }
                ]
            },
            {
                name: "Strikers",
                children: [

                    {
                        name: "Open",
                        children: [
                            { name: "Kiran", image: "images/profilePhoto-1719797305891.png" },
                            { name: "Elias" },
                            { name: "Dwyane" },
                            { name: "Vineeth" },
                            { name: "Aaron Joby" },
                            { name: "Trent" },
                            { name: "Amal Panicker" }
                        ]
                    },
                    {
                        name: "Above40",
                        children: [
                            { name: "Saju", image: "images/profilePhoto-1719710686554.jpeg" },
                            { name: "Prince Vaz" }
                        ]
                    },
                    {
                        name: "U16",
                        children: [

                            { name: "Player1" },
                            { name: "Player2" },
                            { name: "Player3" },
                            { name: "Player4" },
                        ]
                    },
                    {
                        name: "U12",
                        children: [

                            { name: "Player1" },
                            { name: "Player2" },
                            { name: "Player3" },
                            { name: "Player4" },
                        ]
                    }
                ]
            }
        ]
    };
    return (
        <div className='bg-gradient-to-r from-blue-100 to-pink-100 py-2' style={{ width: '100%', height: '100vh', backgroundColor: '#f0f0f0' }}>
            <h1 className='text-center text-2xl font-bold mb-4 mt-0 text-gradient'>Team Wise Hierarchy</h1>
            <TeamHierarchy data={teamData} />
        </div>
    );
};

export default TeamDistribution;