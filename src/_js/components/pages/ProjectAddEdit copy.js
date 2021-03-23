import React, {useState} from 'react';
import SimpleMap from '../Map';
import $ from 'jquery';
import { useEffect } from 'react';


const ProjectAddEdit = (props) => {
    const mode = props.mode;
    const title = mode === "add" ? "Nouveau projet": "Modifier le projet"
    const [contentHeight, setContentHeight] = useState(0);
    const h = $('.panel-100').height();
    const cPH = $('.panel-content').height();
    const fH = $('#projectForm').height();

    useEffect(() => {
        
    },[]);

    
    return(
        <div className="panel panel-100">
            <header>
                <h1>{title}</h1>
            </header>
            <div className="panel-separator" />
            <div className="panel-content">
                <form id="projectForm" action="">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-5 pl-0 fs-left">
                                <div className="form-section form-row">
                                    <div className="form-group col-md-5">
                                        <label htmlFor="addressInput">Nom</label>
                                        <input type="text" className="form-control form-control-sm" id="addressInput" placeholder=""/>
                                    </div>
                                    <div className="form-group col-md-5">
                                        <label htmlFor="typeInput">Type</label>
                                        <select className="form-control form-control-sm" id="exampleFormControlSelect1">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </select>
                                    </div>
                                    <div className="form-group col-md-2">
                                        <label htmlFor="floorInput">Etages</label>
                                        <input type="number" className="form-control form-control-sm" id="floorInput" placeholder=""/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 fs-center">
                                <div className="form-section form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="addressInput">Début chantier</label>
                                        <input type="text" className="form-control form-control-sm" id="addressInput" placeholder=""/>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="typeInput">Fin chantier</label>
                                        <input type="text" className="form-control form-control-sm" id="typeInput" placeholder=""/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 fs-right">
                                <div className="form-section form-row" style={{height: "100%"}}>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="addressInput">Début diffusion</label>
                                        <input type="text" className="form-control form-control-sm" id="addressInput" placeholder=""/>
                                    </div>
                                    <div id="dark-mode-switch" className="custom-control custom-switch m-auto">
                                        <input name="autoconnect" type="checkbox" className="custom-control-input" id="autoConnectSwitch"/>
                                        <label className="custom-control-label" htmlFor="autoConnectSwitch">reall</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-md-5 fs-left">
                                <div className="form-section">
                                    <div className="form-row" style={{padding: '0.25rem'}}>
                                        <div className="form-group col">
                                            <label htmlFor="addressInput">Recherche google</label>
                                            <input type="text" className="form-control form-control-sm" id="addressInput" placeholder=""/>
                                        </div>
                                    </div>
                                    <div className="form-row" style={{padding: '0.25rem'}}>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="addressInput">Adresse</label>
                                            <input type="text" className="form-control form-control-sm" id="addressInput" placeholder=""/>
                                        </div>
                                        <div className="form-group col-md-4">
                                            <label htmlFor="addressInput">Ville</label>
                                            <input type="text" className="form-control form-control-sm" id="addressInput" placeholder=""/>
                                        </div>
                                        <div className="form-group col-md-2">
                                            <label htmlFor="addressInput">cp</label>
                                            <input type="text" className="form-control form-control-sm" id="addressInput" placeholder=""/>
                                        </div>
                                    </div>
                                    <div className="form-row" style={{padding: '0.5rem'}}>
                                        <SimpleMap />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-7">
                                <div className="row">
                                    <div className="col-md-6 fs-center">
                                        <div className="form-section form-row">
                                            <div className="form-group col">
                                                <label htmlFor="description">Description</label>
                                                <textarea className="form-control" id="description" rows="3"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 fs-right">
                                        <div className="form-section form-row" style={{"height": "100%"}}>
                                            <div className="form-group col">
                                                <label htmlFor="description">Images de couverture</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col fs-right">
                                        <div className="form-section">
                                            <div className="form-row" style={{padding: '0.25rem'}}>
                                                <div className="form-group col-md-5">
                                                    <label htmlFor="typeInput">Type d'environement</label>
                                                    <select className="form-control form-control-sm" id="exampleFormControlSelect1">
                                                        <option>1</option>
                                                        <option>2</option>
                                                        <option>3</option>
                                                        <option>4</option>
                                                        <option>5</option>
                                                    </select>
                                                </div>
                                                <div className="form-group col-md-3">
                                                    <label htmlFor="addressInput">Superficie terrain</label>
                                                    <div className="input-group input-group-sm">
                                                        <input type="text" className="form-control" placeholder="" aria-label="" aria-describedby="basic-addon2"/>
                                                        <div className="input-group-append">
                                                            <span className="input-group-text" id="basic-addon2">m²</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group col-md-2">
                                                    <label htmlFor="addressInput">Parking int</label>
                                                    <input type="text" className="form-control form-control-sm" id="addressInput" placeholder=""/>
                                                </div>
                                                <div className="form-group col-md-2">
                                                    <label htmlFor="addressInput">Parking ext</label>
                                                    <input type="text" className="form-control form-control-sm" id="addressInput" placeholder=""/>
                                                </div>
                                            </div>
                                            <div className="form-row" style={{padding: '0.25rem'}}>
                                                <div className="col-md-4">
                                                    <div id="dark-mode-switch" className="custom-control custom-switch m-auto">
                                                        <input name="handicapped" type="checkbox" className="custom-control-input" id="handicappedSwitch"/>
                                                        <label className="custom-control-label" htmlFor="handicappedSwitch">Accès handicapé</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div id="dark-mode-switch" className="custom-control custom-switch m-auto">
                                                        <input name="autoconnect" type="checkbox" className="custom-control-input" id="liftSwitch"/>
                                                        <label className="custom-control-label" htmlFor="liftSwitch">Ascenseur</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div id="dark-mode-switch" className="custom-control custom-switch m-auto">
                                                        <input name="autoconnect" type="checkbox" className="custom-control-input" id="conciergeSwitch"/>
                                                        <label className="custom-control-label" htmlFor="conciergeSwitch">Concièrgerie</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )

}

export default ProjectAddEdit;