"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { ErrorBody } from "@/interface"
import Swal from 'sweetalert2'

export default function Register() {
    const [showError, setShowError] = useState<string | undefined>(undefined)
    const [input, setInput] = useState({
        name: "",
        username: "",
        email: "",
        password: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.currentTarget

        setInput({
            ...input,
            [name]: value
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const response = await fetch("/api/users", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(input)
        })
        
        const body = await response.json()
        console.log(body, "<<<body");
        

        if(!response.ok) {
            const error = body.message
            setShowError(error)
        } else {

            Swal.fire({
                icon: "success",
                title: body.message,
                text: "Success Register User",
                footer: '<a href="#">Why do I have this issue?</a>'
            });

            router.push("/login")
        }
    }

    const router = useRouter()
    
    return (
        <div className="hero min-h-screen bg-gradient-to-r from-blue-500 to-green-500">
            <div className="hero-content flex-col w-full lg:flex-row-reverse p-10">
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-cyan-900">
                        {
                            showError ? (
                                <div role="alert" className="alert alert-error mt-4 w-[90%] m-auto">
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <span>{showError}</span>
                            </div>
                            ) : null
                        }
                            
                    <form className="card-body" onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input value={input.name} onChange={handleChange} type="text" name="name" placeholder="name" className="input input-bordered bg-white text-slate-700" />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Username</span>
                            </label>
                            <input value={input.username} onChange={handleChange} type="text" name="username" placeholder="username" className="input input-bordered bg-white text-slate-700" />
                        </div>
                        
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input value={input.email} onChange={handleChange} type="email" name="email" placeholder="email" className="input input-bordered bg-white text-slate-700" />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input value={input.password} onChange={handleChange} type="password" name="password" placeholder="password" className="input input-bordered bg-white text-slate-700" />

                            <label className="label-text-alt mt-2">
                            Already have an account ?
                                <a onClick={() => router.push("/login")} className="label-text-alt link link-hover text-amber-500">{" "}Login</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                        <button type='submit' className="btn btn-primary text-slate-700">Register User</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}