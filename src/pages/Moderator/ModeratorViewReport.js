import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SlArrowRight } from "react-icons/sl";
import { IoCloseOutline } from "react-icons/io5";
import InAppLogo from "../../components/Logo/inAppLogo";
import NavBarModerator from "../../components/Navbar/navbarmoderator";
import SearchBar from "../../components/SearchComponents/search";
import Users from "../../components/SearchComponents/userResults";

const monthNames = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
];

export default function ModeratorViewReport() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [earnings, setEarnings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [detailedEarnings, setDetailedEarnings] = useState([]);
    const [modalLoading, setModalLoading] = useState(false);
    const users = Users();

    useEffect(() => {
        const fetchGrossEarnings = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`/api/getAllEarningsReport`);
                if (!response.ok) {
                    throw new Error("Failed to fetch gross earnings");
                }
                const data = await response.json();
                setEarnings(data);
            } catch (error) {
                setError(error.message);
                console.error("Error fetching gross earnings:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchGrossEarnings();
    }, []);

    const groupedEarnings = earnings.reduce((acc, earning) => {
        const year = earning.YEAR;
        const month = monthNames[earning.MONTH - 1];
        const amount = Number(earning.total_rent).toFixed(2);

        if (!acc[year]) {
            acc[year] = {};
        }
        acc[year][month] = { amount, monthNumber: earning.MONTH };
        return acc;
    }, {});

    const handleInputChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        if (query.trim() === "") {
            setSuggestions([]);
        } else {
            const filteredSuggestions = users.filter((user) =>
                user.username.toLowerCase().includes(query.toLowerCase()) ||
                user.email.toLowerCase().includes(query.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter" && searchQuery.trim()) {
            navigate(`/ModeratorViewAllUsers?query=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    const handleSuggestionClick = (username) => {
        setSearchQuery(username);
        setSuggestions([]);
        navigate(`/ModeratorViewAllUsers?query=${encodeURIComponent(username)}`);
    };

    const openModal = async (year, month, monthNumber) => {
        setSelectedMonth({ year, month });
        setModalLoading(true);
        try {
            const response = await fetch(`/api/GetEarnings/details?year=${year}&month=${monthNumber}`);
            if (!response.ok) {
                throw new Error("Failed to fetch detailed earnings");
            }
            const data = await response.json();
            setDetailedEarnings(data);
        } catch (error) {
            console.error("Error fetching detailed earnings:", error);
        } finally {
            setModalLoading(false);
        }
    };

    const closeModal = () => {
        setSelectedMonth(null);
        setDetailedEarnings([]);
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <header className="p-4 fixed top-0 left-0 w-full bg-gray-100 z-10">
                <InAppLogo />
                <SearchBar
                    type="text"
                    className="w-full p-2 border rounded mt-2"
                    value={searchQuery}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Search"
                />
            </header>

            <div className="mt-20 flex flex-col items-center justify-start gap-2">
                <div className="px-4 block w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3">
                    <p className="text-2xl font-bold text-center mt-4">Reports</p>

                    {error ? (
                        <p className="text-lg text-red-500 text-center">{error}</p>
                    ) : (
                        <div className="overflow-x-auto">
                            {Object.keys(groupedEarnings).map((year) => (
                                <div key={year} className="mb-4">
                                    <h3 className="text-xl font-bold">{year}</h3>
                                    <table className="min-w-full bg-white">
                                        <thead>
                                            <tr>
                                                <th className="py-2 px-4 border-b text-left">Month</th>
                                                <th className="py-2 px-4 border-b text-right">Total (CAD)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Object.keys(groupedEarnings[year]).map((month) => (
                                                <tr key={month} className="hover:bg-gray-50 cursor-pointer">
                                                    <td className="py-2 px-4">{month}</td>
                                                    <td className="py-2 px-4 text-right font-bold">
                                                        ${groupedEarnings[year][month].amount}
                                                    </td>
                                                    <td>
                                                        <SlArrowRight
                                                            className="mt-3 ml-2 cursor-pointer"
                                                            onClick={() =>
                                                                openModal(year, month, groupedEarnings[year][month].monthNumber)
                                                            }
                                                        />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <NavBarModerator className="fixed bottom-0 w-full" />

            {selectedMonth && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg w-3/4 md:w-1/2">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold">
                                {selectedMonth.month}, {selectedMonth.year}
                            </h3>
                            <button 
                                onClick={closeModal} 
                                className="text-gray-600 hover:text-gray-900 p-2 rounded"
                            >
                                <IoCloseOutline />
                            </button>
                        </div>
                        {modalLoading ? (
                            <p className="text-lg text-center">Loading...</p>
                        ) : (
                            <table className="min-w-full bg-gray-100">
                                <thead>
                                    <tr>
                                        <th className="py-2 px-4 border-b text-left">Day</th>
                                        <th className="py-2 px-4 border-b text-right">Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {detailedEarnings.map((earning) => (
                                        <tr key={earning.day}>
                                            <td className="py-2 px-4">{earning.day}</td>
                                            <td className="py-2 px-4 text-right font-bold">
                                                CAD {Number(earning.daily_total_rent).toFixed(2)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
