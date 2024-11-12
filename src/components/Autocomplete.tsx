import React, { useState } from 'react'
import { TextInput } from 'flowbite-react'

export const Autocomplete = () => {
    const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([])
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [userInput, setUserInput] = useState<string>('')

    const suggestions = ['Oslo', 'Stockholm', 'Helsinki', 'Copenhagen']

    const handleInputChange = (e) => {
        const userInput = e.target.value
        setUserInput(userInput)

        if (userInput.length > 0) {
            const filteredSuggestions = suggestions.filter(
                (suggestion) =>
                    suggestion.toLowerCase().indexOf(userInput.toLowerCase()) >
                    -1
            )
            setFilteredSuggestions(filteredSuggestions)
            setShowSuggestions(true)
        } else {
            setFilteredSuggestions([])
            setShowSuggestions(false)
        }
    }

    const handleSelect = (suggestion) => {
        setUserInput(suggestion)
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
                            {suggestion}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
