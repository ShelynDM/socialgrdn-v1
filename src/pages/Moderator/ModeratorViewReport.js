/**
 * ModeratorViewReport.js
 * Description: Page to view reports for the moderator
 * Frontend Author: Lilian Huh
 * Backend Author: 
 * Date: 2024-10-24
 */

import React, { useState } from "react";
import { SlArrowRight } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import InAppLogo from "../../components/Logo/inAppLogo";
import SearchBar from "../../components/SearchComponents/search";
import NavBarModerator from "../../components/Navbar/navbarmoderator";
import Users from "../../components/SearchComponents/userResults";

export default function ModeratorViewReport() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const users = Users();

    const reports = [
        { id: 1, month: "May", amount: "$420.00" },
        { id: 2, month: "June", amount: "$452.98" },
        { id: 3, month: "July", amount: "$529.56" },
        { id: 4, month: "August", amount: "$465.84" },
    ];

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

    // Updated handleReportClick with console log
    const handleReportClick = (month) => {
        console.log("Navigating to monthly report for:", month); // Debugging log
        navigate(`/monthly-report/${month}`);
    };

    return (
        <div className="bg-main-background">
            <div className="flex flex-col items-center justify-center gap-2 min-h-screen mx-4 pb-20">
                <div className="p-2 fixed top-0 left-0 w-full sm:w-2/4 md:w-2/3 lg:w-1/2 xl:w-1/3">
                    <InAppLogo />
                </div>

                <div className="mx-2 px-2 fixed top-12 flex w-full bg-main-background">
                    <SearchBar
                        type="text"
                        className="w-full p-2 border rounded"
                        value={searchQuery}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        placeholder="Search"
                    />
                </div>

                {suggestions.length > 0 && (
                    <div className="fixed top-20 w-full mx-2 px-2 z-50">
                        <div className="bg-white shadow-lg rounded-lg">
                            {suggestions.map((user, index) => (
                                <p
                                    key={index}
                                    className="px-2 py-1 border-b hover:bg-gray-100 cursor-pointer"
                                    onClick={() => handleSuggestionClick(user.username)}
                                >
                                    <span className="font-bold">{user.username}</span> - <span className="text-gray-500">{user.email}</span>
                                </p>
                            ))}
                        </div>
                    </div>
                )}

                <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 mx-4 mb-20">
                    <div className="flex justify-between items-center pb-5">
                        <p className="text-2xl font-bold">Reports</p>
                        <button className="text-green-500 font-semibold">Download PDF</button>
                    </div>

                    <h1 className="text-xl font-semibold ml-4">2024</h1>

                    <table className="min-w-full">
                        <tbody>
                            {reports.map((report) => (
                                <tr
                                    key={report.id}
                                    className="border-b cursor-pointer"
                                    onClick={() => handleReportClick(report.month)}
                                >
                                    <td className="py-2 px-4 text-left">{report.month}</td>
                                    <td className="text-right px-4">{report.amount}</td>
                                    <td className="text-right px-2">
                                        <SlArrowRight />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <NavBarModerator ReportColor={"#00B761"} />
        </div>
    );
}
