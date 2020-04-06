import React, { useState} from 'react';
import {List, ListItem, Button, Divider, TextField, Box} from '@material-ui/core';
import {useHistory} from 'react-router-dom'
import { inject } from 'mobx-react';
import '../styles/SignUp.css'

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
        <Box className="login-list" bgcolor="background.paper">
            <List>
                <ListItem>
                    <TextField color="secondary" className="inputfield" id="username" label="Username" type="text" value={user.username} onChange={handleInput}/>
                </ListItem>
                <ListItem>
                    <TextField color="secondary" className="inputfield" id="password" label="Password" type="password" value={user.password} onChange={handleInput}/>
                </ListItem>
                <Divider id="divider" />
                <ListItem id="btns-list-item2">
                    <div className="login-btns">
                    <Button className="login-btn" color="primary" variant="contained" onClick={login}>Login</Button>
                    <Button className="login-btn" color="primary" variant="contained" onClick={()=> routeChange('/signup')}>Signup</Button>
                    </div>
                </ListItem>
            </List>
            </Box>
    )
    
})

export default Login