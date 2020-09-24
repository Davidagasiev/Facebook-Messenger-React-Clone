import React, { useState, useEffect } from 'react'

import { Button, MenuItem, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import useInput from "../../Hooks/useInput";
import {changeUserImage, changeUserName} from "./Functions";
import "./ProfileSettings.scss";


const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: "5px",
    outline: "none",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
    
  },
}));


export default function ProfileSettings(props) {

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
  
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    
// For UserName Changing

  const [userName, setUserName] = useState(props.displayName);
  useEffect(() => {
    if(props.displayName){
      setUserName(props.displayName)
    }
  }, [props.displayName])

    return (
        <div className="ProfileSettings">
            
            <MenuItem onClick={() => {handleOpen(); props.handleClose()}}>Settings</MenuItem>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={open}>
                <div className={classes.paper}>
                    <h1>Profile Settings</h1>
                    
                        <input
                            accept="image/*"
                            id="PUrlChange"
                            className="PUrlInput"
                            multiple
                            type="file"
                            onChange={e => changeUserImage(e, props.uid, props.displayName)}
                        />

                        <label
                            htmlFor="PUrlChange" 
                            className="ProfileAvatar"  
                        >
                          <div style={{backgroundImage: `url(${props.photoURL})`}}></div>
                          <p>Change</p>
                        </label>

                        <form className="DisplayName_Form" onSubmit={(e) => changeUserName(e, props.uid, userName, props.photoURL)}>
                          <TextField 
                            label="UserName" 
                            value={userName} 
                            onChange={(e) => setUserName(e.target.value)} />
                          { userName === "" ?
                            <Button 
                                disabled
                                type="submit" 
                                variant="contained" 
                                color="primary"
                                >Submit
                            </Button>
                          :
                            <Button 
                                type="submit" 
                                variant="contained" 
                                color="primary"
                                >Submit
                            </Button>
                          }
                        </form>
                </div>
                </Fade>
            </Modal>

        </div>
    )
}
 