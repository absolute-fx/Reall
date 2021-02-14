import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {useTranslation} from "react-multi-lang";
import DatatableRealties from '../DatatableRealties';
import $ from 'jquery';

const Project = (props) => {
	const project = props.project;
	const t = useTranslation();

	const [searchQuery, setSearchQuery] = useState("");
	const [realties, setRealties] = useState([]);
	const [realty, setRealty] = useState([]);

	const onSearchChange = (e) => {
        setSearchQuery(e.target.value);
    }

	const onRealtySelected = (realty) => {
		console.log(realty);
	}

	const  search = (realties) => {
		if(realties){
			return realties.filter( (realty) => 
				realty.realty_title.toLowerCase().indexOf(searchQuery) > -1
				//project.project_city.toLowerCase().indexOf(searchQuery) > -1 || 
				//project.project_pc.toLowerCase().indexOf(searchQuery) > -1 
			);
		}else{
			return [];
		}
    }

	//console.log(project.realties)
    return(
        <>
            <div className="row" id="prj-breadcrumb">
				<div className="col">
					<button className="btn-secondary mr-3" onClick={props.backFromProject}><i className="fas fa-angle-left mr-2"></i>Retour aux projets</button>
					<button className="btn-secondary"><i className="fas fa-file-export mr-2"></i>Exporter</button>
				</div>
			</div>
			<div className="row ps-t">
				<div className="col-md-8">
					<div className="row" id="prjLeftRow">
						<div className="col-md-7">
							<div className="panel">
								<header>
									<h1 className="d-inline-block">{project.project_title}<button className="ml-3"><i className="fas fa-pen"></i></button></h1>
								</header>
								<div className="panel-separator" />
								<div className="panel-content">
									{project.project_address} - {project.project_pc}, {project.project_city}
								</div>
							</div>
						</div>
						<div className="col-md-5">
							<div className="panel">
								<header>
									<h1 className="d-inline-block">Business plan<button className="ml-3"><i className="fas fa-pen"></i></button></h1>
								</header>
								<div className="panel-separator" />
								<div className="panel-content">
									Some business data here
								</div>
							</div>
						</div>
					</div>
					<div className="row ps-t">
						<div className="col">
							<div className="panel" id="realty-list">
								<header>
									<h1 className="d-inline-block">Biens<button className="ml-3">+</button></h1>
									<div className="float-right">
										<input type="text" placeholder={t('projects.search')} value={searchQuery} onChange={onSearchChange}/>
									</div>
								</header>
								<div className="panel-separator" />
								<div className="panel-content">
									<DatatableRealties onRealtySelected={onRealtySelected} realties={search(project.realties)}/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="col-md-4">
					<div className="row">
						<div className="col">
							<div className="panel" id="projectLibrary">
								<header>
									<h1 className="d-inline-block">Bibliothèque<button className="ml-3">+</button></h1>
								</header>
								<div className="panel-separator" />
								<div className="panel-content">...</div>
							</div>
						</div>
					</div>
					<div className="row ps-t">
						<div className="col">
							<div className="panel" id="mapContainer">
								<header>
									<h1 className="d-inline-block">Carte</h1>
								</header>
								<div className="panel-separator" />
								<div className="panel-content">
									<div id="project-map"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
        </>
    )
}

export default Project