"use client"
import { CheckToken } from "./CheckToken"

export default function AddToWhistList(props: {id: string}) {

    return (
        <div className="badge bg-green-600 p-3 text-white cursor-pointer hover:bg-green-900">
        <form action={() => CheckToken(props.id)}>
            <button type="submit">Add to whistlist</button>
        </form>
        </div>
    )
}