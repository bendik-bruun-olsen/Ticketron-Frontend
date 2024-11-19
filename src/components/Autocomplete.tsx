import React, { useState, useCallback, useEffect } from 'react'
import { TextInput } from 'flowbite-react'
import { fetchData } from '../utils'
import { Group, User } from './types'

interface Props {
    path: string
    field: string
    selected: Array<User | Group | string>
    setSelected: React.Dispatch<
        React.SetStateAction<Array<User | Group | string>>
    >
    multiple?: boolean
    options: Array<User>
}

export const Autocomplete = ({
    path,
    field,
    selected,
    setSelected,
    multiple = true,
    options,
}: Props) => {
    const [filteredSuggestions, setFilteredSuggestions] =
        useState<Array<User> | null>(null)
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [userInput, setUserInput] = useState('')

    const handleInputChange = (e) => {
        setUserInput(e.target.value)
        if (userInput.length === 0) {
            setFilteredSuggestions(options)
            setShowSuggestions(true)
            return
        }
        if (filteredSuggestions) {
            setFilteredSuggestions(options)
            setShowSuggestions(true)
        } else {
            setFilteredSuggestions(options)
            setShowSuggestions(false)
        }
    }

    const handleSelect = (suggestion) => {
        setUserInput(suggestion[field] || 'No response found')
        if (multiple) {
            setSelected([...selected, suggestion])
        } else {
            setSelected([suggestion])
        }
        setFilteredSuggestions(options)
        setShowSuggestions(false)
    }

    return (
        <div className="relative">
            <input
                className="input-contained"
                placeholder="Type to search..."
                value={selected.map((s) => s[field]).join(', ')}
                onChange={handleInputChange}
                aria-label="Search"
                onFocus={() => setShowSuggestions(!showSuggestions)}
                onClick={() => setShowSuggestions(!showSuggestions)}
            />
            {showSuggestions && options && (
                <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
                    {options.map((suggestion, index) => (
                        <div
                            key={index}
                            onClick={() => handleSelect(suggestion)}
                            onBlur={() => setShowSuggestions(false)}
                            className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                        >
                            {suggestion[field]}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
