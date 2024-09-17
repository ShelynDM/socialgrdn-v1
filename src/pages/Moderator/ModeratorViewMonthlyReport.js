
import InAppLogo from "../../components/Logo/inAppLogo";
import NavBar from "../../components/Navbar/navbar";
import SearchBar from "../../components/SearchComponents/search";
import Sprout from "../../assets/navbarAssets/sprout.png";


export default function ModeratorViewMonthlyReport() {
    // Dummy data for renter payouts
    const MonthlyReport = [
        { id: 1, numberOfBookings: "129", totalBookingAmount: "$10,320.00", totalRevenue: "$309.60" },
    ];

    return (
        <div className="bg-main-background">
            <div className="flex flex-col items-center justify-center min-h-screen pb-20">
                <div className="p-2 fixed top-0 left-0 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3">
                    <InAppLogo />
                    
                </div>
                <div className='mx-2 px-2 fixed top-12 flex w-full items-center justify-between bg-main-background'>
                    <div className="flex-grow w-full">
                        <SearchBar className="w-full" />
                        
                    </div>
                </div>

                <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 mx-4 ">
                    <div className="pb-5">
                        <p className="text-2xl font-bold text-left ml-2 ">Monthly Reports</p>
                    </div>

                    {/* Report details */}
                    <div className="flex justify-between items-center pb-5 text-left ml-4">
                        <h1 className="text-2xl font-semibold">May 2024</h1>
                        <button className="text-green-500 font-bold py-2 px-4">Download Report PDF</button>
                    </div>

                    {/* Table for Monthly Report */}
                    <table className="min-w-full">
                        <tbody>
                            {MonthlyReport.map((report) => (
                                <tr key={report.id}>
                                    <td className="py-2 px-4 ">
                                        <div className="flex justify-between items-center">
                                            <span className="font-semibold">No. of Bookings</span>
                                            <span className="text-right">{report.numberOfBookings}</span>
                                        </div>
                                        <div className="flex justify-between items-center mt-2">
                                            <span className="font-semibold">Total Booking Amount</span>
                                            <span className="text-right">{report.totalBookingAmount}</span>
                                        </div>
                                        <div className="flex justify-between items-center mt-2">
                                            <span className="font-semibold">Total Revenue 3% </span>
                                            <span className="text-right ">{report.totalRevenue}</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* NavBar at the bottom */}
            <NavBar ProfileColor={"#00B761"} SproutPath={Sprout} />
        </div>
    );
}
