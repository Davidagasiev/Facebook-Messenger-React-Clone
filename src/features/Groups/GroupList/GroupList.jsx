import React from 'react'
import Group from '../Group/Group'

import "./GroupList.scss"

export default function GroupList(props) {
    return (
        <div className="GroupList">
            <div className="groupList">
                {
                    props.groups.map(group => 
                        <Group key={group.id} {...group} groupId={props.groupId}/>
                    )
                }
            </div>
        </div>
    )
}
