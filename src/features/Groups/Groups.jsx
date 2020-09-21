import React from 'react'
import GroupNavbar from './GroupNavBar/GroupNavbar.jsx'
import GroupList from './GroupList/GroupList.jsx'

import "./Groups.scss"
import { useSelector } from 'react-redux';
import { GroupsSelector } from './GroupsSlice.js';

export default function Groups(props) {

    const groups = useSelector(GroupsSelector);
    const group = groups.find(group => group.id === props.groupId);

    return (
        <div className="Groups">
            <GroupNavbar />
            <GroupList groups={groups} groupId={props.groupId}/>
        </div>
    )
}
