import {observable,action, computed} from 'mobx'

import validator from 'validator'

export default class Helpers {
    
@action validateEmail = (value) => {
    console.log('here');
    
    return validator.isEmail(value)
}
    
@action validatePassword = (value) => {
    return validator.isLength(value, {min : 6,max : 10})
}
@action validateLength = (value) =>{
    return validator.isLength(value,{min: 3,max:45})
}
    
}

