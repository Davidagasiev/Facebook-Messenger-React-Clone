import React, {useState} from "react";
import { useSelector } from 'react-redux';

import { GroupsSelector } from '../GroupsSlice';
import GroupImages from "./GroupImages/GroupImages.jsx";
import GroupFiles from "./GroupFiles/GroupFiles.jsx";

import { TextField, Button } from "@material-ui/core";

import "./GroupInfo.scss";
import {changeGName, changeGImage} from "./Functions";

export default function GroupInfo(props) {

    const groups = useSelector(GroupsSelector);
    const group = groups.find(group => group.id === props.groupId);

    const [ newGName, setNewGName ] = useState(group.GName);

    return (
        <div className="GroupInfo" style={{backgroundColor: props.darkMode ? "#282E33" : "white" }}>
            <input
                            accept="image/*"
                            className="fileInput"
                            multiple
                            id="fileButton"
                            type="file"
                            onChange={(e) => changeGImage(e, props.groupId, group.GName)}
                        />
            <label title="Click To Change The Image" htmlFor="fileButton">
                <div 
                    className="groupImg" 
                    style={{backgroundImage: `url(${group.GImage})`}}
                    />
            </label>
                

            <div className="GNameChange">
                <TextField
                    style={{width: "200px"}}
                    rowsMax={5}
                    multiline
                    value={newGName}
                    onChange={e => setNewGName(e.target.value)}
                    spellcheck="false"
                    variant="outlined"
                />

                {newGName !== group.GName ?
                    <div>
                        <Button onClick={() => setNewGName(group.GName)}>Cancel</Button>
                        <Button 
                            style={{color: "#0099FF"}} 
                            onClick={() => changeGName(newGName, props.groupId, group.GImage)}
                        >
                            Save
                        </Button>
                    </div>
                    : ""
                }
            </div>

            <GroupFiles groupId={props.groupId}/>
            <GroupImages groupId={props.groupId}/>

        </div>
    )
}
