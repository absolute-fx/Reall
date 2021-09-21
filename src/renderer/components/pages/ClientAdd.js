import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {LicenceContext} from "../../contexts/LicenceContext";
import {FooterLoaderContext} from "../../contexts/FooterLoaderContext";
import {UserContext} from "../../contexts/UserContext";

const ClientAdd = (props) => {
  const { onClose, onCreatedClient } = props;

  const [client, setClient] = useState({ role: 2 });
  const [realties, setRealties] = useState([]);
  const [error, setError] = useState({});
  const [projects, setProjects] = useState([]);

  const { licence } = useContext(LicenceContext);
  const { user } = useContext(UserContext);
  const { setFooterLoader } = useContext(FooterLoaderContext);

  useEffect(async () => {
    const res = await getProjects();
    setProjects(res.data.projects);
  }, []);

  const onChange = (event) => {
    setClient({ ...client, [event.target.name]: event.target.value });
  }

  /**
   * Check if the required fields are filled
   * @param client
   * @returns {boolean}
   */
  const checkRequiredField= (client) => {
    const errors = {};
    let isError = false;

    if (!client.firstname?.length) {
      errors.firstname = 'Prénom obligatoire';
      isError = true;
    }

    if (!client.lastname?.length) {
      errors.lastname = 'Nom obligatoire';
      isError = true;
    }

    if (!client.email?.length) {
      errors.email = 'Email obligatoire';
      isError = true;
    }

    if (!client.username?.length) {
      errors.username = 'Username obligatoire';
      isError = true;
    }

    if (!client.password || !(/^.{2,255}$/.test(client.password))) {
      errors.password = 'Mot de passe obligatoire';
      isError = true;
    }

    if (client.password !== client.passwordConfirm) {
      errors.passwordConfirm = 'Les mot de passe doivent correspondre';
      isError = true;
    }

    setError(errors);
    return isError;
  }

  const getProjects = async () => {
    const apiLink = licence.api_link + 'projects';
    return axios.get(apiLink, { params: { realties: true }, headers: { 'Content-Type': 'application/json', token: user.accessToken }});
  };

  const submit = async () => {
    try {
      if (checkRequiredField(client)) {
        throw new Error('Errors occurred');
      }

      const data = {...client};
      setFooterLoader({active: true, message: 'Connecting to API...', icon: "fa fa-spinner brand-color spin"})
      const apiLink = licence.api_link + 'users';
      delete data.passwordConfirm;
      const req = await axios.post(apiLink, data,{ headers: { 'Content-Type': 'application/json'}});
      setFooterLoader({active: false, message: '', icon:''});
      onCreatedClient(req.data);
      setClient({ role: 2, realties: '' });
      onClose();
    } catch (err) {
      setFooterLoader({active: true, message: 'Can not reach the server', icon: "fa fa-exclamation-circle" +
          " text-danger"});
    }
  }

  // return to client list (Like a cancel button)
  const backFromClient = () => {
    setClient({ role: 2, realties: ''});
    onClose();
  }

  const onProjectChanged = (event) => {
    const project = projects.find(p => p.id == event.target.value);
    setRealties(project.realties)
  }
  return (
    <>
      <div className="row" id="prj-breadcrumb">
        <div className="col">
          <button className="btn-secondary mr-3" onClick={backFromClient}><i className="fas fa-angle-left mr-2" />Retour aux clients</button>
        </div>
      </div>
      <div className={'panel ps-t'}>
        <header>
          <h1>Créer un client</h1>
        </header>
        <div className="panel-separator" />
        <div className="panel-content">
          <form action="" id="clientForm">
            <div className="container-fluid">
              <div className="row">
                <div className="form-group col-md-6">
                  <label htmlFor="firstname">Prénom </label>{error && error.firstname && <span className={'error-field'}>{ error.firstname}</span>}
                  <input
                    type={'text'}
                    className={'form-control form-control-sm'}
                    name={'firstname'}
                    id={'firstname'}
                    value={client.firstname || ''}
                    onChange={(event) => onChange(event)}
                    required={true}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="lastname">Nom </label>{error && error.lastname && <span className={'error-field'}>{ error.lastname}</span>}
                  <input
                    type={"text"}
                    className={'form-control form-control-sm'}
                    name={'lastname'}
                    id={'lastname'}
                    value={client.lastname || ''}
                    onChange={(event) => onChange(event)}
                    required={true}
                  />
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-6">
                  <label htmlFor="email">Email </label>{error && error.email && <span className={'error-field'}>{ error.email}</span>}
                  <input
                    type={'email'}
                    className={'form-control form-control-sm'}
                    name={'email'}
                    id={'email'}
                    value={client.email || ''}
                    onChange={(event) => onChange(event)}
                    required={true}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="username">Username</label>{error && error.username && <span className={'error-field'}>{ error.username}</span>}
                  <input
                    type={'text'}
                    className={'form-control form-control-sm'}
                    name={'username'}
                    id={'username'}
                    value={client.username || ''}
                    onChange={(event) => onChange(event)}
                    required={true}
                  />
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-4">
                  <label htmlFor="mobile">Mobile 1</label>
                  <input
                    type={'text'}
                    className={'form-control form-control-sm'}
                    name={'mobile'}
                    id={'mobile'}
                    value={client.mobile || ''}
                    onChange={(event) => onChange(event)}
                  />
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="mobile2">Mobile 2</label>
                  <input
                    type={'text'}
                    className={'form-control form-control-sm'}
                    name={'mobile2'}
                    id={'mobile2'}
                    value={client.mobile2 || ''}
                    onChange={(event) => onChange(event)}
                  />
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="phone">Téléphone du client</label>
                  <input
                    type={'text'}
                    className={'form-control form-control-sm'}
                    name={'phone'}
                    id={'phone'}
                    value={client.phone || ''}
                    onChange={(event) => onChange(event)}
                  />
                </div>
              </div>
              <div className="row">
                {error && error.password && <span className="col-md-12 error-field">{ error.password}</span>}
                {error && error.passwordConfirm && <span className="col-md-12 error-field">{ error.passwordConfirm}</span>}
                <div className="form-group col-md-6">
                  <label htmlFor="password">Mot de passe</label>
                  <input
                    type={'password'}
                    className={'form-control form-control-sm'}
                    name={'password'}
                    id={'password'}
                    value={client.password || ''}
                    onChange={(event) => onChange(event)}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="passwordConfirm">Confirmation du mot de passe</label>
                  <input
                    type={'password'}
                    className={'form-control form-control-sm'}
                    name={'passwordConfirm'}
                    id={'passwordConfirm'}
                    value={client.passwordConfirm || ''}
                    onChange={(event) => onChange(event)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-3">
                  <label htmlFor="address">Adresse</label>
                  <input
                    type={'text'}
                    className={'form-control form-control-sm'}
                    name={'address'}
                    id={'address'}
                    value={client.address || ''}
                    onChange={(event) => onChange(event)}
                  />
                </div>
                <div className="form-group col-md-3">
                  <label htmlFor="city">Ville</label>
                  <input
                    type={'text'}
                    className={'form-control form-control-sm'}
                    name={'city'}
                    id={'city'}
                    value={client.city || ''}
                    onChange={(event) => onChange(event)}
                  />
                </div>
                <div className="form-group col-md-3">
                  <label htmlFor="pc">PC</label>
                  <input
                    type={'text'}
                    className={'form-control form-control-sm'}
                    name={'pc'}
                    id={'pc'}
                    value={client.pc || ''}
                    onChange={(event) => onChange(event)}
                  />
                </div>
                <div className="form-group col-md-3">
                  <label htmlFor="country_code">Code pays</label>
                  <input
                    type={'text'}
                    className={'form-control form-control-sm'}
                    name={'country_code'}
                    id={'country_code'}
                    value={client.country_code || ''}
                    onChange={(event) => onChange(event)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-12">
                  <label>Ajouter un bien au client</label>
                  <select name="project" id="projects" onChange={onProjectChanged}>
                    <option value={''} />
                    {projects.map(project => (
                      <option key={project.id} value={project.id}>{project.project_title}</option>
                    ))}
                  </select>
                  <select name="realties" onChange={(event) => onChange(event)} id="realties">
                    <option value={''} />
                    {realties.map((realty) => <option key={realty.id} value={realty.id}>{realty.realty_title}</option>)}
                  </select>
                </div>
              </div>
              <div className="panel-separator" />
              <div className="row ps-t">
                <div className="form-group col-md-6">
                  <label htmlFor="company_name">Société</label>{error && error.company_name && <span className={'error-field'}>{ error.company_name}</span>}
                  <input
                    type={'text'}
                    className={'form-control form-control-sm'}
                    name={'company_name'}
                    id={'company_name'}
                    value={client.company_name || ''}
                    onChange={(event) => onChange(event)}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="company_vat">VAT</label>{error && error.company_vat && <span className={'error-field'}>{ error.company_vat}</span>}
                  <input
                    type={'text'}
                    className={'form-control form-control-sm'}
                    name={'company_vat'}
                    id={'company_vat'}
                    value={client.company_vat || ''}
                    onChange={(event) => onChange(event)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-3">
                  <label htmlFor="company_address">Adresse</label>{error && error.company_address && <span className={'error-field'}>{ error.company_address}</span>}
                  <input
                    type={'text'}
                    className={'form-control form-control-sm'}
                    name={'company_address'}
                    id={'company_address'}
                    value={client.company_address || ''}
                    onChange={(event) => onChange(event)}
                  />
                </div>
                <div className="form-group col-md-3">
                  <label htmlFor="company_city">Ville</label>{error && error.company_city && <span className={'error-field'}>{ error.company_city}</span>}
                  <input
                    type={'text'}
                    className={'form-control form-control-sm'}
                    name={'company_city'}
                    id={'company_city'}
                    value={client.company_city || ''}
                    onChange={(event) => onChange(event)}
                  />
                </div>
                <div className="form-group col-md-3">
                  <label htmlFor="company_pc">PC</label>{error && error.company_pc && <span className={'error-field'}>{ error.company_pc}</span>}
                  <input
                    type={'text'}
                    className={'form-control form-control-sm'}
                    name={'company_pc'}
                    id={'company_pc'}
                    value={client.company_pc || ''}
                    onChange={(event) => onChange(event)}
                  />
                </div>
                <div className="form-group col-md-3">
                  <label htmlFor="company_country_code">Code pays</label>{error && error.company_country_code && <span className={'error-field'}>{ error.company_country_code}</span>}
                  <input
                    type={'text'}
                    className={'form-control form-control-sm'}
                    name={'company_country_code'}
                    id={'company_country_code'}
                    value={client.company_country_code || ''}
                    onChange={(event) => onChange(event)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-12 mt-3">
                  <button type="button" className="btn btn-primary float-right" onClick={submit}>Créer</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default ClientAdd;
