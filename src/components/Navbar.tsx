// components/Navbar.tsx
import React, { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Paths } from '../../paths'
import NavMenu from './NavMenu'
import { ArrowUturnLeftIcon, Bars4Icon } from '@heroicons/react/24/solid'

const Navbar: React.FC = () => {
    const [open, setOpen] = useState(false)
    const matchRoute = useLocation()

    return (
        <>
            <nav className="h-14 w-full flex justify-between content-center items-center p-4 border-b border-b-grey">
                {Values[matchRoute.pathname]?.leftAction ?? <></>}

                <p className="text-center font-bold">
                    {Values[matchRoute.pathname]?.title ?? ''}
                </p>
                <button onClick={() => setOpen(true)}>
                    <Bars4Icon className="size-6 justify-self-end text-red-600" />
                </button>
            </nav>
            <NavMenu isOpen={open} setIsOpen={setOpen} />
            <Outlet />
        </>
    )
}

export default Navbar

const Values = {
    [Paths.LOGIN]: { title: 'Login', leftAction: <></> },
    [Paths.HOME]: { title: 'Bookings', leftAction: <div></div> },
    [Paths.USER_PROFILE]: {
        title: 'Profile',
        leftAction: (
            <button onClick={() => history.back()}>
                <ArrowUturnLeftIcon className="size-6 justify-self-end text-red-600" />
            </button>
        ),
    },
    [Paths.EDIT_USER_PROFILE]: {
        title: 'Edit Profile',
        leftAction: (
            <button onClick={() => location.replace(Paths.USER_PROFILE)}>
                <ArrowUturnLeftIcon className="size-6 justify-self-end text-red-600" />
            </button>
        ),
    },

    [Paths.BOOKING_DETAILS]: {
        title: 'Booking Details',
        leftAction: (
            <button onClick={() => history.back()}>
                <ArrowUturnLeftIcon className="size-6 justify-self-end text-red-600" />
            </button>
        ),
    },
    [Paths.ADD_BOOKING]: {
        title: 'New Booking',
        leftAction: (
            <button onClick={() => history.back()}>
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
}
