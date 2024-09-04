//import { useNavigate } from "react-router-dom";

import InAppLogo from "../../components/Logo/inAppLogo";
import NavBar from "../../components/Navbar/navbar";
import GreenSprout from "../../assets/navbarAssets/sproutGreen.png";
import BackButton from "../../components/Buttons/backButton";

export default function GrossEarnings() {

    // Dummy data for renter payouts
    const renterPayouts = [
        { id: 1, year: 2024, month: "September", amount: "$1200" },
        { id: 2, year: 2024, month: "October", amount: "$950" },
        { id: 3, year: 2024, month: "November", amount: "$875" },
        { id: 4, year: 2024, month: "December", amount: "$1400" },
    ];

    /*const navigate = useNavigate();

     const handleBackToReservations = () => {
         navigate('/Reservations');
    };
    */


    return (
        <div className='bg-main-background relative'>
            <InAppLogo />

            <div className="flex flex-col gap-2 min-h-screen pb-20 pt-10">
                <BackButton />
                <div className="">
                    <div className="pb-5">
                        <p className="text-2xl font-bold text-center">Gross Earnings</p>
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
