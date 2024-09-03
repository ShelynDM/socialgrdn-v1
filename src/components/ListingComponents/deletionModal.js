import React from "react";

const DeletionModal = ({ onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-md shadow-lg max-w-sm w-full text-center">
                <p className="text-lg font-semibold">Permanently delete listing?</p>
                <p className="text-sm text-gray-600 mt-2">Are you sure you want to permanently delete your listing?</p>
                <p className="text-sm text-gray-600 mt-2">This action cannot be undone.</p>
                <div className="flex justify-center space-x-4 mt-6">
                    <button 
                        onClick={onClose} 
                        className="px-8 py-2 bg-white rounded-full border border-black hover:bg-gray-100"
                    >
                        No
                    </button>
                    <button className="px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeletionModal;
