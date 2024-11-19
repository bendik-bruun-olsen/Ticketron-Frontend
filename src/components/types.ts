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
    participantId: number
    bookingId: number
    category: string
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
}

export type Booking = {
    id: number
    title?: string
    startDate: string
    endDate: string
    userId: number
    participants: Participant[]
}
