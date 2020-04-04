import React, { useState} from 'react';
import {List, ListItem, Button, Divider, TextField} from '@material-ui/core';
import {useHistory} from 'react-router-dom'
import { inject } from 'mobx-react';
const axios = require('axios');

const Part2 =inject('generalStore')((props) => {
    const history = useHistory()
    const [user, setUser] = useState({...props.user})

    const routeChange = (path) => {
        history.push(path);
    }

    const handleInput = (e) => {
        const val = e.target.value
        const id = e.target.id
        const updatedUser = {...user}
        updatedUser[id] = val
        setUser(updatedUser)
    }

    // const login = async () => {
    //     try{
    //       const response = await axios.post('http://localhost:4000/api/user', user)
    //       if(response.data.userId){
    //         props.generalStore.adminId = response.data.userId
    //         localStorage.adminId = response.data.userId
    //         debugger
    //         await props.generalStore.getAdminData()
    //         routeChange('/order-manager')
    //       }else {
    //         alert(response.data.message)
    //       }
    //     }catch(err){
    //       console.log(err)
    //     }
    //   }
      
    const signUp = async () => {
        props.signUp(user)
    }
    
    return (
        <form autoComplete="off" noValidate className="signup form" >
            <List>
                <ListItem>
                    <TextField className="inputfield" id="apiKey" label="Api key" type="password" value={user.apiKey} onChange={handleInput}/>
                </ListItem>
                <ListItem>
                    <TextField className="inputfield" id="storePassword" label=" Store password" type="password" value={user.storePassword} onChange={handleInput}/>
                </ListItem>
                <ListItem>
                    <TextField className="inputfield" id="storeName" label="Store name" type="text" value={user.storeName} onChange={handleInput}/>
                </ListItem>
                <ListItem>
                    <TextField className="inputfield" id="secretKey" label="Secret key" type="password" value={user.secretKey} onChange={handleInput}/>
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