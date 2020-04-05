import React, { useState} from 'react';
import {List, ListItem, Button, Divider, TextField} from '@material-ui/core';
import {useHistory} from 'react-router-dom'
import { inject } from 'mobx-react';
import Part1 from './Part1';
import Part2 from './Part2';
const axios = require('axios');

const SignUp =inject('generalStore')((props) => {
    const [step,setStep] = useState(1)
    const history = useHistory()
    const [user, setUser] = useState({username:'', password:'',confirmPassword: '',email:'',apiKey:'',storePassword:'',storeName:'',secretKey:''})

    const routeChange = (path) => {
        history.push(path);
    }
    const nextStep = () => {
        setStep(2)
    }

      
    const signUp = async () => {
        try{
            const response = await axios.post(`http://localhost:4000/api/newuser`,user)
            localStorage.adminId = response.data._id
            props.generalStore.adminId = response.data._id
            await props.generalStore.getAdminData(response)
            routeChange('/order-manager')
        }catch(err){
            console.log(err)
        }
    }

    if(step === 1){
        return(
            <Part1 user={user} nextStep={nextStep} setUser={setUser}/>
        )
    }else{
        return(
            <Part2 user={user} signUp={signUp} setUser={setUser}/>
        )
    }
    
    
})

export default SignUp