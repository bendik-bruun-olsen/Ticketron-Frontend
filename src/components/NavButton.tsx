import React from 'react'

interface Buttonprops {
    icon: JSX.Element
    title: string
    href: string
}

const MenuButton = ({ icon, title, href }: Buttonprops): JSX.Element => {
    return (
        <button
            type="button"
            className="flex p-2 border-b-2 items-center w-full text-base text-gray-900 transition duration-75  hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            onClick={() => location.replace(href)}
        >
            {icon}
            <p className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                {title}
            </p>
        </button>
    )
}

export default MenuButton
