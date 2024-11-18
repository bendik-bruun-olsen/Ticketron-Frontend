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
}

export const Autocomplete = ({ path, field, selected, setSelected }: Props) => {
    const [filteredSuggestions, setFilteredSuggestions] =
        useState<Array<User> | null>(null)
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [userInput, setUserInput] = useState('')
    const [options, setOptions] = useState<Array<User> | null>(null)

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const data = await fetchData(`${path}`)
                setOptions(data)
                setFilteredSuggestions(options)
            } catch (error) {
                console.log(error)
            }
        }
        fetchOptions()
    }, [])

    const handleInputChange = (e) => {
        const input = e.target.value
        setUserInput(input)

        if (filteredSuggestions) {
            setFilteredSuggestions(
                filteredSuggestions.filter((suggestion) =>
                    suggestion[field]
                        ?.toLocaleLowerCase()
                        .includes(input.toLocaleLowerCase())
                )
            )
            setShowSuggestions(true)
        } else {
            setFilteredSuggestions(options)
            setShowSuggestions(false)
        }
    }

    const handleSelect = (suggestion) => {
        setUserInput(suggestion[field] || 'No response found')
        setSelected([...selected, suggestion])
        setFilteredSuggestions(options)
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
            {showSuggestions && filteredSuggestions && (
                <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
                    {filteredSuggestions.map((suggestion, index) => (
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
