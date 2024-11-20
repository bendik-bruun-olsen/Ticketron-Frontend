import React, { useState, useCallback, useEffect } from 'react'
import { TextInput } from 'flowbite-react'
import { fetchData } from '../utils'
import { Group, User } from './types'

interface Props {
    field: string
    selected: Array<User | Group>
    setSelected: React.Dispatch<React.SetStateAction<Array<User | Group>>>
    multiple?: boolean
    options: Array<User>
    placeholder?: string
}

export const Autocomplete = ({
    field,
    selected,
    setSelected,
    multiple = true,
    options,
    placeholder = 'Select user',
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
            if (selected.includes(suggestion)) {
                setSelected(selected.filter((s) => s !== suggestion))
            } else {
                setSelected([...selected, suggestion])
            }
        } else {
            setSelected([suggestion])
        }
        setFilteredSuggestions(options)
        setShowSuggestions(false)
    }

    return (
        <div className="relative">
            <textarea
                className="input-contained"
                placeholder={placeholder}
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
                            className="px-4 py-2 cursor-pointer hover:bg-gray-200 flex gap-2 items-center "
                            key={index}
                            onClick={() => handleSelect(suggestion)}
                            onBlur={() => setShowSuggestions(false)}
                        >
                            {multiple && (
                                <input
                                    type="checkbox"
                                    id="index"
                                    className="accent-pink-500"
                                    name={suggestion[field]}
                                    onChange={() => handleSelect(suggestion)}
                                    checked={selected.includes(suggestion)}
                                />
                            )}
                            <label htmlFor={suggestion[field]}>
                                {suggestion[field]}
                            </label>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
