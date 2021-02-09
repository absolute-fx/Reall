import React, {useState} from 'react';
import SimpleMap from '../Map';
import $ from 'jquery';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useEffect } from 'react';


const ProjectAddEdit = (props) => {
    const mode = props.mode;
    const title = mode === "add" ? "Nouveau projet": "Modifier le projet";
	const [moreInfos, setMoreInfos] = useState({status: 0, label: "Plus d'infos", icon: "fas fa-angle-right"});
    const h = $('.panel-100').height();
    const cPH = $('.panel-content').height();
    const fH = $('#projectForm').height();

    useEffect(() => {
        
    },[]);

	const backToJprojects = () => {
        document.getElementById('projectList').classList.remove("d-none");
        document.getElementById('map-container').classList.remove("d-none");
        document.getElementById('tools').classList.remove("d-none");
		document.getElementById('projectAdd').classList.add("d-none");
		$('#moreInfos').removeClass('show');
		onMoreInfos();
    }
	
	const onMoreInfos = () => {
		if(moreInfos.status === 0){
			setMoreInfos({status: 1, label: "Moins d'infos", icon: "fas fa-angle-down"});
		}else{
			setMoreInfos({status: 0, label: "Plus d'infos", icon: "fas fa-angle-right"});
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
								<label htmlFor="projectName">Nom *</label>
								<input type="text" className="form-control form-control-sm" id="projectName" placeholder=""/>
							</div>
							<div className="form-group col-md-2">
								<label htmlFor="projectRef">Référence</label>
								<input type="text" className="form-control form-control-sm" id="projectRef" placeholder=""/>
							</div>
							<div className="form-group col-md-4">
								<label htmlFor="project-type">Type *</label>
								<select className="form-control form-control-sm" id="project-type">
									<option>1</option>
									<option>2</option>
									<option>3</option>
									<option>4</option>
									<option>5</option>
								</select>
							</div>
						</div>
						<div className="row">
							<div className="form-group col-md-6">
								<label htmlFor="projectAdress">Adresse</label>
								<input type="text" className="form-control form-control-sm" id="projectAdress" placeholder=""/>
							</div>
							<div className="form-group col-md-2">
								<label htmlFor="projectCp">CP</label>
								<input type="text" className="form-control form-control-sm" id="projectCp" placeholder=""/>
							</div>
							<div className="form-group col-md-4">
								<label htmlFor="projectCity">ville</label>
								<input type="text" className="form-control form-control-sm" id="projectCity" placeholder=""/>
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
									<label htmlFor="description">Description</label>
									<textarea className="form-control" id="description" rows="3"></textarea>
								</div>
							</div>
							<div className="row">
								<div className="col-md-6 form-group">
									<label htmlFor="projectStart">Début de chantier</label>
									<input type="text" className="form-control form-control-sm" id="projectStart" placeholder=""/>
								</div>
								<div className="col-md-6 form-group">
									<label htmlFor="projectEnd">Fin de chantier</label>
									<input type="text" className="form-control form-control-sm" id="projectEnd" placeholder=""/>
								</div>
							</div>
							<div className="row">
								<div className="col-md-8 form-group ">
									<label htmlFor="projectEnv">Type d'environement</label>
									<select className="form-control form-control-sm" id="projectEnv">
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
									</select>
								</div>
								<div className="col-md-4 form-group">
									<label htmlFor="addressInput">Superficie terrain</label>
									<div className="input-group input-group-sm">
										<input type="text" className="form-control" placeholder="" aria-label="" aria-describedby="basic-addon2"/>
										<div className="input-group-append">
											<span className="input-group-text" id="basic-addon2">m²</span>
										</div>
									</div>
								</div>
							</div>
							<div className="row mt-2">
								<div className="col-md-4 form-group">
									<div id="dark-mode-switch" className="custom-control custom-switch m-auto">
										<input name="handicapped" type="checkbox" className="custom-control-input" id="handicappedSwitch"/>
										<label className="custom-control-label" htmlFor="handicappedSwitch">Accès handicapé</label>
									</div>
								</div>
								<div className="col-md-4 form-group">
									<div id="dark-mode-switch" className="custom-control custom-switch m-auto text-center">
										<input name="autoconnect" type="checkbox" className="custom-control-input" id="liftSwitch"/>
										<label className="custom-control-label" htmlFor="liftSwitch">Ascenseur</label>
									</div>
								</div>
								<div className="col-md-4 form-group">
									<div id="dark-mode-switch" className="custom-control custom-switch m-auto text-right">
										<input name="autoconnect" type="checkbox" className="custom-control-input" id="conciergeSwitch"/>
										<label className="custom-control-label" htmlFor="conciergeSwitch">Concièrgerie</label>
									</div>
								</div>
							</div>
							<div className="row form-website">
								<div className="col-md-6 form-group mt-auto mb-auto">
									<div id="dark-mode-switch" className="custom-control custom-switch m-auto">
                                        <input name="autoconnect" type="checkbox" className="custom-control-input" id="autoConnectSwitch"/>
                                        <label className="custom-control-label" htmlFor="autoConnectSwitch">Visible sur site web</label>
                                    </div>
								</div>
								<div className="form-group col-md-6">
									<label htmlFor="addressInput">Début de diffusion</label>
									<input type="text" className="form-control form-control-sm" id="addressInput" placeholder=""/>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="form-group col-md-12 mt-3">
								<button type="submit" className="btn btn-primary float-right">Créer</button>
								<button type="button" className="btn float-right" onClick={backToJprojects}>Annuler</button>
							</div>
						</div>
                    </div>
                </form>
            </div>
        </div>
    )

}

export default ProjectAddEdit;