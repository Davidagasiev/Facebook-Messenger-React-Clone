import React from 'react';
import "./TemporaryDrawer.scss"

import Drawer from '@material-ui/core/Drawer';
import { IconButton } from '@material-ui/core';

export default function TemporaryDrawer(props) {
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={`TemporaryDrawer ${props.darkMode ? "DarkTemporaryDrawer" : ""}`}
      role="presentation"
    >
        <props.component darkMode={props.darkMode} {...props.componentProps}/>
    </div>
  );

  return (
    <div>
        <IconButton title={props.buttonTitle} style={props.style} onClick={toggleDrawer('right', true)}>
            {props.children}
        </IconButton>
        <Drawer anchor={'right'} open={state['right']} onClose={toggleDrawer('right', false)}>
            {list('right')}
        </Drawer>
    </div>
  );
}