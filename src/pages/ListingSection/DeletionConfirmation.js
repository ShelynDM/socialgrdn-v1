import React from "react";
import InAppLogo from "../../components/Logo/inAppLogo";
// import NavBar from "../../components/navbar";
// import GreenSprout from "../../assets/sproutGreen.png";
// import { IoArrowBackSharp } from "react-icons/io5";
// import SearchBar from "../../components/search";
import DeletionModal from "../../components/ListingComponents/deletionModal";





export default function DeletionConfirmation() {
    const [isModalVisible, setIsModalVisible] = React.useState(false);

    const openModal = () => {
        setIsModalVisible(true);
        console.log("Deletion Modal Opened");
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };


    return (
        <div className='bg-main-background'>
            {/* Main Content */}
            <div className="flex flex-col items-center justify-center min-h-screen mx-4 pb-20 bg-main-background">
                {/* Logo */}
                <div className='p-2 fixed top-0 left-0 w-auto sm:w-2/4 md:w-2/3 lg:w-1/2 xl:w-1/3 bg-main-background'>
                    <InAppLogo/>
                </div>

                {/* Top Bar Section (Back Button, Search) */}
                {/* <div className="flex items-center justify-between fixed top-0 left-0 right-0 mt-10 px-4 bg-main-background">
                    <button>
                        <IoArrowBackSharp size={25} />
                    </button>
                    <div className="flex-grow w-full">
                        <SearchBar className="w-full" />
                    </div>
                </div> */}

                {/* Deletion Confirmation Section */}
                <div className="flex flex-col items-center justify-center w-full mt-24">
                    <p className="font-bold text-2xl">Your Listing has been deleted.</p>
                    <button className="w-1/2 mt-4 p-2 text-green-600 font-bold ">Back to my Listings</button>
                </div>

                <button className="w-1/2 mt-4 p-2 text-red-600 font-bold " onClick={openModal}>Delete Listing</button>

                {/* Conditionally render the DeletionModal */}
                {isModalVisible && <DeletionModal onClose={closeModal}/>}
            </div>
            {/* <NavBar SproutPath={GreenSprout} /> */}

        </div>
    );
}