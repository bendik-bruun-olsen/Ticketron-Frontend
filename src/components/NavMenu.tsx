import React from 'react'
import {
    ArrowLeftEndOnRectangleIcon,
    CalendarIcon,
    UserGroupIcon,
    UserIcon,
} from '@heroicons/react/24/solid'

interface MenuProps {
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

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

const NavMenu = ({ isOpen, setIsOpen }: MenuProps): JSX.Element => {
    return (
        <main
            className={
                ' fixed overflow-hidden z-10 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out ' +
                (isOpen
                    ? ' transition-opacity opacity-100 duration-500 translate-x-0  '
                    : ' transition-all delay-500 opacity-0 translate-x-full  ')
            }
        >
            <section
                className={
                    ' w-1/2 max-w-lg right-0 absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  ' +
                    (isOpen ? ' translate-x-0 ' : ' translate-x-full ')
                }
            >
                <h1 className="p-4 text-xl border-b-2">Menu</h1>
                <MenuButton
                    icon={<CalendarIcon className="size-6  text-red-700" />}
                    title={'Bookings'}
                    href={'/'}
                />
                <MenuButton
                    icon={<UserGroupIcon className="size-6 text-red-700" />}
                    title={'Groups'}
                    href={'/groups'}
                />
                <MenuButton
                    icon={<UserIcon className="size-6 text-red-700" />}
                    title={'Edit profile'}
                    href={'/user'}
                />
                <MenuButton
                    icon={
                        <ArrowLeftEndOnRectangleIcon className="size-6 text-red-700" />
                    }
                    title={'Logout'}
                    href={'/logout'}
                />
            </section>
            <section
                className=" w-screen h-full cursor-pointer "
                onClick={() => {
                    setIsOpen(false)
                }}
            ></section>
        </main>
    )
}

export default NavMenu
