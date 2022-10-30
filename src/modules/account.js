"use strict";
import controlUnit from "../index";

const acc = {
  authAs: "",
  account: document.querySelector(".console"),

  headerUserName: document.querySelector(".navbar-brand"),
  btnLogOut: document.querySelector("#log-out-btn"),
  mainUserName: document.querySelector("#username"),
  userRegData: document.querySelector("#userRegData"),
  table: document.querySelector("#table-data"),
  userPermissionHeader: document.querySelector("#userPermission"),
  userPermission: "",

  init: (authAs) => {
    acc.account.style.display = "block";
    acc.authAs = authAs;
    acc.userPermission = JSON.parse(
      localStorage.getItem(acc.authAs)
    ).permission;

    acc.render();
  },

  addEventListeners: () => {
    acc.btnLogOut.addEventListener("click", () => {
      acc.isAuth = false;
      acc.authAs = "";
      controlUnit.authAs = acc.authAs;
      acc.account.style.display = "none";

      localStorage.setItem("isAuth", acc.isAuth);
      localStorage.setItem("authAs", acc.authAs);

      controlUnit.loggedOut();
    });

    const modal = document.querySelector(".modal");
    const userNameInput = modal.querySelector("#user-email");
    modal.addEventListener("show.bs.modal", (event) => {
      const buttonsUser = event.relatedTarget.getAttribute("data-bs-userName");

      userNameInput.value = buttonsUser;
      userNameInput.setAttribute("disabled", true);
      const switchBtn = modal.querySelector(".switch-btn");
      if (acc.userPermission === "admin") {
        modal.querySelector(".switch-div").style.display = "flex";
        if (
          JSON.parse(localStorage.getItem(buttonsUser)).permission === "admin"
        ) {
          switchBtn.classList.add("switch-on");
        } else {
          switchBtn.classList.remove("switch-on");
        }
      } else {
        modal.querySelector(".switch-div").style.display = "none";
      }
    });

    modal.querySelector(".switch-btn").addEventListener("click", (e) => {
      if (userNameInput.value !== "Master") {
        console.log("toggle start");
        e.target.classList.toggle("switch-on");
        console.log("toggle end");

        let newValue = JSON.parse(localStorage.getItem(userNameInput.value));
        console.log(e.target.classList.contains("switch-on"));
        if (e.target.classList.contains("switch-on")) {
          newValue.permission = "admin";
          localStorage.setItem(userNameInput.value, JSON.stringify(newValue));
          acc.render();
        } else {
          newValue.permission = "user";
          localStorage.setItem(userNameInput.value, JSON.stringify(newValue));
          acc.render();
          if (acc.authAs === userNameInput.value) {
            alert(
              "Warning!\nYou have changed your account access to User!\nIf you close pop-up, you will lose Admin access."
            );
          }
        }
      } else {
        alert("Access denied! The Master ALWAYS has Admin access!");
      }
    });
  },

  render: () => {
    acc.headerUserName.textContent = acc.authAs;
    acc.mainUserName.textContent = acc.authAs;
    acc.userRegData.textContent = JSON.parse(
      localStorage.getItem(acc.authAs)
    ).regDate;

    acc.userPermission = JSON.parse(
      localStorage.getItem(acc.authAs)
    ).permission;
    acc.userPermissionHeader.textContent = acc.userPermission;
    acc.userPermission === "admin"
      ? (acc.userPermissionHeader.style.color = "gold")
      : null;
    acc.userPermission === "admin"
      ? (acc.userPermissionHeader.style.fontWeight = "700")
      : null;

    acc.createUserList();

    document
      .querySelectorAll(".activeUserBtn")
      .forEach((btn) => btn.addEventListener("click", acc.openModal));
    document.querySelector("#changePassBtn").addEventListener("click", () => {
      const modal = document.querySelector(".modal");
      const userName = modal.querySelector("#user-email").value;
      acc.changePassword(userName);
    });
  },

  createUserList: () => {
    acc.table.innerHTML = "";

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
      <td class="user-reg-date">${
        JSON.parse(localStorage.getItem(userName)).regDate
      }</td>
      <td class="user-reg-date">${
        JSON.parse(localStorage.getItem(userName)).permission
      }</td>
      <td class="edit">
      <button type="button" ${
        acc.userPermission == "admin"
          ? ""
          : userName == acc.authAs
          ? ""
          : "disabled"
      } class="btn btn-${
        acc.userPermission == "admin"
          ? "primary activeUserBtn"
          : userName == acc.authAs
          ? "primary activeUserBtn"
          : "danger"
      }" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-userName="${userName}">edit</button>

      </td>`;

      acc.table.append(newTableRow);
    });
  },

  openModal: () => {
    const changePassBtn = document.querySelector("#changePassBtn");
    changePassBtn.removeAttribute("disabled");
    changePassBtn.classList.remove("btn-secondary");
    changePassBtn.classList.add("btn-primary");

    document.querySelector("#closeBtn").classList.remove("btn-primary");
    document.querySelector("#closeBtn").classList.add("btn-secondary");
  },

  changePassword: (userName) => {
    const newPass = document.querySelector("#new-password");
    const reNewPass = document.querySelector("#re-new-password");

    reNewPass.addEventListener("click", () => {
      reNewPass.style.borderColor = "";
    });

    if (newPass.value == "") {
      alert("Please enter new password!");
    } else if (newPass.value != reNewPass.value || newPass.value === "") {
      reNewPass.style.borderColor = "red";
      alert("Passwords don't match, check again!");
    } else {
      const newDataObj = JSON.parse(localStorage.getItem(userName));
      newDataObj.pass = newPass.value;
      const newDataString = JSON.stringify(newDataObj);
      localStorage.setItem(userName, newDataString);

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
  },
};

export default acc;
