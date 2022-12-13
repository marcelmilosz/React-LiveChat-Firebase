import React, { useContext, useEffect, useState } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { ChatContext } from '../context/ChatContext';
import { db } from '../firebase';
import Message from "./Message"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faDownload } from '@fortawesome/free-solid-svg-icons'

const Messages = () => {
    const [messages, setMessages] = useState([])
    const { data } = useContext(ChatContext);
    const [showPopup, setShowPopup] = useState(false);
    const [popupImg, setPopupImg] = useState(null);

    useEffect(() => {
        const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
            doc.exists() && setMessages(doc.data().messages)
        })

        return () => {
            unSub();
        }
    }, [data.chatId])

    // When we click image, we want to show it on full screen
    const handlePopup = (e) => {

        // If sender sends "e" then we have to update image
        // If not, then it means we are already showing popup and want to hide it
        if (e) {
            setPopupImg(e.target.src)
        }

        setShowPopup(!showPopup);
    }

    const handleImageDownload = () => {
        console.log("Download img")
    }

    const messageEmptyContainer = <div className='messageEmptyContainer'> <p> Select or add someone to start chatting (•◡•) <br /><span> To add your first friend, enter his name in 'Find a user' and hit enter! </span> </p> </div>

    return (
        <div className='messages'>

            {/* Pop up image  */}
            {showPopup &&
                <div className='image-popup'>
                    <div className="image-close" onClick={handlePopup}> <FontAwesomeIcon icon={faXmark} /> </div>
                    <div className='image-close-area' onClick={handlePopup}></div>

                    <img src={popupImg} alt="" />
                    <button onClick={handleImageDownload}> Download Image <FontAwesomeIcon icon={faDownload} /> </button>

                </div>
            }


            {/* Display message  */}
            {(messages.length === 0) ?
                messageEmptyContainer :
                messages.map((m) => (
                    <Message message={m} handlePopup={handlePopup} key={m.id} />
                ))}

        </div>
    )
}

export default Messages
