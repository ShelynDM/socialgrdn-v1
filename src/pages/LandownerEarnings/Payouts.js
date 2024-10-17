// // Payouts.jsx
// import InAppLogo from "../../components/Logo/inAppLogo";
// import NavBar from "../../components/Navbar/navbar";
// import GreenSprout from "../../assets/navbarAssets/sproutGreen.png";
// import BackButton from "../../components/Buttons/backButton";
// import { FiChevronRight } from "react-icons/fi";

// export default function Payouts() {
//   // Dummy data for renter payouts
//   const renterPayouts = [
//     { id: 1, year: 2024, month: "September", amount: "$42.00" },
//     { id: 2, year: 2024, month: "October", amount: "$42.98" },
//     { id: 3, year: 2024, month: "November", amount: "$52.56" },
//     { id: 4, year: 2024, month: "December", amount: "$54.84" },
//   ];

//   return (
//     <div className="bg-main-background flex flex-col min-h-screen">
//       {/* Logo Section */}
//       <header className="p-4 flex items-center justify-between">
//         <div className='p-2 fixed top-0 left-0 w-auto sm:w-2/4 md:w-2/3 lg:w-1/2 xl:w-1/3 bg-main-background'>
//             <InAppLogo />
//         </div>
//       </header>
//       <div className="pt-4">
//         <BackButton />
//         </div>

//       {/* Back Button and Dropdown */}
//       <div className="px-4">
//         <div className="flex items-center justify-between border rounded-lg px-4 py-2 mt-4">
//           <span className="text-lg font-medium">Upcoming Payouts</span>
//           <span className="text-xl">&#9662;</span>
//         </div>
//       </div>

//       {/* Payouts List */}
//       <div className="px-4 mt-6">
//         <h2 className="text-2xl font-bold mb-2">Upcoming Payouts</h2>
//         <p className="text-gray-600 text-sm mb-4">2024</p>
//         <div className="space-y-2">
//           {renterPayouts.map((payout) => (
//             <div
//               key={payout.id}
//               className="flex justify-between items-center bg-white py-3 px-4 rounded-lg shadow-sm"
//             >
//               <span className="text-gray-700">{payout.month}</span>
//               <div className="flex items-center">
//                 <span className="mr-2 font-bold">{payout.amount}</span>
//                 <FiChevronRight />
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Bottom Navigation */}
//       <NavBar SproutPath={GreenSprout} />
//     </div>
//   );
// }

//import { useNavigate } from "react-router-dom";

import InAppLogo from "../../components/Logo/inAppLogo";
import NavBar from "../../components/Navbar/navbar";
import GreenSprout from "../../assets/navbarAssets/sproutGreen.png";
import BackButton from "../../components/Buttons/backButton";



export default function Payouts() {

    // Dummy data for renter payouts
    const renterPayouts = [
        { id: 1, year: 2024, month: "September", amount: "$1200" },
        { id: 2, year: 2024, month: "October", amount: "$950" },
        { id: 3, year: 2024, month: "November", amount: "$875" },
        { id: 4, year: 2024, month: "December", amount: "$1400" },
    ];



    return (
    <div className="bg-main-background flex flex-col min-h-screen">
        {/* Logo Section */}
        <header className="p-4 flex items-center justify-between">
            <div className='p-2 fixed top-0 left-0 w-auto sm:w-2/4 md:w-2/3 lg:w-1/2 xl:w-1/3 bg-main-background'>
                <InAppLogo />
            </div>
        </header>
        <div className="pt-4">
            <BackButton />
        </div>
            <div className="flex flex-col gap-2 min-h-screen pb-20 pt-10">
                <div className="">
                    <div className="pb-5">
                        <p className="text-2xl font-bold text-center">Payouts</p>
                    </div>

                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b text-left">Year</th>
                                <th className="py-2 px-4 border-b text-left">Month</th>
                                <th className="py-2 px-4 border-b text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renterPayouts.map((payout) => (
                                <tr key={payout.id}>
                                    <td className="py-2 px-4 border-b">{payout.year}</td>
                                    <td className="py-2 px-4 border-b">{payout.month}</td>
                                    <td className="py-2 px-4 border-b text-right font-bold">CAD {payout.amount}</td>
                                    <td className="py-2 px-4 border-b"><BackButton /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <NavBar SproutPath={GreenSprout} />
        </div>
    );
}


