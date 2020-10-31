import React, {useState, useMemo, useEffect} from 'react';
import {HashRouter as Router, Switch, Route} from 'react-router-dom';
import Navigation from './components/Navigation';
// PAGES
import LicenceCheck from "./components/pages/LicenceCheck";
import ParamsPreload from "./components/pages/ParamsPreload";
import SignIn from "./components/pages/SignIn";
import Dashboard from './components/pages/Dashboard';
import Projects from './components/pages/Projects';
import Libraries from './components/pages/Libraries';
import Clients from './components/pages/Clients';
import Accounting from './components/pages/Accounting';
import Support from './components/pages/Support';
import Parameters from './components/pages/Parameters';
import Users from './components/pages/Users';
import Services from './components/pages/Services';
import Help from './components/pages/Help';
import Disconnect from "./components/pages/Diconnect";
// contexts
import {UserContext} from './contexts/UserContext';
import {FooterLoaderContext} from './contexts/FooterLoaderContext';
import {AppParamsContext} from "./contexts/AppParamsContext";
import {LicenceContext} from "./contexts/LicenceContext";

import Footer from "./components/Footer";

function App(){

    const [appVersion, setAppVersion] = useState("");
    const getAppVersion = async () => {
        setAppVersion(await electron.appDataApi.getAppVersion());
    }

    const [licence, setLicence] = useState(null);
    const licenceProvider = useMemo(() => ({licence, setLicence}), [licence, setLicence]);

    const [appParams, setAppParams] = useState(null);
    const getParams = async () => {
        setAppParams( await electron.parametersApi.getAppParameters());
    }
    const appParamsProvider = useMemo(() => ({appParams, setAppParams}), [appParams, setAppParams]);

    const [user, setUser] = useState(null);
    const userDataProvider = useMemo(() => ({user, setUser}), [user, setUser]);
    const [footerLoader, setFooterLoader] = useState({active: false, message: ""});
    const footerLoaderProvider = useMemo(() => ({footerLoader, setFooterLoader}), [footerLoader, setFooterLoader]);

    useEffect(()=>{
        getParams();
        getAppVersion();
    }, []);

    return(
        <Router>
            <LicenceContext.Provider value={licenceProvider}>
                <AppParamsContext.Provider value={appParamsProvider}>
                    <UserContext.Provider value={userDataProvider}>
                        <FooterLoaderContext.Provider value={footerLoaderProvider}>
                            <Navigation />
                            <main className= {`content ${user ? 'padding-content': ''}`}>
                                <Switch>
                                    <Route path="/licence" exact component={LicenceCheck} />
                                    <Route path="/params" exact component={ParamsPreload} />
                                    <Route path="/login" exact component={SignIn} />
                                    <Route path="/" exact component={Dashboard} />
                                    <Route path="/projects" exact component={Projects} />
                                    <Route path="/libraries" exact component={Libraries} />
                                    <Route path="/clients" exact component={Clients} />
                                    <Route path="/accounting" exact component={Accounting} />
                                    <Route path="/support" exact component={Support} />
                                    <Route path="/parameters" exact component={Parameters} />
                                    <Route path="/users" exact component={Users} />
                                    <Route path="/services" exact component={Services} />
                                    <Route path="/help" exact component={Help} />
                                    <Route path="/signout" exact component={Disconnect} />
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