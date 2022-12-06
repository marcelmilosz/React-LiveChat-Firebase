import React from 'react'

export const Login = () => {
    return (
        <div className='formContainer'>

            <div className='formWrapper'>

                <span className='logo'> React Chat </span>
                <span className='title'> Login </span>

                <form action="">
                    <input type="email" placeholder='Email' />
                    <input type="password" placeholder='Password' />
                    <button> Sign in </button>
                </form>

                <p> You don't have an account? Sign up</p>

            </div>
        </div>
    )
}
