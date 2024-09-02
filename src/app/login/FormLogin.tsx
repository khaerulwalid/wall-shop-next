"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { ErrorBody } from "@/interface";

export function FormLogin() {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const [showError, setShowError] = useState<string | undefined>(undefined);

  const navigation = useRouter();

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Aku Disubmit");

    const response = await fetch("/api/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });

    const errorBody: ErrorBody = await response.json();

    if (!response.ok) {
      const error = errorBody.message;
      setShowError(error);
    } else {
      navigation.push("/");
    }
  };

  return (
    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-cyan-900">
      {showError ? (
        <div role="alert" className="alert alert-error mt-4 w-[90%] m-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{showError}</span>
        </div>
      ) : null}

      <form className="card-body" onSubmit={handleSubmit}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="email"
            className="input input-bordered bg-white text-slate-700"
            value={input.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            name="password"
            value={input.password}
            placeholder="password"
            className="input input-bordered bg-white text-slate-700"
            onChange={handleChange}
          />
          <label className="label-text-alt mt-2">
            Don not have account ?
            <a
              onClick={() => navigation.push("/register")}
              className="label-text-alt link link-hover text-amber-500"
            >
              {" "}
              Register
            </a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button type="submit" className="btn btn-primary text-slate-700">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
