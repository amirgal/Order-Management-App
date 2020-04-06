import React,{useEffect,useState} from "react";
import '../../styles/SignUp.css'

import {
  List,
  ListItem,
  Button,
  Divider,
  TextField,
  IconButton,
  Popper,
  Box
} from "@material-ui/core";
import { inject } from "mobx-react";
import HelpIcon from "@material-ui/icons/Help";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    border: 20,
    borderRadius: 3,
    color: "primary",
    height: 48,
    margin:10,
    top:"6px",
    left:20,
    position:"fixed",
    
  }
});

const Part2 = inject("generalStore","helpers")(props => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [buttunStatus,setButtonStatus] = useState(true)

    useEffect(()=>{
        if(props.user.apiKey && props.user.storePassword && props.user.storeName && props.user.secretKey){
            setButtonStatus(false)
        }else{
            setButtonStatus(true)
        }
    },[props.user])

  const handleClick = event => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const classes = useStyles();
  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const handleInput = e => {
    const val = e.target.value;
    const id = e.target.id;
    const updatedUser = { ...props.user };
    updatedUser[id] = val;
    props.setUser(updatedUser);
  };

  const validateStep = () => {
    if (!props.helpers.validateLength(props.user.apiKey)) {
      return "Api key must be included";
    } else if (!props.helpers.validateLength(props.user.storePassword)) {
      return "Store password must be included";
    } else if (!props.helpers.validateLength(props.user.storeName)) {
      return "Store name value must be included ";
    } else if (!props.helpers.validateLength(props.user.secretKey)) {
      return "Secret key value must be included";
    } else {
      return "continue";
    }
  };

  const signUp = async () => {
    const message = validateStep();
    if (message !== "continue") {
      alert(message);
    } else {
      props.signUp();
    }
  };

  return (
      <Box className="signup-list" bgcolor="background.paper">
      <List>
        <ListItem>
          <TextField
            color="secondary"
            className="inputfield"
            id="apiKey"
            label="Api key"
            type="password"
            value={props.user.apiKey}
            onChange={handleInput}
          />
        </ListItem>
        <ListItem>
          <TextField
            color="secondary"
            className="inputfield"
            id="storePassword"
            label=" Store password"
            type="password"
            value={props.user.storePassword}
            onChange={handleInput}
          />
        </ListItem>
        <ListItem>
          <TextField
            color='secondary'
            className="inputfield"
            id="storeName"
            label="Store name"
            type="text"
            value={props.user.storeName}
            onChange={handleInput}
          />
        </ListItem>
        <ListItem>
          <TextField
            color="secondary"
            className="inputfield"
            id="secretKey"
            label="Secret key"
            type="password"
            value={props.user.secretKey}
            onChange={handleInput}
          />
        </ListItem>
        <Divider id="divider" />
        <ListItem id="btns-list-item">
          <Button disabled={buttunStatus} color="secondary" variant="contained" onClick={signUp}>
            Signup
          </Button>
          <IconButton onMouseEnter={handleClick} onMouseLeave={handleClick}>
            <HelpIcon />
          </IconButton>
        </ListItem>
      </List>
      <Popper
            classes={classes.root}
            id={id}
            open={open}
            anchorEl={anchorEl}
          >
            <h4>
              you can find your apiKey, password and shop name under the "App"
              tab in your shopify's admin page.
            </h4>
          </Popper>
      </Box>
  );
});

export default Part2;
