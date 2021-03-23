import React, {useContext, useEffect} from "react";
import {useHistory} from "react-router-dom";
import {UserContext} from "../../contexts/UserContext";
import {FooterLoaderContext} from '../../contexts/FooterLoaderContext';
import {LicenceContext} from "../../contexts/LicenceContext";
import '@/styles/radial-menu.css';

const Dashboard = (props) => {

    const{ user, setUser} = useContext(UserContext);
    const{ footerLoader, setFooterLoader} = useContext(FooterLoaderContext);
    const {licence, setLicence} = useContext(LicenceContext);
    let history = useHistory();
    //if (!user) history.push("/licence");
    //console.log(user);
    //console.log(footerLoader);
    return(
        <>
            {/*<h1>Dashboard</h1>
            <p>{user ? "Connecté": "Non connecté"}</p>
            <button classNameName="btn btn-block btn-light btn-sm" onClick={()=>{
                electron.notificationApi.sendNotification('Here we go!')
            }}>Notify OK?</button>*/}
            
			<nav className="menu">
                <input type="checkbox" href="#" className="menu-open" name="menu-open" id="menu-open"/>
                <label className="menu-open-button" htmlFor="menu-open">
                    <span className="hamburger hamburger-1"></span>
                    <span className="hamburger hamburger-2"></span>
                </label>
                
                <a href="#" title="Ajouter un projet" className="menu-item"> <i className="fa fa-project-diagram"></i> </a>
                <a href="#" className="menu-item"> <i className="fa fa-building"></i> </a>
                <a href="#" className="menu-item"> <i className="fa fa-photo-video"></i> </a>
                <a href="#" className="menu-item"> <i className="fa fa-users"></i> </a>
                <a href="#" className="menu-item"> <i className="fa fa-calculator"></i> </a>
                <a href="#" className="menu-item"> <i className="fa fa-user-friends"></i> </a>
			</nav>


			<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
				<defs>
				<filter id="shadowed-goo">
					<feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
					<feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
					<feGaussianBlur in="goo" stdDeviation="3" result="shadow" />
					<feColorMatrix in="shadow" mode="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 -0.2" result="shadow" />
					<feOffset in="shadow" dx="1" dy="1" result="shadow" />
					<feComposite in2="shadow" in="goo" result="goo" />
					<feComposite in2="goo" in="SourceGraphic" result="mix" />
				</filter>
				<filter id="goo">
					<feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
					<feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
					<feComposite in2="goo" in="SourceGraphic" result="mix" />
				</filter>
				</defs>
			</svg>
        </>
    )
}

export default Dashboard;