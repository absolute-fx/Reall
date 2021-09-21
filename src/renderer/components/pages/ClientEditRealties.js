import React, {useState, useEffect, useContext} from 'react';
import {LicenceContext} from "../../contexts/LicenceContext";
import {UserContext} from "../../contexts/UserContext";
import {FooterLoaderContext} from "../../contexts/FooterLoaderContext";
import axios from "axios";

const clientEditRealties = (props) => {
  const  { onCloseEdit } = props;
  const [client, setClient] = useState({});
  const [realties, setRealties] = useState([]);
  const [error, setError] = useState({});
  const [projects, setProjects] = useState([]);

  const { licence } = useContext(LicenceContext);
  const { user } = useContext(UserContext);
  const { setFooterLoader } = useContext(FooterLoaderContext);

  useEffect(() => {
    setClient(props.client);

  }, [props.client]);

  useEffect(async () => {
    try {
      const res = await getProjects();
      setProjects(res.data.projects);
      const real = res.data.projects.map(project => project.realties);
      setRealties(real.flat());
    } catch(error) {
      setFooterLoader({
        active: true, message: 'Can not reach server', icon: "fa" +
          " fa-exclamation-circle text-danger"
      });
    }
  }, []);

  const getProjects = async () => {
    const apiLink = licence.api_link + 'projects';
    return axios.get(apiLink, { params: { realties: true }, headers: { 'Content-Type': 'application/json', token: user.accessToken }});
  }


  const deleteRealty = async (id) => {
    try {
      setFooterLoader({active: true, message: 'Connecting to API...', icon: "fa fa-spinner brand-color spin"})
      const apiLink = `${licence.api_link}users/realty`;
      await axios.delete(apiLink, {
        data: {
          userId: client.id,
          realtyId: id
        },
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': user.accessToken
        }
      });

      let cl = { ...client };
      cl.realties = cl.realties.filter(r => r.id !== id);
      setClient(cl);
      props.clientChanged(cl);
      setFooterLoader({active: false, message: '', icon: ''});
    } catch (error) {
      setFooterLoader({
        active: true, message: 'Can not reach server', icon: "fa" +
          " fa-exclamation-circle text-danger"
      });
    }
  }

  const addRealty = async (id) => {
    try {
      if (client.realties.find(r => r.id === id)) {
        setError({ realtiesExist: "Le bien est déjà lié au client "});
        throw new Error('150');
      }
      setError({});
      setFooterLoader({active: true, message: 'Connecting to API...', icon: "fa fa-spinner brand-color spin"})
      const apiLink = `${licence.api_link}users/realty`;
      await axios.post(apiLink, {
        userId: client.id,
        realtyId: id
      },{
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': user.accessToken
        }
      });

      let cl = { ...client };
      if (!cl.realties) cl.realties = [];
      cl.realties.push(realties.find(r => r.id === id));
      setClient(cl);
      props.clientChanged(cl);
      // setRealties(realties.filter(r => r.id !== id));
      setFooterLoader({active: false, message: '', icon: ''});
    } catch (error) {
      setFooterLoader({
        active: true, message: 'Can not reach server', icon: "fa" +
          " fa-exclamation-circle text-danger"
      });
    }
  }
  const contractType = ['Location', 'Vente'];

  const onProjectChanged = (event) => {
    if(!event.target.value) {
      const real = projects.map(project => project.realties);
      setRealties(real.flat());
      return;
    }
    const proj = projects.find(p => p.id === Number(event.target.value));
    setRealties(proj.realties);
  }
  return(
    <>
      <div className="row" id="prj-breadcrumb">
        <div className="col">
          <button className="btn-secondary mr-3" onClick={onCloseEdit}><i className="fas fa-angle-left mr-2" />Retour aux clients</button>
        </div>
      </div>
      <div className="row ps-t">
        <div className="col">
          <div className="panel">
            <header>
              <h1 className={'d-inline-block'}>Ajouter un biens</h1>
                <select name="project" id="projects" onChange={onProjectChanged}>
                  <option value={''}>Tous</option>
                  {projects.map(project => (
                    <option key={project.id} value={project.id}>{project.project_title}</option>
                  ))}
                </select>
            </header>
            <div className="panel-separator" />
            <div className={"panel-content"} style={{ height: '330px' }}>
              {error.realtiesExist && <div className={"error-field"}>{error.realtiesExist}</div>}
              <table className="table reall-datatable">
                <thead>
                <tr>
                  <th>Ajouter</th>
                  <th>Libellé</th>
                  <th>Prix</th>
                  <th>Superficie</th>
                  <th>Contrat</th>
                  <th>Acquis</th>
                  <th><span>r</span></th>
                </tr>
                </thead>
                <tbody>
                {realties.map(realty => (
                  <tr key={realty.id}>
                    <th><button className="ml-3" onClick={() => addRealty(realty.id)}><i className="fas fa-plus" /></button></th>
                    <th>{realty.realty_title}</th>
                    <td>{realty.realty_net_price} €</td>
                    <td>{realty.realty_surface} m²</td>
                    <td className="text-center">{contractType[realty.realtycontracttypeId]}</td>
                    <td className="text-center"><i className={realty.realty_status} /></td>
                    <td><i className={realty.realty_active_online? 'fas fa-check brand-color': 'fas fa-check unactive'} /></td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="row ps-t">
        <div className="col">
          <div className="panel">
            <header>
              <h1 className={'d-inline-block'}>Gestion des biens</h1>
            </header>
            <div className="panel-separator" />
            <div className={"panel-content"} style={{ height: '300px'}}>
              <table className="table reall-datatable">
                <thead>
                <tr>
                  <th>Supprimer</th>
                  <th>Libellé</th>
                  <th>Prix</th>
                  <th>Superficie</th>
                  <th>Contrat</th>
                  <th>Acquis</th>
                  <th><span>r</span></th>
                </tr>
                </thead>
                <tbody>
                {client?.realties?.map(realty => (
                <tr key={realty.id}>
                  <th><button className="ml-3" onClick={() => deleteRealty(realty.id)}><i className="fas fa-trash-alt" /></button></th>
                  <th>{realty.realty_title}</th>
                  <td>{realty.realty_net_price} €</td>
                  <td>{realty.realty_surface} m²</td>
                  <td className="text-center">{contractType[realty.realtycontracttypeId]}</td>
                  <td className="text-center"><i className={realty.realty_status} /></td>
                  <td><i className={realty.realty_active_online? 'fas fa-check brand-color': 'fas fa-check unactive'} /></td>
                </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default clientEditRealties;
