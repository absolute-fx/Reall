import React, {useContext, useEffect, useState} from 'react';
import {useTranslation} from "react-multi-lang";
import {NavLink} from "react-router-dom";
import {mainNavItems, secondaryNavItems} from "./navItems";
import {UserContext} from "../contexts/UserContext";
import {AppParamsContext} from "../contexts/AppParamsContext";
import promiseIpc from 'electron-promise-ipc';

// Manage parameters
import ManageParameters from '../components/services/ManageParameters';

const Navigation = (props) => {

    const{ user, setUser} = useContext(UserContext);
    const {appParams, setAppParams} = useContext(AppParamsContext);
    const rootDir = __dirname;


    const mainNavData = mainNavItems;
    const secondaryNavData = secondaryNavItems;

    const [active, setToggle] = useState("");
    const [avatar, setAvatar] = useState(false);
    const [avatarImg, setAvatarImg] = useState(<img src="src/renderer/images/user_avatar.jpg" className="img-thumbnail rounded-circle avatar" alt="avatar"/>);
    const [avatarChanged, setAvatarChanged] = useState(false);

    const saveParams = async (isToglled) =>{
        let userDataPath;
        promiseIpc.send('getUserDataPath').then(data =>{
            userDataPath = data;
            ManageParameters.setParameters(userDataPath ,[{node: "navToggled", value: isToglled}]).then(parameters =>{
                console.log('SAVED');
            });
        });
    };

    const toggleNav = () => {
        const isToglled = active === "" ? true: false;
        setAppParams({...appParams, "navToggled": isToglled});
        saveParams(isToglled);
    }

    useEffect(() => {
        if(appParams){
            setToggle(appParams.navToggled ? 'active': '');
            setAvatar(appParams.user.avatar ? appParams.user.avatar : false );
            if (typeof appParams.user.avatar_changed != 'undefined'){
                if(appParams.user.avatar_changed){
                    console.log(appParams.user.avatar_changed);
                    setAvatarChanged(true);
                }
            }
        }
    }), [appParams];

    useEffect(() => {
        if(avatar){
            setAvatarImg(<img src={appParams.system.root_path + '\\avatar.jpg?' + new Date().getTime()} className="img-thumbnail rounded-circle avatar" alt="avatar"/>);
        }else{
            setAvatarImg(<img src="src/renderer/images/user_avatar.jpg" className="img-thumbnail rounded-circle avatar" alt="avatar"/>);
        }
    }, [avatar]);

    useEffect(() => {
        if(avatarChanged){
            console.log('RELOAD AVATAR');
            if(avatar){
                setAvatarImg(<img src={appParams.system.root_path + '\\avatar.jpg?' + new Date().getTime()} className="img-thumbnail rounded-circle avatar" alt="avatar"/>);
            }
        }
        setAvatarChanged(false);
    }, [avatarChanged])
  

    const t = useTranslation();

    if(user && user.auth){

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
                            {avatarImg}
                        </div>
                        <div className="col-md-8 box-user-data">
                            <strong>{userName}</strong>
                            <small>{userRole}</small>
                        </div>
                    </div>
                    <div className="row side-user-min">
                        {avatarImg}
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