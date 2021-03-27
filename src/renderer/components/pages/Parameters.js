import React, {useContext, useEffect, useState} from "react";
// CONTEXTS
import {AppParamsContext} from "../../contexts/AppParamsContext";
import {LicenceContext} from "../../contexts/LicenceContext";
import {UserContext} from "../../contexts/UserContext";

const Parameters = (props) => {
    const {appParams, setAppParams} = useContext(AppParamsContext);
    const {licence, setLicence} = useContext(LicenceContext);
    const{ user, setUser} = useContext(UserContext);

    return(
        <div id="parameters" className="row h-100">    
            <div className="col-md-6">
                <div className="panel panel-100" id="parameters">
                    <header>
                        <h1 className="d-inline-block">Parameters</h1>
                    </header>
                    <div className="panel-separator" />
                    <div className="panel-content">
                        <form>
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="api_url">API url</label>
                                        <input type="text" className="form-control form-control-sm"onChange={setLicence}  value={licence.api_link} id="api_url" placeholder="" disabled/>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="licence_key">Licence key</label>
                                        <input type="text" className="form-control form-control-sm"onChange={setLicence}  value={licence.licence_key} id="licence_key" placeholder="" disabled/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group col">
                                        <label htmlFor="google_key">Google API key</label>
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
                        <h1>User</h1>
                    </header>
                    <div className="panel-separator" />
                    <div className="panel-content">
                        <form>
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="api_url">Firstname</label>
                                        <input type="text" className="form-control form-control-sm"onChange={setUser}  value={user.firstname} id="api_url" placeholder="" />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="licence_key">Lastname</label>
                                        <input type="text" className="form-control form-control-sm"onChange={setUser}  value={user.lastname} id="licence_key" placeholder="" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group col">
                                        <label htmlFor="google_key">Email</label>
                                        <input type="text" className="form-control form-control-sm" onChange={setUser} value={user.email} id="google_key" placeholder="" disabled/>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="panel ps-t" id="tools">
                    <header>
                        <h1>Interface</h1>
                    </header>
                    <div className="panel-separator" />
                    <div className="panel-content">
                        <form>
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="theme">Theme</label>
                                        <select className="form-control form-control-sm" id="theme">
                                            <option>Light</option>
                                            <option>Dark</option>
                                        </select>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="language">Language</label>
                                        <select className="form-control form-control-sm" id="theme">
                                            <option>English</option>
                                            <option>Netherlands</option>
                                            <option>Français</option>
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