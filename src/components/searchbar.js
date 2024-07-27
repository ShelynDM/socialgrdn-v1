import ReactSearchBox from "react-search-box";
import { FaSearch } from "react-icons/fa";

export default function SearchBar() {
    return (
    <div className="p-2 fixed top-0 mt-10 px-8 mx-auto w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3">
        <ReactSearchBox placeholder="Search" inputFontColor="black" inputBorderColor="black" leftIcon={<FaSearch className="text-gray-500" />}/>
      </div>

    );
    }