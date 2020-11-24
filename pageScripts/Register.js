
import { FEMALE_AVATARS, MALE_AVATARS } from "./Avatars.js";
import UsersController from "./Controllers/UsersController.js";
import { User } from "./Models/Users.js";


export class Register {
    constructor() {
        this.avatars = [];
        this.types = [];
        this.imageNum = 0;
        this.types.male = "male";
        this.types.female = "female";
        this.type = this.types.male;
        this.avatarType = document.getElementById("avatarType");
        this.selectAvatarButtonLeft = document.getElementById("selectAvatarButtonLeft");
        this.selectAvatarButtonRight = document.getElementById("selectAvatarButtonRight");
        this.registerImage = document.getElementById("registerImage");
        this.registerImage.src = "images/avatars/" + MALE_AVATARS[0];
        this.inputButtonregister = document.getElementById("inputButtonregister");
        this.registerForm = document.getElementById("registerForm");
        this.emailTextField = document.getElementById("emailTextField");
        this.userTextField = document.getElementById("userTextField");
        this.firstNamesTextField = document.getElementById("firstNamesTextField");
        this.lastNamesTextField = document.getElementById("lastNamesTextField");
        this.ageTextField = document.getElementById("ageTextField");
        this.passwordTextField = document.getElementById("passwordTextField");
        this.registerTitle = document.getElementById("registerTitle");
        this.changeAvatarType();
        this.selectAvatar();
        this.registerForm.addEventListener("submit", (e) => { this.registerUser(); e.preventDefault() }, false);
        this.simplePathAvatar = MALE_AVATARS[0];
    }

    changeAvatarType() {
        this.avatarType.addEventListener("click", () => {
            if (this.type === this.types.male) {
                this.type = this.types.female;
                this.avatarType.title = "Avatares para mujer";
                this.avatarType.style.backgroundImage = 'url("images/female.png")';
                this.avatarType.style.backgroundSize = "15px";
                this.imageNum = 0;
                this.simplePathAvatar = FEMALE_AVATARS[this.imageNum];
                this.registerImage.src = "images/avatars/" + FEMALE_AVATARS[this.imageNum];

            }
            else if (this.type === this.types.female) {
                this.type = this.types.male;
                this.avatarType.title = "Avatares para hombre";
                this.avatarType.style.backgroundImage = 'url("images/male.png")';
                this.avatarType.style.backgroundSize = "15px";
                this.imageNum = 0;
                this.simplePathAvatar = MALE_AVATARS[this.imageNum];
                this.registerImage.src = "images/avatars/" + MALE_AVATARS[this.imageNum];
            }
        }, false);
    }

    selectAvatar() {
        this.selectAvatarButtonLeft.addEventListener("click", () => {
            if (this.type == this.types.male) {
                if (this.imageNum > 0) {
                    this.imageNum--;
                    this.simplePathAvatar = MALE_AVATARS[this.imageNum];
                    this.registerImage.src = "images/avatars/" + MALE_AVATARS[this.imageNum];
                }
            }
            if (this.type == this.types.female) {
                if (this.imageNum > 0) {
                    this.imageNum--;
                    this.simplePathAvatar = FEMALE_AVATARS[this.imageNum];
                    this.registerImage.src = "images/avatars/" + FEMALE_AVATARS[this.imageNum];
                }
            }

        }, false);

        this.selectAvatarButtonRight.addEventListener("click", () => {
            if (this.type == this.types.male) {
                if (this.imageNum <= MALE_AVATARS.length - 2) {
                    this.imageNum++;
                    this.simplePathAvatar = MALE_AVATARS[this.imageNum];
                    this.registerImage.src = "images/avatars/" + MALE_AVATARS[this.imageNum];
                }
            }
            if (this.type == this.types.female) {
                if (this.imageNum <= FEMALE_AVATARS.length - 2) {
                    this.imageNum++;
                    this.simplePathAvatar = FEMALE_AVATARS[this.imageNum];
                    this.registerImage.src = "images/avatars/" + FEMALE_AVATARS[this.imageNum];
                }
            }

        }, false);

    }



    successfulRegistrationView() {
        this.selectAvatarButtonLeft.style.display = "none";
        this.selectAvatarButtonRight.style.display = "none";
        this.avatarType.style.display = "none";
        this.emailTextField.style.display = "none";
        this.userTextField.style.display = "none";
        this.firstNamesTextField.style.display = "none";
        this.lastNamesTextField.style.display = "none";
        this.ageTextField.style.display = "none";
        this.passwordTextField.style.display = "none";
        this.inputButtonregister.style.display = "none";
        this.registerTitle.innerHTML = "Cuenta creada exitosamente!";
    }


    registerUser() {
        let user = new User(this.simplePathAvatar,
            this.emailTextField.value,
            this.userTextField.value,
            this.firstNamesTextField.value,
            this.lastNamesTextField.value,
            this.ageTextField.value,
            this.passwordTextField.value);
        let usersController = new UsersController();
        usersController.createUser(user, () => {
            this.successfulRegistrationView();
            setTimeout(() => {
                window.location.href = "login.html";
            }, 2000);
        });
    }

}

let register = new Register();