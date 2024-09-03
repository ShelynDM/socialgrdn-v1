import InAppLogo from "../../components/Logo/inAppLogo";
import NavBar from "../../components/Navbar/navbar";
import Sprout from "../../assets/navbarAssets/sprout.png";
import BackMoreButton from "../../components/Buttons/backMoreButton";

export default function ListingConfirmation() {
    return (
        <div className="bg-main-background min-h-screen flex flex-col justify-between">
            <InAppLogo />
            <BackMoreButton />
            <div className="flex flex-col items-center justify-center gap-4 flex-grow pb-20">
                <div className="px-4 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 mb-28">
                    <div className="mb-6 text-center">
                        <h1 className="text-2xl font-semibold">Thank you for listing your Property!</h1>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6 text-center">
                        <h2 className="text-lg font-medium">
                            Your listing has been successfully created. "PROPERTY NAME" is ready to be rented. You can find it under your listings page.
                        </h2>
                    </div>

                    <div className="flex justify-center mt-8">
                        <button 
                            className="text-green-600 font-bold hover:font-extrabold"
                            aria-label="Back to my listings"
                        >
                            Back to my listings
                        </button>
                    </div>
                </div>
            </div>
            <NavBar ProfileColor={"#00B761"} SproutPath={Sprout} />
        </div>
    );
}
