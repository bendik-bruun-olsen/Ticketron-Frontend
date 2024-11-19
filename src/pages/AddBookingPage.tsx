import React, { useEffect, useState } from 'react'
import { getPicture, postData } from '../utils'
import DaterangePicker from '../components/Datepicker'
import { useNavigate } from 'react-router-dom'
import BookingForm from '../components/Booking/BookingForm'
import { useMsal } from '@azure/msal-react'
import { UnregUser } from '../components/types'

const AddNewBookingPage: React.FC = () => {
    const { instance, accounts } = useMsal()

    const [dateRange, setDateRange] = useState<{
        startDate: Date | null
        endDate: Date | null
    }>({
        startDate: new Date(),
        endDate: new Date(),
    })

    const [selectedUsers, setSelectedUsers] = useState<Array<any | null>>([])

    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        const formProps = Object.fromEntries(formData)
        const { title } = formProps as HTMLFormElement
        const imageUrl = await getPicture(title)

        console.log(selectedUsers)
        const body = {
            title: title,
            startDate: dateRange.startDate?.toISOString(),
            endDate: dateRange.endDate?.toISOString(),
            image: 'https://via.placeholder.com/64',
            imageUrl,
            userIds: selectedUsers.map((user) => user.id),
        }

        try {
            const newBooking = await postData('/Booking/create', body)
            navigate(`/booking/${newBooking.id}`)
            console.log(imageUrl)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <BookingForm
            handleSubmit={handleSubmit}
            dateRange={dateRange}
            setDateRange={setDateRange}
            selectedUsers={selectedUsers}
            setSelectedUser={setSelectedUsers}
        />
    )
}

export default AddNewBookingPage
