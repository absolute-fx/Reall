import React, {useContext, useState, useEffect} from "react";
import axios from "axios";
import {UserContext} from "../../contexts/UserContext";
import {FooterLoaderContext} from "../../contexts/FooterLoaderContext";
import {AppParamsContext} from "../../contexts/AppParamsContext";
import {useHistory} from "react-router-dom";
//import {electron} from "webpack";

const SignIn = (props) => {

    const {appParams, setAppParams} = useContext(AppParamsContext)
    const{ user, setUser} = useContext(UserContext);
    const{ footerLoader, setFooterLoader} = useContext(FooterLoaderContext);
    const history = useHistory();

    const [isLoading, setLoading] = useState(false);

    const [username, setUserName] = useState('');
    const [password, setUserPassword] = useState('');
    const [autoConnect, setAutoConnect] = useState(false);

    const onChange = (e) =>{
        switch (e.target.name){
            case 'username':
                setUserName(e.target.value);
                break;
            case 'password':
                setUserPassword(e.target.value);
                break;
            case 'autoconnect':

                break;
        }
    }

    const saveParams = async () =>{
        await electron.parametersApi.setAppParams([{node: "user.login", value:username}]);
    }

    useEffect(()=>{
        if(appParams){
            setUserName(appParams.user.login);
        }
    }, [appParams])

    const onSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setFooterLoader({active: true, message: 'Connecting to API...'})
        //electron.parametersApi.setAppParams([{node: "user.login", value:username}]);
        axios.post('https://imoges-api.herokuapp.com/api/auth/signin', JSON.stringify({username: username, password: password}), { headers: { 'Content-Type': 'application/json'}})
            .then(function (response) {
                let contextUser = response.data.user;
                contextUser.accessToken = response.data.accessToken;
                // handle success...
                saveParams().then(() => {
                    setUser(contextUser);
                    setFooterLoader({active: false, message: ''});
                    history.push("/");
                });
            })
            .catch(function (error) {
                console.log(error.response);
                setLoading(false);
                setFooterLoader({active: false, message: ''});
            })
            .then(function () {
                // always executed
            });
    }


    return (
        <>
            <div className="sign-in-logo">reall<small className="text-primary">©</small></div>
            <div className="sign-in-container">
                <div className="panel sign-in-panel">
                    <form onSubmit={onSubmit}>
                        <div className="row">
                            <div className="col-md-9">
                                <div className="form-group">
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="LOGIN"
                                        value={username}
                                        name="username"
                                        onChange={onChange}
                                    />
                                </div>
                                <div className="form-group mb-0">
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="PASSWORD"
                                        value={password}
                                        name="password"
                                        onChange={onChange}
                                    />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <button disabled={isLoading} type="submit" className="btn btn-primary connect-btn">CONNECT</button>
                            </div>
                        </div>
                    </form>
                    <div className="row">
                        <div className="col mt-3">
                            <div id="dark-mode-switch" className="custom-control custom-switch">
                                <input name="autoconnect" type="checkbox" className="custom-control-input" id="autoConnectSwitch"/>
                                <label className="custom-control-label" htmlFor="autoConnectSwitch">Auto connect</label>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col">
                            <a href="https://imoges.be/auth/forgottenpass">Forgotten password?</a>
                        </div>
                    </div>
                    <footer>
                        Real Estate managing tools & services
                    </footer>
                </div>
            </div>
        </>
    )
}

export default SignIn;