import React from 'react';
import {Link} from 'react-router-dom'
import {useHistory} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import {Drawer, List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import {Create as CreateIcon, CallSplit as CallSplitIcon, AccountBalance as AccountBalanceIcon} from '@material-ui/icons';

export default function DrawerMenu(props) {
  const history = useHistory()

  const menuItems = [
    {text:'Order Manager', link:'/order-manager', icon:<CreateIcon />},
    {text:'Completed Orders', link:'/completed-orders', icon:<CallSplitIcon />},
    {text:'Settings', link:'/settings', icon:<AccountBalanceIcon />}
  ]

  const changeRoute = route => {
    history.push(route)
  }
  const sideList = () => (
    <div
      role="presentation"
      onClick={props.toggleDrawer()}
      onKeyDown={props.toggleDrawer()}
    >
      <List>
        {menuItems.map(op => (
            <ListItem button key={op.text} onClick={() => changeRoute(op.link)}>
              <ListItemIcon>{op.icon}</ListItemIcon>
              <ListItemText primary={op.text} />
            </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      <Drawer open={props.state.left} onClose={props.toggleDrawer()}>
        {sideList()}
      </Drawer>
    </div>
  );
}
