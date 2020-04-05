import { action } from "mobx";

import validator from "validator";

export default class Helpers {
  @observable shippingMethod = {}

  @action setShippingMethod = method => {
    this.shippingMethod = method === "Standard" ? 
    {link:"https://www.israelpost.co.il/content.nsf/pages/237"} :
    {link:"www.google.com"}
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
