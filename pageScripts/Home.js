import { USER_STATE } from "./UserState.js";

export class Home {
    constructor(){
        this.playButton = document.getElementById("playButton");
        this.playButtonHandler();
    }

    playButtonHandler(){
        this.playButton.addEventListener("click", ()=>{
            if ( USER_STATE.isOnline == true ){
                window.location.href = "game.html";
            }
            else{
                alert("¡Inicia sesión para poder jugar!")
            }
        }, false);
    }
}

let home = new Home();