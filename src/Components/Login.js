import React, { useState} from 'react';
import {List, ListItem, Button, Divider, TextField} from '@material-ui/core';
import {useHistory} from 'react-router-dom'
import { inject } from 'mobx-react';
const axios = require('axios');

const Login =inject('generalStore')((props) => {
    const history = useHistory()
    const [user, setUser] = useState({username:'', password:''})

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

    const login = async () => {
        debugger
        try{
          const response = await axios.post('http://localhost:4000/api/user', user)
          if(response.data.userId){
            props.generalStore.adminId = response.data.userId
            localStorage.adminId = response.data.userId
            await props.generalStore.getAdminData()
            routeChange('/order-manager')
          }else {
            alert(response.data.message)
          }
        }catch(err){
          console.log(err)
        }
      }
      
    
    return (
        <form autoComplete="off" noValidate className="login form" >
            <List>
                <ListItem>
                    <TextField className="inputfield" id="username" label="Username" type="text" value={user.username} onChange={handleInput}/>
                </ListItem>
                <ListItem>
                    <TextField className="inputfield" id="password" label="Password" type="password" value={user.password} onChange={handleInput}/>
                </ListItem>
                <Divider id="divider" />
                <ListItem id="btns-list-item">
                    <Button color="primary" variant="contained" onClick={login}>LOGIN</Button>
                    <Button color="primary" variant="contained" onClick={()=> routeChange('/signup')}>SIGN UP</Button>
                </ListItem>
            </List>
        </form>
    )
    
})

export default Login