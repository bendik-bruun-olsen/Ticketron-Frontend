import React from 'react'
import { useNavigate } from 'react-router-dom'
import { postData } from '../utils'
import { useAccount } from '@azure/msal-react'

const CreateUser = () => {
    const navigate = useNavigate()
    const account = useAccount()

    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        const formProps = Object.fromEntries(formData)
        const { name, email, phone } = formProps as HTMLFormElement

        const body = {
            name: name,
            email: account?.username ?? email,
            phone,
        }

        try {
            await postData('/user', body)
            navigate(`/`)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <form className="p-4 flex flex-col gap-3" onSubmit={handleSubmit}>
            <label className="">
                <p className="pl-2">Name</p>
                <input
                    defaultValue={account?.name}
                    required
                    className="input-contained"
                    name="name"
                />
            </label>
            <label className="">
                <p className="pl-2">Email</p>
                <input
                    defaultValue={account?.username}
                    required
                    disabled={!!account?.username}
                    className="input-contained"
                    name="email"
                />
            </label>
            <label className="">
                <p className="pl-2">Phonenumber</p>
                <input required className="input-contained" name="phone" />
            </label>

            <button className="btn-primary ml-2" type="submit">
                Save
            </button>
        </form>
    )
}

export default CreateUser
