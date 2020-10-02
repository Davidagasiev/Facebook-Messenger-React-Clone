import React, { useEffect, useState } from 'react'
import {useSelector} from "react-redux";

import { Avatar } from '@material-ui/core';

import "./Navbar.scss";
import { GroupsSelector } from '../Groups/GroupsSlice';
import TemporaryDrawer from '../TemporaryDrawer/TemporaryDrawer';
import GroupInfo from "../Groups/GroupInfo/GroupInfo";

export default function Navbar(props) {

    
    const groups = useSelector(GroupsSelector);
    const [curGroup, setCurGroup] = useState({});

    useEffect(() => {
        if(groups.length !== 0) {
            setCurGroup(groups.find(group => group.id === props.groupId));
        }
    }, [groups])

    return (
            <div className="Navbar">
                <div className="leftBar">
                    <Avatar src={curGroup.GImage}/>
                    <span>{
                        curGroup.GName ? 
                            curGroup.GName.length > 30 ?
                                curGroup.GName.slice(0, 30) + "..."
                                :
                                curGroup.GName
                            :
                            "..."
                        }</span>
                </div>
                <div className="rightBar">
                    <TemporaryDrawer 
                        darkMode={props.darkMode}
                        buttonTitle="Conversation Information"
                        component={GroupInfo} 
                        componentProps={{groupId: props.groupId}} 
                        style={{padding: "5px"}}>
                            <svg height="32px" width="32px" viewBox="0 0 36 36"><g id="info-circle" fill="none" fillRule="evenodd" stroke="none" strokeWidth="1"><g id="Group"><polygon id="Fill-8" points="0 36 36 36 36 0 0 0"></polygon><path id="Fill-17" d="M18,10 C16.6195,10 15.5,11.119 15.5,12.5 C15.5,13.881 16.6195,15 18,15 C19.381,15 20.5,13.881 20.5,12.5 C20.5,11.119 19.381,10 18,10 Z M16,25 C16,25.552 16.448,26 17,26 L19,26 C19.552,26 20,25.552 20,25 L20,18 C20,17.448 19.552,17 19,17 L17,17 C16.448,17 16,17.448 16,18 L16,25 Z M18,30 C11.3725,30 6,24.6275 6,18 C6,11.3725 11.3725,6 18,6 C24.6275,6 30,11.3725 30,18 C30,24.6275 24.6275,30 18,30 Z" fill="#0099ff"></path></g></g></svg>
                    </TemporaryDrawer>
                </div>
            </div>
    )
}
