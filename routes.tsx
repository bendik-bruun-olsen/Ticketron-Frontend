import React from "react";
import { Paths } from "./paths";
import LoginPage from "./src/pages/LoginPage";
import Homepage from "./src/pages/Homepage";
import AddNewBookingPage from "./src/pages/AddBookingPage";
import AddGroupPage from "./src/pages/AddGroupPage";
import AddTicketPage from "./src/pages/AddTicketPage";
import BookingDetailsPage from "./src/pages/BookingDetailsPage";
import BookingPage from "./src/pages/BookingPage";
import EditBookingPage from "./src/pages/EditBookingPage";
import EditTicketPage from "./src/pages/EditTicketPage";
import GroupDetailsPage from "./src/pages/GroupDetailsPage";
import NewGroupPage from "./src/pages/NewGroupPage";
import SignUpPage from "./src/pages/SignUpPage";
import TicketDetailsPage from "./src/pages/TicketDetailsPage";
import UserProfilePage from "./src/pages/UserProfilePage";
import EditUserProfilePage from "./src/pages/EditUserProfilePage";
import { createBrowserRouter } from "react-router-dom";

const routes = [
	{
		path: Paths.LOGIN,
		element: <LoginPage />,
	},
	{
		path: Paths.HOME,
		element: <Homepage />,
	},
	{
		path: Paths.ADD_BOOKING,
		element: <AddNewBookingPage />,
	},
	{
		path: Paths.ADD_GROUP,
		element: <AddGroupPage />,
	},
	{
		path: Paths.ADD_TICKET,
		element: <AddTicketPage />,
	},
	{
		path: Paths.BOOKING_DETAILS,
		element: <BookingDetailsPage />,
	},
	{
		path: Paths.BOOKING,
		element: <BookingPage />,
	},
	{
		path: Paths.EDIT_BOOKING,
		element: <EditBookingPage />,
	},
	{
		path: Paths.EDIT_TICKET,
		element: <EditTicketPage />,
	},
	{
		path: Paths.EDIT_USER_PROFILE,
		element: <EditUserProfilePage />,
	},
	{
		path: Paths.GROUP_DETAILS,
		element: <GroupDetailsPage />,
	},
	{
		path: Paths.NEW_GROUP,
		element: <NewGroupPage />,
	},
	{
		path: Paths.SIGN_UP,
		element: <SignUpPage />,
	},
	{
		path: Paths.TICKET_DETAILS,
		element: <TicketDetailsPage />,
	},
	{
		path: Paths.USER_PROFILE,
		element: <UserProfilePage />,
	},
];

const router = createBrowserRouter([
	{
		children: routes,
	},
]);

export default router;
