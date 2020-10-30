import React, {useContext, useEffect} from "react";
import {UserContext} from "../../contexts/UserContext";
import {useHistory} from "react-router-dom";
import {AppParamsContext} from "../../contexts/AppParamsContext";
import {LicenceContext} from "../../contexts/LicenceContext";

const Disconnect = () => {
    const{ user, setUser} = useContext(UserContext);
    const {appParams, setAppParams} = useContext(AppParamsContext);
    const history = useHistory();

    const saveParams = async () =>{
        await electron.parametersApi.setAppParams([{node: "user.auto_connect", value: false}, {node:"user.password", value: ""}]);
    }

    useEffect(() => {
        setUser(null);
        setAppParams(null);
        saveParams().then(() => {
            history.push("/params");
        });
    }, []);

    return(
        <>
        </>
    )
}

export default Disconnect;