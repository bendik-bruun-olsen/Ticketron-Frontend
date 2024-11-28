import React, { useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'

const SearchFilter = ({ setSearch }) => {
    return (
        <div className=" p-4 flex flex-col gap-10">
            <div className=" relative mb-4">
                <MagnifyingGlassIcon className="absolute top-1/2 left-3 transform -translate-y-1/2 h-5 w-5 text-gray-600" />
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full pl-10 px-4 py-2 rounded-full bg-gray-200 text-gray-600"
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
        </div>
    )
}
export default SearchFilter
