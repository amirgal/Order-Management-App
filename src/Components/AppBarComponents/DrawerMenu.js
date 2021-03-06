import React from "react"
import { useHistory } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core"
import {
  ViewList as ViewListIcon,
  DoneOutline as DoneOutlineIcon,
  Settings as SettingsIcon,
  Equalizer as EqualizerIcon,
  LocalShipping as LocalShippingIcon,
} from "@material-ui/icons"
import { styled } from "@material-ui/styles"

const useStyles = makeStyles({
  list: {
    width: "180px",
  },
})

export default function DrawerMenu(props) {
  const history = useHistory()
  const classes = useStyles()

  const menuItems = [
    { text: "Orders", link: "/order-manager", icon: <ViewListIcon /> },
    { text: "Shipping", link: "/shipping", icon: <LocalShippingIcon /> },
    {
      text: "Completed",
      link: "/completed-orders",
      icon: <DoneOutlineIcon />,
    },
    { text: "Analytics", link: "/analytics", icon: <EqualizerIcon /> },
    { text: "Settings", link: "/settings", icon: <SettingsIcon /> },
  ]

  const changeRoute = (route) => {
    history.push(route)
  }

  const sideList = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={props.toggleDrawer()}
      onKeyDown={props.toggleDrawer()}
    >
      <List>
        {menuItems.map((op) => (
          <ListItem button key={op.text} onClick={() => changeRoute(op.link)}>
            <ListItemIcon style={{"marginLeft":"15px"}}>{op.icon}</ListItemIcon>
            <ListItemText primary={op.text} />
          </ListItem>
        ))}
      </List>
    </div>
  )

  return (
    <div>
      <Drawer open={props.state.left} onClose={props.toggleDrawer()}>
        {sideList()}
      </Drawer>
    </div>
  )
}
