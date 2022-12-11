import React, { useContext } from 'react'
import { signOut } from "firebase/auth"
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {

    const { currentUser } = useContext(AuthContext)

    return (
        <div className='navbar'>
            <span className="logo"> My chat </span>
            <div className='user'>
                <img src={currentUser.photoURL} alt="" />
                <span> {currentUser.displayName} </span>
                <button onClick={() => signOut(auth)}> <FontAwesomeIcon icon={faDoorOpen} /> Log out </button>
            </div>
        </div>
    )
}

export default Navbar
