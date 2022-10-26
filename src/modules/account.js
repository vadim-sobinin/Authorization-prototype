'use strict';
import controlUnit from '../index';

const acc =  {

  authAs: "",
  account: document.querySelector(".console"),
  
  headerUserName: document.querySelector(".navbar-brand"),
  btnLogOut: document.querySelector("#log-out-btn"),
  mainUserName: document.querySelector("#username"),
  userRegData: document.querySelector("#userRegData"),
  table: document.querySelector("#table-data"),

  
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
    acc.userRegData.textContent = JSON.parse(localStorage.getItem(acc.authAs)).regDate;

   acc.createUserList();


  },

  createUserList: () => {
    const userNames = Object.keys(localStorage);
    console.log("userNames", userNames);

    userNames.forEach((userName, index) => {
      index++;
      const newTableRow = document.createElement("tr");

      if (userName == acc.authAs) {
        newTableRow.classList.add("table-success");
      }

      newTableRow.innerHTML = `<th scope="row" class="user-number">${index}</th>
      <td class="user-email">${userName}</td>
      <td class="user-reg-date">${JSON.parse(localStorage.getItem(userName)).regDate}</td>
      <td class="edit ${userName == acc.authAs ? "edit-enable" : "edit-disable"}">edit</td>`;

      acc.table.append(newTableRow);
      console.log(newTableRow);
    });


  },


// render(),
};

export default acc;