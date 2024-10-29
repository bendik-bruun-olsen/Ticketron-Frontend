import React from 'react'

const EditUserProfilePage: React.FC = () => {
    return (
        <div className="p-2 flex flex-col gap-3 w-full">
            <label className="">
                <p className="pl-2">Name</p>
                <input required className="input-contained" name="title" />
            </label>
            <label className="">
                <p className="pl-2">Email</p>
                <input required className="input-contained" name="title" />
            </label>
            <label className="">
                <p className="pl-2">Phonenumber</p>
                <input required className="input-contained" name="title" />
            </label>
        </div>
    )
}

export default EditUserProfilePage
