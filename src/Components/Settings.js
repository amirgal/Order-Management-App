import React, { useState } from "react";
import { inject, observer } from "mobx-react";
import { Button, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
// import TextField from '@material-ui/core/TextField';

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
    const handleNameChange = e => {
      setName(e.target.value);
    };
    const handleChange = e => {
      e.target.name === "apiKey"
        ? setApiKey(e.target.value)
        : e.target.name === 'password' ?  setPassword(e.target.value) : setShopName(e.target.value)
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
    };

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
          {synced ?<div>Store synced with system - you can re-sync if you wish</div> : null}
            <div>
                <div className="shop-details">
              <TextField
                id="outlined-basic"
                name="apiKey"
                label="Add api key"
                variant="outlined"
                value={apiKey}
                onChange={handleChange}
              />
              <TextField
                id="outlined-basic"
                name="password"
                label="Add password"
                variant="outlined"
                value={password}
                onChange={handleChange}
              />
              <TextField
                id="outlined-basic"
                name="shopName"
                label="Add shop name"
                variant="outlined"
                value={shopName}
                onChange={handleChange}
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
