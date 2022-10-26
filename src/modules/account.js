'use strict';
import controlUnit from '../index';

const acc =  {

  authAs: "",
  account: document.querySelector(".console"),
  
  headerUserName: document.querySelector(".navbar-brand"),
  btnLogOut: document.querySelector("#log-out-btn"),
  mainUserName: document.querySelector("#username"),
  userRegData: document.querySelector("#userRegData"),
  table: document.querySelector("table"),

  
  init: (authAs) => {
    acc.account.style.display = "block";
    acc.authAs = authAs;
    acc.addEventListeners();
    
    acc.render();
  },

  addEventListeners: () => {
    acc.btnLogOut.addEventListener('click', () => {
      acc.isAuth = false;
      acc.authAs = '';
      controlUnit.authAs = acc.authAs;
      acc.account.style.display = "none";

      controlUnit.loggedOut();
    });
  },

  
  render: () => {
    acc.headerUserName.textContent = acc.authAs;
    acc.mainUserName.textContent = acc.authAs;



  },


// render(),
};

export default acc;