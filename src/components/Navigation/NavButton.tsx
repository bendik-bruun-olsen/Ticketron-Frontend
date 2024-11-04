import React from 'react'
import { useNavigate } from 'react-router-dom'

interface Buttonprops {
    icon: JSX.Element
    title: string
    href?: string
    handleClick?: () => void
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const MenuButton: React.FC<Buttonprops> = ({
    icon,
    title,
    href,
    handleClick,
    setIsOpen,
}) => {
    const navigate = useNavigate()

    const ClickButton = () => {
        if (handleClick) handleClick()
        else {
            navigate(href ?? '')
        }
        setIsOpen(false)
    }

    return (
        <button
            type="button"
            className="flex p-2 border-b-2 items-center w-full text-base text-gray-900 transition duration-75  hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            onClick={ClickButton}
        >
            {icon}
            <p className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                {title}
            </p>
        </button>
    )
}

export default MenuButton
