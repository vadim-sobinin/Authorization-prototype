"use strict";
import controlUnit from "../index";

const auth = {
  authAs: "",
  form: document.querySelector(".form"),
  header: document.querySelector("h1"),
  loginInput: document.querySelector('input[placeholder="Email"]'),
  passInput: document.querySelector('input[placeholder="Password"]'),
  button: document.querySelector('input[type="submit"]'),
  link: document.querySelector("a"),

  init: () => {
    auth.form.style.display = "block";
    auth.addEventListeners();
  },

  addEventListeners: function () {
    auth.button.addEventListener("click", () => {
      if (auth.form.classList[1] === "login") {
        return auth.signIn();
      } else {
        auth.signUp();
      }
    });

    auth.link.addEventListener("click", () => {
      auth.form.classList[1] === "login"
        ? auth.changeToRegisterForm()
        : auth.changeToLoginForm();
    });

    auth.loginInput.addEventListener("click", () => {
      auth.loginInput.style.borderColor = "";
    });

    auth.passInput.addEventListener("click", () => {
      auth.passInput.style.borderColor = "";
    });
  },
  // auth.addEventListeners();

  changeToRegisterForm: function () {
    // console.log("Sign up");
    auth.form.classList.remove("login");
    auth.form.classList.add("register");

    auth.link.textContent = "Already registered? Sing in";
    auth.header.textContent = "Register";
    auth.button.value = "Register";
  },

  changeToLoginForm: function () {
    // console.log("Sign in");
    auth.form.classList.remove("register");
    auth.form.classList.add("login");

    auth.link.textContent = "New user? Sign up";
    auth.header.textContent = "Login";
    auth.button.value = "Login";
  },

  signIn: function () {
    const login = auth.loginInput.value;
    const pass = auth.passInput.value;

    if (login === "") {
      auth.loginInput.style.borderColor = "red";
      alert("Please, enter your login!");
    } else if (pass === "") {
      auth.passInput.style.borderColor = "red";
      alert("Please, enter your password!");
    } else {
      if (localStorage.getItem(login) == null) {
        auth.loginInput.style.borderColor = "red";
        alert("Username is not correct! Check your username or register!");
      } else {
        if (JSON.parse(localStorage.getItem(login)).pass === pass) {
          return auth.completedAuth();
        } else {
          auth.passInput.style.borderColor = "red";
          alert("Password is wrong!");
        }
      }
    }
  },

  alwaysTwoDigits: function (number) {
    if (String(number).length === 1) {
      return "0" + number;
    } else {
      return number;
    }
  },

  signUp: function () {
    const login = auth.loginInput.value;
    const pass = auth.passInput.value;

    if (login === "") {
      auth.loginInput.style.borderColor = "red";
      alert("Please, enter your email!");
    } else if (
      !/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/gi.test(
        login
      )
    ) {
      auth.loginInput.style.borderColor = "red";
      alert("Email is not valid!");
    } else if (pass === "") {
      auth.passInput.style.borderColor = "red";
      alert("Please, enter your password!");
    } else {
      if (localStorage.getItem(login) == null) {
        const date = new Date();
        let regDate = `${auth.alwaysTwoDigits(
          date.getDate()
        )}/${auth.alwaysTwoDigits(date.getMonth() + 1)}/${auth.alwaysTwoDigits(
          date.getFullYear()
        )} ${auth.alwaysTwoDigits(date.getHours())}:${auth.alwaysTwoDigits(
          date.getMinutes()
        )}:${auth.alwaysTwoDigits(date.getSeconds())}`;

        localStorage.setItem(login, JSON.stringify({ pass, regDate }));
        // auth.loginInput.value = "";
        auth.passInput.value = "";
        alert("Registration was successful! Log in!");
        auth.changeToLoginForm();
      } else {
        alert("This user is already registered! Try logging in!");
        auth.loginInput.style.borderColor = "red";
      }
    }
  },

  completedAuth: function () {
    // controlUnit.authAs = auth.loginInput.value;
    auth.authAs = auth.loginInput.value;
    auth.loginInput.value = "";
    auth.passInput.value = "";
    auth.form.style.display = "none";
    alert("Succsesed login!");
    localStorage.setItem("isAuth", true);
    localStorage.setItem("authAs", auth.authAs);
    controlUnit.isAuth = true;
    controlUnit.loggedIn(auth.authAs);
  },
};

export default auth;
