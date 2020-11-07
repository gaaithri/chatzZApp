import React, { useEffect, useState } from 'react';
import "./sidebarChat.css";
import { Avatar } from "@material-ui/core";
import db from '../Firebase';
import { Link } from 'react-router-dom';

function SidebarChat({ addChat, id, name }) {
    const [seed, setSeed] = useState("");
    const [message, setMessages] = useState("");
    useEffect(() => {
        if (id) {
            db.collection('group')
                .doc(id)
                .collection('messages')
                .orderBy('timestamp', 'desc')
                .onSnapshot((snapshot) =>
                    setMessages(snapshot.docs.map((doc) => doc.data()))
                );
        }
    }, [id]);

    useEffect(() => {
        const unsubscribe = db.collection("group");
        setSeed(Math.floor(Math.random() * 5000));
        return () => {
            unsubscribe();
        };
    }, []);

    const createChat = () => {
        const userGroup = prompt("Please enter user name to add");
        if (userGroup) {
            db.collection('group').add({
                name: userGroup
            });
        }
    };


    return !addChat ? (
        <Link to={`/groups/${id}`}>
            <div className="sidebarChat">
                <Avatar src={`https://avatars.dicebear.com/api/avataaars/${seed}.svg`} />
                <div className="sidebarChat__info">
                    <h2> {name} </h2>
                    <p> {message[0]?.message}</p>
                </div>
            </div>
        </Link>



    ) : (
            <div onClick={createChat} className="sidebarChat">
                <h2> Add Chat</h2>
            </div>

        );

}

export default SidebarChat;
