import React, { useEffect } from 'react'
import DaterangePicker from '../Datepicker'
import { Booking, Group, User } from '../types'
import { Autocomplete } from '../Autocomplete'

interface FormProps {
    handleSubmit: (e: React.FormEvent) => Promise<void>
    dateRange: {
        startDate: Date | null
        endDate: Date | null
    }
    setDateRange: React.Dispatch<
        React.SetStateAction<{
            startDate: Date | null
            endDate: Date | null
        }>
    >
    selectedUsers: Array<any | null>
    setSelectedUser: React.Dispatch<React.SetStateAction<Array<any | null>>>
    booking?: Booking
}

const BookingForm = ({
    handleSubmit,
    dateRange,
    setDateRange,
    booking,
    setSelectedUser,
    selectedUsers,
}: FormProps): JSX.Element => {
    useEffect(() => {
        if (!booking) return
        else {
            setDateRange({
                startDate: new Date(booking.startDate),
                endDate: new Date(booking.endDate),
            })
        }
    }, [])

    return (
        <form className="p-4 flex flex-col gap-3" onSubmit={handleSubmit}>
            <label className="">
                <p className="pl-2">Booking title</p>
                <input
                    required
                    className="input-contained"
                    defaultValue={booking?.title ?? ''}
                    name="title"
                />
            </label>

            <DaterangePicker
                dateRange={dateRange}
                setDateRange={setDateRange}
            />
            <label className="p-2">
                Participants
                <Autocomplete
                    path={'/user'}
                    field={'name'}
                    selected={selectedUsers}
                    setSelected={setSelectedUser}
                />
            </label>
            <button className="btn-primary ml-2" type="submit">
                Save
            </button>
        </form>
    )
}

export default BookingForm
