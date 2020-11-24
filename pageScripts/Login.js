import UsersController from "./Controllers/UsersController.js";
import { User } from "./Models/Users.js";

export class Login {


    constructor() {
        this.loginButton = document.getElementById("loginButtonLogin");
        this.registerButton = document.getElementById("registerButtonLogin");
        this.userTextField = document.getElementById("userTextField");
        this.passwordTextField = document.getElementById("passwordTextField");
        this.loginImage = document.getElementById("loginImage");
        this.loginTitle = document.getElementById("loginTitle");
        this.loginForm = document.getElementById("loginForm");
        this.loginForm.addEventListener("submit", (e) => { this.login(); e.preventDefault() }, false);
        this.redirectToRegister();
    }



    login() {
        let userController = new UsersController();
        userController.userLogin(this.userTextField.value, this.passwordTextField.value, this );
    }

    redirectToRegister() {
      
        this.registerButton.addEventListener("click", (e) => {
            window.location.href = "register.html";
            return
        }, false);
    }
}

let login = new Login();
