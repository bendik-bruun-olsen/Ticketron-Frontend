export type BookingSummary = {
    imageUrl: string
    title: string
    fromDate: string
    toDate: string
    participants: number
    id: string
}

export type User = {
    id: number
    name?: string
    email?: string
    phone?: string
}

export type UnregUser = {
    id: number
    name?: string
}

export type Ticket = {
    id: number
    title?: string
    startDate: string
    endDate: string
    assignedUser: User
    bookingId: number
    category: string
    price: number
    purchasedBy?: User
    purchasedDate: string
    imageUrl?: string
}

export type Participant = {
    id: number
    addedBy: number
    isUser: boolean
}

export type GroupMember = {
    id: number
    userId?: number
    unregUserId?: number
    isUser: boolean
}

export type Group = {
    id: number
    name?: string
    userId: number
    createdBy: string
    users: User[] | UnregUser[]
}

export type Booking = {
    id: number
    title?: string
    startDate: string
    endDate: string
    userId: number
    users: User[]
    groups: Group[]
    unregUsers: string[]
    createdBy: User
}

export type Categories =
    | 'Plane'
    | 'Concert'
    | 'Train'
    | 'Bus'
    | 'Boat'
    | 'Other'
    | 'ThemeParks'
    | 'Cinema'
    | 'Theatre'
    | 'Museum'
    | 'Zoo'
    | 'Festival'
    | 'Sports'
    | 'Restaurant'
    | 'Hotel'
