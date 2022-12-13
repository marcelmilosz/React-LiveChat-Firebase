import React, { useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { v4 as uuid } from "uuid";
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Message = ({ message }) => {

    const { currentUser } = useContext(AuthContext)
    const { data } = useContext(ChatContext)


    // We are getting data for date, to display when user send message!
    const seconds = message.date.seconds + 3600; // + 3600 to have correct hour in Poland
    const todayDay = new Date().toISOString().slice(8, 10); // We only want today day number to know if message is from today or previous days!

    // ✅ get hh:mm:ss string
    const hoursAndMinutes = new Date((seconds) * 1000).toISOString().slice(11, 16); // Getting hours and minutes from date etc. 12:33
    const messageDay = new Date((seconds) * 1000).toISOString().slice(8, 10);
    const dayAndMonthOfMessage = new Date((seconds) * 1000).toISOString().slice(5, 10).replace("-", "."); // Getting day and month of message etc. 08.11 means 8 day of November


    const ref = useRef()
    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" })
    }, [message])

    // Here we are checking what type of message we have
    // it can be normal text
    // text with link
    // only link
    // we store it here in messageElement
    let messageElement;
    const handleMessage = () => {
        if (message.text.length > 0) {
            // If message has a link
            if (message.text.includes("http")) {
                let splittedMessage = message.text.split(" ");
                let generatedElement = [];

                for (let i = 0; i < splittedMessage.length; i++) {
                    if (splittedMessage[i].includes("http")) {
                        generatedElement.push(<a key={uuid()} href={splittedMessage[i]} target="_blank" rel="noreferrer"> {splittedMessage[i]} <i> <FontAwesomeIcon icon={faArrowUpRightFromSquare} /> </i> </a>)
                    } else {
                        generatedElement.push(<span key={uuid()}> {splittedMessage[i]} </span>)
                    }
                }
                messageElement = (<p key={uuid()}> {generatedElement} </p>)
            }
            else {
                messageElement = (<p key={uuid()}> {message.text} </p>)
            }

        }

    }

    handleMessage();

    return (
        <div ref={ref} className={`message ${message.senderId === currentUser.uid && "owner"}`}>
            <div className="messageInfo">
                <img src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL} alt="" />
                <span> {(todayDay === messageDay) ? hoursAndMinutes : dayAndMonthOfMessage} </span>
            </div>
            <div className="messageContent">
                {messageElement}
                {message.img && <img className="messageImage" src={message.img} alt="" />}
            </div>
        </div>
    )
}

export default Message;

