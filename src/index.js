"use strict";
import auth from "./modules/auth";
import acc from "./modules/account";

const controlUnit = {
  debugging: false, // for debugging purpose
  isAuth: false,
  authAs: "",

  init: () => {
    controlUnit.addMasterAccount();

    acc.addEventListeners();
    auth.addEventListeners();

    if (controlUnit.debugging) {
      localStorage.setItem("isAuth", controlUnit.isAuth);
      localStorage.setItem("authAs", controlUnit.authAs);
    }

    if (localStorage.getItem("isAuth") == "true") {
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

  loggedIn: (authAs) => {
    acc.init(authAs);
  },

  loggedOut: () => {
    auth.init();
  },

  addMasterAccount: () => {
    if (localStorage.getItem("Master") == null) {
      localStorage.setItem(
        "Master",
        JSON.stringify({
          pass: "Master",
          regDate: auth.getRegDate(),
          permission: "admin",
        })
      );
    }
  },
};

controlUnit.init();

export default controlUnit;
