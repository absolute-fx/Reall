import React, {useContext, useState} from 'react';
import {useTranslation} from "react-multi-lang";
import {NavLink} from "react-router-dom";
import {MainNavItems, SecondaryNavItems} from "./NavItems";
import {UserContext} from "../contexts/UserContext";
import moment from 'moment';

const Navigation = (props) => {

    const{ user, setUser} = useContext(UserContext);
    const rootDir = electron.desktopFilesApi.getAppRootDir();

    const mainNavData = MainNavItems;
    const secondaryNavDate = SecondaryNavItems;

    const [active, setToggle] = useState("");
    const toggleNav = () => {
        setToggle(active === "" ? "active": "");
    }

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
                    {secondaryNavDate.map((secondaryNav, index)=>(
                        <li key={index}>
                            <NavLink to={secondaryNav.href} activeClassName="active" >
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
        return ("")
    }

};

export default Navigation;