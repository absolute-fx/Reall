import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";
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
    }

    useEffect(() => {
        setFooterLoader({active: true, message: 'Connecting to API...'})
        if(appParams)
        {
            if(licence){
                if(appParams.user.auto_connect){
                    if(appParams.user.login && appParams.user.password)
                    {
                        const apiLink = licence.api_link + 'auth/signin';
                        axios.post(apiLink, JSON.stringify({username: appParams.user.login, password: appParams.user.password}), { headers: { 'Content-Type': 'application/json'}})
                            .then(function (response) {
                                let contextUser = response.data.user;
                                contextUser.accessToken = response.data.accessToken;
                                // handle success...
                                setUser(contextUser);
                                setFooterLoader({active: false, message: ''});
                                history.push("/");

                            })
                            .catch(function (error) {
                                console.log(error.response);
                                setFooterLoader({active: false, message: ''});
                                saveParams().then(() => {
                                    history.push("/login");
                                });
                            })
                            .then(function () {
                                // always executed
                            });
                    }else{
                        setFooterLoader({active: false, message: ''})
                        saveParams().then(() => {
                            history.push("/login");
                        });
                    }
                    // AUTO CONNECT
                    /* */
                }else{
                    // SIGN IN FORM
                    setFooterLoader({active: false, message: ''})
                    history.push("/login");
                }
            }else{
                history.push("/licence");
            }
        }
    }, [appParams])

    return(
        <>
            <div className="sign-in-logo">reall<small className="text-primary">©</small></div>
        </>
    )
}

export default ParamsPreload;