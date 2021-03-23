import React, {useContext, useState, useEffect} from "react";
import {useTranslation} from "react-multi-lang";
import {useHistory} from "react-router-dom";
import promiseIpc from 'electron-promise-ipc';
// AUTH
import auth from "../auth";
// CONTEXTS
import {LicenceContext} from "../../contexts/LicenceContext";
import {UserContext} from "../../contexts/UserContext";
import {FooterLoaderContext} from "../../contexts/FooterLoaderContext";
import {AppParamsContext} from "../../contexts/AppParamsContext";

// Manage parameters
import ManageParameters from '../ManageParameters.js';

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
        promiseIpc.send('getUserDataPath').then(userDataPath =>{
            ManageParameters.setParameters(userDataPath ,[{node: "user.password", value: pass}, {node: "user.login", value:username},{node: "user.auto_connect", value: autoConnect}]).then(parameters =>{
                
            });
        });
    }

    useEffect(()=>{
        //console.log(autoConnect)
    }, [autoConnect])

    useEffect(()=>{
        if(appParams){
            setUserName(appParams.user.login);
            setUserPassword(appParams.user.password);
            setAutoConnect(appParams.user.auto_connect);
        }
    }, [appParams])

    const connect = async (data) => {
        const userData = await auth.SignIn()
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if(username && password){
            setLoading(true);
            setFooterLoader({active: true, message: 'Connecting to API...', icon: "fa fa-spinner brand-color spin"})
            const apiLink = licence.api_link;
            const userData = await auth.signIn(
                apiLink,
                {username: username, password: password}
            );

            if(userData.auth){
                saveParams().then(() => {
                    setUser(userData);
                    setFooterLoader({active: false, message: '', icon:''});
                    setAlert({visibility: false, message: "", icon:''});
                    history.push("/");
                });
            }else{
                setLoading(false);
                setFooterLoader({active: true, message: userData.reason, icon: "fa fa-exclamation-circle text-danger"});
                setAlert({visibility: true, message: userData.reason});
            }
        }
    }

    const t = useTranslation();

    return (
        <>
            <div className="sign-in-logo">reall<small className="text-primary">©</small></div>
            <div className="sign-in-container">
                <div className="panel sign-in-panel">
                    <form className="login-form" onSubmit={onSubmit}>
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
                                <input name="autoconnect" type="checkbox" checked={autoConnect ? true : false} onChange={autoConnectChange} className="custom-control-input" id="autoConnectSwitch"/>
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
                        Real Estate managing tools & services...
                    </footer>
                </div>
            </div>
        </>
    )
}

export default SignIn;