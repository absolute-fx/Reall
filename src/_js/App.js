import React, {useState, useMemo, useEffect} from 'react';
import {HashRouter as Router, Switch, Route} from 'react-router-dom';
import {setTranslations, setDefaultLanguage, setLanguage } from 'react-multi-lang';
import promiseIpc from 'electron-promise-ipc';

// LANGUAGES
import fr from '../languages/fr.json';
import nl from '../languages/nl.json';
import en from '../languages/en.json';
// AUTH
import ProtectedRoute from './components/ProtectedRoute';
// PAGES
import Navigation from './components/Navigation';
import LicenceCheck from "./components/pages/LicenceCheck";
import Update from "./components/pages/Update";
import ParamsPreload from "./components/pages/ParamsPreload";
import SignIn from "./components/pages/SignIn";
import Dashboard from './components/pages/Dashboard';
import Projects from './components/pages/Projects';
import Project from './components/pages/Project';
import Realty from './components/pages/Realty';
import Libraries from './components/pages/Libraries';
import Clients from './components/pages/Clients';
import Accounting from './components/pages/Accounting';
import Support from './components/pages/Support';
import Parameters from './components/pages/Parameters';
import Users from './components/pages/Users';
import Services from './components/pages/Services';
import Help from './components/pages/Help';
import Disconnect from "./components/pages/Diconnect";
// CONTEXTS
import {UserContext} from './contexts/UserContext';
import {FooterLoaderContext} from './contexts/FooterLoaderContext';
import {AppParamsContext} from "./contexts/AppParamsContext";
import {LicenceContext} from "./contexts/LicenceContext";

import Footer from "./components/Footer";

// Manage parameters
import ManageParameters from './components/ManageParameters.js';

// TRANSLATIONS SETUP
setTranslations({fr, nl, en});


function App(){

    const [appVersion, setAppVersion] = useState("");
    /*
    const getAppVersion = async () => {
        setAppVersion(await electron.appDataApi.getAppVersion());
    }*/

    const getAppVersion = async () => {
        //setAppVersion(await electron.appDataApi.getAppVersion());
        promiseIpc.send('getAppVersion').then(data =>{
            setAppVersion(data);
        }); 
    }

    const [licence, setLicence] = useState(null);
    const licenceProvider = useMemo(() => ({licence, setLicence}), [licence, setLicence]);

    const [appParams, setAppParams] = useState(null);
    const getParams = async () => {
        //setAppParams( await electron.parametersApi.getAppParameters());
        promiseIpc.send('getUserDataPath').then(userDataPath =>{
            ManageParameters.getParameters(userDataPath).then(parameters =>{
                setAppParams(parameters);
            });
        });
    }
    const appParamsProvider = useMemo(() => ({appParams, setAppParams}), [appParams, setAppParams]);

    const [user, setUser] = useState(null);
    const userDataProvider = useMemo(() => ({user, setUser}), [user, setUser]);
    const [footerLoader, setFooterLoader] = useState({active: false, message: "", icon: "fa fa-spinner  brand-color"});
    const footerLoaderProvider = useMemo(() => ({footerLoader, setFooterLoader}), [footerLoader, setFooterLoader]);

    useEffect(()=>{
        getParams();
        getAppVersion();
    }, []);

    useEffect(() => {
        if(appParams){
            setDefaultLanguage(appParams.user.language);
        }
    }, [appParams])

    return(
        <Router>
            <LicenceContext.Provider value={licenceProvider}>
                <AppParamsContext.Provider value={appParamsProvider}>
                    <UserContext.Provider value={userDataProvider}>
                        <FooterLoaderContext.Provider value={footerLoaderProvider}>
                            <Navigation />
                            <main className= {`content ${user ? 'padding-content': ''}`}>
                                <Switch>
                                    <Route path="/update" exact component={Update} />
                                    <Route path="/licence" exact component={LicenceCheck} />
                                    <Route path="/params" exact component={ParamsPreload} />
                                    <Route path="/login" exact component={SignIn} />
                                    <ProtectedRoute path="/" exact component={Dashboard} />
                                    <ProtectedRoute path="/projects" exact component={Projects} />
                                    <ProtectedRoute path="/project" exact component={Project} />
                                    <ProtectedRoute path="/realty" exact component={Realty} />
                                    <ProtectedRoute path="/libraries" exact component={Libraries} />
                                    <ProtectedRoute path="/clients" exact component={Clients} />
                                    <ProtectedRoute path="/accounting" exact component={Accounting} />
                                    <ProtectedRoute path="/support" exact component={Support} />
                                    <ProtectedRoute path="/parameters" exact component={Parameters} />
                                    <ProtectedRoute path="/users" exact component={Users} />
                                    <ProtectedRoute path="/services" exact component={Services} />
                                    <ProtectedRoute path="/help" exact component={Help} />
                                    <ProtectedRoute path="/signout" exact component={Disconnect} />
                                    <Route path="*" component={() => {"404 NOT FOUND"}}/>
                                </Switch>
                                <Footer appVersion={appVersion} />
                            </main>
                        </FooterLoaderContext.Provider>
                    </UserContext.Provider>
                </AppParamsContext.Provider>
            </LicenceContext.Provider>
        </Router>
    )
}

export default App;