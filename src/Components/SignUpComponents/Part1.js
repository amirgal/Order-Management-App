import React, { useState, useEffect} from 'react';
import {List, ListItem, Button, Divider, TextField} from '@material-ui/core';

import { inject } from 'mobx-react';

const Part1 =inject('generalStore','helpers')((props) => {
    const [buttunStatus,setButtonStatus] = useState(true)
    



    useEffect(()=>{
        if(props.user.email && props.user.password && props.user.confirmPassword && props.user.username){
            setButtonStatus(false)
        }else{
            setButtonStatus(true)
        }
    },[props.user])

    const handleInput = (e) => {
        const val = e.target.value
        const id = e.target.id
        const updatedUser = {...props.user}
        updatedUser[id] = val
        props.setUser(updatedUser)
        
    }

    const nextStep = async () => {
        const message = validateStep()
        if(message !== 'continue'){
            alert(message)
        }else{
            props.nextStep()
        }
    }

    const validateStep = () => {
        if(!props.helpers.validateLength(props.user.password)){
            return 'Username must be between 3-25 notes.'
        }else if(!props.helpers.validatePassword(props.user.password)){
            return 'Password must be between 6-10 notes'
        }else if(!props.helpers.validateEmail(props.user.email)){
            return 'Not a valid email format '
        }else if(!(props.user.password === props.user.confirmPassword)){
            return "Passwords values aren't the same"
        }else{
            return 'continue'
        }
            
    }

    
    

    
    
    return (
        <form autoComplete="off" noValidate className="signup form" >
            <List>
                <ListItem>
                    <TextField className="inputfield" id="username" label="Username" type="text" value={props.user.username} onChange={handleInput}/>
                </ListItem>
                <ListItem>
                    <TextField className="inputfield" id="password" label="Password" type="password" value={props.user.password} onChange={handleInput}/>
                </ListItem>
                <ListItem>
                    <TextField className="inputfield" id="confirmPassword" label="Confirm password" type="password" value={props.user.confirmPassword} onChange={handleInput}/>
                </ListItem>
                <ListItem>
                <TextField className="inputfield" id="email" label="Email" type="text" value={props.user.email} onChange={handleInput}/>
                </ListItem>
                <Divider id="divider" />
                <ListItem id="btns-list-item">
                    
                    <Button disabled={buttunStatus} color="primary" variant="contained" onClick={nextStep}>Next</Button>
                </ListItem>
            </List>
        </form>
    )
    
})

export default Part1