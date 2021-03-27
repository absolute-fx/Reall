import React, {useContext, useEffect, useState} from "react";
import {useTranslation, setLanguage, getLanguage} from 'react-multi-lang';
import promiseIpc from 'electron-promise-ipc';
import ManageParameters from '../services/ManageParameters';

const log = require('electron-log');

// CONTEXTS
import {AppParamsContext} from "../../contexts/AppParamsContext";
import {LicenceContext} from "../../contexts/LicenceContext";
import {UserContext} from "../../contexts/UserContext";

const Parameters = (props) => {
    const {appParams, setAppParams} = useContext(AppParamsContext);
    const {licence, setLicence} = useContext(LicenceContext);
    const{ user, setUser} = useContext(UserContext);

    const changeLanguage = (e) => {
        setLanguage(e.target.value);
        promiseIpc.send('getUserDataPath').then(userDataPath =>{
            ManageParameters.setParameters(userDataPath ,[{node: "user.language", value: e.target.value}]).then(parameters =>{
                log.info('Language changed to ' + e.target.value);
            });
        });
    };

    const t = useTranslation();

    useEffect(() => {
        console.log(appParams.application);
    }, [])

    

    return(
        <div id="parameters" className="row h-100">    
            <div className="col-md-6">
                <div className="panel panel-100" id="parameters">
                    <header>
                        <h1 className="d-inline-block">{t("parameters.title")}</h1>
                    </header>
                    <div className="panel-separator" />
                    <div className="panel-content">
                        <form>
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="api_url">{t("parameters.api_url")}</label>
                                        <input type="text" className="form-control form-control-sm"onChange={setLicence}  value={licence.api_link} id="api_url" placeholder="" disabled/>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="licence_key">{t("parameters.licence_key")}</label>
                                        <input type="text" className="form-control form-control-sm"onChange={setLicence}  value={licence.licence_key} id="licence_key" placeholder="" disabled/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group col">
                                        <label htmlFor="google_key">{t("parameters.google_key")}</label>
                                        <input type="text" className="form-control form-control-sm" onChange={setAppParams} value={appParams.external_api.gm_key} id="google_key" placeholder=""/>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="col-md-6" id="map-container">
                <div className="panel">
                    <header>
                        <h1>{t("parameters.user")}</h1>
                    </header>
                    <div className="panel-separator" />
                    <div className="panel-content">
                        <form>
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="firstname">{t("parameters.firstname")}</label>
                                        <input type="text" className="form-control form-control-sm"onChange={setUser}  value={user.firstname} id="firstname" placeholder="" />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="lastname">{t("parameters.lastname")}</label>
                                        <input type="text" className="form-control form-control-sm"onChange={setUser}  value={user.lastname} id="lastname" placeholder="" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group col">
                                        <label htmlFor="email">{t("parameters.email")}</label>
                                        <input type="text" className="form-control form-control-sm" onChange={setUser} value={user.email} id="email" placeholder="" disabled/>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="panel ps-t" id="tools">
                    <header>
                        <h1>{t("parameters.interface")}</h1>
                    </header>
                    <div className="panel-separator" />
                    <div className="panel-content">
                        <form>
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="theme">{t("parameters.theme")}</label>
                                        <select className="form-control form-control-sm" id="theme">
                                            <option>{t("parameters.light")}</option>
                                            <option>{t("parameters.dark")}</option>
                                        </select>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="language">{t("parameters.language")}</label>
                                        <select className="form-control form-control-sm" id="theme" defaultValue={getLanguage()} onChange={changeLanguage}>
                                            {appParams.application.languages.map((value, index) => {
                                                return <option key={index} value={value.code}>{value.label}</option>
                                            })}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Parameters