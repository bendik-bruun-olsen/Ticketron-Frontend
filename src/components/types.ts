export type BookingSummary = {
    imageUrl: string
    title: string
    fromDate: string
    toDate: string
    participants: number
    id: string
}

export type User = {
    id: string
    name?: string
    email?: string
    phone?: string
}

export type UnregUser = {
    id: string
    name?: string
}

type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
    T,
    Exclude<keyof T, Keys>
> &
    {
        [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>
    }[Keys]

export type Ticket = RequireAtLeastOne<
    TicketType,
    'assignedUser' | 'assignedUnregUser'
>

type TicketType = {
    id: string
    title?: string
    startDate: string
    endDate: string
    assignedUser?: User
    assignedUnregUser?: User
    bookingId: string
    category: string
    price: number
    purchasedBy?: User
    purchasedDate: string
    imageUrl?: string
}

export type Participant = {
    id: string
    addedBy: number
    isUser: boolean
}

export type GroupMember = {
    id: string
    userId?: number
    unregUserId?: number
    isUser: boolean
}

export type Group = {
    id: string
    name?: string
    userId: string
    createdBy: string
    users: User[]
    unregUsers: UnregUser[]
}

export type Booking = {
    id: string
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
