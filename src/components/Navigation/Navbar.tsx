// components/Navbar.tsx
import React, { useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Paths } from '../../../paths'
import NavMenu from './NavMenu'
import { ArrowUturnLeftIcon, Bars4Icon } from '@heroicons/react/24/solid'

const Navbar: React.FC = () => {
    const [open, setOpen] = useState(false)
    const matchRoute = useLocation()

    return (
        <>
            <nav className="h-14 bg-white w-full flex fixed justify-between content-center items-center p-4 border-b border-b-grey">
                {Values[matchRoute.pathname]?.leftAction ?? <></>}

                <p className="text-center font-bold">
                    {Values[matchRoute.pathname]?.title ?? ''}
                </p>
                <button onClick={() => setOpen(true)}>
                    <Bars4Icon className="size-6 justify-self-end text-red-600" />
                </button>
            </nav>
            <NavMenu isOpen={open} setIsOpen={setOpen} />

            <div className="mx-auto max-w-screen-sm">
                <div className="pt-16">
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default Navbar

const handleNavigate = () => {
    history.back()
}

const Values = {
    [Paths.LOGIN]: { title: 'Login', leftAction: <></> },
    [Paths.HOME]: { title: 'Bookings', leftAction: <div></div> },
    [Paths.USER_PROFILE]: {
        title: 'Profile',
        leftAction: (
            <button onClick={handleNavigate}>
                <ArrowUturnLeftIcon className="size-6 justify-self-end text-red-600" />
            </button>
        ),
    },
    [Paths.EDIT_USER_PROFILE]: {
        title: 'Edit Profile',
        leftAction: (
            <button onClick={handleNavigate}>
                <ArrowUturnLeftIcon className="size-6 justify-self-end text-red-600" />
            </button>
        ),
    },

    [Paths.BOOKING_DETAILS]: {
        title: 'Booking Details',
        leftAction: (
            <button onClick={handleNavigate}>
                <ArrowUturnLeftIcon className="size-6 justify-self-end text-red-600" />
            </button>
        ),
    },
    [Paths.ADD_BOOKING]: {
        title: 'New Booking',
        leftAction: (
            <button onClick={handleNavigate}>
                <ArrowUturnLeftIcon className="size-6 justify-self-end text-red-600" />
            </button>
        ),
    },
    [Paths.TICKET_DETAILS]: {
        title: 'Ticket',
        leftAction: (
            <button>
                <ArrowUturnLeftIcon className="size-6 justify-self-end text-red-600" />
            </button>
        ),
    },
    [Paths.GROUP_DETAILS]: {
        title: 'Groups',
        leftAction: (
            <button onClick={handleNavigate}>
                <ArrowUturnLeftIcon className="size-6 justify-self-end text-red-600" />
            </button>
        ),
    },
    [Paths.NEW_GROUP]: {
        title: 'Add new group',
        leftAction: (
            <button onClick={handleNavigate}>
                <ArrowUturnLeftIcon className="size-6 justify-self-end text-red-600" />
            </button>
        ),
    },
}
