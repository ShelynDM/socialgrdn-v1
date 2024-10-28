/**
 * Payout.js
 * Description: This page displays the payouts on the owner's account
 * Backend Author: Shelyn Del Mundo
 * Date: 2024-10-23
 */

import { useEffect, useState, useCallback } from "react";
import { useUser } from "../../UserContext";
import { SlArrowRight } from "react-icons/sl";
import InAppLogo from "../../components/Logo/inAppLogo";
import NavBar from "../../components/Navbar/navbar";
import GreenSprout from "../../assets/navbarAssets/sproutGreen.png";

import BackMoreButton from "../../components/Buttons/backMoreButton";

export default function Payouts() {
    const [renterPayouts, setRenterPayouts] = useState([]);
    const { userId } = useUser();
    const [selectedPayout, setSelectedPayout] = useState(null);
    const [detailedPayouts, setDetailedPayouts] = useState([]);

    // Memoize the fetchPayouts function
    const fetchPayouts = useCallback(async () => {
        try {
            const response = await fetch(`/api/getPayouts?userID=${userId}`);
            if (!response.ok) throw new Error("Failed to fetch payouts");
            const data = await response.json();
            if (data.length === 0) {
                console.log("No payouts found for the user");
                setRenterPayouts([]);
            } else {
            setRenterPayouts(data);
            }
        } catch (error) {
            console.error("Error fetching payouts:", error);
        }
    }, [userId]);

    // Memoize the fetchDetailedPayouts function
    const fetchDetailedPayouts = useCallback(async () => {
        try {
            const response = await fetch(`/api/getDetailedPayouts?userID=${userId}`);
            if (!response.ok) throw new Error("Failed to fetch detailed payouts");
            const data = await response.json();
            if (data.length === 0) {
                console.log("No detailed payouts found for the user");
                setDetailedPayouts([]);
            } else {
                setDetailedPayouts(data);
            }
        } catch (error) {
            console.error("Error fetching detailed payouts:", error);
        }
    }, [userId]);

    const openDetails = (month, year) => {
        const payout = detailedPayouts.find(
            (p) => p.month === month && p.year === year
        );
        setSelectedPayout(payout);
    };

    const closeDetails = () => setSelectedPayout(null);

    // Fetch payouts only when userId changes
    useEffect(() => {
        if (userId) {
            fetchPayouts();
            fetchDetailedPayouts();
        }
    }, [userId, fetchPayouts, fetchDetailedPayouts]);

    let lastYear = null;

    return (
        <div className="bg-main-background flex flex-col min-h-screen">
            <header className="p-4 flex items-center justify-between">
                <div className="p-2 fixed top-0 left-0 w-auto sm:w-2/4 md:w-2/3 lg:w-1/2 xl:w-1/3 bg-main-background">
                    <InAppLogo />
                </div>
            </header>

            <div className="mt-8"> {/* Reduced margin-top for BackMoreButton */}
                <BackMoreButton />
            </div>

            <div className="flex flex-col gap-2 min-h-screen pb-20 pt-10">
                <div className="pb-5">
                    <p className="text-2xl font-bold text-center">Payouts</p>
                </div>

                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b text-left">Year</th>
                            <th className="py-2 px-4 border-b text-left">Month</th>
                            <th className="py-2 px-4 border-b text-right">Total (CAD)</th>
                            <th className="py-2 px-4 border-b text-center">Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renterPayouts.map((payout, index) => {
                            const showYear = payout.year !== lastYear;
                            lastYear = payout.year;

                            return (
                                <tr key={index}>
                                    <td className="py-2 px-4 border-b">
                                        {showYear ? payout.year : ""}
                                    </td>
                                    <td className="py-2 px-4 border-b">{payout.month}</td>
                                    <td className="py-2 px-4 border-b text-right font-bold">
                                        {payout.amount}
                                    </td>
                                    <td className="py-2 px-4 border-b text-center">
                                        <button
                                            className="text-blue-500"
                                            onClick={() => openDetails(payout.month, payout.year)}
                                        >
                                            <SlArrowRight className="text-gray-700" />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {selectedPayout && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="w-96 bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold mb-4">
                            {selectedPayout.month}, {selectedPayout.year}
                        </h2>

                        <div className="mb-4">
                            {selectedPayout.details.map((detail, index) => (
                                <div key={index} className="flex justify-between py-2">
                                    <span>
                                        {new Date(
                                            `${selectedPayout.year}-${selectedPayout.month}-${detail.day}`
                                        ).toLocaleString("default", {
                                            month: "short",
                                            day: "numeric",
                                        })}
                                    </span>
                                    <span>${detail.amount}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-between font-bold text-lg mt-4">
                            <span>Total</span>
                            <span>${selectedPayout.total}</span>
                        </div>

                        <div className="mt-6 flex justify-end">
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded"
                                onClick={closeDetails}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <NavBar SproutPath={GreenSprout} />
        </div>
    );
}
