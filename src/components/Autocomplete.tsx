import React, { useState } from 'react'
import { TextInput, Dropdown } from 'flowbite-react'

export const Autocomplete = () => {
    const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([])
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [userInput, setUserInput] = useState('')

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
        }
        if (userInput.length === 0) {
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
                <Dropdown
                    className="absolute z-10 w-full mt-1 rounded-md border"
                    style={{ position: 'absolute' }}
                >
                    {filteredSuggestions.map((suggestion, index) => (
                        <Dropdown.Item
                            key={index}
                            onClick={() => handleSelect(suggestion)}
                            className="cursor-pointer"
                        >
                            {suggestion}
                        </Dropdown.Item>
                    ))}
                </Dropdown>
            )}
        </div>
    )
}
