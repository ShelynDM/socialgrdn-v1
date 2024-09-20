import React from "react";
import { LuListFilter } from "react-icons/lu";

export default function Search({onclick}) {

    return (
        <button type="filter" className="flex items-start justify-start w-auto h-auto z-50" onClick={onclick}>
            <LuListFilter className="ml-2 my-2 text-2xl " />
        </button>
    );
}