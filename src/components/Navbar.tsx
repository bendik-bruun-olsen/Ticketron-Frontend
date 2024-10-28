// components/Navbar.tsx
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Paths } from '../../paths'
import NavMenu from './NavMenu'

const Navbar = (): JSX.Element => {
    const [open, setOpen] = useState(false)
    const matchRoute = useLocation()
    return (
        <>
            <nav className="h-14 w-full flex justify-between content-center items-center p-4 border-b border-b-grey">
                {Values[matchRoute.pathname]?.leftAction ?? <></>}

                <p className="text-center">
                    {Values[matchRoute.pathname]?.title ?? ''}
                </p>
                <button onClick={() => setOpen(true)}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="size-6 justify-self-end text-red-600"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                        />
                    </svg>
                </button>
            </nav>
            <NavMenu isOpen={open} setIsOpen={setOpen} />
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
            <button>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 justify-self-end text-red-600"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                    />
                </svg>
            </button>
        ),
    },
    [Paths.EDIT_USER_PROFILE]: {
        title: 'Edit Profile',
        leftAction: (
            <button>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 justify-self-end text-red-600"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                    />
                </svg>
            </button>
        ),
    },
    [Paths.BOOKING_DETAILS]: {
        title: 'Booking Details',
        leftAction: (
            <button>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 justify-self-end text-red-600"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                    />
                </svg>
            </button>
        ),
    },
    [Paths.TICKET_DETAILS]: {
        title: 'Ticket',
        leftAction: (
            <button>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 justify-self-end text-red-600"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                    />
                </svg>
            </button>
        ),
    },
}
