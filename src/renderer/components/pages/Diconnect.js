import React, {useContext, useEffect} from "react";
import {useHistory} from "react-router-dom";
import promiseIpc from 'electron-promise-ipc';
import ManageParameters from '../services/ManageParameters';
import {UserContext} from "../../contexts/UserContext";
import {FooterLoaderContext} from "../../contexts/FooterLoaderContext";
import {AppParamsContext} from "../../contexts/AppParamsContext";

const log = require('electron-log');

// AUTH
import auth from '../../components/services/auth';

const Disconnect = () => {
    const{ user, setUser} = useContext(UserContext);
    const {footerLoader, setFooterLoader} = useContext(FooterLoaderContext);
    const {appParams, setAppParams} = useContext(AppParamsContext);
    const history = useHistory();

    const saveParams = () =>{
        //await electron.parametersApi.setAppParams([{node: "user.auto_connect", value: false}, {node:"user.password", value: ""}]);
        promiseIpc.send('getUserDataPath').then(userDataPath =>{
            ManageParameters.setParameters(userDataPath ,[{node: "user.auto_connect", value: false}, {node:"user.password", value: ""}]).then(parameters =>{
                log.info('Disconnect');
                ManageParameters.getParameters(userDataPath).then(parameters =>{
                    setAppParams(parameters);
                    setUser(null);
                    auth.signOut();
                    history.push("/licence");
                });
            });
        });
    }

    useEffect(() => {
        /* let u = [...user];
        u.auth = false;
        setUser(u); */
        //setAppParams(null);
        //setLicence(null);
        //setUser(null);
        //auth.signOut();
        saveParams();
    }, []);

    return(
        <>
        </>
    )
}

export default Disconnect;