import React from 'react'

const AddNewBookingPage: React.FC = () => {
    const handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault()
        const { title, dateFrom, dateTo, participants } =
            e.target as HTMLFormElement
    }

    return (
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
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
                <input
                    required
                    className="input-contained"
                    name="participants"
                />
            </label>
            <button className="btn-primary ml-2" type="submit">
                Save
            </button>
        </form>
    )
}

export default AddNewBookingPage
