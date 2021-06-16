import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {useTranslation} from "react-multi-lang";
import $ from 'jquery';

import Datatable from '../Datatable';
//import SimpleMap from '../Map';
import ProjectAddEdit from './ProjectAddEdit';
import Project from './Project';

// CONTEXTS
import {AppParamsContext} from "../../contexts/AppParamsContext";
import {FooterLoaderContext} from "../../contexts/FooterLoaderContext";
import {LicenceContext} from "../../contexts/LicenceContext";
import {UserContext} from "../../contexts/UserContext";

const Projects = (props) => {
    const t = useTranslation();
	let tableStructure;
	let map;
	let markers = [];
	//const [projectMap, setProjectMap] = useState({});
	//const [projectMarker, setProjectMarker] = useState({});

	const {appParams, setAppParams} = useContext(AppParamsContext)
    const [projects, setProjects] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [project, setProject] = useState([]);
    const {user, setUser} = useContext(UserContext);
    const {licence, setLicence} = useContext(LicenceContext);
    const {footerLoader, setFooterLoader} = useContext(FooterLoaderContext);

	const rem = 16;
	const margin = rem * 2;
	const padding = rem;
	const footerHeight = rem * 2;
    
    const setPanelHeight = () => {
		const appHeight = $("#app").height();

		const headerHeight = $('#projectsList header').height();
		const separatorHeight = $('#projectsList .panel-separator').height();
		
		const projectListHeight = appHeight - (margin * 2) - (padding * 2) - (headerHeight + padding) - separatorHeight - footerHeight;	
		$("#projectsList .panel-content").height(projectListHeight);
		
		const bcH = $("#prj-breadcrumb").height();
		const prjLeftRow = $('#prjLeftRow').height();
		const headerPrjH = $('#realty-list header').height();
		
		const realtyListHeight = appHeight - (margin * 2) - bcH - margin - prjLeftRow - margin - (padding * 2) - (headerPrjH + padding) - separatorHeight - footerHeight;
		$('#realty-list .panel-content').height(realtyListHeight);

		const mapHeight = $('#mapContainer').height();
		const headerLibrary = $('#projectLibrary header').height();
		
		const libraryHeight = appHeight - (margin * 2) - bcH - margin - mapHeight - margin - (padding * 2) - (headerLibrary + padding) - separatorHeight - footerHeight - margin;
		$('#projectLibrary .panel-content').height(libraryHeight);
    }

    window.addEventListener('resize', function(e){
        e.preventDefault();
		setPanelHeight();
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
			bounds.extend(markers[i].position);
			i++;
		});
		map.fitBounds(bounds);

	}


    useEffect(() => {
		document.getElementById('projects').classList.remove("d-none");
		$('#projects').hide().fadeIn(200);
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
				$('#project-map').html('Vous ne disposez pas de clez google map');
			}
		}
	}, [projects]);

	useEffect(() => {
		if(project.project_lat){

			const projectMap = new google.maps.Map(document.getElementById("project-map"), {
				center: new google.maps.LatLng(project.project_lat, project.project_long),
				zoom: 14,
			})
			const projectMarker = new google.maps.Marker({
				position: new google.maps.LatLng(project.project_lat, project.project_long),
				map: projectMap
			})

			//console.log(project.realties);
		}
	}, [project]);

    const onAddProject = (e) => {
        document.getElementById('projects').classList.add("d-none");
		document.getElementById('projectAdd').classList.remove("d-none");
		$('#projectAdd').hide().fadeIn(200);
		$('#projectName').focus();
    }

    const onSearchChange = (e) => {
        setSearchQuery(e.target.value);
    }

	const onProjectSelected = (project) => {
		setProject(project);
		document.getElementById('projects').classList.add("d-none");
		document.getElementById('project').classList.remove("d-none");
		$('#project').hide().fadeIn(200);
		setPanelHeight();
	}

	const backFromProject = () => {
		document.getElementById('projects').classList.remove("d-none");
		document.getElementById('project').classList.add("d-none");
		$("#projects").hide().fadeIn(200);
		setPanelHeight();
	}

	const onProjectChanged = (data)=>{
		console.log('PROJECT CHANGED', data)
		setProject(data);
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
            <div id="projects" className="row h-100 d-none">    
                <div className="col-md-8">
                    <div className="panel panel-100" id="projectsList">
                        <header>
                            <h1 className="d-inline-block">{t('projects.title')}<button onClick={onAddProject} className="ml-3">+</button></h1>
                            
                            <div className="float-right">
                                <input type="text" placeholder={t('projects.search')} value={searchQuery} onChange={onSearchChange}/>
                            </div>
                        </header>
                        <div className="panel-separator" />
                        <div className="panel-content">
                            <Datatable onProjectSelected={onProjectSelected} setProject={setProject} projects={search(projects)}/>
                        </div>
                    </div>
                </div>
                <div className="col-md-4" id="map-container">
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
                            <p>...</p>
                        </div>
                    </div>
                </div>
            </div>
			<div id="projectAdd" className="row h-100 d-none">
				<div className="col-md-6 m-auto">
                    <ProjectAddEdit mode="add"/>
                </div>
			</div>
			<div id="project" className="d-none">
				<Project backFromProject={backFromProject} project={project} onProjectChanged={onProjectChanged}/>
			</div>
        </>
    )
}

export default Projects