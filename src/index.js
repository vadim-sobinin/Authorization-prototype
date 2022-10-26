"use strict";
import auth from './modules/auth';
import acc from './modules/account';


const controlUnit = {
  
  isAuth: false,
  authAs: "",

  init : () => {
    
    if (localStorage.getItem("isAuth") == "true"){
      controlUnit.isAuth = true;
      controlUnit.authAs = localStorage.getItem("authAs");
    } else if (localStorage.getItem("isAuth") == ("false" || null)) {
      controlUnit.isAuth = false;
    }
    
    if (controlUnit.isAuth) {
      auth.form.style.display = "none";
      controlUnit.loggedIn(controlUnit.authAs);
    } else {
      controlUnit.loggedOut();
    }
  },

  loggedIn : (authAs) => {
    acc.init(authAs);
  },

  loggedOut : () => {
    auth.init();
  } 
};

controlUnit.init();


export default controlUnit;
