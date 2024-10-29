import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InAppLogo from "../../components/Logo/inAppLogo";
import SearchBar from "../../components/SearchComponents/search";
import NavBarModerator from "../../components/Navbar/navbarmoderator";

export default function ModeratorViewMonthlyReport() {
    const { month } = useParams(); // Get the month parameter from the URL
    const [showNotification, setShowNotification] = useState(false);

    useEffect(() => {
        console.log("Received month parameter:", month); // Debugging log
    }, [month]);

    const handleDownload = () => {
        setShowNotification(true);
    };

    const MonthlyReport = [
        { id: 1, numberOfBookings: "129", totalBookingAmount: "$10,320.00", totalRevenue: "$309.60" },
    ];

    return (
        <div className="bg-main-background">
            <div className="flex flex-col items-center justify-center min-h-screen pb-20">
                <div className="p-2 fixed top-0 left-0 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3">
                    <InAppLogo />
                </div>
                <div className="mx-2 px-2 fixed top-12 flex w-full items-center justify-between bg-main-background">
                    <SearchBar className="w-full" />
                </div>

                <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 mx-4">
                    <div className="pb-5">
                        <p className="text-2xl font-bold ml-2">Monthly Reports</p>
                    </div>

                    <div className="flex justify-between items-center pb-5 ml-4">
                        <h1 className="text-2xl font-semibold">{month} 2024</h1>
                        <button className="text-green-500 font-bold" onClick={handleDownload}>
                            Download PDF
                        </button>
                    </div>

                    <table className="min-w-full">
                        <tbody>
                            {MonthlyReport.map((report) => (
                                <tr key={report.id}>
                                    <td className="py-2 px-4">
                                        <div className="flex justify-between items-center">
                                            <span className="font-semibold">No. of Bookings</span>
                                            <span className="text-right">{report.numberOfBookings}</span>
                                        </div>
                                        <div className="flex justify-between items-center mt-2">
                                            <span className="font-semibold">Total Booking Amount</span>
                                            <span className="text-right">{report.totalBookingAmount}</span>
                                        </div>
                                        <div className="flex justify-between items-center mt-2">
                                            <span className="font-semibold">Total Revenue 3%</span>
                                            <span className="text-right">{report.totalRevenue}</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {showNotification && (
                    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg rounded-lg p-6">
                        <p className="font-bold text-center">{month} Financial Report Downloaded</p>
                        <button
                            className="mt-4 border px-4 py-2 rounded-lg"
                            onClick={() => setShowNotification(false)}
                        >
                            Close
                        </button>
                    </div>
                )}
            </div>

            <NavBarModerator ReportColor={"#00B761"} />
        </div>
    );
}
