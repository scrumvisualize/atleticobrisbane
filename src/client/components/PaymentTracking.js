import React, { useState, useEffect } from 'react';
import axios from 'axios';

const sheetId = '1736ESOSSAoABXEpbb1vK1tuoHnUPlS6mqRFKx52r2Uk';
const apiKey = process.env.REACT_APP_GOOGLE_SHEETS_API_KEY;

const useGoogleSheet = (sheetId, apiKey) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1!A1:Z1000?key=${apiKey}`);
                setData(response.data.values || []); // Ensure data is set to an array
            } catch (error) {
                console.error('Error fetching data from Google Sheets', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [sheetId, apiKey]);

    return { data, loading };
};

const PaymentTracking = () => {
    const { data, loading } = useGoogleSheet(sheetId, apiKey);
    const [editingData, setEditingData] = useState([]);

    useEffect(() => {
        setEditingData(data || []); // Ensure editingData is set to an array
    }, [data]);

    const handleInputChange = (e, rowIndex, colIndex) => {
        const updatedData = [...editingData];
        updatedData[rowIndex][colIndex] = e.target.value;
        setEditingData(updatedData);
    };

    const saveChanges = async () => {
        try {
            const response = await axios.put(
                `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1!A1:Z1000?valueInputOption=USER_ENTERED&key=${apiKey}`,
                { values: editingData }
            );
            console.log('Changes saved', response);
        } catch (error) {
            console.error('Error saving changes to Google Sheets', error);
        }
    };

    if (loading) return <div className='justify-center items-center text-center text-xl font-semibold text-[#2a94eb]'>Loading...</div>;

    if (!Array.isArray(editingData) || editingData.length === 0) {
        return <div>No data available</div>;
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-blue-800 text-white">
                    <tr>
                        <th className="px-4 py-2 sm:px-6 sm:py-3 border border-gray-200 text-left text-white font-semibold">
                            Serial No
                        </th>
                        <th className="px-4 py-2 sm:px-6 sm:py-3 border border-gray-200 text-left text-white font-semibold">
                            Player Name
                        </th>
                        <th className="px-4 py-2 sm:px-6 sm:py-3 border border-gray-200 text-left text-white font-semibold hidden md:table-cell">
                            Month
                        </th>
                        <th className="px-4 py-2 sm:px-6 sm:py-3 border border-gray-200 text-left text-white font-semibold">
                            Status
                        </th>
                        <th className="px-4 py-2 sm:px-6 sm:py-3 border border-gray-200 text-left text-white font-semibold hidden md:table-cell">
                            Games Played
                        </th>
                        <th className="px-4 py-2 sm:px-6 sm:py-3 border border-gray-200 text-left text-white font-semibold">
                            Balance
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {editingData.slice(2).map((row, rowIndex) => (
                        <tr key={rowIndex} className="hover:bg-gray-100">
                            <td className="px-4 py-2 sm:px-6 sm:py-3 border-b border-gray-200">
                                {row[0]} {/* Serial No */}
                            </td>
                            <td className="px-4 py-2 sm:px-6 sm:py-3 border-b border-gray-200">
                                {row[1]} {/* Player Name */}
                            </td>
                            <td className="px-4 py-2 sm:px-6 sm:py-3 border-b border-gray-200 hidden md:table-cell hidden md:table-cell">
                                {row[2]} {/* Month */}
                            </td>
                            <td className={`px-4 py-2 sm:px-6 sm:py-3 border-b border-gray-200 ${row[3] == 'Paid' ? 'text-green-500' : 'text-red-500'}`}>
                                {row[3]} {/* Status */}
                            </td>
                            <td className="px-4 py-2 sm:px-6 sm:py-3 border-b border-gray-200 hidden md:table-cell hidden md:table-cell">
                                {row[4]} {/* Games Played */}
                            </td>
                            <td className="px-4 py-2 sm:px-6 sm:py-3 border-b border-gray-200">
                                {row[5]} {/* Balance */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* <div className="flex justify-end mt-4">
            <button
                onClick={saveChanges}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
            >
                Save Changes
            </button>
        </div> */}
        </div>
    );
};

export default PaymentTracking;
