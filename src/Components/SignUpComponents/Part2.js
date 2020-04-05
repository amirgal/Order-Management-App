import React, { useState} from 'react';
import {List, ListItem, Button, Divider, TextField} from '@material-ui/core';
import {useHistory} from 'react-router-dom'
import { inject } from 'mobx-react';
const axios = require('axios');

const Part2 =inject('generalStore','helpers')((props) => {
    const history = useHistory()

    const handleInput = (e) => {
        const val = e.target.value
        const id = e.target.id
        const updatedUser = {...props.user}
        updatedUser[id] = val
        props.setUser(updatedUser)
    }

    const validateStep = () => {
        if(!props.helpers.validateLength(props.user.apiKey)){
            return 'Api key must be included'
        }else if(!props.helpers.validateLength(props.user.storePassword)){
            return 'Store password must be included'
        }else if(!props.helpers.validateLength(props.user.storeName)){
            return 'Store name value must be included '
        }else if(!(props.helpers.validateLength(props.user.secretKey))){
            return "Secret key value must be included"
        }else{
            return 'continue'
        }
    }

      
    const signUp = async () => {
        const message = validateStep()
        if(message != 'continue'){
            alert(message)
        }else{
            props.signUp()
        }
    }
    
    return (
        <form autoComplete="off" noValidate className="signup form" >
            <List>
                <ListItem>
                    <TextField className="inputfield" id="apiKey" label="Api key" type="password" value={props.user.apiKey} onChange={handleInput}/>
                </ListItem>
                <ListItem>
                    <TextField className="inputfield" id="storePassword" label=" Store password" type="password" value={props.user.storePassword} onChange={handleInput}/>
                </ListItem>
                <ListItem>
                    <TextField className="inputfield" id="storeName" label="Store name" type="text" value={props.user.storeName} onChange={handleInput}/>
                </ListItem>
                <ListItem>
                    <TextField className="inputfield" id="secretKey" label="Secret key" type="password" value={props.user.secretKey} onChange={handleInput}/>
                </ListItem>
                <Divider id="divider" />
                <ListItem id="btns-list-item">
                    
                    <Button color="primary" variant="contained" onClick={signUp}>SIGN UP</Button>
                </ListItem>
            </List>
        </form>
    )
    
})

export default Part2