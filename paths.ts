export enum Paths {
    HOME = '/',
    LOGIN = '/login',
    SIGN_UP = '/signup',
    USER_PROFILE = '/user',
    EDIT_USER_PROFILE = '/edit-user',
    GROUP_DETAILS = '/groups',
    NEW_GROUP = '/new-group',
    ADD_GROUP = '/add-group',
    EDIT_GROUP = '/edit-group',
    TICKET_DETAILS = '/booking/:bookingId/tickets/:ticketId',
    BOOKING = '/booking/:bookingId',
    BOOKING_DETAILS = '/booking/:bookingId/',
    ADD_TICKET = '/booking/:bookingId/add-ticket',
    EDIT_TICKET = '/booking/:bookingId/ticket/:ticketId/edit-ticket',
    ADD_BOOKING = '/add-booking',
    EDIT_BOOKING = 'booking/:bookingId/edit-booking',
}
