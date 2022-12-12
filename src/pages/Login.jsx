import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
    const [err, setErr] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/")
        } catch (err) {
            let errMessage = err.message.replace("Firebase: Error (auth/", "").replace("-", " ").replace(")", "")
            errMessage = errMessage.charAt(0).toUpperCase() + errMessage.slice(1);
            setErrMsg(errMessage)
            setErr(true);
        }
    };
    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo"> React Chat</span>
                <span className="title">Login</span>
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <button>Sign in</button>
                    {err && <span className="ErrorMessage"> {errMsg} </span>}
                </form>
                <p>You don't have an account? <Link to="/register">Register</Link></p>
            </div>
        </div>
    );
};

export default Login;