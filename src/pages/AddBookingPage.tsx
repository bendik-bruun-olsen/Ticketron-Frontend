import React, { useEffect, useState } from 'react'
import { postData } from '../utils'
import CustomDatepicker from '../components/Datepicker'
import { Datepicker } from 'flowbite-react'
import DaterangePicker from '../components/Datepicker'
import { useNavigate } from 'react-router-dom'
import { getPicture } from '../utils'

const customTheme = {
    Datepicker: {
        root: {},
    },
}

const AddNewBookingPage: React.FC = () => {
    const [dateRange, setDateRange] = useState<{
        startDate: Date | null
        endDate: Date | null
    }>({
        startDate: new Date(),
        endDate: new Date(),
    })

    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        const formProps = Object.fromEntries(formData)
        const { title } = formProps as HTMLFormElement
        const imageUrl = await getPicture(title)

        const body = {
            title: title,
            startDate: dateRange.startDate?.toISOString(),
            endDate: dateRange.endDate?.toISOString(),
            userId: 1,
            image: 'https://via.placeholder.com/64',
            imageUrl,
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
        <form className="p-4 flex flex-col gap-3" onSubmit={handleSubmit}>
            <label className="">
                <p className="pl-2">Booking title</p>
                <input required className="input-contained" name="title" />
            </label>

            <DaterangePicker
                dateRange={dateRange}
                setDateRange={setDateRange}
            />

            <label className="p-2">
                Participants
                <input className="input-contained" name="participants" />
            </label>
            <button className="btn-primary ml-2" type="submit">
                Save
            </button>
        </form>
    )
}

export default AddNewBookingPage
