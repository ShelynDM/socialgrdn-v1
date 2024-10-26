import React, { useState } from "react";
import { SlArrowRight } from "react-icons/sl";
import InAppLogo from "../../components/Logo/inAppLogo";
import SearchBar from "../../components/SearchComponents/search";
import NavBarModerator from "../../components/Navbar/navbarmoderator";

// Imports for search functionality
import { useNavigate } from "react-router-dom";
import Users from "../../components/SearchComponents/userResults"

export default function ModeratorViewReport() {

    // Hooks for search functionality
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState(""); // Store search query in state
    const [suggestions, setSuggestions] = useState([]);
    const users = Users();

    const reports = [
        { id: 1, month: "September", amount: "$1200" },
        { id: 2, month: "October", amount: "$950" },
        { id: 3, month: "November", amount: "$875" },
        { id: 4, month: "December", amount: "$1400" },
    ];
    

    // ------------------- Imported Function to handle search query ------------------- //

    // Handle input change and update suggestions
    const handleInputChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);

        // Filter and show suggestions
        if (query.trim() === "") {
            setSuggestions([]); // Clear suggestions if input is empty
        } else {
            const filteredSuggestions = users.filter((user) =>
                user.username.toLowerCase().includes(query.toLowerCase()) ||
                user.email.toLowerCase().includes(query.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
        }
    };

    // Handle search when Enter key is pressed
    const handleKeyDown = (event) => {
        if (event.key === "Enter" && searchQuery.trim()) {
            navigate(`/ModeratorViewAllUsers?query=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    // Handle suggestion click
    const handleSuggestionClick = (username) => {
        setSearchQuery(username); // Set the clicked username as the search query
        setSuggestions([]); // Clear suggestions
        navigate(`/ModeratorViewAllUsers?query=${encodeURIComponent(username)}`);
    };

    // ------------------- End of Imported Function to handle search query  ------------------- //
 
    return (
        <div className="bg-main-background">
            <div className="flex flex-col items-center justify-center gap-2 min-h-screen mx-4 pb-20">
                <div className="p-2 fixed top-0 left-0 w-auto sm:w-2/4 md:w-2/3 lg:w-1/2 xl:w-1/3 bg-main-background">
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
                    {/* Username and Email Suggestions */}
                    {suggestions.length > 0 && (
                    <div className="fixed top-20 w-full mx-2 px-2  z-50">
                        <div className="mx-2 bg-white shadow-lg rounded-lg">
                        {suggestions.map((user, index) => (
                            <p
                                key={index}
                                className="mx-2 px-2 py-1 border-b hover:bg-gray-100 cursor-pointer"
                                onClick={() => handleSuggestionClick(user.username)}
                            >
                                <span className="font-bold">{user.username}</span> - <span className="text-gray-500">{user.email}</span>
                            </p>
                        ))}
                        </div>
                    </div>
                    )}

                <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 mx-4 mb-20">
                    <div className="pb-5">
                        <p className="text-2xl font-bold text-left">Reports</p>
                    </div>

                    <h1 className="text-2xl font-semibold text-left ml-4">2024</h1>

                    <table className="min-w-full">
                        <tbody>
                            {reports.map((report) => (
                                <tr key={report.id}>
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
