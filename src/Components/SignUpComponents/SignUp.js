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
    const [user, setUser] = useState({username:'', password:'',email:'',apiKey:'',storePassword:'',storeName:'',secretKey:''})

    const routeChange = (path) => {
        history.push(path);
    }
    const nextStep = (newUser) => {
        setStep(2)
        setUser(newUser)
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
      
    const signUp = async (newUser) => {
        //  setUser(newUser)
        try{
            const response = await axios.post(`http://localhost:4000/api/newuser`,newUser)
            localStorage.adminId = response.data._id
            props.generalStore.adminId = response.data._id
            await props.generalStore.getAdminData(response)
            debugger
            routeChange('/order-manager')
        }catch(err){
            console.log(err)
        }
    }
    
    return(
        step == 1 ? <Part1 nextStep={nextStep}/> :  <Part2 user={user} signUp={signUp}/>
    )
    
})

export default SignUp