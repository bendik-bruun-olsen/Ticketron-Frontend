import React, { useState, useCallback } from 'react'
import { TextInput } from 'flowbite-react'
import { fetchData } from '../utils'

export const Autocomplete = ({ path, field }) => {
    const [filteredSuggestions, setFilteredSuggestions] = useState([])
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [userInput, setUserInput] = useState('')

    const fetchSuggestions = async (query) => {
        try {
            const response = await fetchData(`api/${path}?query=${query}`)
            const data = await response.json()

            const filtered = data.filter((item) =>
                item[field]?.toLowerCase().includes(query.toLowerCase())
            )

            setFilteredSuggestions(filtered)
            setShowSuggestions(filtered.length > 0)
        } catch (error) {
            console.error('Error fetching suggestions:', error)
            setFilteredSuggestions([])
            setShowSuggestions(false)
        }
    }

    const debounce = (func, wait) => {
        let timeout
        return (...args) => {
            clearTimeout(timeout)
            timeout = setTimeout(() => func(...args), wait)
        }
    }

    const debouncedFetchSuggestions = useCallback(
        debounce(fetchSuggestions, 300),
        [path, field]
    )

    const handleInputChange = (e) => {
        const input = e.target.value
        setUserInput(input)

        if (input.length > 0) {
            debouncedFetchSuggestions(input)
        } else {
            setFilteredSuggestions([])
            setShowSuggestions(false)
        }
    }

    const handleSelect = (suggestion) => {
        setUserInput(suggestion[field] || 'No response found')
        setFilteredSuggestions([])
        setShowSuggestions(false)
    }

    return (
        <div className="relative">
            <TextInput
                placeholder="Type to search..."
                value={userInput}
                onChange={handleInputChange}
                aria-label="Search"
            />
            {showSuggestions && filteredSuggestions.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
                    {filteredSuggestions.map((suggestion, index) => (
                        <div
                            key={index}
                            onClick={() => handleSelect(suggestion)}
                            className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                        >
                            {suggestion[field] || 'No response found'}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
