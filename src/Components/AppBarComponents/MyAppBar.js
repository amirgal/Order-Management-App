import React from "react"
import { inject, observer } from "mobx-react"
import { makeStyles } from "@material-ui/core/styles"
import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Switch from "@material-ui/core/Switch"
import MenuIcon from "@material-ui/icons/Menu"
import DrawerMenu from "./DrawerMenu"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: 30,
  },
  title: {
    flexGrow: 1,
  },
}))

const MyAppBar = inject("generalStore")(
  observer((props) => {
    const classes = useStyles()
    const [state, setState] = React.useState({
      left: false,
    })
    const darkMode = props.generalStore.darkMode
    const toggleDarkMode = () => {
      props.generalStore.toggleDarkMode()
    }
    const toggleDrawer = () => (event) => {
      if (
        event.type === "keydown" &&
        (event.key === "Tab" || event.key === "Shift")
      ) {
        return
      }
      setState({ ...state, left: !state.left })
    }
    return (
      <div className={classes.root} id="appBar">
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              color="secondary"
              onClick={toggleDrawer()}
              edge="start"
              className={classes.menuButton}
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title} align="center">
              {props.headline}
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  size="small"
                  checked={darkMode}
                  onChange={toggleDarkMode}
                />
              }
              label={darkMode ? "Light" : "Dark"}
            />
          </Toolbar>
        </AppBar>
        <DrawerMenu toggleDrawer={toggleDrawer} state={state} />
      </div>
    )
  })
)
export default MyAppBar
