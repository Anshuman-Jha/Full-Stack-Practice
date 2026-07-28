"use client"
import axios from "axios";

export default function () {
    // This localstorage will work in Nextjs 
    return <div>
        Sign in page
        <input></input>
        <input></input>

        <button onClick={async () => {
            const res = await axios.post("http://localhost:3000/api/signin", {
                username: "anshu",
                password: "jha"
            })
            localStorage.setItem("token", res.data.token);

        }}>
            Sign in </button>
    </div>

}


