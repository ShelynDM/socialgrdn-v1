import React, { useState, useEffect } from "react";
import { useUser } from "../../UserContext";
import InAppLogo from "../../components/Logo/inAppLogo";
import NavBar from "../../components/Navbar/navbar";
import GreenSprout from "../../assets/navbarAssets/sproutGreen.png";
import BackMoreButton from "../../components/Buttons/backMoreButton";
import { SlArrowRight } from "react-icons/sl";
import { IoCloseOutline } from "react-icons/io5";

const monthNames = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
];

export default function GrossEarnings() {
    const [earnings, setEarnings] = useState([]); // State for earnings
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(null); // For modal
    const [detailedEarnings, setDetailedEarnings] = useState([]); // State for detailed earnings
    const [modalLoading, setModalLoading] = useState(false); // State for modal loading
    const { userId } = useUser();

    useEffect(() => {
        const fetchGrossEarnings = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`/api/GetEarnings?userID=${userId}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch gross earnings");
                }

                const data = await response.json();

                if (Array.isArray(data)) {
                    setEarnings(data);
                } else {
                    setEarnings([]);
                }
            } catch (error) {
                setError(error.message);
                console.error("Error fetching gross earnings:", error);
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchGrossEarnings();
        }
    }, [userId]);

    // Group earnings by year
    const groupedEarnings = earnings.reduce((acc, earning) => {
        const year = earning.YEAR;
        const month = monthNames[earning.MONTH - 1]; // Convert month number to month name
        const amount = Number(earning.total_rent).toFixed(2);

        if (!acc[year]) {
            acc[year] = {};
        }
        acc[year][month] = { amount, monthNumber: earning.MONTH }; // Add monthNumber for later use
        return acc;
    }, {});

    // Function to open the modal and fetch detailed earnings
    const openModal = async (year, month, monthNumber) => {
        setSelectedMonth({ year, month }); // Set the selected month for the modal
        setModalLoading(true);
        try {
            const response = await fetch(`/api/GetEarnings/details?userID=${userId}&year=${year}&month=${monthNumber}`);
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

    // Function to close the modal
    const closeModal = () => {
        setSelectedMonth(null); // Clear the selected month
        setDetailedEarnings([]); // Clear the detailed earnings
    };

    return (
        <div className='bg-main-background relative'>
            <InAppLogo />

            <div className="mt-6"> {/* Adjust margin-top for BackMoreButton */}
                <BackMoreButton />
            </div>

            <div className="flex flex-col items-center justify-center gap-2 min-h-screen"> {/* Adjust justify content */}
                <div className="px-4 block w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3">
                    <div className="pb-2"> {/* Reduce padding-bottom */}
                        <p className="text-2xl font-bold text-center">Gross Earnings</p>
                    </div>

                    {loading ? (
                        <p className="text-lg text-center">Loading...</p>
                    ) : error ? (
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
                                                <th className="py-2 px-4 border-b text-right">Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Object.keys(groupedEarnings[year]).map((month) => (
                                                <tr key={month}>
                                                    <td className="py-2 px-4">{month}</td>
                                                    <td className="py-2 px-4 text-right font-bold">
                                                        CAD {groupedEarnings[year][month].amount}
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

            <NavBar SproutPath={GreenSprout} />

            {/* Modal for detailed earnings */}
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
