import React, { useState, useEffect } from 'react';
import "./chat.css";
import {
    Avatar, IconButton
} from "@material-ui/core";
import { AttachFile, MoreVert } from '@material-ui/icons';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import { useParams } from "react-router-dom";
import db from '../Firebase';
import { useStateValue } from '../stateprovider/StateProvider';
import firebase from 'firebase';
function Chat() {
    const [input, setInput] = useState("");
    const [seed, setSeed] = useState("");
    const { grpid } = useParams();
    const [group, setGroup] = useState("");
    const [messages, setMessages] = useState([]);
    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {
        if (grpid) {
            db.collection('group')
                .doc(grpid)
                .onSnapshot((snapshot) =>
                    setGroup(snapshot.data().name));

            db.collection('group')
                .doc(grpid)
                .collection('messages')
                .orderBy('timestamp', 'asc')
                .onSnapshot((snapshot) =>
                    setMessages(snapshot.docs.map((doc) => doc.data()))
                );
        }

    }, [grpid]);

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));

    }, [grpid]);

    const sendMessage = (e) => {
        e.preventDefault();

        db.collection("group")
        .doc(grpid)
        .collection('messages')
        .add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        setInput("");

    };
    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/avataaars/${seed}.svg`} />
                <div className="chat__headerInfo">
                    <h3> {group}</h3>
    <p> {new Date(messages[messages.length-1]?.timestamp?.toDate()).toUTCString()}</p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>
            <div className="chat__body">
                {messages.map(message => (
                    <p
                        className={`chat__message ${message.name === user.displayName && 'chat__reciever'}`}>
                        <span className="chat__name">
                            {message.name}
                        </span>
                        {/* That's woof messg sdhfjdw jsdfhj */}
                        {message.message}
                        <span className="chat__timestamp">
                            {new Date(message.timestamp?.toDate()).toUTCString()}
                        </span>
                    </p>
                ))}
            </div>



            {/* 
                <p className="chat__message chat__reciever">
                    <span className="chat__name">
                            RiotheHero
                    </span>
                    That's woof messg sdhfjdw jsdfhj
                    <span className="chat__timestamp">
                        {new Date().toUTCString()}
                    </span>
                </p>
            </div> */}
            <div className="chat__footer">
                <IconButton>
                    <InsertEmoticonIcon />
                </IconButton>
                <form>
                    <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type a message" type="text" />
                    <button onClick={sendMessage} type="submit"> Send</button>

                </form>
            </div>




        </div>
    );
}

export default Chat;
