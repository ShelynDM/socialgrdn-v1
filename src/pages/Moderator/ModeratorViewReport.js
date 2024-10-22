


import { SlArrowRight } from "react-icons/sl";
import InAppLogo from "../../components/Logo/inAppLogo";

import SearchBar from "../../components/SearchComponents/search";
import NavBarModerator from "../../components/Navbar/navbarmoderator";

export default function ModeratorViewReport() {
    // Dummy data for renter payouts
    const reports = [
        { id: 1, month: "September", amount: "$1200" },
        { id: 2, month: "October", amount: "$950" },
        { id: 3, month: "November", amount: "$875" },
        { id: 4, month: "December", amount: "$1400" },
    ];

    return (
        <div className="bg-main-background">
            <div className="flex flex-col items-center justify-center gap-2 min-h-screen mx-4 pb-20">
                <div className="p-2 fixed top-0 left-0 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3">
                    <InAppLogo />
                </div>
                <div className='mx-2 px-2 fixed top-12 flex w-full items-center justify-between bg-main-background'>
                    <div className="flex-grow w-full">
                        <SearchBar className="w-full" />
                        
                    </div>
                </div>

                
                <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 mx-4 mb-20">
                    <div className="pb-5">
                        <p className="text-2xl font-bold text-left ">Reports</p>
                    </div>

                    <h1 className="text-2xl font-semibold text-left ml-4">2024</h1>

                    <table className="min-w-full ">
                        <tbody>
                            {reports.map((report) => (
                                <tr key={report.id} >
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
