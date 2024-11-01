import React, { useState, useEffect } from "react"; // Importing necessary React hooks and components
import { useNavigate } from "react-router-dom"; // Importing useNavigate to programmatically navigate between routes
import { SlArrowRight } from "react-icons/sl"; // Importing an arrow icon from react-icons library
import { IoCloseOutline } from "react-icons/io5"; // Importing a close icon from react-icons library
import InAppLogo from "../../components/Logo/inAppLogo"; // Importing a logo component for the app
import NavBarModerator from "../../components/Navbar/navbarmoderator"; // Importing the navigation bar for the moderator view
import Users from "../../components/SearchComponents/userResults"; // Importing the Users component
import SearchBar from "../../components/SearchComponents/search";

// Array to hold month names for easier reference
const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function ModeratorViewReport() {
    // Hook to navigate between different routes
    const [earnings, setEarnings] = useState([]); // State to store earnings data
    const [error, setError] = useState(null); // State to store any error messages
    const [selectedMonth, setSelectedMonth] = useState(null); // State to store the selected month for detailed view
    const [numberOfBookings, setNumberOfBookings] = useState(0); // State to store the number of bookings for the selected month
    const [totalBookingAmount, setTotalBookingAmount] = useState(0); // State to store the total booking amount for the selected month
    const [totalRevenue, setTotalRevenue] = useState(0); // State to store the total revenue for the selected month
    const [modalLoading, setModalLoading] = useState(false); // State to manage the loading state for the modal
    // Fetching user data using the Users component
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const users = Users(); // State to store the user data

    // ----------------------------Imported Components for Search Functionality--------------------------------//

    // Function to handle input change in the search bar
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

    // Function to handle suggestion click
    const handleSuggestionClick = (query) => {
        setSearchQuery(query);
        setSuggestions([]);
        navigate(`/ModeratorViewAllUsers?query=${encodeURIComponent(query)}`);
    };

    // ----------------------------Imported Components for Search Functionality--------------------------------

    // useEffect hook to fetch gross earnings data when the component mounts
    useEffect(() => {
        const fetchGrossEarnings = async () => {
        try {
            const response = await fetch(`/api/getAllEarningsReport`); // Fetching earnings report from API
            if (!response.ok) {
            throw new Error("Failed to fetch gross earnings"); // Throwing an error if the response is not ok
            }
            const data = await response.json(); // Parsing response data to JSON
            setEarnings(data); // Setting the fetched data to earnings state
            } catch (error) {
                setError(error.message); // Setting error message if fetching fails
                console.error("Error fetching gross earnings:", error); // Logging error to console
            }
        };

        fetchGrossEarnings(); // Calling the function to fetch earnings data
    }, []); // Empty dependency array to ensure this effect runs only once

    // Reducing earnings data to group by year and month
    const groupedEarnings = earnings.reduce((acc, earning) => {
        const year = earning.YEAR; // Extracting year from the earning data
        const month = monthNames[earning.MONTH - 1]; // Getting month name using the month number
        const amount = Number(earning.total_rent).toFixed(2); // Formatting total rent to two decimal places

        if (!acc[year]) { // If the year is not already in the accumulator, add it
        acc[year] = {};
        }
        acc[year][month] = { amount, monthNumber: earning.MONTH }; // Adding month and earnings data to the respective year
        return acc; // Returning the updated accumulator
    }, {}); // Initial value of accumulator is an empty object

    // Function to open the modal with detailed earnings for a specific month
    const openModal = async (year, month, monthNumber) => {
        setSelectedMonth({ year, month }); // Setting the selected month
        setModalLoading(true); // Setting modal loading state to true
        try {
            const response = await fetch(`/api/getAllMonthlyReport?year=${year}&month=${monthNumber}`); // Fetching detailed earnings data from API
            if (!response.ok) {
                throw new Error("Failed to fetch detailed earnings"); // Throwing an error if the response is not ok
            }
            const data = await response.json(); // Parsing response data to JSON
            setNumberOfBookings(data.number_of_bookings); // Setting the number of bookings
            setTotalBookingAmount(data.total_booking_amount); // Setting the total booking amount
            setTotalRevenue(data.total_revenue); // Setting the total revenue
        } catch (error) {
            console.error("Error fetching detailed earnings:", error); // Logging error to console
        } finally {
            setModalLoading(false); // Setting modal loading state to false
        }
    };

    // Function to close the modal
    const closeModal = () => {
        setSelectedMonth(null); // Resetting the selected month to null
    };

return (
    <div className="bg-main-background min-h-screen font-sans">
        {/* Header */}
        <header className="p-4 fixed top-0 left-0 w-full bg-white shadow-md z-10 flex items-center">
            <InAppLogo />
        </header>

        {/* Search Bar */}
        <div className="px-2 fixed top-12 flex w-full bg-main-background z-10">
            <SearchBar
                type="text"
                className="w-full p-2 border rounded"
                value={searchQuery}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Search"
            />
        </div>

        {/* Suggestions Dropdown */}
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

        {/* Reports Section */}
        <div className="py-20 flex flex-col items-center justify-start gap-6 bg-main-background">
            <div className="px-4 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-2/5">
                <p className="text-3xl font-bold text-center mt-4 mb-6 text-green-700">Reports</p>

                {error ? (
                    <p className="text-lg text-red-500 text-center">{error}</p>
                ) : (
                    <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
                        {Object.keys(groupedEarnings).map((year) => (
                            <div key={year} className="mb-6">
                                <h3 className="text-2xl font-bold text-gray-800 mb-3">{year}</h3>
                                <table className="min-w-full bg-white border border-gray-200 rounded-md">
                                    <thead>
                                        <tr className="bg-green-100">
                                            <th className="py-3 px-4 border-b text-left text-green-800">Month</th>
                                            <th className="py-3 px-4 border-b text-right text-green-800">Total (CAD)</th>
                                            <th className="py-3 px-4 border-b text-right"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.keys(groupedEarnings[year]).map((month) => (
                                            <tr key={month} className="hover:bg-green-50 cursor-pointer">
                                                <td className="py-3 px-4 text-gray-700 font-medium">{month}</td>
                                                <td className="py-3 px-4 text-right text-gray-900 font-bold">
                                                    ${groupedEarnings[year][month].amount}
                                                </td>
                                                <td className="py-3 px-4 text-right">
                                                    <SlArrowRight
                                                        className="text-green-600 hover:text-green-800 transition duration-200"
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

        {/* Navigation Bar for Moderator */}
        <NavBarModerator ReportColor="#00B761" />

        {/* Modal for Detailed View */}
        {selectedMonth && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-8 rounded-lg w-3/4 md:w-1/2 lg:w-1/3 shadow-xl relative">
                    <button
                        onClick={closeModal}
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 p-2 rounded"
                    >
                        <IoCloseOutline size={28} />
                    </button>
                    <div className="flex flex-col items-start">
                        <h3 className="text-2xl font-bold mb-4 text-gray-800">
                            {selectedMonth.month}, {selectedMonth.year}
                        </h3>
                        {modalLoading ? (
                            <p className="text-lg text-center">Loading...</p>
                        ) : (
                            <div className="w-full space-y-4">
                                <div className="bg-main-background p-4 rounded-md">
                                    <p className="font-bold text-gray-600">Number of Bookings</p>
                                    <p className="text-xl text-gray-800">{numberOfBookings}</p>
                                </div>
                                <div className="bg-main-background p-4 rounded-md">
                                    <p className="font-bold text-gray-600">Total Booking Amount</p>
                                    <p className="text-xl text-gray-800">${totalBookingAmount}</p>
                                </div>
                                <div className="bg-main-background p-4 rounded-md">
                                    <p className="font-bold text-gray-600">Total Revenue</p>
                                    <p className="text-xl text-gray-800">${totalRevenue}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )}
    </div>
);
}
