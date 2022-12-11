import React, { useContext, useEffect, useState } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { ChatContext } from '../context/ChatContext';
import { db } from '../firebase';
import Message from "./Message"

const Messages = () => {
    const [messages, setMessages] = useState([])
    const { data } = useContext(ChatContext);

    useEffect(() => {
        const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
            doc.exists() && setMessages(doc.data().messages)
        })

        return () => {
            unSub();
        }
    }, [data.chatId])

    const messageEmptyContainer = <div className='messageEmptyContainer'> <p> Start chatting (•◡•) </p> </div>

    return (
        <div className='messages'>

            {(messages.length === 0) ?
                messageEmptyContainer :
                messages.map((m) => (
                    <Message message={m} key={m.id} />
                ))}

        </div>
    )
}

export default Messages
