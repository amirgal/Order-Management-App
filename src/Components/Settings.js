import React, { useState, useEffect } from "react";
import { inject, observer } from "mobx-react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  TextField,
  Input,
  IconButton,
  Popper,
  List,
  ListItem
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import HelpIcon from "@material-ui/icons/Help";

const useStyles = makeStyles({
  root: {
    border: 0,
    borderRadius: 3,
    color: "white",
    height: 48,
    padding: "0 30px",
  }
});

const Settings = inject("generalStore")(
  observer(props => {
    const [name, setName] = useState("");
    const [employee, setEmployee] = useState("");
    const [apiKey, setApiKey] = useState("");
    const [shopName, setShopName] = useState("");
    const [password, setPassword] = useState("");
    const [synced, setSynced] = useState(
      props.generalStore.orders.length > 0 ? true : false
    );

    useEffect(() => {
        props.generalStore.orders.length > 0 ? setSynced(true) : setSynced(false)
    },[props.generalStore.orders])
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
      setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const handleNameChange = e => {
      setName(e.target.value);
    };
    const handleChange = e => {
      e.target.name === "apiKey"
        ? setApiKey(e.target.value)
        : e.target.name === "password"
        ? setPassword(e.target.value)
        : setShopName(e.target.value);
    };

    const addEmployee = () => {
      props.generalStore.addEmployee(name);
      setName("");
    };
    const modifyEmployee = () => {
      props.generalStore.modifyEmployee(employee);
      setEmployee("");
    };
    const makeSync = async () => {
      if (apiKey.length > 8 && password.length > 8 && shopName.length > 1) {
        const isSuccessfull = await props.generalStore.makeSync({
          apiKey,
          password,
          shopName
        });
        isSuccessfull ? setSynced(true) : alert("sync failed");
        setApiKey("");
        setPassword("");
        setShopName("");
      }else {
          alert('Make sure you entered the correct parameters for your shop')
      }
    };
    const classes = useStyles();
    const open = Boolean(anchorEl);
    const id = open ? "simple-popper" : undefined;

    return (
      <div id="settings-page">
        <div className="employees-settings">
          <List>
            <ListItem>
              <TextField
                style={{width : 300}}
                classes={classes}
                placeholder="Add Employee Name"
                value={name}
                onChange={handleNameChange}
              />
              <Button onClick={addEmployee} variant="contained" style={{width : 250}}>
                Add employee
              </Button>
            </ListItem>
            <ListItem>
              <Autocomplete
                classes={classes}
                onChange={(e, v) => setEmployee(v)}
                options={props.generalStore.employees.filter(e => e.isActive)}
                getOptionLabel={option => option.name}
                style={{ width: 300 }}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Select Employee"
                  />
                )}
              />
              <Button onClick={modifyEmployee} variant="contained" style={{width : 250}}>
                remove from roster
              </Button>
            </ListItem>
            <ListItem>
              <Autocomplete
                classes={classes}
                onChange={(e, v) => setEmployee(v)}
                options={props.generalStore.employees.filter(e => !e.isActive)}
                getOptionLabel={option => option.name}
                style={{ width: 300 }}
                renderInput={params => (
                  <TextField {...params} label="Select inActive Employee" />
                )}
              />
              <Button onClick={modifyEmployee} variant="contained" style={{width : 250}}>
                add to roster
              </Button>
            </ListItem>
          </List>
        </div>
        <div className="sync-shop">
          {synced ? (
            <div id="storeSynced">Store already synced - you can re-sync if you wish</div>
          ) : null}
          <div>
            <div className="shop-details">
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
                  you can find your apiKey, password and shop name under the
                  "App" tab in your shopify's admin page.
                </div>
              </Popper>
              <Input
                classes={classes}
                className="sync-input"
                type="text"
                name="apiKey"
                placeholder="Enter Api key"
                value={apiKey}
                onChange={handleChange}
              />
              <Input
                classes={classes}
                className="sync-input"
                id="standard-adornment-password"
                type="text"
                name="password"
                placeholder="Enter shop password"
                value={password}
                onChange={handleChange}
              />
              <Input
                classes={classes}
                className="sync-input"
                type="text"
                name="shopName"
                placeholder="Enter shop name"
                value={shopName}
                onChange={handleChange}
              />
              <Button  onClick={makeSync} style={{margin : 10}} variant="contained">
                Sync With Store
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  })
);

export default Settings;
