import React, {useEffect, useState} from 'react'
import {useSelector} from "react-redux";

import { Avatar, Button, CircularProgress, Divider, Grid, IconButton, Menu, MenuItem, Switch, TextField, Typography} from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import {CurrentUserSelector} from "../../Users/CurrentUserSlice";
import useInput from "../../../Hooks/useInput";
import { auth } from '../../../app/firebase';
import { UsersSelector } from '../../Users/UsersSlice';
import { handleUpload, createNewGroup } from "./Functions";
import "./GroupNavbar.scss";
import ProfileSettings from '../../ProfileSettings/ProfileSettings';


export default function GroupNavbar(props) {

    const users = useSelector(UsersSelector);
    const curUser = useSelector(CurrentUserSelector);

    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        if(users.length !== 0 && curUser !== null){
            setCurrentUser(users.find(user => user.uid === curUser.uid) || {})
        }
    }, [users, curUser])

    
// For User Menu

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

// For group creating Modal

const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: props.darkMode ? "#282E33" : theme.palette.background.paper,
      color: props.darkMode ? "white" : "black",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      outline: "none",
      borderRadius: "10px",
      textAlign: "center",
      maxWidth: "300px",
    },
  }));

const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };


// Controling inputs

    const [newGroupName, setNewGroupName, resetNewGroupName] = useInput("");
    const [GImage, setGImage] = useState(null);
    const [showProgress, setShowProgress] = useState(false);
    const [progress, setProgress] = useState(0);
    const [chosenFile, setChosenFile] = useState("");

// Group Searching Group
    const [searchedGroup, setSearchedGroup] = useInput();

  function SearchedGroupChange (e){
    setSearchedGroup(e);
    props.filterGroups(e.target.value);
  } 
  
    return (
        <div className="GroupNavbar">
            <div className="GroupNavbarContent">
                <div>
                    <Avatar src={currentUser.photoURL}/>
                    <h2>Chats</h2>
                </div>

                <div>
                
                    <IconButton title="Create Group" onClick={handleOpen}>
                        <AddIcon />
                    </IconButton>
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        className={classes.modal}
                        open={open}
                        onClose={() => {
                            handleModalClose();
                            setGImage(null);
                            setChosenFile("");
                        }}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                        timeout: 500,
                        }}
                    >
                        <Fade in={open}>
                        <div className={classes.paper}>
                        <div className="userAuth">
                            <h1>Create Group</h1>
                            <TextField 
                                type="text" 
                                required 
                                value={newGroupName} 
                                onChange={setNewGroupName} 
                                label="Group Name"
                            />
            {/* Choosing group Photo */}
                            <input
                                accept="image/*"
                                className="fileInput"
                                multiple
                                id="fileButton"
                                type="file"
                                onChange={e => handleUpload(e, setGImage, setChosenFile)}
                            />
                            
                            <label htmlFor="fileButton">
                                <Button style={{width: "100%"}} variant="contained" color="primary" component="span">
                                    Choose Photo
                                </Button>
                            </label>
                                
                            {GImage ? 
                                <div className="chosenPhoto" style={{backgroundImage: `url(${chosenFile})`}}></div> : ""
                            }
                            {showProgress ? <CircularProgress variant="static" value={progress} /> : ""}
                            {   chosenFile === "" ?
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    className={classes.button}
                                    startIcon={<AddCircleIcon />}
                                    disabled
                                >
                                    Create Group
                                </Button> :
                                <Button
                                    onClick={e => {
                                    createNewGroup(
                                        e, 
                                        newGroupName, 
                                        GImage, 
                                        setShowProgress, 
                                        setProgress,
                                        resetNewGroupName,
                                        setGImage,
                                        setChosenFile,
                                        handleModalClose
                                    )
                                }} 
                                    variant="contained"
                                    color="secondary"
                                    className={classes.button}
                                    startIcon={<AddCircleIcon />}
                                >
                                    Create Group
                                </Button>
                                }  
            {/* Choosing group Photo */}
                        </div>
                        </div>
                        </Fade>
                    </Modal>

                    <IconButton title="Settings" onClick={handleClick}>
                        <SettingsIcon />
                    </IconButton>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                                <ProfileSettings 
                                    darkMode={props.darkMode} 
                                    {...currentUser} 
                                    handleClose={handleClose}
                                />
    {/* Dark Mode Switching */}
                                <MenuItem onClick={props.switchDarkMode}>
                                    <Typography component="div">
                                        <Grid component="label" container alignItems="center" spacing={1}>
                                            <Grid item>Night Mode</Grid>
                                                <Grid item>
                                                    <Switch
                                                        checked={props.darkMode}
                                                        onChange={props.switchDarkMode}
                                                        name="DarkMode"
                                                        color="primary"
                                                    />
                                                </Grid>
                                        </Grid>
                                    </Typography>
                                </MenuItem>
    {/* Dark Mode Switching */}
                                <Divider />
                                <MenuItem onClick={() => auth.signOut()}>Logout</MenuItem>
                        </Menu>
                </div>
            </div>

            <div className="SearchGroups">
                <input 
                    type="text" 
                    placeholder="Search"
                    value={searchedGroup}
                    onChange={SearchedGroupChange}
                />
            </div>
        </div>
    )
}
