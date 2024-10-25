/**
 * ModeratorViewALLUsers.js
 * Description: This page displays all users in the system and allows the moderator to view or block a user
 * Frontend Author: Lilian Huh
 * Backend Author: Shelyn Del Mundo
 * Date: 2024-10-23
 */

import React, { useEffect, useState, useCallback } from "react";
import InAppLogo from "../../components/Logo/inAppLogo";
import SearchBar from "../../components/SearchComponents/search";
import NavBarModerator from "../../components/Navbar/navbarmoderator";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

export default function ModeratorViewAllUsers() {
    const [users, setUsers] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const navigate = useNavigate();
    const location = useLocation();

    // Extract the query parameter from the URL
    const query = new URLSearchParams(location.search).get("query") || "";

    // Fetch users from backend and filter them if a query exists
    const fetchAllUsers = useCallback(async () => {
        try {
            const response = await fetch('/api/getAllUsers');
            const data = await response.json();
            setUsers(data);
            setFilteredUsers(data);

            // If a query exists, apply the filter
            if (query) filterUsers(data, query);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }, [query]);

    // Filter users based on the search query
    const filterUsers = (allUsers, query) => {
        const filtered = allUsers.filter((user) =>
            user.username.toLowerCase().includes(query.toLowerCase()) ||
            user.email.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredUsers(filtered);
    };

    // Handle search query input changes and update the URL
    const handleSearchQueryChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);

        if (query.trim() === '') {
            // Reset to show all users and clear suggestions
            setFilteredUsers(users);
            setSuggestions([]);
            navigate('/ModeratorViewAllUsers'); // Reset URL to the base path
        } else {
            // Filter users and set suggestions
            filterUsers(users, query);
            const newSuggestions = users
                .filter((user) =>
                    user.username.toLowerCase().startsWith(query.toLowerCase()) ||
                    user.email.toLowerCase().startsWith(query.toLowerCase())
                )
                .map((user) => ({ username: user.username, email: user.email }));
            setSuggestions(newSuggestions);

            // Update the URL with the search query
            navigate(`/ModeratorViewAllUsers?query=${encodeURIComponent(query)}`);
        }
    };

    // Handle Enter key press to select the first suggestion and navigate
    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && suggestions.length > 0) {
            handleSuggestionClick(suggestions[0].username);
        }
    };

    // Handle click on a suggestion
    const handleSuggestionClick = (username) => {
        setSearchQuery(username);
        filterUsers(users, username);
        navigate(`/ModeratorViewAllUsers?query=${encodeURIComponent(username)}`);
        setSuggestions([]);
    };

    // Handle block/unblock user status
    const handleUserStatus = async (userID, status) => {
        const newStatus = status === '1' ? '0' : '1';
        try {
            const response = await fetch(`/api/handleUserStatus?userID=${userID}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });
            if (!response.ok) {
                const errorMessage = await response.text();
                console.error(`Error updating user status: ${errorMessage}`);
                return;
            }
            console.log('User status updated successfully');
            fetchAllUsers(); // Refresh the user list
        } catch (error) {
            console.error('Error updating user status:', error);
        }
    };

    // Fetch users when the component mounts or when the query changes
    useEffect(() => {
        fetchAllUsers();
    }, [fetchAllUsers]);

    return (
        <div className='bg-main-background'>
            <div className="flex flex-col items-center justify-center gap-2 min-h-screen mx-4 pb-20 bg-main-background">
                <div className='p-2 fixed top-0 left-0 w-auto sm:w-2/4 md:w-2/3 lg:w-1/2 xl:w-1/3 bg-main-background'>
                    <InAppLogo />
                </div>

                {/* Search Bar Section */}
                <div className='mx-2 px-2 fixed top-12 flex w-full bg-main-background'>
                    <SearchBar value={searchQuery} onChange={handleSearchQueryChange} onKeyDown={handleKeyDown}/>
                </div>
                {/* Username and Email Suggestions */}
                {suggestions.length > 0 && (
                    <div className="fixed top-20 w-full mx-2 px-2 bg-white shadow-lg rounded-md z-50">
                        {suggestions.map((user, index) => (
                            <p
                                key={index}
                                className="mx-2px-4 py-2 border-b hover:bg-gray-100 cursor-pointer"
                                onClick={() => handleSuggestionClick(user.username)}
                            >
                                <span className="font-bold">{user.username}</span> - <span className="text-gray-500">{user.email}</span>
                            </p>
                        ))}
                    </div>
                )}

                <div className="flex flex-col w-full justify-start items-center mt-20 gap-8">
                    <div className="flex w-full justify-start pt-4 items-start">
                        <p className="text-start font-bold text-2xl">Users</p>
                    </div>

                    {/* Display Filtered Users */}
                    {filteredUsers.length > 0 ? (
                        filteredUsers.map((user, index) => (
                            <div
                                key={index}
                                className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 rounded-lg border-2 border-gray-200 bg-slate-50"
                            >
                                <div className="flex flex-grow m-2">
                                    <div>
                                        <FaUserCircle className="text-6xl text-gray-300" />
                                    </div>
                                    <div className="flex w-full justify-between">
                                        <div className="flex flex-col justify-center items-start gap-1 ml-4">
                                            <h1 className="text-base font-bold">{user.username}</h1>
                                            <p className="text-sm">{user.name}</p>
                                            <p className="text-sm">{user.email}</p>
                                            <p className="text-sm">{user.createdAt}</p>
                                            <p className="text-sm">{user.active_properties}</p>
                                            <p className="text-sm">{user.location}</p>
                                        </div>
                                        <div className="text-sm font-bold">
                                            {user.renterOrOwner}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex w-full justify-evenly m-2">
                                    <div className="font-bold text-green-500 text-base">
                                        View
                                    </div>
                                    <button
                                        className={`font-bold text-base ${
                                            user.status === '1' ? 'text-red-500' : 'text-green-500'
                                        }`}
                                        onClick={() => handleUserStatus(user.userID, user.status)}
                                    >
                                        {user.status === '1' ? 'Block' : 'Unblock'}
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="flex justify-center items-center w-full h-96">
                            <p className="text-gray-500">No users found</p>
                        </div>
                    )}
                </div>

                {/* Navigation Bar */}
                <NavBarModerator UsersColor={"00B761"}/>
            </div>
        </div>
    );
}
