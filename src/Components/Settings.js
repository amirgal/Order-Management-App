import React, { useState } from "react";
import { inject, observer } from "mobx-react";
import {
  Button,
  TextField,
  Input,
  InputAdornment,
  IconButton,
  Popper
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { Visibility } from "@material-ui/icons";
import HelpIcon from "@material-ui/icons/Help";

const Settings = inject("ordersStore")(
  observer(props => {
    const [name, setName] = useState("");
    const [employee, setEmployee] = useState("");
    const [apiKey, setApiKey] = useState("");
    const [shopName, setShopName] = useState("");
    const [password, setPassword] = useState("");
    const [synced, setSynced] = useState(
      props.ordersStore.products.length > 0 ? true : false
    );
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
      props.ordersStore.addEmployee(name);
      setName("");
    };
    const modifyEmployee = () => {
      props.ordersStore.modifyEmployee(employee);
      setEmployee("");
    };
    const makeSync = async () => {
      const isSuccessfull = await props.ordersStore.makeSync({
        apiKey,
        password,
        shopName
      });
      isSuccessfull ? setSynced(true) : alert("sync failed");
      setApiKey("");
      setPassword("");
      setShopName("");
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popper" : undefined;

    return (
      <div id="settings-page">
        <div className="employees-settings">
          <div className="add-employee">
            <TextField
              id="outlined-basic"
              label="Add mame"
              variant="outlined"
              value={name}
              onChange={handleNameChange}
            />
            <Button onClick={addEmployee} variant="contained" color="primary">
              Add employee
            </Button>
          </div>
          <Autocomplete
            id="select-employee"
            onChange={(e, v) => setEmployee(v)}
            options={props.ordersStore.employees.filter(e => e.isActive)}
            getOptionLabel={option => option.name}
            style={{ width: 300 }}
            renderInput={params => (
              <TextField {...params} label="Select Employee" />
            )}
          />
          <Button onClick={modifyEmployee} variant="contained" color="primary">
            Make inActive
          </Button>
          <Autocomplete
            id="select-employee"
            onChange={(e, v) => setEmployee(v)}
            options={props.ordersStore.employees.filter(e => !e.isActive)}
            getOptionLabel={option => option.name}
            style={{ width: 300 }}
            renderInput={params => (
              <TextField {...params} label="Select inActive Employee" />
            )}
          />
          <Button onClick={modifyEmployee} variant="contained" color="primary">
            Make Active
          </Button>
        </div>
        <div className="sync-shop">
          {synced ? (
            <div>Store synced with system - you can re-sync if you wish</div>
          ) : null}
          <div>
            <div className="shop-details">
              <Input
                type="text"
                name="apiKey"
                placeholder="Enter Api key"
                value={apiKey}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={handleClick}>
                      <HelpIcon />
                    </IconButton>
                    <Popper id={id} classes={{margin : '10px'}} open={open} anchorEl={anchorEl}>
                      <div className="api-pop">you can find your apiKey, password and shop's name under the "App" tab in your shopify's admin page.</div>
                    </Popper>
                  </InputAdornment>
                }
              />
              <Input
                id="standard-adornment-password"
                type="text"
                name="password"
                placeholder="Enter shop password"
                value={password}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={handleClick}>
                      <HelpIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
              <Input
                type="text"
                name="shopName"
                placeholder="Enter shop name"
                value={shopName}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={handleClick}>
                      <HelpIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
              <Button onClick={makeSync} variant="contained" color="primary">
                Make Sync
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  })
);

export default Settings;
