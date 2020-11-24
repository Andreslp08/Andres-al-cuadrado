import { User } from "../Models/Users.js";
import { USER_STATE } from "../UserState.js";

export default class UsersController {
    constructor() {
    }

    async createUser(user, toDo) {
        // verifica si existe el correo
        this.getUserByEmail(user.email).then(data => {
            if (data.status == 200) {
                data.json().then(u => {
                    // si devuelve un usuario vacio  "empty", significa que el correo no esta registrado y se puede proceder con el registro
                    if (u.email === "empty") {
                         // verifica si existe el usuario
                        this.getUserByUser(user.user).then(data => {
                            if (data.status == 200) {
                                data.json().then(u => {
                                     // si devuelve un usuario vacio  "empty", significa que el usuario no esta registrado y se puede proceder con el registro
                                    if (u.user === "empty") {
                                        // lo agrega a la base de datos
                                        this.postUser(user);
                                        // llama una función personalizada
                                        toDo();
                                    }
                                    else {
                                        alert("El usuario ya se encuentra registrado.");
                                    }

                                });
                            }
                        });
                    }
                    else {
                        alert("El email ya se encuentra registrado.");
                    }

                });
            }
        });
    }

    async postUser(userToAdd) {
        // convierte el objeto userToAdd en JSON para enviarlo en el body 
        let user = JSON.stringify(userToAdd);
        const response = await fetch('http://localhost:8080/a2-api/users/', {
            method: 'POST',
            body: user,
            headers: {
                'Content-Type': 'application/json'
            }
        }).catch(error => { console.log(error) })
    }


    
    async userLogin(email, password, loginClass) {
        this.getUserByEmail(email).then(data => {
            if (data.status == 200) {
                data.json().then(u => {
                    if (USER_STATE.isOnline == false) {
                        if (u.email === email) {
                            if (u.password === password) {
                                // guardar el estado del usuario en el storage
                                let isOnline = localStorage.setItem('isOnline', true);
                                // cargar avatar
                                loginClass.loginImage.src = User.avatarCompletePath + u.avatarPath;
                                // mostrar bienvenida
                                loginClass.loginButton.style.display = "none";
                                loginClass.registerButton.style.display = "none";
                                loginClass.userTextField.style.display = "none";
                                loginClass.passwordTextField.style.display = "none";
                                loginClass.loginTitle.innerHTML = "¡Bienvenido<br>" + u.user + "!";
                                // guardar el usuario actual en el storage
                                this.userOnline = {
                                    user: u.user,
                                    avatarPath: User.avatarCompletePath + u.avatarPath
                                };
                                
                                localStorage.setItem('userOnline', JSON.stringify(this.userOnline));
                                // delay para redirigir al home
                                setTimeout(() => {
                                    window.location.href = "home.html";
                                }, 1000);
                            }
                            else {
                                alert("La contraseña ingresada no coincide con la cuenta.");
                            }

                        }
                        else {
                            alert("El correo ingresado no se encuentra registrado.");
                        }
                    }
                    else {
                        alert("Ya se encuentra una sesión iniciada, cierre la sesión e intentelo de nuevo.");
                    }

                });
            }
        });
    }



    async getUserByUser(user) {
        const response = await fetch("http://localhost:8080/a2-api/users/user-" + user, { method: 'GET' })
        return await response;
    }

    async getUserByEmail(email) {
        const response = await fetch("http://localhost:8080/a2-api/users/email-" + email, { method: 'GET' })
        return await response;
    }

    async getUsers() {
        const response = await fetch("http://localhost:8080/a2-api/users/", { method: 'GET' })
        return await response;
    }
}