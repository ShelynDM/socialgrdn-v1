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
                <div className="text-center">
                    <p className="text-2xl font-bold">Your cancellation</p>
                    <p className="text-2xl font-bold">confirmation</p>

                    <p className="pt-5">Your reservation</p>
                    <p>has been cancelled</p>

                    <button
                        className="mt-5 text-teal-600 text-xl font-bold block mx-auto"
                        onClick={handleBackToReservations}
                    >
                        Back to My Reservation
                    </button>
                </div>
            </div>
            <NavBar SproutPath={GreenSprout} />
        </div>
    );
}
