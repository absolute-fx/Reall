import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {useTranslation} from "react-multi-lang";
import DatatableRealties from '../DatatableRealties';
import RealtyAddEdit from './RealtyAddEdit';
import ProjectAdd from "./ProjectAdd";

import $ from 'jquery';

const Project = (props) => {
  //const project = props.project;
  const [project, setProject] = useState({...props.project});

  const t = useTranslation();

  const [searchQuery, setSearchQuery] = useState("");
  const [realties, setRealties] = useState([]);
  const [realty, setRealty] = useState({});
  const [mode, setMode] = useState("");

  useEffect(() => {
    console.log("FROM CPN REALTY", realty);
    let rs = [...realties];
    rs[document.getElementById("realtyIndex").value] = realty;
    setRealties(rs);
  },[realty]);

  useEffect(() => {
    setProject(props.project);
  }, [props.project]);

  useEffect(() => {
    setRealties(props.project.realties);
  },[props.project]);

  useEffect(() => {
    if(realties != undefined && realties.length > 0){
      //console.log('PROJECT DATA', project);
      console.log('REALTIES LIST', realties);
      //props.onProjectChanged(realties);
    }
  }, [realties]);

  const onSearchChange = (e) => {
    setSearchQuery(e.target.value);
  }

  const onRealtySelected = (realty, index) => {
    setRealty(realty);
    setMode('edit');
    document.getElementById('projectData').classList.add("d-none");
    document.getElementById('realtyAddEdit').classList.remove("d-none");
    document.getElementById("realtyIndex").value = index;
    $('#realtyAddEdit').hide().fadeIn(200);
    //$('#projectName').focus();
  }

  const onCloseEdit = () => {
    console.log('CLOSE');
    document.getElementById('realtyAddEdit').classList.add("d-none");
    document.getElementById('projectData').classList.remove("d-none");
  }

  const  search = (realties) => {
    if(realties){
      return realties.filter((realty) =>
          realty.realty_title?.toLowerCase().indexOf(searchQuery) > -1
        //project.project_city.toLowerCase().indexOf(searchQuery) > -1 ||
        //project.project_pc.toLowerCase().indexOf(searchQuery) > -1
      );
    }else{
      return [];
    }
  }

  const addRealty = (event) => {
    event.preventDefault();
    setRealty({});
    setMode('add');
    document.getElementById('projectData').classList.add("d-none");
    document.getElementById('realtyAddEdit').classList.remove("d-none");
    $('#realtyAddEdit').hide().fadeIn(200);
  }

  function realtyChanged(data) {
    //console.log('REALTY CHANGED', data);
    setRealty(data);
  }

  function projectChange(data) {
    props.onProjectChanged({ ...data });
  }
  const editProject = () => {
    document.getElementById('projectData').classList.add("d-none");
    document.getElementById('projectEdit').classList.remove("d-none");
  }

  //console.log(project.realties)
  return(
    <>
      <div id="projectData">
        <div className="row" id="prj-breadcrumb">
          <div className="col">
            <button className="btn-secondary mr-3" onClick={props.backFromProject}><i className="fas fa-angle-left mr-2" />Retour aux projets</button>
            <button className="btn-secondary"><i className="fas fa-file-export mr-2" />Exporter</button>
          </div>
        </div>
        <div className="row ps-t">
          <div className="col-md-8">
            <div className="row" id="prjLeftRow">
              <div className="col-md-6">
                <div className="panel">
                  <header>
                    <h1 className="d-inline-block">{project.project_title}<button className="ml-3" onClick={editProject}><i className="fas fa-pen"></i></button></h1>
                  </header>
                  <div className="panel-separator" />
                  <div className="panel-content">
                    {project.project_address} - {project.project_pc}, {project.project_city}
                  </div>
                </div>
              </div>
              <div className="col-md-6">
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
                    <h1 className="d-inline-block">Biens<button onClick={(event) => addRealty(event)} className="ml-3">+</button></h1>
                    <div className="float-right">
                      <input type="text" placeholder={t('projects.search')} value={searchQuery} onChange={onSearchChange}/>
                    </div>
                  </header>
                  <div className="panel-separator" />
                  <div className="panel-content">
                    <DatatableRealties onRealtySelected={onRealtySelected} realties={search(realties)}/>
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
      </div>
      <div id="realtyAddEdit" className="row h-100 d-none">
        <div className="col-md-8 m-auto">
          <RealtyAddEdit mode={mode} realty={mode === "edit" ? realty : {}} project={project} onProjectChanged={projectChange} onChange={realtyChanged} onClose={onCloseEdit}/>
        </div>
      </div>
      <div id="projectEdit" className={"d-none"}>
        <ProjectAdd mode={"edit"} project={project} onChange={projectChange} />
      </div>
    </>
  )
}

export default Project