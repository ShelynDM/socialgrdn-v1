//import { useNavigate } from "react-router-dom";

import InAppLogo from "../../components/Logo/inAppLogo";
import NavBar from "../../components/Navbar/navbar";
import GreenSprout from "../../assets/navbarAssets/sproutGreen.png";

export default function GrossEarnings() {

    /*const navigate = useNavigate();

     const handleBackToReservations = () => {
         navigate('/Reservations');
    };
    */


    return (
        <div className='bg-main-background relative'>
            <InAppLogo />
            <div className="flex flex-col justify-center gap-2 min-h-screen pb-20 pt-10">
                <div className="">
                    <p className="text-2xl font-bold text-center">Gross Earnings</p>
                </div>
            </div>
            <NavBar SproutPath={GreenSprout} />
        </div>
    );
}
