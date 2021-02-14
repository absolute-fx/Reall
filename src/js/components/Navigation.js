import React, {useContext, useEffect, useState} from 'react';
import {useTranslation} from "react-multi-lang";
import {NavLink} from "react-router-dom";
import {mainNavItems, secondaryNavItems} from "./navItems";
import {UserContext} from "../contexts/UserContext";
import {AppParamsContext} from "../contexts/AppParamsContext";

const Navigation = (props) => {

    const{ user, setUser} = useContext(UserContext);
    const {appParams, setAppParams} = useContext(AppParamsContext);
    const rootDir = electron.desktopFilesApi.getAppRootDir();
    

    const mainNavData = mainNavItems;
    const secondaryNavData = secondaryNavItems;

    const saveParams = async (isToglled) =>{
        await electron.parametersApi.setAppParams([{node: "navToggled", value: isToglled}]);
    };

    const [active, setToggle] = useState("");
    const toggleNav = () => {
        const isToglled = active === "" ? true: false;
        setAppParams({...appParams, "navToggled": isToglled});
        saveParams(isToglled)
    }

    useEffect(() => {
        if(appParams){
            setToggle(appParams.navToggled ? 'active': '');
        }
    }), [appParams];

    const t = useTranslation();

    if(user){

        const userName = user.firstname;
        const userRole = user.roles[0].name;

        return (
            <nav id="sidebar" className={active}>
                <div className="sidebar-header">
                    <h1 className="brand-name">reall</h1>
                    <small>Real Estate Manager</small>
                </div>
                <div className="user-box">
                    <div className="row side-user-max">
                        <div className="col-md-4">
                            <img src={`${rootDir}/src/images/user_avatar.jpg`}
                                 className="img-thumbnail rounded-circle avatar"
                                 alt="avatar"/>
                        </div>
                        <div className="col-md-8 box-user-data">
                            <strong>{userName}</strong>
                            <small>{userRole}</small>
                        </div>
                    </div>
                    <div className="row side-user-min">
                        <img src={`${rootDir}/src/images/user_avatar.jpg`}
                             className="img-thumbnail rounded-circle avatar"
                             alt="avatar"/>
                    </div>
                </div>
                <ul className="list-unstyled components">
                    {mainNavData.map((nav, index) =>(
                        <li key={index} >
                            <NavLink exact to={nav.href} activeClassName="active" >
                                <i className={"fas " + nav.icon}/>
                                <span>{t("nav." + nav.label)}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
                <ul id="secondaryNav" className="list-unstyled components secondary-nav">
                    {secondaryNavData.map((secondaryNav, index)=>(
                        <li key={index}>
                            <NavLink to={secondaryNav.href} activeClassName="active">
                                <i className={"fas " + secondaryNav.icon}/>
                                <span>{t("nav." + secondaryNav.label)}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
                <button onClick={toggleNav} type="button" id="sidebarCollapse" className="btn btn-light">
                    <i className="fas fa-arrow-left"/>
                </button>
            </nav>
        );
    }else{
        return ("");
    }
};

export default Navigation;