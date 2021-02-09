import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {useTranslation} from "react-multi-lang";
import $ from 'jquery';

import Datatable from '../Datatable';
//import SimpleMap from '../Map';
import ProjectAddEdit from './ProjectAddEdit';

// CONTEXTS
import {AppParamsContext} from "../../contexts/AppParamsContext";
import {FooterLoaderContext} from "../../contexts/FooterLoaderContext";
import {useHistory} from "react-router-dom";
import {LicenceContext} from "../../contexts/LicenceContext";
import {UserContext} from "../../contexts/UserContext";

const Projects = (props) => {
    const t = useTranslation();
	let tableStructure;
	let map;
	let markers = [];

	const {appParams, setAppParams} = useContext(AppParamsContext)
    const [projects, setProjects] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const {user, setUser} = useContext(UserContext);
    const {licence, setLicence} = useContext(LicenceContext);
    const {footerLoader, setFooterLoader} = useContext(FooterLoaderContext);

    let history = useHistory();
    
    const setPanelHeight = () => {
        const h_100 = (window.innerHeight - 32) - 74 - 74 -16;
        $(".panel-100 .panel-content").height(h_100);
        //console.log(window.innerHeight);
    }

    window.addEventListener('resize', function(e){
        e.preventDefault();
        setPanelHeight();
        //console.log(window.innerWidth);
    });
	
	const onGmLoad = () => {
		let bounds = new google.maps.LatLngBounds();
		let i = 0;
		map = new google.maps.Map(document.getElementById("map"), {
			center: { lat: 50.76044, lng: 4.49373 },
			zoom: 8,
		});
		projects.forEach(project => {
			markers.push(
				new google.maps.Marker({
					position: new google.maps.LatLng(project.project_lat, project.project_long),
					map: map,
					projectData: project
				})
			);
			//console.log(markers[i])
			bounds.extend(markers[i].position);
			i++;
		});
		map.fitBounds(bounds);
	}

    useEffect(() => {

        setPanelHeight();
        setFooterLoader({active: true, message: 'Connecting to API...', icon: "fa fa-spinner brand-color spin"})
        const apiLink = licence.api_link + 'projects?order_field=id&order_direction=DESC&realties=1';
        axios.get(apiLink,{ headers: { 'Content-Type': 'application/json'}})
            .then(function (response) {
                setFooterLoader({active: false, message: '', icon:''});
				setProjects(response.data.projects);
                tableStructure = {
                    th:[t('projects.name'), t('projects.sales'), <span className="reall-table-pin">r</span>],
                    td:[
                        {row: 'project_title', type: 'text'}, 
                        {row: 'prct', type: 'text'}, 
                        {row:'project_active_online', type:'bool'}
                    ]
                };
                //console.log(response);
            })
            .catch(function (error) {
                console.log(error.response);
                setFooterLoader({active: true, message: 'Can not reach server!', icon: "fa fa-exclamation-circle text-danger"});
            });
	}, []);
	
	useEffect(() => {
		if(projects.length > 0){
			if(appParams.external_api.gm_key){	
				if (!window.google) {
					var s = document.createElement('script');
					s.type = 'text/javascript';
					s.src = `https://maps.google.com/maps/api/js?key=` + appParams.external_api.gm_key;
					var x = document.getElementsByTagName('script')[0];
					x.parentNode.insertBefore(s, x);
					s.addEventListener('load', e => {
						onGmLoad();
					});
				}else{
					onGmLoad();
				}
			}else{
				$('#map').html('Vous ne disposez pas de clez google map');
			}
		}
	}, [projects]);

    const onAddProject = (e) => {
        document.getElementById('projectList').classList.add("d-none");
        document.getElementById('map-container').classList.add("d-none");
        document.getElementById('tools').classList.add("d-none");
        //document.getElementById('backToList').classList.remove("d-none");
        document.getElementById('projectAdd').classList.remove("d-none");
    }

    const backToJprojects = () => {
        document.getElementById('projectList').classList.remove("d-none");
        document.getElementById('map-container').classList.remove("d-none");
        document.getElementById('tools').classList.remove("d-none");
        //document.getElementById('backToList').classList.add("d-none");
        document.getElementById('projectAdd').classList.add("d-none");
    }

    const onSearchChange = (e) => {
        setSearchQuery(e.target.value);
    }

    function search(projects){
        return projects.filter( (project) => 
            project.project_title.toLowerCase().indexOf(searchQuery) > -1 || 
            project.project_city.toLowerCase().indexOf(searchQuery) > -1 || 
            project.project_pc.toLowerCase().indexOf(searchQuery) > -1 
        );
    }

    return(
        <>
            <div className="row h-100">
                
                <div className="col-md-6" id="projectList">
                    <div className="panel panel-100" id="projectsList">
                        <header>
                            <h1 className="d-inline-block">{t('projects.title')}<button onClick={onAddProject} className="ml-3">+</button></h1>
                            
                            <div className="float-right">
                                <input type="text" placeholder={t('projects.search')} value={searchQuery} onChange={onSearchChange}/>
                            </div>
                        </header>
                        <div className="panel-separator" />
                        <div className="panel-content">
                            <Datatable projects={search(projects)}/>
                        </div>
                    </div>
                </div>
                <div className="col-md-6" id="map-container">
                    <div className="panel">
                        <header>
                            <h1>{t('projects.map')}</h1>
                        </header>
                        <div className="panel-separator" />
                        <div className="panel-content">
                            <div id="map" style={{"height": "500px"}}></div>
                        </div>
                    </div>
                    <div className="panel ps-t" id="tools">
                        <header>
                            <h1>{t('projects.tools')}</h1>
                        </header>
                        <div className="panel-separator" />
                        <div className="panel-content">
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, assumenda commodi ducimus
                                eligendi exercitationem iure magni maxime nihil perferendis possimus quia quidem rem sequi
                                similique sint sunt vel veniam vitae?
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-1 d-none" id="backToList">
                    <div className="panel panel-100">
                        <header>
                            <h1 className="text-center"><i className="fas fa-project-diagram brand-color"></i></h1>
                        </header>
                        <div className="panel-separator" />
                        <div className="panel-content">
                            <div className="mt-auto mb-auto ml-auto mr-auto text-center" onClick={backToJprojects}><i className="fas fa-arrow-left" style={{'fontSize': '2rem'}}></i></div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 m-auto d-none" id="projectAdd">
                    <ProjectAddEdit mode="add"/>
                </div>
            </div>
        </>
    )
}

export default Projects