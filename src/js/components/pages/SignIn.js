import React, {useContext, useState, useEffect} from "react";
import {useTranslation} from "react-multi-lang";
import axios from "axios";
import {UserContext} from "../../contexts/UserContext";
import {FooterLoaderContext} from "../../contexts/FooterLoaderContext";
import {AppParamsContext} from "../../contexts/AppParamsContext";
import {LicenceContext} from "../../contexts/LicenceContext";
import {useHistory} from "react-router-dom";

const SignIn = (props) => {

    const {appParams, setAppParams} = useContext(AppParamsContext)
    const{ user, setUser} = useContext(UserContext);
    const{ footerLoader, setFooterLoader} = useContext(FooterLoaderContext);
    const {licence, setLicence} = useContext(LicenceContext);
    const history = useHistory();

    const [isLoading, setLoading] = useState(false);

    const [username, setUserName] = useState('');
    const [password, setUserPassword] = useState('');
    const [autoConnect, setAutoConnect] = useState(false);
    const [alert, setAlert] = useState({visibility: false, message: 'default'})

    const onChange = (e) =>{
        switch (e.target.name){
            case 'username':
                setUserName(e.target.value);
                break;
            case 'password':
                setUserPassword(e.target.value);
                break;
        }
    }

    const autoConnectChange = (e) => {
        setAutoConnect(!autoConnect);
    }

    const saveParams = async () =>{
        const pass = autoConnect ? password: "";
        await electron.parametersApi.setAppParams([{node: "user.password", value: pass}, {node: "user.login", value:username},{node: "user.auto_connect", value: autoConnect}]);
    }

    useEffect(()=>{
        //console.log(autoConnect)
    }, [autoConnect])

    useEffect(()=>{
        if(appParams){
            setUserName(appParams.user.login);
        }
    }, [appParams])

    const onSubmit = (e) => {
        e.preventDefault();
        if(username && password){
            setLoading(true);
            setFooterLoader({active: true, message: 'Connecting to API...'})
            const apiLink = licence.api_link + 'auth/signin';
            axios.post(apiLink, JSON.stringify({username: username, password: password}), { headers: { 'Content-Type': 'application/json'}})
                .then(function (response) {
                    let contextUser = response.data.user;
                    contextUser.accessToken = response.data.accessToken;
                    // handle success...
                    saveParams().then(() => {
                        setUser(contextUser);
                        setFooterLoader({active: false, message: ''});
                        setAlert({visibility: false, message: ""})
                        history.push("/");
                    });
                })
                .catch(function (error) {
                    console.log(error.response);
                    setLoading(false);
                    setFooterLoader({active: false, message: ''});
                    setAlert({visibility: true, message: error.response.data.reason});
                })
                .then(function () {
                    // always executed
                });
        }
    }

    const t = useTranslation();

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
                                        placeholder={t('sign_in.login')}
                                        value={username}
                                        name="username"
                                        onChange={onChange}
                                    />
                                </div>
                                <div className="form-group mb-0">
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder={t('sign_in.password')}
                                        value={password}
                                        name="password"
                                        onChange={onChange}
                                    />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <button disabled={isLoading} type="submit" className="btn btn-primary connect-btn">{t('sign_in.button')}</button>
                            </div>
                        </div>
                        <div className={ alert.visibility ? 'row mt-3' : 'row mt-3 d-none'}>
                            <div className="col">
                                <div className="alert alert-danger mb-0" role="alert">
                                    <i className="fas fa-exclamation-triangle mr-3"/> {alert.message}
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className="row">
                        <div className="col mt-3">
                            <div id="dark-mode-switch" className="custom-control custom-switch">
                                <input name="autoconnect" type="checkbox" onChange={autoConnectChange} className="custom-control-input" id="autoConnectSwitch"/>
                                <label className="custom-control-label" htmlFor="autoConnectSwitch">{t('sign_in.auto_connect')}</label>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col">
                            <a href="https://imoges.be/auth/forgottenpass">{t('sign_in.forgotten')}?</a>
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