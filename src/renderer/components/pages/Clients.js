import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {useTranslation} from "react-multi-lang";
import $ from 'jquery';

import DatatabelClients from '../DatatableClients';

// CONTEXTS
import {AppParamsContext} from "../../contexts/AppParamsContext";
import {FooterLoaderContext} from "../../contexts/FooterLoaderContext";
import {LicenceContext} from "../../contexts/LicenceContext";
import Client from './Client';
import ClientAdd from "./ClientAdd";

const Clients = (props) => {
  const t = useTranslation();

  const {appParams, setAppParams} = useContext(AppParamsContext)
  const {licence, setLicence} = useContext(LicenceContext);
  const {footerLoader, setFooterLoader} = useContext(FooterLoaderContext);

  const [clients, setClients] = useState([]);
  const [client, setClient] = useState({});
  const [clientsToDisplay, setClientsToDisplay] = useState([]);

  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [index, setIndex] = useState(-1);

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
      const apiLink = licence.api_link + 'user?role=2';
      axios.get(apiLink,{ headers: { 'Content-Type': 'application/json'}})
          .then(function (response) {
              setFooterLoader({active: false, message: '', icon:''});
              setClients(response.data.customers);
              setClientsToDisplay(response.data.customers);
              setProjects(response.data.projects);
          })
          .catch(function (error) {
              console.log(error.response);
              setFooterLoader({active: true, message: 'Can not reach server!', icon: "fa fa-exclamation-circle text-danger"});
          });
}, []);

  const onAddClient = () => {
    document.getElementById('clients').classList.add("d-none");
    document.getElementById('addClient').classList.remove("d-none");
    $('#addClient').hide().fadeIn(200);
    $('#clientName').focus();
  }

  const onClientSelected = (client, index) => {
    setClient(client);
    setIndex(index);
    document.getElementById('clients').classList.add("d-none");
    document.getElementById('client').classList.remove("d-none");
    $('#client').hide().fadeIn(200);
    setPanelHeight();
  }

  const onSearchChange = (e) => {
      setSearchQuery(e.target.value);
  }

  const backFromClient = () => {
    document.getElementById('clients').classList.remove("d-none");
    document.getElementById('client').classList.add("d-none");
    $("#clients").hide().fadeIn(200);
    setPanelHeight();
  }

  const onClientChanged = (data) => {
    if (index > -1) {
      const clts = clients;
      clts[index] = data;
      setClients(clts);
      setClient(data);
    }
  }

  const onCloseEdit = () => {
    document.getElementById('clients').classList.remove("d-none");
    document.getElementById('addClient').classList.add("d-none");
  }

  const onCreatedClient = (newClient) => {
    const clt = clients;
    clt.push(newClient);
    setClients(clt);
  }

  function search(clients, project = null){
      return clients.filter( (client) =>
          client.lastname.toLowerCase().indexOf(searchQuery) > -1 ||
          client.firstname.toLowerCase().indexOf(searchQuery) > -1 ||
          client.email.toLowerCase().indexOf(searchQuery) > -1 ||
        client.projectsList.indexOf(project) > -1
      /* project.project_title.toLowerCase().indexOf(searchQuery) > -1 ||
          project.project_city.toLowerCase().indexOf(searchQuery) > -1 ||
          project.project_pc.toLowerCase().indexOf(searchQuery) > -1  */
      );
  }

  const projectSelected = (event) => {
    if (!event.target.value) {
      setClientsToDisplay(clients);
      return;
    }
    const cl = [];
    clients.forEach(client => {
      if (client.projectsList.includes(parseInt(event.target.value, 10))) {
        cl.push(client);
      }
    });
    setClientsToDisplay(cl);
  }

  return(
      <>
          <div id="clients" className="row h-100 d-none">
              <div className="col-md-12">
                  <div className="panel panel-100" id="clientsList">
                      <header>
                          <h1 className="d-inline-block">{t('clients.title')}<button onClick={onAddClient} className="ml-3">+</button></h1>

                        <select name={"project"} onChange={projectSelected}>
                              <option value={""}>Tous</option>
                              {
                                projects.map(project => (
                                  <option key={project.id} value={project.id}>{project.project_title}</option>
                                ))
                              }
                            </select>
                          <div className="float-right">
                              <input type="text" placeholder={t('clients.search')} value={searchQuery} onChange={onSearchChange}/>
                          </div>
                      </header>
                      <div className="panel-separator" />
                      <div className="panel-content">
                          <DatatabelClients onClientSelected={onClientSelected} setClient={setClient} clients={search(clientsToDisplay)}/>
                      </div>
                  </div>
              </div>
          </div>
        <div id="client" className={'d-none'}>
          <Client backFromClient={backFromClient} projects={projects} client={client} onClientChanged={onClientChanged} />
        </div>
        <div id="addClient" className={'d-none'}>
          <ClientAdd onCreatedClient={onCreatedClient} onClose={onCloseEdit} />
        </div>
      </>
  )
}

export default Clients;