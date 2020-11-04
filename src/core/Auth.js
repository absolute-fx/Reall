import axios from 'axios';
import { CardColumns } from 'react-bootstrap';

class Auth{
    constructor(){
        this.authenticated = false;
        this.roles = [];
    }

    signIn(apiLink, userQuery){
        new Promise((resolve, reject) => {
            axios.post(
                apiLink  + 'auth/signin', 
                JSON.stringify({
                    username: userQuery.username, 
                    password: userQuery.password}), 
                { headers: { 'Content-Type': 'application/json'}})
            .then((response) => {
                //console.log(response);
                this.authenticated = true;
                this.roles = response.data.user.roles;
                this.userData = response.data.user;
                this.userData.accessToken = response.data.accessToken;
                //console.log(this.userData);
                resolve(this.userData);
            })
            .catch(function (error) {
                console.log(error.response);
                reject(error.response);
            });
        });
    }

    signOut(callBack){
        this.authenticated = false;
        this.roles = [];
        callBack();
    }

    isAuthentificated(){
        return this.authenticated;
    }

    isAdmin(){
        this.adminRole = false;
        this.roles.forEach((role => {
            if(role.name === "admin"){
                this.adminRole = true;
            }
        }));
        return this.adminRole;
    }
}

export default new Auth();