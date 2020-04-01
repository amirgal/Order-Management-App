import React from 'react';
import {useHistory} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import {AppBar, Toolbar, Typography, Button, IconButton, Tabs, Tab} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import DrawerMenu from './DrawerMenu'


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function MyAppBar(props) {
  const classes = useStyles();
  const history = useHistory()
  const [state, setState] = React.useState({
    left: false,
  });
  //tabs
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
      setValue(newValue);
  };
  //tabs
  const toggleDrawer = () => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, left: !state.left });
  };

  // const logOut = () => {
  //   localStorage.userName = undefined
  //   localStorage.userId = undefined
  //   history.push('/')
  // }
  
  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton onClick={toggleDrawer()} edge="start" className={classes.menuButton} aria-label="menu">
            <MenuIcon />
          </IconButton> 
          <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
            >
            <Tab label="Clients" onClick={() => history.push('/clients')}/>
            <Tab label="Actions" onClick={() => history.push('/actions')}/>
            <Tab label="Analytics" onClick={() => history.push('/analytics')}/>
          </Tabs>
          <Typography variant="h4" className={classes.title} align="center">
            {props.headline}
          </Typography>
          {/* <Button color="inherit" onClick={logOut}>LOGOUT</Button> */}
        </Toolbar>
      </AppBar>
      <DrawerMenu toggleDrawer={toggleDrawer} state={state}/>
    </div>
  );
}
