import React, { useEffect, useState } from 'react';
import './sidebar.css';
import ChatIcon from '@material-ui/icons/Chat';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Avatar } from '@material-ui/core';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import SidebarChat from './SidebarChat';
import db from "../Firebase";
import { useStateValue } from '../stateprovider/StateProvider';
function Sidebar() {
    const [groups, setGroups] = useState([]);
    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {

        db.collection("group").onSnapshot(snapshot => (
            setGroups(snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
            }))
            ))
        );
    }, []);



    return (

        <div className="sidebar">

            <div className="sidebar__header">
                <Avatar src={user?.photoURL} />
                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>

            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlined />
                    <input placeholder="Search or start new chat" type="text" />
                </div>
            </div>
            <div className="sidebar__chats">
                <SidebarChat addChat />
                {groups.map(group => (
                    <SidebarChat key={group.id} id={group.id} name={group.data.name} />
                ))}



            </div>



        </div>
    );
}

export default Sidebar;
