import React, {useState} from "react";
import NavBar from "../../components/Navbar/navbar";
import InAppLogo from "../../components/Logo/inAppLogo";
import Sprout from "../../assets/navbarAssets/sprout.png";
import SearchResult from "../../components/SearchComponents/searchResult";
import SearchBar from "../../components/SearchComponents/search";
import SearchFilter from "../../components/SearchComponents/popupSearchFilter";
import FilterButton from "../../components/SearchComponents/filterButton";

export default function Search() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const searchClicked = () => {
        openPopup();
        console.log("Search Filter Clicked");
    }
  
    const openPopup = () => {
        setIsPopupOpen(true);
    };
  
    const closePopup = () => {
        setIsPopupOpen(false);
    };


    return (
        <div className='bg-main-background'>
            <div className="flex flex-col items-center justify-center gap-2 min-h-screen mx-4 pb-20 bg-main-background">
                <div className='p-2 fixed top-0 left-0 w-auto sm:w-2/4 md:w-2/3 lg:w-1/2 xl:w-1/3 bg-main-background'>
                    <InAppLogo/>
                </div>
                {/* Search Bar Section */}
                <div className='mx-2 px-2 fixed top-12 flex w-full items-center justify-between bg-main-background'>
                    <div className="flex-grow w-full">
                        <SearchBar className="w-full" />
                    </div>
                    <button>
                        <FilterButton onclick={searchClicked} />
                    </button>
                </div>
                <div className="w-auto">
                    <SearchFilter isOpen={isPopupOpen} onClose={closePopup} />
                </div>
                {/* Search Results Section */}
                <div className="flex flex-col w-full justify-center items-center mt-20 gap-8">
                    <div className="flex w-full justify-start pt-4 items-start  ">
                        <p className="text-start">Recommendations</p>
                    </div>
                    <SearchResult zoneColor={"f00"}/>
                    <SearchResult zoneColor={"f00"}/>
                    <SearchResult zoneColor={"f00"}/>
                    <SearchResult zoneColor={"f00"}/>
                    <SearchResult zoneColor={"f00"}/>
                    <SearchResult zoneColor={"f00"}/>
                    <SearchResult zoneColor={"f00"}/>
                    <SearchResult zoneColor={"f00"}/>                     
                </div>
                {/* Navigation Bar */}
                <NavBar SearchColor={"#00B761"} SproutPath={Sprout} />
            </div>
        </div>
    );
}