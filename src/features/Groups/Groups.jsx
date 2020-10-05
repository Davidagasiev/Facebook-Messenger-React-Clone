import React, { useEffect, useState } from 'react'
import GroupNavbar from './GroupNavBar/GroupNavbar.jsx'
import GroupList from './GroupList/GroupList.jsx'

import "./Groups.scss"
import { useSelector } from 'react-redux';
import { GroupsSelector } from './GroupsSlice.js';

export default function Groups(props) {

    const groups = useSelector(GroupsSelector);

    const [filteredGroups, setFilteredGroups] = useState([]);

    useEffect(() => {
        if(groups.length !== 0){
            setFilteredGroups(groups);
        }
    }, [groups])

    function filterGroups(searchedGroup){
        const newFilteredGroups = groups.filter(group => group.GName.toLowerCase().includes(searchedGroup.toLowerCase()));
        setFilteredGroups(newFilteredGroups);
    }

    return (
        <div className="Groups">
            <GroupNavbar darkMode={props.darkMode} switchDarkMode={props.switchDarkMode} filterGroups={filterGroups}/>
            <GroupList groups={filteredGroups} groupId={props.groupId}/>
        </div>
    )
}
