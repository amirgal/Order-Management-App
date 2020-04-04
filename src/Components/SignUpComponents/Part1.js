import React, { useState} from 'react';
import {List, ListItem, Button, Divider, TextField} from '@material-ui/core';
import {useHistory} from 'react-router-dom'
import { inject } from 'mobx-react';
const axios = require('axios');

const Part1 =inject('generalStore')((props) => {
    const history = useHistory()
    const [user, setUser] = useState({...props.user})

    // const routeChange = (path) => {
    //     history.push(path);
    // }

    const handleInput = (e) => {
        const val = e.target.value
        const id = e.target.id
        const updatedUser = {...user}
        updatedUser[id] = val
        setUser(updatedUser)
    }

    const nextStep = async () => {
        props.nextStep(user)
    }

    
    
    return (
        <form autoComplete="off" noValidate className="signup form" >
            <List>
                <ListItem>
                    <TextField className="inputfield" id="username" label="Username" type="text" value={user.username} onChange={handleInput}/>
                </ListItem>
                <ListItem>
                    <TextField className="inputfield" id="password" label="Password" type="password" value={user.password} onChange={handleInput}/>
                </ListItem>
                <ListItem>
                    <TextField className="inputfield" id="confirm-password" label="Confirm password" type="password" value={user.password} onChange={handleInput}/>
                </ListItem>
                <ListItem>
                <TextField className="inputfield" id="email" label="Email" type="text" value={user.email} onChange={handleInput}/>
                </ListItem>
                <Divider id="divider" />
                <ListItem id="btns-list-item">
                    
                    <Button color="primary" variant="contained" onClick={nextStep}>Next</Button>
                </ListItem>
            </List>
        </form>
    )
    
})

export default Part1