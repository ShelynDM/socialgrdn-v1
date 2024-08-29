import React from "react";

export default function PopupSearchFilter({ isOpen, onClose }) {
    return (
        <div
            className={`fixed top-0 right-0 h-full w-full sm:w-1/3 md:w-1/2 lg:w-1/2 xl:w-1/3 bg-white shadow-lg transform transition-transform duration-300 z-10 ${
                isOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
            <div className="p-4">
                <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                    Close
                </button>
                <form className="mt-4">
                    <h1 className="text-xl font-bold">Filters</h1>
                    <label className="mt-2 text-gray-600">
                        <h2>Price</h2>
                        <div>
                            <input type="range" min="0" max="1000" className="w-full" />
                        </div>
                        <div className="flex flex-row items-center">
                            <p>$</p>
                            <input type="text" placeholder="0" className="w-full m-2 border-2 border-gray-200 rounded-xl p-2" />
                            <p> - </p>
                            <input type="text" placeholder="1000" className="w-full m-2 border-2 border-gray-200 rounded-xl p-2" />
                        </div>
                    </label>
                    <div className="mt-2">
                        <h2>Type of Crops</h2>
                        <div className="m-1">
                            <input type="radio" name="Fruits" value="Fruit"/>
                            <label> Fruit</label>
                        </div>
                        <div className="m-1">
                            <input type="radio" name="Vegetable" value="Vegetable"/>
                            <label> Vegetable</label>
                        </div>
                    </div>
                    <label className="m-2 text-gray-600">
                        <h2>Garden Size</h2>
                        <div>
                            <input type="range" min="0" max="1000" className="w-full" />
                        </div>
                        <div className="flex flex-row items-center">
                            <input type="text" placeholder="0" className="w-full m-2 border-2 border-gray-200 rounded-xl p-2" />
                            <p> - </p>
                            <input type="text" placeholder="1000" className="w-full m-2 border-2 border-gray-200 rounded-xl p-2" />
                            <p>sqft.</p>
                        </div>
                    </label>
                    <h2>Soil Types</h2>
                    <div className="flex flex-row gap-10 mt-2">
                        <div className="flex flex-col">
                            <div className="m-1">
                                <input type="radio" name="Loam" value="Loam"/>
                                <label> Loam</label>
                            </div>
                            <div className="m-1">
                                <input type="radio" name="Clay" value="Clay"/>
                                <label> Clay</label>
                            </div>
                            <div className="m-1">
                                <input type="radio" name="Sandy" value="Sandy"/>
                                <label> Sandy</label>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div className="m-1">
                                <input type="radio" name="Silty" value="Silty"/>
                                <label> Silty</label>
                            </div>
                            <div className="m-1">
                                <input type="radio" name="Chalk" value="Chalk"/>
                                <label> Chalk</label>
                            </div>
                            <div className="m-1">
                                <input type="radio" name="Peat" value="Peat"/>
                                <label> Peat</label>
                            </div>
                        </div>
                        
                    </div>
                    <button className="bg-green-500 text-white px-4 py-2 mt-4 rounded-lg">Apply</button>

                </form>
            </div>
        </div>
    );
}
