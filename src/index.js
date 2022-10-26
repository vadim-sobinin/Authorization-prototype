"use strict";
import auth from './modules/auth';
import acc from './modules/account';


const controlUnit = {
  
  isAuth: false,
  authAs: "Admin",
  loggedIn : (authAs) => {
    acc.init(authAs);
  },

  loggedOut : () => {
    auth.init();
  } 
};

if (controlUnit.isAuth) {
  auth.form.style.display = "none";
  controlUnit.loggedIn(controlUnit.authAs);
} else {
  controlUnit.loggedOut();
}


export default controlUnit;
