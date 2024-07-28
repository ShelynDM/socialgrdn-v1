import React from 'react';
import { Link } from 'react-router-dom';

const LongButton = ({ buttonName, onClick, className, type = 'button', pagePath }) => {
    const commonClasses = `py-2 px-4 rounded shadow-lg ${className}`;

    if (pagePath) {
        return (
            <Link to={pagePath}>
                    <button onClick={onClick} className={commonClasses} type={type}>
                        {buttonName}
                    </button>
            </Link>
        );
    }

    return (
            <button onClick={onClick} className={commonClasses} type={type}>
                {buttonName}
            </button>
    );
};

export default LongButton;
