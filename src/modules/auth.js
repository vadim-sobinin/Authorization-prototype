"use strict";

const auth = (isAuth) => {
  const form = document.querySelector(".form");
  const header = document.querySelector("h1");
  const loginInput = document.querySelector('input[placeholder="Email"]');
  const passInput = document.querySelector('input[placeholder="Password"]');
  const button = document.querySelector('input[type="submit"]');
  const link = document.querySelector("a");

  let authAs;

  function addEventListeners() {
    button.addEventListener("click", () => {
      if (form.classList[1] === "login") {
        return signIn();
      } else {
        signUp();
      }
    });

    link.addEventListener("click", () => {
      form.classList[1] === "login"
        ? changeToRegisterForm()
        : changeToLoginForm();
    });

    loginInput.addEventListener("click", () => {
      loginInput.style.borderColor = "";
    });

    passInput.addEventListener("click", () => {
      passInput.style.borderColor = "";
    });
  }
  addEventListeners();

  function changeToRegisterForm() {
    // console.log("Sign up");
    form.classList.remove("login");
    form.classList.add("register");

    link.textContent = "Already registered? Sing in";
    header.textContent = "Register";
    button.value = "Register";
  }

  function changeToLoginForm() {
    // console.log("Sign in");
    form.classList.remove("register");
    form.classList.add("login");

    link.textContent = "New user? Sign up";
    header.textContent = "Login";
    button.value = "Login";
  }

  function signIn() {
    const login = loginInput.value;
    const pass = passInput.value;

    if (login === "") {
      loginInput.style.borderColor = "red";
      alert("Please, enter your login!");
    } else if (pass === "") {
      passInput.style.borderColor = "red";
      alert("Please, enter your password!");
    } else {
      if (localStorage.getItem(login) == null) {
        loginInput.style.borderColor = "red";
        alert("Username is not correct! Check your username or register!");
      } else {
        if (JSON.parse(localStorage.getItem(login)).pass === pass) {
          return completedAuth();
        } else {
          passInput.style.borderColor = "red";
          alert("Password is wrong!");
        }
      }
    }
  }

  function alwaysTwoDigits(number) {
    if (String(number).length === 1) {
      return "0" + number;
    } else {
      return number;
    }
  }

  function signUp() {
    const login = loginInput.value;
    const pass = passInput.value;

    if (login === "") {
      alert("Please, enter your login!");
    } else if (pass === "") {
      alert("Please, enter your password!");
    } else {
      if (localStorage.getItem(login) == null) {
        const date = new Date();
        let regDate = `${alwaysTwoDigits(date.getDate())}/${alwaysTwoDigits(
          date.getMonth() + 1
        )}/${alwaysTwoDigits(date.getFullYear())} ${alwaysTwoDigits(
          date.getHours()
        )}:${alwaysTwoDigits(date.getMinutes())}:${alwaysTwoDigits(
          date.getSeconds()
        )}`;

        localStorage.setItem(login, JSON.stringify({pass, regDate}));
        loginInput.value = "";
        passInput.value = "";
        alert("Registration was successful! Log in!");
        changeToLoginForm();
      } else {
        alert("This user is already registered! Try logging in!");
        loginInput.style.borderColor = "red";
      }
    }

  }

  function completedAuth() {
    authAs = loginInput.value;
    isAuth = true;
    loginInput.value = "";
    passInput.value = "";
    form.style.display = "none";
    alert("Succsesed login!");
    return { isAuth, authAs };
  }
};

export default auth;
