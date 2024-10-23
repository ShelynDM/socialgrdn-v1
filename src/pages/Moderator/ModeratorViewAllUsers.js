import React from "react";
import InAppLogo from "../../components/Logo/inAppLogo";
import NavBar from "../../components/Navbar/navbar";
import SearchBar from "../../components/SearchComponents/search";

import NavBarModerator from "../../components/Navbar/navbarmoderator";

const users = [
    { image: 'https://via.placeholder.com/150', username: "lili", name:"Lilian Huh", memberSince: "July 2024", activeProperties: "10 active properties" , location: "Calgary,AB", renterOrOwner:"Renter & Owner"},
    { image: 'https://via.placeholder.com/150', username: "shelyndm", name:"Shelyn Del Mundo", memberSince: "June 2024", activeProperties: "7 active properties" , location: "Calgary,AB", renterOrOwner:"Renter & Owner"},
];

export default function ModeratorViewAllUsers() {
    return (
        <div className='bg-main-background'>
            <div className="flex flex-col items-center justify-center gap-2 min-h-screen mx-4 pb-20">
                <div className='p-2 fixed top-0 left-0 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3'>
                    <InAppLogo />
                </div>
                <div className='mx-2 px-2 fixed top-12 flex w-full items-center justify-between bg-main-background'>
                    <div className="flex-grow w-full">
                        <SearchBar className="w-full" />
                    </div>
                </div>

                <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 space-y-4">
                    <h1 className="text-2xl font-semibold">Users</h1>
                    {users.map((user) => (
                        <div key={user.username} className="flex bg-white rounded-lg shadow-md p-4 relative">
                            <img src={user.image} alt={user.username} className="w-32 h-40 object-cover rounded-lg mr-4" />
                            <div className="flex flex-col justify-between w-full">
                                <div className="relative ">
                                    <h1 className="absolute top-0 right-0 text-sm font-semibold text-gray-700 bg-white px-2 py-1 rounded-lg">
                                        {user.renterOrOwner}
                                    </h1>
                                    <h2 className="text-lg font-semibold">{user.username}</h2>
                                    <p className="text-sm text-gray-600">{user.name}</p>
                                    <p className="text-sm text-gray-600">{user.memberSince}</p>
                                    <p className="text-sm text-gray-600">{user.activeProperties}</p>
                                    <p className="text-sm text-gray-600">{user.location}</p>
                                </div>
                                <div className="flex space-x-2  ml-auto mb-2">
                                    <button className="text-green-600 text-sm font-extrabold px-3  ">
                                        View
                                    </button>
                                    <button className="text-red-600 text-sm font-extrabold px-3  ">
                                        Block
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <NavBarModerator UsersColor={"#00B761"} />
            </div>
        </div>
    );
}
