import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {FooterLoaderContext} from "../../contexts/FooterLoaderContext";
import {useHistory} from "react-router-dom";
import {LicenceContext} from "../../contexts/LicenceContext";
import {UserContext} from "../../contexts/UserContext";

const Projects = (props) => {
    const [projects, setProjects] = useState([]);
    const {user, setUser} = useContext(UserContext);
    const {licence, setLicence} = useContext(LicenceContext);
    const {footerLoader, setFooterLoader} = useContext(FooterLoaderContext);

    let history = useHistory();
    if (user){
        useEffect(() => {
            setFooterLoader({active: true, message: 'Connecting to API...'})
            const apiLink = licence.api_link + 'projects';
            axios.get(apiLink,{ headers: { 'Content-Type': 'application/json'}})
                .then(function (response) {
                    setFooterLoader({active: false, message: ''});
                    setProjects(response.data.projects);
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error.response);
                    setFooterLoader({active: false, message: ''});
                })
                .then(function () {
                    // always execute...
                });
        }, [projects]);
    }else{
        history.push("/licence");
    }

    return(
        <>
            <div className="row h-100">
                <div className="col-md-6">
                    <div className="panel">
                        <header>
                            <h1>Projects</h1>
                        </header>
                        <div className="panel-content">
                            <ul>
                                {projects.map((project, index) => (
                                    <li key={index}>{project.project_title}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="panel">
                        <header>
                            <h1>Projects</h1>
                        </header>
                        <div className="panel-content">
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, assumenda commodi ducimus
                                eligendi exercitationem iure magni maxime nihil perferendis possimus quia quidem rem sequi
                                similique sint sunt vel veniam vitae?</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Projects