import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {useTranslation} from "react-multi-lang";
import $ from 'jquery';

import DatatabelClients from '../DatatableClients';

// CONTEXTS
import {AppParamsContext} from "../../contexts/AppParamsContext";
import {FooterLoaderContext} from "../../contexts/FooterLoaderContext";
import {LicenceContext} from "../../contexts/LicenceContext";

const Clients = (props) => {
    const t = useTranslation();

    const {appParams, setAppParams} = useContext(AppParamsContext)
    const {licence, setLicence} = useContext(LicenceContext);
    const {footerLoader, setFooterLoader} = useContext(FooterLoaderContext);

    const [clients, setClients] = useState([]);
    const [client, setClient] = useState({});
    const [searchQuery, setSearchQuery] = useState("");

    const rem = 16;
	const margin = rem * 2;
	const padding = rem;
	const footerHeight = rem * 2;
    
    const setPanelHeight = () => {
		const appHeight = $("#app").height();

		const headerHeight = $('#clientsList header').height();
		const separatorHeight = $('#clientsList .panel-separator').height();
		
		const projectListHeight = appHeight - (margin * 2) - (padding * 2) - (headerHeight + padding) - separatorHeight - footerHeight;	
		$("#clientsList .panel-content").height(projectListHeight);
    }

    window.addEventListener('resize', function(e){
        e.preventDefault();
		setPanelHeight();
    });

    useEffect(() => {
		document.getElementById('clients').classList.remove("d-none");
		$('#clients').hide().fadeIn(200);
        setPanelHeight();
        setFooterLoader({active: true, message: 'Connecting to API...', icon: "fa fa-spinner brand-color spin"})
        const apiLink = licence.api_link + 'clients';
        axios.get(apiLink,{ headers: { 'Content-Type': 'application/json'}})
            .then(function (response) {
                setFooterLoader({active: false, message: '', icon:''});
				setClients(response.data);
            })
            .catch(function (error) {
                console.log(error.response);
                setFooterLoader({active: true, message: 'Can not reach server!', icon: "fa fa-exclamation-circle text-danger"});
            });
	}, []);

    const onAddClient = (e) => {
        /* document.getElementById('projects').classList.add("d-none");
		document.getElementById('projectAdd').classList.remove("d-none");
		$('#projectAdd').hide().fadeIn(200);
		$('#projectName').focus(); */
    }

    const onClientSelected = (client) => {
		/* setProject(project);
		document.getElementById('projects').classList.add("d-none");
		document.getElementById('project').classList.remove("d-none");
		$('#project').hide().fadeIn(200);
		setPanelHeight(); */
	}

    const onSearchChange = (e) => {
        setSearchQuery(e.target.value);
    }

    function search(clients){
        return clients.filter( (client) => 
            client.lastname.toLowerCase().indexOf(searchQuery) > -1 ||   
            client.firstname.toLowerCase().indexOf(searchQuery) > -1 ||
            client.email.toLowerCase().indexOf(searchQuery) > -1
        /* project.project_title.toLowerCase().indexOf(searchQuery) > -1 || 
            project.project_city.toLowerCase().indexOf(searchQuery) > -1 || 
            project.project_pc.toLowerCase().indexOf(searchQuery) > -1  */
        );
    }

    return(
        <>
            <div id="clients" className="row h-100 d-none">    
                <div className="col-md-12">
                    <div className="panel panel-100" id="clientsList">
                        <header>
                            <h1 className="d-inline-block">{t('clients.title')}<button onClick={onAddClient} className="ml-3">+</button></h1>
                            
                            <div className="float-right">
                                <input type="text" placeholder={t('clients.search')} value={searchQuery} onChange={onSearchChange}/>
                            </div>
                        </header>
                        <div className="panel-separator" />
                        <div className="panel-content">
                            <DatatabelClients onClientSelected={onClientSelected} setClient={setClient} clients={search(clients)}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Clients;