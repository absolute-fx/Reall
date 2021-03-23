import React, {useContext, useEffect} from "react";
import {UserContext} from "../../contexts/UserContext";
import {useHistory} from "react-router-dom";
import {AppParamsContext} from "../../contexts/AppParamsContext";
// AUTH
import auth from '../auth';

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
        auth.signOut();
        saveParams().then(() => {
            history.push("/login");
        });
    }, []);

    return(
        <>
        </>
    )
}

export default Disconnect;