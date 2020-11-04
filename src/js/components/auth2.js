import axios from 'axios';

const Auth = {
    authenticated : false,
    roles : [],
    baseUrl: "",
    async signIn(apiLink, userQuery){
        axios.post(
            apiLink  + 'auth/signin', 
            JSON.stringify({
                username: userQuery.username, 
                password: userQuery.password
            }), 
            { headers: { 'Content-Type': 'application/json'}
        })
        .then(response => {
            this.authenticated = true;
            this.roles = response.data.user.roles;
            this.userData = response.data.user;
            this.userData.accessToken = response.data.accessToken;
            console.log(this.authenticated);
            return this.userData;
        })
        .catch(function (error) {
            console.log(error.response);
            return error.response;
        });
    },
    isAuthentificated(){
        return this.authenticated;
    }
}

export default Auth;