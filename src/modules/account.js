'use strict';

const account = (isAuth, authAs) => {

  const account = document.querySelector(".console");
  console.log(account);
  account.style.display = "block";
  const headerUserName = document.querySelector(".navbar-brand");
  const btnLogOut = document.querySelector("#log-out-btn");
  const mainUserName = document.querySelector("#username");
  const userRegData = document.querySelector("#userRegData");
  const table = document.querySelector("table");

  
  const addEventListeners = () => {
    btnLogOut.addEventListener('click', () => {
      isAuth = false;
    });
  };

  
  const render = () => {
    headerUserName.textContent = authAs;
    mainUserName.textContent = authAs;

  

  // console.log(regDate);



  };


render();
};

export default account;