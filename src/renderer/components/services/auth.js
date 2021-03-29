import axios from 'axios';


class Auth{
    constructor(){
        this.authenticated = false;
        this.roles = [];
    }

    async signIn(apiLink, userQuery){
        try{
            const res = await axios.post(
                apiLink  + 'auth/signin', 
                JSON.stringify({
                    username: userQuery.username, 
                    password: userQuery.password}), 
                { headers: { 'Content-Type': 'application/json'}}
            )
            let user_data = res.data.user;
            user_data.auth = res.data.auth;
            user_data.accessToken = res.data.accessToken;
            this.authenticated = true;
            this.roles = user_data.roles;
            return user_data;
        }catch(error){
            console.log(error);
            if(!error){
                return error.response.data;
            }else{
                return {auth: false, reason: 'Can not reach the server'};
            }
            
        }
    }

    signOut(){
        this.authenticated = false;
        this.roles = [];
        //callBack();
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