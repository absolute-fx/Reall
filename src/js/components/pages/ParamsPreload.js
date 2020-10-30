import React, {useContext, useEffect} from "react";
import {useHistory} from "react-router-dom";
import {AppParamsContext} from "../../contexts/AppParamsContext";


const ParamsPreload = () => {

    const {appParams, setAppParams} = useContext(AppParamsContext)
    let history = useHistory();

    useEffect(() => {
        if(appParams)
        {
            if(appParams.user.auto_connect){
                // AUTO CONNECT

            }else{
                // SIGN IN
                history.push("/login");
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