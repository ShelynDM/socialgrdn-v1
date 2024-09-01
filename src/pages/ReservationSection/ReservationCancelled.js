import { useNavigate } from "react-router-dom";

import InAppLogo from "../../components/Logo/inAppLogo";
import NavBar from "../../components/Navbar/navbar";
import GreenSprout from "../../assets/navbarAssets/sproutGreen.png";

export default function ReservationCancelled() {

    const navigate = useNavigate();

    const handleBackToReservations = () => {
        navigate('/Reservations');
    };


    return (
        <div className='bg-main-background relative'>
            <InAppLogo />

            <div className="flex flex-col justify-center gap-2 min-h-screen pb-20 pt-10">


                <div className="">
                    <p className="text-2xl font-bold  text-center">Your cancellation</p>
                    <p className="text-2xl font-bold  text-center">confirmation</p>

                    <p className="pt-5 text-center">Your reservation </p>
                    <p className="text-center">has been cancelled</p>

                    <p className="mt-5 text-teal-600 text-xl font-bold text-center"
                        onClick={handleBackToReservations}>Back to My Reservation</p>
                </div>
            </div>
            <NavBar SproutPath={GreenSprout} />
        </div>
    );
}
