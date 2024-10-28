import React from 'react'
import {
    ArrowLeftEndOnRectangleIcon,
    CalendarIcon,
    UserGroupIcon,
    UserIcon,
} from '@heroicons/react/24/solid'
import MenuButton from './NavButton'
import { Paths } from '../../paths'

interface MenuProps {
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
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
                    href={Paths.HOME}
                />
                <MenuButton
                    icon={<UserGroupIcon className="size-6 text-red-700" />}
                    title={'Groups'}
                    href={Paths.GROUP_DETAILS}
                />
                <MenuButton
                    icon={<UserIcon className="size-6 text-red-700" />}
                    title={'Edit profile'}
                    href={Paths.USER_PROFILE}
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
