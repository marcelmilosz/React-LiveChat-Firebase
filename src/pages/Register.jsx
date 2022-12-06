import React from 'react'
import Add from "../images/addAvatar.png"

export const Register = () => {
    return (
        <div className='formContainer'>

            <div className='formWrapper'>

                <span className='logo'> React Chat </span>
                <span className='title'> Register </span>

                <form action="">
                    <input type="text" placeholder='Display name' />
                    <input type="email" placeholder='Email' />
                    <input type="password" placeholder='Password' />
                    <input style={{ display: "none" }} type="file" id='file' />
                    <label htmlFor="file">
                        <img src={Add} alt="" />
                        <span> Add an avatar</span>
                    </label>
                    <button> Sign up </button>
                </form>

                <p> Already have an account? Login </p>

            </div>
        </div>
    )
}
