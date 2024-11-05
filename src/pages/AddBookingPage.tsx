import React from 'react'
import { postData } from '../utils'

const AddNewBookingPage: React.FC = () => {
    const handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        const formProps = Object.fromEntries(formData)
        const { title, dateFrom, dateTo, participants } =
            formProps as HTMLFormElement

        try {
            postData('/Booking/create', {
                title: title,
                startDate: dateFrom,
                endDate: dateTo,
                userId: 1,
            })
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

            <div className="flex gap-3">
                <label className="">
                    <p className="pl-2">Date from</p>
                    <input
                        required
                        className="input-contained"
                        name="dateFrom"
                    />
                </label>
                <label className="">
                    <p className="pl-2">Date to</p>
                    <input required className="input-contained" name="dateTo" />
                </label>{' '}
            </div>

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
