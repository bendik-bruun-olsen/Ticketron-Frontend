import React from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'

const SearchFilter = () => {
    return (
        <div className=" p-4 flex flex-col gap-10">
            <div className="mb-4">
                <MagnifyingGlassIcon className="p-1 absolute box-border top-1/2 size-7 left-0.5 transform -translate-y-1/2 " />
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full px-4 py-2 rounded-full bg-gray-200 text-gray-600"
                />
            </div>
        </div>
    )
}
export default SearchFilter
