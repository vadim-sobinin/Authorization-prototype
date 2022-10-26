"use strict";
import auth from './modules/auth';
import account from './modules/account';
import addEventListeners from './modules/addEventListeners';


let isAuth = false;
let authAs = "Test";
let res;

addEventListeners();

if (isAuth){
 account(isAuth, authAs) ;
} else{
  auth();
  
}

