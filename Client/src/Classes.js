import React from 'react'
import { useNavigate } from "react-router-dom";
const Classes = () => {
    let history =  useNavigate()
    const logout = () => {
        localStorage.removeItem("accessToken", true);
        history("/")
    }
    return (
        <div>
            <h2>Classes</h2>
            <button onClick={logout}>Logout</button>
        </div>
    )
}

export default Classes
