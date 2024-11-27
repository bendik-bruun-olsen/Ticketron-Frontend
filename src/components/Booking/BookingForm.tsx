import React, { useEffect, useState } from 'react'
import DaterangePicker from '../Datepicker'
import { Booking, Group, User } from '../types'
import { Autocomplete } from '../Autocomplete'
import { fetchData } from '../../utils'
import { useMsal } from '@azure/msal-react'

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
    const { instance, accounts } = useMsal()

    useEffect(() => {
        if (!booking) return
        else {
            setDateRange({
                startDate: new Date(booking.startDate),
                endDate: new Date(booking.endDate),
            })
            setSelectedUser([...booking.users, booking.createdBy])
        }
    }, [])

    const [options, setOptions] = useState<Array<User> | null>(null)
    const fetchOptions = async () => {
        try {
            const data = await fetchData(`/user`)
            const unregUssers = await fetchData(
                `/UnregUser/user/${accounts[0].localAccountId}`
            )
            const groups = await fetchData(`/group`)
            setOptions([...data, ...unregUssers, ...groups])
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchOptions()
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
                    field={'name'}
                    selected={selectedUsers}
                    setSelected={setSelectedUser}
                    options={options ?? []}
                    refetchOptions={fetchOptions}
                    addNewUser={true}
                />
            </label>
            <button className="btn-primary ml-2" type="submit">
                Save
            </button>
        </form>
    )
}

export default BookingForm
