import React, { useState, useEffect } from 'react';
import ClientEdit from "./ClientEdit";
import ClientEditRealties from "./ClientEditRealties";
import $ from "jquery";

const client = (props) => {
  const [client, setClient] = useState({});
  const [mode, setMode] = useState('');
  const [realties, setRealties] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    setClient(props.client);
    setRealties(props.client.realties);
    setupProjects();
  }, [props.client]);

  const setupProjects = () => {
    // set projects bases on client
    const t = [];
    props.client.projectsList?.forEach(project => {
      const r = props.projects?.find(p => p.id == project);
      t.push(r);
    });
    setProjects(t);
  }
  const editClient = () => {
    setMode("edit");
    document.getElementById('clientData').classList.add("d-none");
    document.getElementById('clientAddEdit').classList.remove("d-none");
    $("#projects").hide().fadeIn(200);
  }

  const onCloseEdit = () => {
    document.getElementById('clientData').classList.remove("d-none");
    document.getElementById('clientAddEdit').classList.add("d-none");
    document.getElementById('clientEditRealties').classList.add("d-none");

  }

  const clientChanged = (data) => {
    setClient(data);
    props.onClientChanged(data)
  }

  const editRealties = () => {
    document.getElementById('clientData').classList.add("d-none");
    document.getElementById('clientEditRealties').classList.remove("d-none");
    $("#projects").hide().fadeIn(200);

  }
  const contractType = ['Location', 'Vente'];

  const changeProject = (event) => {
    if (!event.target.value) {
      setRealties(client.realties);
      return;
    }
    const real = client.realties.filter(r => r.project.id == event.target.value);
    setRealties(real);
  }
  return (
    <>
      <div id="clientData">
        <div className="row" id="prj-breadcrumb">
          <div className="col">
            <button className="btn-secondary mr-3" onClick={props.backFromClient}><i className="fas fa-angle-left mr-2" />Retour aux clients</button>
          </div>
        </div>
        <div className="row ps-t">
          <div className="col">
            <div className="panel">

              <header>
                <h1 className={'d-inline-block'}>Fiche client <button onClick={editClient} className="ml-3"><i className="fas fa-pen" /></button></h1>
              </header>
              <div className="panel-separator" />
              <div className={"row ps-t"}>
                <div className="col-md-6">
                  <div>
                    <div className={"company-label"}>Nom</div>
                    <div>{client.lastname} {client.firstname}</div>
                  </div>
                  <div>
                    <div className={"company-label"}>Mobile</div>
                    <div>{client.mobile}</div>
                  </div>
                  <div>
                    <div className={"company-label"}>Mobile 2</div>
                    <div>{client.mobile2}</div>
                  </div>
                  <div>
                    <div className={"company-label"}>Téléphone</div>
                    <div>{client.phone}</div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div>
                    <div className={"company-label"}>Adresse</div>
                    <div>{client.address}</div>
                  </div>
                  <div>
                    <div className={"company-label"}>Ville</div>
                    <div>{client.city}</div>
                  </div>
                  <div>
                    <div className={"company-label"}>PC</div>
                    <div>{client.pc}</div>
                  </div>
                  <div>
                    <div className={"company-label"}>Code pays</div>
                    <div>{client.country_code}</div>
                  </div>
                  <div>
                    <div className="campany-label">Email</div>
                    <div>{client.email}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row ps-t projects">
          <div className="col">
            <div className="panel">
              <header>
                <h1 className={'d-inline-block'}>Liste des biens<button onClick={editRealties} className="ml-3">
                  <i className="fas fa-pen" /></button>
                </h1>
                <select name={'project'} onChange={changeProject}>
                  <option value="">Tous</option>
                  {
                    projects?.map((project) => (
                      <option key={project.id} value={project.id}>{project.project_title}</option>
                    ))
                  }
                </select>
              </header>
              <div className="panel-separator" />
              <div className={"panel-content"} style={{ height: '330px' }}>
                <table className="table reall-datatable">
                  <thead>
                  <tr>
                    <th>Libellé</th>
                    <th>Prix</th>
                    <th>Superficie</th>
                    <th>Contrat</th>
                    <th>Acquis</th>
                    <th><span>r</span></th>
                  </tr>
                  </thead>
                  <tbody>
                  {
                    realties?.map(realty => (
                      <tr key={realty.id}>
                        <th>{realty.realty_title}</th>
                        <td>{realty.realty_net_price} €</td>
                        <td>{realty.realty_surface} m²</td>
                        <td className="text-center">{contractType[realty.realtycontracttypeId]}</td>
                        <td className="text-center"><i className={realty.realty_status} /></td>
                        <td><i className={realty.realty_active_online? 'fas fa-check brand-color': 'fas fa-check unactive'} /></td>
                      </tr>
                    ))
                  }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="clientAddEdit" className={"h-100 d-none"}>
          <ClientEdit mode={mode} client={client} onCloseEdit={onCloseEdit} onChange={clientChanged}/>
      </div>
      <div id="clientEditRealties" className={"h-100 d-none"}>
        <ClientEditRealties onCloseEdit={onCloseEdit} clientChanged={clientChanged} client={client} />
      </div>
    </>
  )
}

export default client;
