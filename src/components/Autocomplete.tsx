import React, { useState, useCallback, useEffect } from 'react'
import { TextInput } from 'flowbite-react'
import { fetchData, postData } from '../utils'
import { Group, User } from './types'
import { PlusIcon, UserGroupIcon, UserIcon } from '@heroicons/react/24/solid'
import { UserMinusIcon } from '@heroicons/react/24/outline'

interface Props {
    field: string
    selected: Array<User | Group>
    setSelected: React.Dispatch<React.SetStateAction<Array<User | Group>>>
    multiple?: boolean
    options: Array<User>
    placeholder?: string
    refetchOptions?: () => void
    addNewUser?: boolean
}

export const Autocomplete = ({
    field,
    selected,
    setSelected,
    multiple = true,
    options,
    placeholder = 'Select user',
    refetchOptions,
    addNewUser = false,
}: Props) => {
    const [filteredSuggestions, setFilteredSuggestions] =
        useState<Array<User> | null>(null)
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [userInput, setUserInput] = useState('')

    const handleInputChange = (e) => {
        setUserInput(e.target.value)
        if (userInput.length !== 0 || userInput !== '') {
            setFilteredSuggestions(
                options.filter(
                    (option) =>
                        option.name
                            ?.toLocaleLowerCase()
                            .includes(e.target.value.toLocaleLowerCase()) &&
                        !selected.includes(option)
                )
            )
            setShowSuggestions(true)
        } else {
            setShowSuggestions(false)
            setFilteredSuggestions(options)
        }
    }

    const handleSelect = (suggestion) => {
        if (multiple) {
            if (selected.includes(suggestion)) {
                setSelected(selected.filter((s) => s !== suggestion))
            } else {
                setUserInput('')
                setSelected([...selected, suggestion])
                if (filteredSuggestions) {
                    setFilteredSuggestions(
                        filteredSuggestions.filter((s) => s !== suggestion)
                    )
                }
                setShowSuggestions(false)
            }
        } else {
            setSelected([suggestion])
            setShowSuggestions(false)
        }
    }

    const handleRemove = (suggestion) => {
        setSelected(selected.filter((s) => s !== suggestion))
    }

    const handleAddUnregisterdUser = async () => {
        const newUser = await postData('/UnregUser/create', { name: userInput })
        handleSelect(newUser)
        if (refetchOptions) refetchOptions()
    }

    return (
        <div className="relative">
            <div className="flex gap-2 mb-2 flex-wrap">
                {selected.map((s) => (
                    <div
                        key={s.id}
                        className="chip flex gap-2"
                        onClick={() => handleRemove(s)}
                    >
                        {s.name} <div>x</div>
                    </div>
                ))}
            </div>

            <input
                className="input-contained"
                placeholder={placeholder}
                value={userInput}
                onChange={handleInputChange}
                aria-label="Search"
            />
            {filteredSuggestions && showSuggestions && (
                <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-72 overflow-scroll">
                    {filteredSuggestions.map((suggestion, index) => (
                        <div
                            className="px-4 py-2 cursor-pointer hover:bg-gray-200 flex gap-2 justify-between"
                            key={index}
                            onClick={() => handleSelect(suggestion)}
                            onBlur={() => setShowSuggestions(false)}
                        >
                            <div className="flex gap-2 items-center width-full">
                                {multiple && (
                                    <input
                                        type="checkbox"
                                        id="index"
                                        className="accent-pink-500"
                                        name={suggestion[field]}
                                        onChange={() =>
                                            handleSelect(suggestion)
                                        }
                                        checked={selected.includes(suggestion)}
                                    />
                                )}
                                <label htmlFor={suggestion[field]}>
                                    {suggestion[field]}
                                </label>
                            </div>
                            <div className="justify-self-end !important">
                                {'email' in suggestion ? (
                                    <UserIcon className="size-4" />
                                ) : 'users' in suggestion ? (
                                    <UserGroupIcon className="size-4" />
                                ) : (
                                    <UserMinusIcon className="size-4" />
                                )}
                            </div>
                        </div>
                    ))}
                    {userInput.length !== 0 && addNewUser && (
                        <div
                            key="newUser"
                            className="px-4 py-2 cursor-pointer hover:bg-gray-200 flex gap-2 items-center "
                            onClick={handleAddUnregisterdUser}
                        >
                            <PlusIcon className="size-4" /> Add unregistered
                            user
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
