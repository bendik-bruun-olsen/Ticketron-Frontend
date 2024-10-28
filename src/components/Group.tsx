import React from 'react'

type Group = {
    title: string
    participants: Array<string>
}

interface GroupProps {
    group: Group
}

const Group = ({ group }: GroupProps): JSX.Element => {
    const { title, participants } = group
    return (
        <div className="rounded-xl bg-red-200 w-60 p-4">
            <h3 className="font-bold text-xl">{title}</h3>
            <div className="mt-3">
                {participants.map((participant) => (
                    <p>{participant}</p>
                ))}
            </div>
        </div>
    )
}

export default Group
