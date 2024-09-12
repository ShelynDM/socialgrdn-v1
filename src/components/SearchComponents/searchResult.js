import React, {useState} from "react";
import PlantIcon from "../../assets/listingAssets/Plant-icon.png";
import FarmAreaIcon from "../../assets/listingAssets/FarmArea-icon.png";
import SoilIcon from "../../assets/listingAssets/Soil-icon.png";
import { Link } from "react-router-dom";
import ExampleImage from "../../assets/exampleAssets/imgExample.jpg";

export default function SearchResult({listingTitle, listingAddress, listerName, listingZone, listingImage, listingCrop, listingFarmArea, listingSoilType}) {
    // const [propertyName, setPropertyName] = useState('');
    // const [username, setUsername] = useState('');
    // const [location, setLocation] = useState('');
    // const [growthZone, setGrowthZone] = useState('');
    // const [produce, setProduce] = useState('');
    // const [dimension, setDimension] = useState('');
    // const [soilType, setSoilType] = useState('');
    const [zoneColor] = useState("#00f");

    return (
        <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 rounded-lg border-2 py-1 border-gray-200 bg-main-background">
            <div className="px-6 pt-2">
                <div className="flex flex-row justify-between mb-2">
                    <div>
                        <h1 className="font-bold text-lg ">{listingTitle}</h1>
                        <p className="text-gray-700 text-sm">{listingAddress}</p>
                    </div>
                    <div>
                        <Link href="#" className="text-green-500 font-bold text-lg ml-auto">View</Link>
                    </div>
                </div>
                <div className="flex flex-row justify-between">
                    <div>
                        <p className="text-xs text-gray-500">Listed by {listerName}</p> 
                    </div>
                    <div className="flex flex-row gap-1">
                        <div className="w-4 h-4 border-1 border-gray-400" style={{ backgroundColor: zoneColor }}></div>
                        <p className="text-xs text-gray-500">Zone {listingZone}</p>
                    </div>
                </div>
            </div>

            <div className="w-auto h-52 flex justify-center items-center mx-4 p-1">
                <img className="w-auto h-full rounded-lg border-2 border-gray-200" src={ExampleImage} alt="Garden" />
            </div>

            <div className="px-4 py-2 flex gap-2 items-center justify-center">
                <div className="flex items-center gap-1 w-1/3 rounded-xl border-2 shadow-md p-2 border-gray-200">
                    <img src={PlantIcon} alt="plant icon" className="w-7 h-7" />
                    <div>
                        <h1 className="text-[10px] text-gray-400">Crop</h1>
                        <p className="text-[10px] text-gray-700">{listingCrop}</p>
                    </div>
                </div>
                <div className="flex items-center gap-1 w-1/3 rounded-xl border-2 shadow-md p-2 border-gray-200">
                    <img src={FarmAreaIcon} alt="farm area icon" className="w-7 h-7" />
                    <div>
                        <h1 className="text-[10px] text-gray-400">Farm Area</h1>
                        <p className="text-[9px] text-gray-700">{listingFarmArea} ft</p>
                    </div>
                </div>
                <div className="flex items-center gap-1 w-1/3 rounded-xl border-2 shadow-md p-2 border-gray-200">
                    <img src={SoilIcon} alt="soil icon" className="w-7 h-7" />
                    <div>
                        <h1 className="text-[10px] text-gray-400">Soil Type</h1>
                        <p className="text-[10px] text-gray-700">{listingSoilType}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}