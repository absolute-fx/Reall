import React, {useState, useEffect, useContext} from 'react';
import {LicenceContext} from "../../contexts/LicenceContext";
import {FooterLoaderContext} from "../../contexts/FooterLoaderContext";
import axios from "axios";
import {UserContext} from "../../contexts/UserContext";

const ClientEdit = (props) => {
  const { onCloseEdit } = props;
  const [client, setClientUp] = useState(props.client);
  const [error, setError] = useState({});
  const btn = 'Modifier le client';
  const { licence } = useContext(LicenceContext);
  const { setFooterLoader } = useContext(FooterLoaderContext);
  const { user } = useContext(UserContext);

  const onChange = (event) => {
    setClientUp({ ...client, [event.target.name]: event.target.value });
  }

  useEffect(() => {
    props.onChange(client);
  }, [client]);

  useEffect(() => {
    setClientUp(props.client);
  }, [props.client]);


  const onBlur = async () => {
    try {
      setFooterLoader({active: true, message: 'Connecting to API...', icon: "fa fa-spinner brand-color spin"})
      const apiLink = `${licence.api_link}users/${client.id}`;
      await axios.put(apiLink, client,{ headers: { 'Content-Type': 'application/json', 'x-access-token': user.accessToken }});
      setFooterLoader({active: false, message: '', icon:''});
    } catch (error) {
      setFooterLoader({ active: true, message: 'Can not reach server', icon: "fa" +
          " fa-exclamation-circle text-danger"});
    }
  };

  const closeForm = () => {
    onCloseEdit();
  }

  return (
    <>
      <div className="row" id="prj-breadcrumb">
        <div className="col">
          <button className="btn-secondary mr-3" onClick={onCloseEdit}><i className="fas fa-angle-left mr-2" />Retour aux clients</button>
        </div>
      </div>
      <div className={'panel ps-t'}>
        <header>
          <h1>{btn}</h1>
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
                    onBlur={onBlur}
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
                    onBlur={onBlur}
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
                    onBlur={onBlur}
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
                    onBlur={onBlur}
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
                    onBlur={onBlur}
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
                    onBlur={onBlur}
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
                    onBlur={onBlur}
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
                    value={''}
                    onChange={(event) => onChange(event)}
                    onBlur={onBlur}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="passwordConfirm">Confirmation du mot de passe</label>
                  <input
                    type={'password'}
                    className={'form-control form-control-sm'}
                    name={'passwordConfirm'}
                    id={'passwordConfirm'}
                    value={''}
                    onChange={(event) => onChange(event)}
                    onBlur={onBlur}
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
                    onBlur={onBlur}
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
                    onBlur={onBlur}
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
                    onBlur={onBlur}
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
                    onBlur={onBlur}
                  />
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
                    onBlur={onBlur}
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
                    onBlur={onBlur}
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
                    onBlur={onBlur}
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
                    onBlur={onBlur}
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
                    onBlur={onBlur}
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
                    onChange={(event) => onChange(event)}onBlur={onBlur}

                  />
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-12 mt-3">
                  <button type="button" className="btn btn-primary float-right" onClick={closeForm}>Modifier</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default ClientEdit;
