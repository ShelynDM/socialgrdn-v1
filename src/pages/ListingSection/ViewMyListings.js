/**
 * ViewMyListings.js
 * Description: Page for users to add a property listing
 * FrontEnd: Lilian Huh
 * BackEnd: Donald Uy
 * Date: 2024-10-23
 */

// Import necessary libraries
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InAppLogo from "../../components/Logo/inAppLogo";
import NavBar from "../../components/Navbar/navbar";
import Sprout from "../../assets/navbarAssets/sprout.png";
import LongButton from "../../components/Buttons/longButton";
import SideNavBar from "../../components/Navbar/sidenavbar";
import { useUser } from "../../UserContext";
import BackMoreButton from "../../components/Buttons/backMoreButton";

export default function ViewMyListings() {
  // Initialize state variables
  const [listings, setListings] = useState([]);
  const [isSideNavOpen, setSideNavOpen] = useState(false);
  const sideNavRef = useRef(null);
  const { userId } = useUser(); // Get user ID from UserContext
  const navigate = useNavigate();

  // Format address for display
  const formatAddress = (listing) => {
    const { address_line1, city, province, postal_code } = listing;
    return `${address_line1}, ${city}, ${province}, ${postal_code}`;
  };

  // Open and close side navigation bar
  const openSideNav = () => {
    setSideNavOpen(true);
  };
  const closeSideNav = () => {
    setSideNavOpen(false);
  };
  // Navigate to ViewMyProperty page
  const handleViewClick = (propertyId) => {
    navigate(`/ViewMyProperty/${propertyId}`);
  };

  // Fetch user's property listings
  useEffect(() => {
    const fetchListings = async () => {
      try {
        // Fetch user's property listings
        const response = await fetch(`/api/getUserProperties?userID=${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch property listings");
        }
        // Set listings state variable
        const data = await response.json();
        setListings(data);
      } catch (error) {
        console.error("Error fetching property listings:", error);
      }
    };
    // Fetch listings if user ID is available
    if (userId) {
      fetchListings();
    }
  }, [userId]);

  // Close side navigation bar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sideNavRef.current && !sideNavRef.current.contains(event.target)) {
        closeSideNav();
      }
    };
    // Add event listener when component mounts
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-main-background relative">
      <InAppLogo />
      <div className="flex flex-col items-center justify-center mt-6">
        <BackMoreButton />
        <div className="px-4 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 mb-32">
          <LongButton
            buttonName="+ Add New Listing"
            className="w-full rounded shadow-lg bg-green-500 text-black font-semibold mb-6 mt-4"
            pagePath="/AddProperty"
          />
          <div className="text-center mb-6">
            <h1 className="text-xl font-normal">
              You have {listings.length} listings
            </h1>
          </div>

          <SideNavBar
            ref={sideNavRef}
            isOpen={isSideNavOpen}
            onClose={closeSideNav}
          />

          <div className="w-full space-y-4">
            {listings.length > 0
              ? listings.map((listing) => (
                  <div
                    key={listing.property_id}
                    onClick={() => handleViewClick(listing.property_id)}
                    className="flex items-center bg-white rounded-lg shadow-md p-4 relative cursor-pointer"
                  >
                    <img
                      src={
                        listing.image_url || "https://via.placeholder.com/150"
                      }
                      alt={listing.property_name}
                      className="w-72 h-32 object-cover rounded-lg mr-4"
                    />
                    <div className="flex flex-col justify-between h-full w-full">
                      <div>
                        <h2 className="text-lg font-semibold">
                          {listing.property_name}
                        </h2>
                        <p className="text-sm text-gray-600">
                          {formatAddress(listing) || "No address available"}
                        </p>
                      </div>
                      <div className="mt-2 text-green-600 text-sm font-extrabold px-3 py-1 absolute bottom-4 right-4">
                            View
                      </div>
                    </div>
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>
    </div>
  );
}
