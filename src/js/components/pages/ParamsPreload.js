import React, {useContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import axios from "axios";
// AUTH
import auth from '../auth';
// CONTEXTS
import {UserContext} from "../../contexts/UserContext";
import {AppParamsContext} from "../../contexts/AppParamsContext";
import {FooterLoaderContext} from "../../contexts/FooterLoaderContext";
import {LicenceContext} from "../../contexts/LicenceContext";

const ParamsPreload = () => {

    const {footerLoader, setFooterLoader} = useContext(FooterLoaderContext);
    const {appParams, setAppParams} = useContext(AppParamsContext);
    const {licence, setLicence} = useContext(LicenceContext);
    const{ user, setUser} = useContext(UserContext);
    let history = useHistory();

    const saveParams = async () =>{
        await electron.parametersApi.setAppParams([{node: "user.auto_connect", value: false}]);
    };

    const getUser = async (api, data) => {
        const user_data = await auth.signIn(api, data)
        console.log(user_data)
        if(user_data.auth){
            setUser(user_data);
            setFooterLoader({active: false, message: ''});
            history.push("/");
        }else{
            setFooterLoader({active: false, message: ''});
            saveParams().then(() => {
                history.push("/login");
            });
        }
    } 

    useEffect(() => {
        setFooterLoader({active: true, message: 'Connecting to API...'})
        if(appParams)
        {
            if(licence){
                if(appParams.user.auto_connect){
                    if(appParams.user.login && appParams.user.password)
                    {
                        const apiLink = licence.api_link;
                        getUser(apiLink, {username: appParams.user.login, password: appParams.user.password});
                    }else{
                        setFooterLoader({active: false, message: ''})
                        saveParams().then(() => {
                            history.push("/login");
                        });
                    }
                }else{
                    // SIGN IN FORM
                    setFooterLoader({active: false, message: ''})
                    history.push("/login");
                }
            }else{
                setFooterLoader({active: false, message: ''})
                history.push("/licence");
            }
        }else{
            setFooterLoader({active: false, message: ''})
            history.push("/login");
        }
    }, [appParams])

    useEffect(() => {
        //console.log(user)
        if(user){
            //console.log(user)
        }
    }, [user])

    return(
        <>
            <div className="sign-in-logo">reall<small className="text-primary">©</small></div>
        </>
    )
}

export default ParamsPreload;