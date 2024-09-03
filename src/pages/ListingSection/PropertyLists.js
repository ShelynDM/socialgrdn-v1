//import React, { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";

import InAppLogo from "../../components/Logo/inAppLogo";
import NavBar from "../../components/Navbar/navbar";
import Sprout from "../../assets/navbarAssets/sprout.png";
//import Sidenav from "../../components/Navbar/sidenavbar";
//import { TfiAlignRight } from "react-icons/tfi";
import { IoArrowBackSharp } from "react-icons/io5";
import AddListButton from "../../components/Buttons/longButton";
import ListingView from "../../components/ListingComponents/listingView";

export default function PropertyLists() {
    const navigate = useNavigate();

    const handleNavToMyEarnings = () => {
        navigate('/GrossEarnings');
    };

    // const [isSideNavOpen, setSideNavOpen] = useState(false);

    // const menuClicked = () => {
    //     openSideNav();
    // }

    // const openSideNav = () => {
    //     setSideNavOpen(true);
    // };

    // const closeSideNav = () => {
    //     setSideNavOpen(false);
    // }

    return (
        <div className='bg-main-background'>
            <div className="flex flex-wrap items-start justify-center gap-2 min-h-screen mx-4 pb-20 bg-main-background">
                <div className='p-2 fixed top-0 left-0 w-auto sm:w-2/4 md:w-2/3 lg:w-1/2 xl:w-1/3 bg-main-background'>
                    <InAppLogo />
                </div>
                <div className="flex flex-row fixed top-0 mt-10 mx-4 px-6 w-full justify-between bg-main-background">
                    <button>
                        <IoArrowBackSharp size={25} />
                    </button>
                    <p className="hover:font-bold" onClick={handleNavToMyEarnings}> My Earnings</p>
                    {/* <button onClick={menuClicked}>
                        <TfiAlignRight size={25} />
                    </button> */}
                </div>
                <div className="w-auto flex-wrap mt-20 items-start justify-center ">
                    <AddListButton
                        buttonName='+ Add New List'
                        className='p-2 mx-4 w-96 rounded-lg shadow-lg bg-green-300'
                    />
                    <div>
                        <h1 className="text-center text-xl mt-4">You have 4 listings</h1>
                    </div>
                </div>
                <div>

                </div>
                {/* <div>
                    <Sidenav isOpen={isSideNavOpen} onClose={closeSideNav} />
                </div> */}
                <div className="flex flex-col gap-4">
                    <ListingView />
                    <ListingView />
                    <ListingView />
                    <ListingView />
                </div>
                {/* Navigation Bar */}
                <NavBar SearchColor={"#00B761"} SproutPath={Sprout} />
            </div>
        </div>
    );
}
