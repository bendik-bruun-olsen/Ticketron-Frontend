// components/Navbar.tsx
import React, { useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Paths } from '../../../paths'
import NavMenu from './NavMenu'
import { ArrowUturnLeftIcon, Bars4Icon } from '@heroicons/react/24/solid'

interface NavbarProps {
    title: string
    leftAction: JSX.Element
}

const Navbar = ({ title, leftAction }: NavbarProps): JSX.Element => {
    const [open, setOpen] = useState(false)

    return (
        <>
            <nav className="h-14 bg-white w-full flex  justify-between content-center items-center p-4 border-b border-b-grey">
                {leftAction ?? <></>}

                <p className="text-center font-bold">{title ?? ''}</p>
                <button onClick={() => setOpen(true)}>
                    <Bars4Icon className="size-6 justify-self-end text-red-600" />
                </button>
            </nav>
            <NavMenu isOpen={open} setIsOpen={setOpen} />
        </>
    )
}

export default Navbar

export const ReturnButton = () => {
    const handleNavigate = () => {
        history.back()
    }

    return (
        <button onClick={handleNavigate}>
            <ArrowUturnLeftIcon className="size-6 justify-self-end text-red-600" />
        </button>
    )
}
