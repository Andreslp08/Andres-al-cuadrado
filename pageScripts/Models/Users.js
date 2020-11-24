
export class User{
    static avatarCompletePath = "images/avatars/";
    constructor( avatarPath, email, user, firstNames, lastNames, age, password){
        this.avatarPath = avatarPath;
        this.email = email;
        this.user = user;
        this.firstNames = firstNames;
        this.lastNames = lastNames;
        this.age = age;
        this.password = password;
    }
}
