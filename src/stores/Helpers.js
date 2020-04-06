import { action, observable } from "mobx";

import validator from "validator";

export default class Helpers {
  @observable couriers = {
    Standard: {
      link:"https://www.israelpost.co.il/content.nsf/pages/237",
      img:"https://upload.wikimedia.org/wikipedia/he/thumb/6/6d/DoarIsrael.svg/250px-DoarIsrael.svg.png"
    },
    Express: {
      link:"https://www.fedex.com/fcl/;SHIPPINGSESSIONID=R1lMEgaGhIoid_R8IVPVQWaFRc0eEJZ_sW2GyXycNA9AiJKn76mL!363170146?appName=fclfsm&locale=il_en&step3URL=https%3A%2F%2Fwww.fedex.com%2Fshipping%2FshipEntryAction.do%3Fmethod%3DdoRegistration%26link%3D1%26locale%3Den_IL%26urlparams%3Dil_hebrew%26sType%3DF&returnurl=https%3A%2F%2Fwww.fedex.com%2Fshipping%2FshipEntryAction.do%3Fmethod%3DdoEntry%26link%3D1%26locale%3Den_IL%26urlparams%3Dil_hebrew%26sType%3DF&programIndicator=0",
      img:"https://cdn3.iconfinder.com/data/icons/payment-icons-2/128/fedex_express_128.png"}
    }
  
  @observable snackBar = {open:false, message:'', severity:'success'}

  @action openSnackBar = (message,severity) => {
    this.snackBar = {open:true , message , severity}
  }

  @action validateEmail = value => {
    return validator.isEmail(value);
  };

  @action validatePassword = value => {
    return validator.isLength(value, { min: 6, max: 10 });
  };
  @action validateLength = value => {
    return validator.isLength(value, { min: 3, max: 45 });
  };
}
