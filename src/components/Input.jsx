import React, { useContext, useState } from "react";
import Img from "../images/img.png";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {
    arrayUnion, doc, serverTimestamp, Timestamp, updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { faCircleXmark, faFaceSmileWink } from '@fortawesome/free-regular-svg-icons'
import EmojiPicker from 'emoji-picker-react';

const Input = () => {
    const [text, setText] = useState("");
    const [img, setImg] = useState(null);
    const [emojiShow, setEmojiShow] = useState(false)

    const [errorInInput, setErrorInInput] = useState(false)
    const [errMsg, setErrMsg] = useState("")

    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);

    const delay = ms => new Promise(res => setTimeout(res, ms));

    const handleError = async (msg) => {

        setErrMsg(msg)
        setErrorInInput(true);
        await delay(3000);

        setErrorInInput(false);
        setText("");
        setImg(null);
        setErrMsg("");
    }

    const handleSend = async () => {

        let tmp = text; // Helps to make input feel instant
        setText("");

        if (img) {
            const storageRef = ref(storage, uuid());

            const uploadTask = uploadBytesResumable(storageRef, img);

            if (!img.type.includes("image")) {
                handleError("Wrong image type");
            }
            else if (1000 < (img.size) / 1024) {
                handleError("Maximum image size: 1 MB");
            }
            else {
                uploadTask.on(
                    (error) => {
                        // console.log(error);
                        handleError("Image is too big to upload!");
                    },
                    () => {
                        try {
                            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                                await updateDoc(doc(db, "chats", data.chatId), {
                                    messages: arrayUnion({
                                        id: uuid(),
                                        text,
                                        senderId: currentUser.uid,
                                        date: Timestamp.now(),
                                        img: downloadURL,
                                    }),
                                });
                            });
                        }
                        catch (e) {
                            // console.log("Error!")
                        }

                    }
                );
            }



        } else {
            if (tmp.length > 0 && data.chatId !== 'null') {
                await updateDoc(doc(db, "chats", data.chatId), {
                    messages: arrayUnion({
                        id: uuid(),
                        text,
                        senderId: currentUser.uid,
                        date: Timestamp.now(),
                    }),
                });
            }
        }

        if (tmp.length > 0 && data.chatId !== 'null') {
            await updateDoc(doc(db, "userChats", currentUser.uid), {
                [data.chatId + ".lastMessage"]: {
                    text,
                },
                [data.chatId + ".date"]: serverTimestamp(),
            });

            await updateDoc(doc(db, "userChats", data.user.uid), {
                [data.chatId + ".lastMessage"]: {
                    text,
                },
                [data.chatId + ".date"]: serverTimestamp(),
            });
        }

        setImg(null);

    };

    const handleKeyDown = event => {

        if (event.key === 'Enter') {
            handleSend();
        }
    };

    // When we click emoji button, we want to toggle visibility of emoji element
    const handleEmojiClick = () => {
        setEmojiShow(!emojiShow);
    }

    const handleInputClick = () => {
        setEmojiShow(false);
    }

    const handleInputChange = (e) => {
        setText(e.target.value);
        if (emojiShow) setEmojiShow(false);
    }

    // When we click single emoji, we want to add it to Input 
    const onEmojiClick = (e) => {
        setText(text + e.emoji)
        // setEmojiShow(false);
    }

    const handleImageChange = (e) => {
        setImg(e.target.files[0])
    }

    return (
        <div className="input">
            <input
                type="text"
                placeholder={(img) ? "Add message to image or just click send -->" : "Type something..."}
                onKeyDown={handleKeyDown}
                onChange={(e) => handleInputChange(e)}
                onClick={handleInputClick}
                value={text}
            />
            <div className="send">
                <input
                    type="file"
                    style={{ display: "none" }}
                    id="file"
                    onChange={(e) => handleImageChange(e)}
                />
                <button className="emoji-button" onClick={handleEmojiClick}> <FontAwesomeIcon icon={faFaceSmileWink} /> </button>
                <label htmlFor="file"> <img src={Img} alt="" /> </label>
                <button onClick={handleSend}>Send <FontAwesomeIcon icon={faPaperPlane} /></button>
            </div>

            {emojiShow &&
                <>
                    <div className="emoji-close-area"></div>
                    <div className="emoji-picker-container">
                        <EmojiPicker onEmojiClick={onEmojiClick} height={"100%"} width={"100%"} />
                    </div>
                </>}

            {errorInInput && <div className="input-error-container">
                <FontAwesomeIcon icon={faCircleXmark} /> Error: {errMsg}
            </div>}



        </div >
    );
};

export default Input;