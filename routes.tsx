import React from 'react'
import { Paths } from './paths'
import LoginPage from './src/pages/LoginPage'
import Homepage from './src/pages/Homepage'
import AddNewBookingPage from './src/pages/AddBookingPage'
import AddTicketPage from './src/pages/AddTicketPage'
import BookingDetailsPage from './src/pages/BookingDetailsPage'
import BookingsPage from './src/pages/BookingsPage'
import EditBookingPage from './src/pages/EditBookingPage'
import EditTicketPage from './src/pages/EditTicketPage'
import GroupDetailsPage from './src/pages/GroupDetailsPage'
import NewGroupPage from './src/pages/NewGroupPage'
import TicketDetailsPage from './src/pages/TicketDetailsPage'
import UserProfilePage from './src/pages/UserProfilePage'
import EditUserProfilePage from './src/pages/EditUserProfilePage'
import { Outlet, createBrowserRouter } from 'react-router-dom'
import Navbar, { ReturnButton } from './src/components/Navigation/Navbar'
import ProtectedRoute from './src/components/ProtectedRoute'
import ErrorBoundary from './src/components/Error/ErrorBoundary'
import Layout from './src/components/Navigation/Layout'
import BookingsOverviewPage from './src/pages/BookingsOverviewPage'

const routes = [
    {
        path: Paths.LOGIN,
        element: <LoginPage />,
    },
    {
        path: Paths.HOME,
        element: (
            <ProtectedRoute>
                <Navbar title={'Home'} leftAction={<div></div>} />
                <Homepage />
            </ProtectedRoute>
        ),
    },
    {
        path: Paths.ADD_BOOKING,
        element: (
            <ProtectedRoute>
                <Navbar title={'Add booking'} leftAction={<ReturnButton />} />{' '}
                <AddNewBookingPage />
            </ProtectedRoute>
        ),
    },
    {
        path: Paths.ADD_TICKET,
        element: (
            <ProtectedRoute>
                <Navbar title={'Add ticket'} leftAction={<ReturnButton />} />{' '}
                <AddTicketPage />
            </ProtectedRoute>
        ),
    },
    {
        path: `${Paths.BOOKINGS}`,
        element: (
            <ProtectedRoute>
                <Navbar title={'Bookings'} leftAction={<ReturnButton />} />{' '}
                <BookingsPage />
            </ProtectedRoute>
        ),
    },
    {
        path: `${Paths.BOOKING_DETAILS}`,
        element: (
            <ProtectedRoute>
                <Navbar
                    title={'Booking details'}
                    leftAction={<ReturnButton />}
                />{' '}
                <BookingDetailsPage />
            </ProtectedRoute>
        ),
    },

    {
        path: Paths.BOOKING,
        element: (
            <ProtectedRoute>
                <Navbar title={'Booking'} leftAction={<ReturnButton />} />{' '}
                <BookingsOverviewPage />
            </ProtectedRoute>
        ),
    },
    {
        path: Paths.EDIT_BOOKING,
        element: (
            <ProtectedRoute>
                <Navbar title={'Edit booking'} leftAction={<ReturnButton />} />
                <EditBookingPage />
            </ProtectedRoute>
        ),
    },
    {
        path: Paths.EDIT_TICKET,
        element: (
            <ProtectedRoute>
                <Navbar title={'Edit ticket'} leftAction={<ReturnButton />} />
                <EditTicketPage initialData={undefined} />
            </ProtectedRoute>
        ),
    },
    {
        path: Paths.EDIT_USER_PROFILE,
        element: (
            <ProtectedRoute>
                <Navbar title={'Edit user'} leftAction={<ReturnButton />} />
                <EditUserProfilePage />
            </ProtectedRoute>
        ),
    },
    {
        path: Paths.GROUP_DETAILS,
        element: (
            <ProtectedRoute>
                <Navbar title={'Groups'} leftAction={<ReturnButton />} />{' '}
                <GroupDetailsPage />
            </ProtectedRoute>
        ),
    },
    {
        path: Paths.NEW_GROUP,
        element: (
            <ProtectedRoute>
                <Navbar title={'Add new group'} leftAction={<ReturnButton />} />
                <NewGroupPage />
            </ProtectedRoute>
        ),
    },

    {
        path: Paths.TICKET_DETAILS,
        element: (
            <ProtectedRoute>
                <Navbar
                    title={'Ticket details'}
                    leftAction={<ReturnButton />}
                />

                <TicketDetailsPage />
            </ProtectedRoute>
        ),
    },
    {
        path: Paths.USER_PROFILE,
        element: (
            <ProtectedRoute>
                <Navbar title={'User profile'} leftAction={<ReturnButton />} />
                <UserProfilePage />
            </ProtectedRoute>
        ),
    },
]

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                element: (
                    <ErrorBoundary>
                        <Outlet />
                    </ErrorBoundary>
                ),
                children: routes,
            },
        ],
    },
])

export default router
