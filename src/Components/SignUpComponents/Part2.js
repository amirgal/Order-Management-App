import React from "react";
import {
  List,
  ListItem,
  Button,
  Divider,
  TextField,
  IconButton,
  Popper
} from "@material-ui/core";
import { inject } from "mobx-react";
import HelpIcon from "@material-ui/icons/Help";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    border: 0,
    borderRadius: 3,
    color: "white",
    height: 48,
    padding: "0 30px"
  }
});

const Part2 = inject(
  "generalStore",
  "helpers"
)(props => {
  const [anchorEl, setAnchorEl] = React.useState(null);

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
    <form autoComplete="off" noValidate className="signup form">
      <List>
        <ListItem>
          <TextField
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
          <Button color="primary" variant="contained" onClick={signUp}>
            SIGN UP
          </Button>
        </ListItem>
        <ListItem>
          <IconButton onMouseEnter={handleClick} onMouseLeave={handleClick}>
            <HelpIcon />
          </IconButton>
          <Popper
            classes={classes}
            id={id}
            className="popper"
            open={open}
            anchorEl={anchorEl}
          >
            <div className="api-pop">
              you can find your apiKey, password and shop name under the "App"
              tab in your shopify's admin page.
            </div>
          </Popper>
        </ListItem>
      </List>
    </form>
  );
});

export default Part2;
