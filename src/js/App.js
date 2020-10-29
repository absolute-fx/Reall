import React, {useState, useMemo, useEffect} from 'react';
import {HashRouter as Router, Switch, Route} from 'react-router-dom';
import Navigation from './components/Navigation';
// PAGES
import SignIn from "./components/pages/SignIn";
import Dashboard from './components/pages/Dashboard';
import Park from './components/pages/Park';
import Libraries from './components/pages/Libraries';
import Clients from './components/pages/Clients';
import Accounting from './components/pages/Accounting';
import Support from './components/pages/Support';
import Parameters from './components/pages/Parameters';
import Users from './components/pages/Users';
import Services from './components/pages/Services';
import Help from './components/pages/Help';
// contexts
import {UserContext} from './contexts/UserContext';
import {FooterLoaderContext} from './contexts/FooterLoaderContext';
import {AppParamsContext} from "./contexts/AppParamsContext";

import Footer from "./components/Footer";

function App(){

    const [appVersion, setAppVersion] = useState("");
    const getAppVersion = async () => {
        setAppVersion(await electron.appDataApi.getAppVersion());
    }

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
            <AppParamsContext.Provider value={appParamsProvider}>
                <UserContext.Provider value={userDataProvider}>
                    <FooterLoaderContext.Provider value={footerLoaderProvider}>
                        <Navigation />
                        <main className= {`content ${user ? 'padding-content': ''}`}>
                            <Switch>
                                <Route path="/login" exact component={SignIn} />
                                <Route path="/" exact component={Dashboard} />
                                <Route path="/park" exact component={Park} />
                                <Route path="/libraries" exact component={Libraries} />
                                <Route path="/clients" exact component={Clients} />
                                <Route path="/accounting" exact component={Accounting} />
                                <Route path="/support" exact component={Support} />
                                <Route path="/parameters" exact component={Parameters} />
                                <Route path="/users" exact component={Users} />
                                <Route path="/services" exact component={Services} />
                                <Route path="/help" exact component={Help} />
                            </Switch>
                            <Footer appVersion={appVersion} />
                        </main>
                    </FooterLoaderContext.Provider>
                </UserContext.Provider>
            </AppParamsContext.Provider>
        </Router>
    )
}

export default App;