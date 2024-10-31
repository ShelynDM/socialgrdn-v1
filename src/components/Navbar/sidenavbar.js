/**
 * sidenavbar.js
 * Description: Navigation side bar for reports.
 * Author: Lilian Huh
 * Date: 2024-10-23
 */

import React from "react";
import { useNavigate } from "react-router-dom";

const SideNavBar = React.forwardRef(({ isOpen, onClose }, ref) => {
    const navigate = useNavigate();

    const handleNavToMyEarnings = () => {
        navigate('/GrossEarnings');
    };
    const handleNavToPayouts = () => {
        navigate('/Payouts');
    };

    return (
        <div
            ref={ref}
            className={`fixed top-0 right-0 h-full w-1/2 sm:w-1/3 md:w-1/2 lg:w-1/2 xl:w-1/3
                 bg-white shadow-lg transform transition-transform duration-300 z-10
                  ${isOpen ? "translate-x-0" : "translate-x-full"
                }`}
        >
            <div className="p-4 mt-10">

                <p className="block py-4 px-8 hover:font-bold border-b-2 border-slate-600" onClick={handleNavToMyEarnings}>
                    Gross Earnings
                </p>
                <p className="block py-4 px-8 hover:font-bold" onClick={handleNavToPayouts}>
                    Payouts
                </p>
            </div>
        </div>
    );
});

export default SideNavBar;
