"use Client"
import axios from "axios";

export default async function Signin() {


    return (
        <div>
            Sign in Page !!! <br />
            <input></input>
            <input></input>
            <button onClick={async () => {
                const res = axios.post("http://localhost:3000/api", {
                    username: "haarkiart",
                    password: "dfsrugnr"
                })

                localStorage.setItem("token", res.data.token);
            }} > Sing in </button>


        </div>
    )

}
