import React, {useState, useContext, useEffect} from 'react';
import $ from 'jquery';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {LicenceContext} from "../../contexts/LicenceContext";
import {UserContext} from "../../contexts/UserContext";
import {FooterLoaderContext} from "../../contexts/FooterLoaderContext";
import axios from "axios";


const ProjectAdd = (props) => {
  const { mode } = props;
  const title = mode === "add" ? 'Nouveau projet' : "Modifier project";
  const btn = mode === "add" ? "Créer" : "Modifier";
  const [moreInfos, setMoreInfos] = useState({status: 0, label: "Plus d'infos", icon: "fas fa-angle-right"});
  const [project, setProject] = useState({});
  const [error, setError] = useState({});
  const h = $('.panel-100').height();
  const cPH = $('.panel-content').height();
  const fH = $('#projectForm').height();

  const { licence } = useContext(LicenceContext);
  const { user } = useContext(UserContext);
  const { setFooterLoader } = useContext(FooterLoaderContext);

  useEffect(() => {
    if(mode === "edit") {
      setProject(props.project);
    }
  }, [props.project]);

  const backToJprojects = () => {
    document.getElementById('projects').classList.remove("d-none");
    document.getElementById('projectAdd').classList.add("d-none");
    $("#projects").hide().fadeIn(500);
    $('#moreInfos').removeClass('show');
    setMoreInfos({status: 0, label: "Plus d'infos", icon: "fas fa-angle-right"});
  }

  const backToProject = () => {
    document.getElementById('projectData').classList.remove("d-none");
    document.getElementById('projectEdit').classList.add("d-none");
    $("#projectData").hide().fadeIn(500);
    $('#moreInfos').removeClass('show');
    setMoreInfos({status: 0, label: "Plus d'infos", icon: "fas fa-angle-right"});
  }

  const closeForm = () => {
    if (mode === "edit") backToProject();
    if (mode === "add") backToJprojects();
  }
  // On change we set the project state
  const onChange = (event) => {
    setProject({ ...project, [event.target.name]: event.target.value });
  };

  const onMoreInfos = () => {
    if(moreInfos.status === 0){
      setMoreInfos({status: 1, label: "Moins d'infos", icon: "fas fa-angle-down"});
    }else{
      setMoreInfos({status: 0, label: "Plus d'infos", icon: "fas fa-angle-right"});
    }
  }

  const onChangeCheckbox = async (event) => {
    if (event.target.value === "on") setProject({ ...project, [event.target.name]: 1 });
    if (event.target.value !== "on") setProject({ ...project, [event.target.name]: 0 });
    if (mode === "edit") {
      await onBlur();
    }
  }

  const checkRequiredFields = (project) => {
    const errors = {};
    let isError = false;
    if (!project.project_title?.length) {
      errors.project_title = 'Nom du projet obligatoire';
      isError = true;
    }

    if (!project.projecttypeId?.length) {
      errors.projecttypeId = "Type obligatoire";
      isError = true;
    }
    setError(errors);
    return isError;
  }

  const onBlur = async () => {
    if (mode === "edit") {
      try {
        setFooterLoader({active: true, message: 'Connecting to API...', icon: "fa fa-spinner brand-color spin"})
        const apiLink = `${licence.api_link}projects/${project.id}`;
        const req = await axios.put(apiLink, project, {
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': user.accessToken
          }
        });
        props.onChange({ ...project, [event.target.name]: event?.target.value });
        setFooterLoader({active: false, message: '', icon: ''});
      } catch (error) {
        setFooterLoader({
          active: true, message: 'Can not reach server', icon: "fa" +
            " fa-exclamation-circle text-danger"
        });
      }
    }
  }
  const submit = async (event) => {
    event.preventDefault();
    if (mode === "add") {
      try {
        if (checkRequiredFields(project)) {
          throw new Error('Missing fields');
        }
        setFooterLoader({active: true, message: 'Connecting to API...', icon: "fa fa-spinner brand-color spin"})
        const apiLink = licence.api_link + 'projects';
        await axios.post(apiLink, project,{ headers: { 'Content-Type': 'application/json', 'x-access-token': user.accessToken }});
        setFooterLoader({active: false, message: '', icon:''});
        setProject({ });
        closeForm();
      } catch (err) {
        setFooterLoader({active: true, message: 'Can not reach the server', icon: "fa fa-exclamation-circle" +
            " text-danger"});
      }
    } else {
      closeForm();
    }

  }

  return(
    <div className="panel">
      <header>
        <h1>{title}</h1>
      </header>
      <div className="panel-separator" />
      <div className="panel-content">
        <form id="projectForm" action="">
          <div className="container-fluid">
            <div className="row">
              <div className="form-group col-md-6">
                <label htmlFor="projectName">Nom *</label>{error && error.project_title && <span className={'error-field'}>{ error.project_title}</span>}
                <input
                  type="text"
                  name={"project_title"}
                  onChange={(event) => onChange(event)}
                  className="form-control form-control-sm"
                  id="projectName"
                  value={project.project_title ||""}
                  required={true}
                  onBlur={onBlur}
                />
              </div>
              <div className="form-group col-md-2">
                <label htmlFor="projectRef">Référence</label>
                <input type="text" name={"project_ref"} value={project.project_ref || ""} onBlur={onBlur} onChange={(event) => onChange(event)} className="form-control form-control-sm" id="projectRef" />
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="project-type">Type *</label>{error && error.projecttypeId && <span className={'error-field'}>{ error.projecttypeId}</span>}
                <select name={"projecttypeId"} onBlur={onBlur} value={project.projecttypeId || ""} onChange={(event) => onChange(event)} className="form-control form-control-sm" id="project-type">
                  <option value={""} />
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                </select>
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-6">
                <label htmlFor="project_address">Adresse</label>
                <input type="text" name={'project_address'} value={project.project_address || "" } onBlur={onBlur} onChange={(event) => onChange(event)} className="form-control form-control-sm" id="project_address" />
              </div>
              <div className="form-group col-md-2">
                <label htmlFor="project_pc">CP</label>
                <input type="text" name={'project_pc'} onBlur={onBlur} value={project.project_pc || ""} onChange={(event) => onChange(event)} className="form-control form-control-sm" id="project_pc" />
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="project_city">ville</label>
                <input type="text" name={"project_city"} value={project.project_city || ""} onBlur={onBlur} onChange={(event) => onChange(event)} className="form-control form-control-sm" id="project_city" />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <i className={moreInfos.icon}></i> <a href="#moreInfos" onClick={onMoreInfos} data-toggle="collapse" data-target="#moreInfos" role="button" aria-expanded="false" aria-controls="moreInfos">{moreInfos.label}</a>
              </div>
            </div>
            <div className="collapse mb-3" id="moreInfos">
              <div className="row form-separator">
                <div className="form-group col-md-12">
                  <label htmlFor="	project_long_description">Description</label>
                  <textarea name={"project_long_	project_long_description"} value={project.project_long_description || ""} onBlur={onBlur} onChange={(event) => onChange(event)} className="form-control" id="description" rows="3" />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 form-group">
                  <label htmlFor="projectStart">Début de chantier</label>
                  <input type="text" name={"project_start_build_date"} value={project.project_start_build_date || ""} onBlur={onBlur} onChange={(event) => onChange(event)} className="form-control form-control-sm" id="projectStart" />
                </div>
                <div className="col-md-6 form-group">
                  <label htmlFor="projectEnd">Fin de chantier</label>
                  <input type="text" name={"project_end_build_date"} value={project.project_end_build_date || ""} onBlur={onBlur} onChange={(event) => onChange(event)} className="form-control form-control-sm" id="projectEnd" />
                </div>
              </div>
              <div className="row">
                <div className="col-md-8 form-group ">
                  <label htmlFor="projectEnv">Type d'environnement</label>
                  <select name={"project_environment_type"} onBlur={onBlur} value={project.project_environment_type || ""} onChange={(event) => onChange(event)} className="form-control form-control-sm" id="projectEnv">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </div>
                <div className="col-md-4 form-group">
                  <label htmlFor="project_terrain_size">Superficie terrain</label>
                  <div className="input-group input-group-sm">
                    <input type="text" name={"project_terrain_size"} value={project.project_terrain_size || ""} id={"project_terrain_size"} onBlur={onBlur} onChange={(event) => onChange(event)} className="form-control" aria-label="" aria-describedby="basic-addon2"/>
                    <div className="input-group-append">
                      <span className="input-group-text" id="basic-addon2">m²</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-md-4 form-group">
                  <div id="dark-mode-switch" className="custom-control custom-switch m-auto">
                    <input name="project_handicapped_access" checked={project.project_handicapped_access === 1} onChange={(event) => onChangeCheckbox(event)} type="checkbox"  className="custom-control-input" id="handicappedSwitch"/>
                    <label className="custom-control-label" htmlFor="handicappedSwitch">Accès handicapé</label>
                  </div>
                </div>
                <div className="col-md-4 form-group">
                  <div id="dark-mode-switch" className="custom-control custom-switch m-auto text-center">
                    <input name="project_lift" onBlur={onBlur} onChange={(event) => onChangeCheckbox(event)} type="checkbox" className="custom-control-input" id="liftSwitch"/>
                    <label className="custom-control-label" htmlFor="liftSwitch">Ascenseur</label>
                  </div>
                </div>
                <div className="col-md-4 form-group">
                  <div id="dark-mode-switch" className="custom-control custom-switch m-auto text-right">
                    <input name="project_concierge" type="checkbox" onBlur={onBlur} onChange={(event) => onChangeCheckbox(event)} className="custom-control-input" id="conciergeSwitch"/>
                    <label className="custom-control-label" htmlFor="conciergeSwitch">Conciergerie</label>
                  </div>
                </div>
              </div>
              <div className="row form-website">
                <div className="col-md-6 form-group mt-auto mb-auto">
                  <div id="dark-mode-switch" className="custom-control custom-switch m-auto">
                    <input name="project_active_online" onBlur={onBlur} onChange={(event) => onChangeCheckbox(event)} type="checkbox" className="custom-control-input" id="project_active_online"/>
                    <label className="custom-control-label" htmlFor="project_active_online">Visible sur site web</label>
                  </div>
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="project_start_diffusion_date">Début de diffusion</label>
                  <input type="text" onBlur={onBlur} name={"project_start_diffusion_date"} value={project.project_start_diffusion_date || ""} onChange={(event) => onChange(event)} className="form-control form-control-sm" id="project_start_diffusion_date" placeholder=""/>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-12 mt-3">
                <button type="button" className="btn btn-primary float-right" onClick={(event) => submit(event)}>{btn}</button>
                {mode === "add" && <button type="button" className="btn float-right" onClick={closeForm}>Annuler</button>}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )

}

export default ProjectAdd;