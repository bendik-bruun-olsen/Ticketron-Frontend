import React from 'react'
import { Paths } from './paths'
import LoginPage from './src/pages/LoginPage'
import Homepage from './src/pages/Homepage'
import AddNewBookingPage from './src/pages/AddBookingPage'
import AddTicketPage from './src/pages/AddTicketPage'
import BookingDetailsPage from './src/pages/BookingDetailsPage'
import BookingPage from './src/pages/BookingPage'
import EditBookingPage from './src/pages/EditBookingPage'
import EditTicketPage from './src/pages/EditTicketPage'
import GroupDetailsPage from './src/pages/GroupDetailsPage'
import NewGroupPage from './src/pages/NewGroupPage'
import SignUpPage from './src/pages/SignUpPage'
import TicketDetailsPage from './src/pages/TicketDetailsPage'
import UserProfilePage from './src/pages/UserProfilePage'
import EditUserProfilePage from './src/pages/EditUserProfilePage'
import { Outlet, createBrowserRouter } from 'react-router-dom'
import Navbar from './src/components/Navigation/Navbar'
import ProtectedRoute from './src/components/ProtectedRoute'
import ErrorBoundary from './src/components/Error/ErrorBoundary'

const routes = [
    {
        path: Paths.LOGIN,
        element: <LoginPage />,
    },
    {
        path: Paths.HOME,
        element: (
            <ProtectedRoute>
                <Homepage />,
            </ProtectedRoute>
        ),
    },
    {
        path: Paths.ADD_BOOKING,
        element: (
            <ProtectedRoute>
                <AddNewBookingPage />
            </ProtectedRoute>
        ),
    },
    {
        path: Paths.ADD_TICKET,
        element: (
            <ProtectedRoute>
                <AddTicketPage />
            </ProtectedRoute>
        ),
    },
    {
        path: `${Paths.BOOKING_DETAILS}`,
        element: (
            <ProtectedRoute>
                <BookingDetailsPage />
            </ProtectedRoute>
        ),
    },
    {
        path: `${Paths.BOOKING_DETAILS}`,
        element: (
            <ProtectedRoute>
                <BookingDetailsPage />
            </ProtectedRoute>
        ),
    },
    {
        path: Paths.BOOKING,
        element: (
            <ProtectedRoute>
                <BookingPage />
            </ProtectedRoute>
        ),
    },
    {
        path: Paths.EDIT_BOOKING,
        element: (
            <ProtectedRoute>
                <EditBookingPage />
            </ProtectedRoute>
        ),
    },
    {
        path: Paths.EDIT_TICKET,
        element: (
            <ProtectedRoute>
                <EditTicketPage initialData={undefined} />
            </ProtectedRoute>
        ),
    },
    {
        path: Paths.EDIT_USER_PROFILE,
        element: (
            <ProtectedRoute>
                <EditUserProfilePage />
            </ProtectedRoute>
        ),
    },
    {
        path: Paths.GROUP_DETAILS,
        element: (
            <ProtectedRoute>
                <GroupDetailsPage />
            </ProtectedRoute>
        ),
    },
    {
        path: Paths.NEW_GROUP,
        element: (
            <ProtectedRoute>
                <NewGroupPage />
            </ProtectedRoute>
        ),
    },
    {
        path: Paths.SIGN_UP,
        element: (
            <ProtectedRoute>
                <SignUpPage />
            </ProtectedRoute>
        ),
    },
    {
        path: Paths.TICKET_DETAILS,
        element: (
            <ProtectedRoute>
                <TicketDetailsPage />
            </ProtectedRoute>
        ),
    },
    {
        path: Paths.USER_PROFILE,
        element: (
            <ProtectedRoute>
                <UserProfilePage />
            </ProtectedRoute>
        ),
    },
]

const router = createBrowserRouter([
    {
        element: <Navbar />,
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
