import React from 'react';
import { Link } from 'react-router-dom';

const LongButton = ({ buttonName, className, onClick, pagePath }) => {
    return (
        
        <div className="px-4 block w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3">
            <Link to={pagePath}>
                <button className={className} onClick={onClick}>
                    {buttonName}
                </button>
            </Link>
        </div>
    );
};

export default LongButton;