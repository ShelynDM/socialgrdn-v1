import React from "react";
import { LuListFilter } from "react-icons/lu";

export default function FilterButton({onclick}) {

    return (
        <button type="filter" className="flex items-start justify-start w-auto h-auto z-50" onClick={onclick}>
            <LuListFilter className=" m-1 text-2xl " />
        </button>
    );
}