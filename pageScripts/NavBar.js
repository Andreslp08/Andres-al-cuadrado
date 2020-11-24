import { USER_STATE } from "./UserState.js";

export class NavBar{
    constructor(){
        this.usContainer = document.getElementById("usContainer");
        this.avatar = document.getElementById("avatar");
        this.avatarName = document.getElementById("avatarName");
        this.loginButton = document.getElementById("logInBtn");
        this.logoutButton = document.getElementById("logoutButton");
        this.detectUserState();
        this.showLogin();
        this.logout();
    }

    detectUserState(){
        if( USER_STATE.isOnline == true ){
            this.usContainer.style.display = "flex";
            this.loginButton.style.display = "none";
            if( USER_STATE.userOnline != null &&USER_STATE.userOnline != undefined){
               this.avatarName.innerHTML = USER_STATE.userOnline.user;
               this.avatar.src = USER_STATE.userOnline.avatarPath;
            }
  
        }
        else{
            this.usContainer.style.display = "none";
            this.loginButton.style.display = "block"; 
        }
    }

    showLogin(){
        this.loginButton.addEventListener("click", (e) =>{
            window.location.href = "login.html";
            return;
        }, false);
    }

    logout(){
        this.logoutButton.addEventListener("click", () =>{
            this.usContainer.style.display = "none";
            this.loginButton.style.display = "block";
            let isOnline = localStorage.setItem('isOnline', false);
            let userOnline = localStorage.setItem('userOnline', null);
            window.location.href = "home.html";
        }, false);
    }
}

let navbar = new NavBar();

