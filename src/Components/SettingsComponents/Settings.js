import React, { useState, useEffect } from "react";
import '../../styles/Settings.css'
import { inject, observer } from "mobx-react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  TextField,
  List,
  ListItem
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import {useHistory} from "react-router-dom"

const useStyles = makeStyles({
  root: {
    border: 0,
    borderRadius: 3,
    // color: "white",
    height: 48,
    padding: "0 30px",
  }
});
const Settings = inject("generalStore")(
  observer(props => {
    const history = useHistory()
    const [name, setName] = useState("");
    const [employee, setEmployee] = useState("");
    const [inactiveEmployee, setInactiveEmployee] = useState("");
    const [synced, setSynced] = useState(
      props.generalStore.products.length > 0 ? true : false
    );
    useEffect(() => {
        props.generalStore.products.length > 0 ? setSynced(true) : setSynced(false)
    },[props.generalStore.products])
    
    const logOut = () => {
      localStorage.removeItem("adminId")
      history.push('/login')
    }

    const handleNameChange = e => {
      setName(e.target.value);
    };
    const addEmployee = () => {
      if(name.length > 1){
        props.generalStore.addEmployee(name);
        setName("");
      }else{
        alert('Employee must have a name')
      }
    };
    const makeInactive = () => {
      if(employee !== ""){
        props.generalStore.modifyEmployee(employee);
        setEmployee("");
      }else{
        alert('no available employee to modify')
      }
    };
    const makeActive = () => {
      if(inactiveEmployee !== ""){
        props.generalStore.modifyEmployee(inactiveEmployee);
        setInactiveEmployee("");
      }else{
        alert('no available employee to modify')
      }
    };
    const makeSync = async () => {
        const isSuccessfull = await props.generalStore.makeSync();
        isSuccessfull ? setSynced(true) : alert("sync failed");
    };
    const classes = useStyles();
    return (
      <div id="settings-page">
        <div className="employees-settings">
          <List>
            <ListItem>
              <TextField
                color="secondary"
                style={{width : 300}}
                classes={classes}
                placeholder="Add Employee Name"
                value={name}
                onChange={handleNameChange}
              />
              <Button onClick={addEmployee} variant="contained"
                color="secondary" style={{width : 250}}>
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
                  <TextField color="secondary" value={employee}
                    {...params} label="Select Employee"/>
                )}
              />
              <Button onClick={makeInactive} variant="contained" style={{width : 250}} color="secondary">
                remove from roster
              </Button>
            </ListItem>
            <ListItem>
              <Autocomplete
                classes={classes}
                onChange={(e, v) => setInactiveEmployee(v)}
                options={props.generalStore.employees.filter(e => !e.isActive)}
                getOptionLabel={option => option.name}
                style={{ width: 300 }}
                renderInput={params => (
                  <TextField value={inactiveEmployee} {...params} label="Select inActive Employee" color="secondary"/>
                )}
              />
              <Button onClick={makeActive} variant="contained" style={{width : 250}} color="secondary">
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
              <Button  onClick={makeSync} style={{margin : 10}} variant="contained" color="secondary">
                ReSync With Store
              </Button>
              <Button color="secondary" variant="contained" onClick={logOut}>LOGOUT</Button>
            </div>
          </div>
        </div>
      </div>
    );
  })
);
export default Settings;





