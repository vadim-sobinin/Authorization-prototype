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

      localStorage.setItem("isAuth", acc.isAuth); 
      localStorage.setItem("authAs", acc.authAs);

      controlUnit.loggedOut();
    });
  },

  
  render: () => {
    acc.headerUserName.textContent = acc.authAs;
    acc.mainUserName.textContent = acc.authAs;
    acc.userRegData.textContent = JSON.parse(localStorage.getItem(acc.authAs)).regDate;

    acc.createUserList();

    document.querySelector(".activeUserBtn"). addEventListener('click', acc.openModal);
    document.querySelector("#changePassBtn").addEventListener('click', acc.changePassword);
    


  },

  createUserList: () => {
    const userNames = Object.keys(localStorage);

    userNames.splice(userNames.indexOf("isAuth"), 1);
    userNames.splice(userNames.indexOf("authAs"), 1);

    userNames.forEach((userName, index) => {

      
      index++;
      const newTableRow = document.createElement("tr");

      if (userName == acc.authAs) {
        newTableRow.classList.add("table-success");
      }

      newTableRow.innerHTML = `<th scope="row" class="user-number">${index}</th>
      <td class="user-email">${userName}</td>
      <td class="user-reg-date">${JSON.parse(localStorage.getItem(userName)).regDate}</td>
      <td class="edit">
      
      <button type="button" ${userName == acc.authAs ? "" : "disabled"} class="btn btn-${userName == acc.authAs ? "primary activeUserBtn" : "danger"}" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="${userName}">edit</button>

      </td>`;

      acc.table.append(newTableRow);
    });
  },

  openModal: () => {

    const modal = document.querySelector(".modal");
    const userNameInput = modal.querySelector("#user-email");
    userNameInput.value = acc.authAs;
    userNameInput.setAttribute("disabled", true);

    const changePassBtn = document.querySelector("#changePassBtn");
      changePassBtn.removeAttribute("disabled");
      changePassBtn.classList.remove("btn-secondary");
      changePassBtn.classList.add("btn-primary");

      document.querySelector("#closeBtn").classList.remove("btn-primary");
      document.querySelector("#closeBtn").classList.add("btn-secondary");

  },

  changePassword: () => {

    const newPass = document.querySelector("#new-password");
    const reNewPass = document.querySelector("#re-new-password");

    reNewPass.addEventListener("click", () => {
      reNewPass.style.borderColor = "";
    });

    if (newPass.value == ""){
      alert("Please enter new password!");
    } else if (newPass.value != reNewPass.value ||newPass.value === "") {
      reNewPass.style.borderColor = "red";
      alert("Passwords don't match, check again!");
    } else {
      const newDataObj = JSON.parse(localStorage.getItem(acc.authAs));
      newDataObj.pass = newPass.value;
      const newDataString = JSON.stringify(newDataObj);
      localStorage.setItem(acc.authAs, newDataString);
      
      newPass.value = "";
      reNewPass.value = "";
      
      const changePassBtn = document.querySelector("#changePassBtn");
      changePassBtn.setAttribute("disabled", true);
      changePassBtn.classList.remove("btn-primary");
      changePassBtn.classList.add("btn-secondary");

      document.querySelector("#closeBtn").classList.remove("btn-secondary");
      document.querySelector("#closeBtn").classList.add("btn-primary");

      
      alert("Password changed successfully!");
      
    }


  }



};

export default acc;