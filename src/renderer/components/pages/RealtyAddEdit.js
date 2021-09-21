import React, {useContext, useEffect, useState} from 'react';
import { LicenceContext } from "../../contexts/LicenceContext";
import { UserContext } from "../../contexts/UserContext";
import { FooterLoaderContext } from "../../contexts/FooterLoaderContext";
import axios from "axios";

const RealtyAddEdit = (props) => {
  const { mode, project } = props;
  const title = mode === "add" ? "Nouveau Bien": "Modifier le bien";
  const btnLabel = mode === "add" ? "Créer" : "Fermer";
  const [realty, setRealty ] = useState({});
  const [error, setError] = useState({});

  const { licence } = useContext(LicenceContext);
  const { user } = useContext(UserContext);
  const { setFooterLoader } = useContext(FooterLoaderContext);

  const onChange = (e) => {
    setRealty({...realty, [e.target.name]:e.target.value});
  }

  useEffect(() => {
    setRealty(props.realty);
  },[props.realty]);

  useEffect(() => {
    if (mode === 'edit') props.onChange(realty);
  },[realty]);


  const closeForm = () => {
    props.onClose();
  }

  const checkRequiredFields = (realty) => {
    const errors = {};
    let isError = false;
    if (!realty.realty_title?.length) {
      errors.realty_title = "Référence obligatoire";
      isError = true;
    }
    setError(errors);
    return isError;
  }

  const onBlur = async () => {
    if (mode === 'edit') {
      try {
        if (checkRequiredFields(realty)) {
          throw new Error('Missing fields');
        }
        setFooterLoader({active: true, message: 'Connecting to API...', icon: "fa fa-spinner brand-color spin"})
        const apiLink = licence.api_link + 'realties/' + realty.id;
        const req = await axios.put(apiLink, realty,{ headers: { 'Content-Type': 'application/json', 'x-access-token': user.accessToken }});
        setFooterLoader({active: false, message: '', icon:''});
      } catch (err) {
        setFooterLoader({active: true, message: 'Can not reach the server', icon: "fa fa-exclamation-circle" +
            " text-danger"});
      }
    }
  }

  const submit = async (event) => {
    event.preventDefault();
    if (mode === 'add') {
      try {
        if (checkRequiredFields(realty)) {
          throw new Error('Missing fields');
        }
        setFooterLoader({active: true, message: 'Connecting to API...', icon: "fa fa-spinner brand-color spin"})
        const apiLink = licence.api_link + 'realties/' + project.id;
        const req = await axios.post(apiLink, realty,{ headers: { 'Content-Type': 'application/json', 'x-access-token': user.accessToken }});

        project.realties.push(realty);
        props.onProjectChanged(project);
        setFooterLoader({active: false, message: '', icon:''});
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
    <>
      <div className="panel">
        <header>
          <h1>{title}</h1>
        </header>
        <div className="panel-separator" />
        <div className="panel-content">
          <form id="realtyForm" action="">
            <div className="container-fluid">
              <div className="row">
                <input type="hidden" name="index" id="realtyIndex"/>
                <div className="form-group col-md-6">
                  <label htmlFor="realtyName">Référence</label>{error.realty_title && <span className={'error-field'}>{ error.realty_title}</span>}
                  <input type="text" className="form-control form-control-sm"
                         name="realty_title"
                         id="realtyName"
                         placeholder="Référence"
                         value={realty.realty_title || ''}
                         onChange={onChange}
                         onBlur={onBlur}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="realtyPrice">Prix net</label>
                  <input type="text" className="form-control form-control-sm"
                         name="realty_net_price"
                         id="realtyPrice"
                         placeholder="Prix net"
                         value={realty.realty_net_price || ""}
                         onChange={onChange}
                         onBlur={onBlur}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="realty_surface">Superficie</label>
                  <input type="text" className="form-control form-control-sm"
                         name="realty_surface"
                         id="realty_surface"
                         placeholder="Prix net"
                         value={realty.realty_surface || ""}
                         onChange={onChange}
                         onBlur={onBlur}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="realtycontracttypeId">Type de contrat</label>
                  <select onChange={onChange} className="form-control form-control-sm" onBlur={onBlur} value={realty.realtycontracttypeId || ""} name="realtycontracttypeId" id="realtycontracttypeId">
                    <option value=""></option>
                    <option value={1}>Vente</option>
                    <option value={2}>Location</option>
                  </select>
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="realty_status">Status</label>
                  <select name="realty_status" value={realty.realty_status || ""} className="form-control form-control-sm" onChange={onChange} onBlur={onBlur} id="realty_status">
                    <option value={""}></option>
                    <option value={0}>Libre</option>
                    <option value={1}>Compromis</option>
                    <option value={2}>Acte</option>
                  </select>
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="realty_vat">TVA</label>
                  <input type={"text"} name="realty_vat" value={realty.realty_vat || ""} className="form-control form-control-sm" onChange={onChange} onBlur={onBlur} id="realty_vat" />
                </div>
                <div className="form-group col-md-12">
                  <label htmlFor="realty_long_description">Description</label>
                  <textarea rows={5} name="realty_long_description" value={realty.realty_long_description || ""} className="form-control form-control-sm" onChange={onChange} onBlur={onBlur} id="realty_long_description" />
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-12 mt-3">
                  <button type="button" className="btn btn-primary float-right" onClick={submit}>{btnLabel} </button>
                  { mode === "add" && <button type="button" className="btn float-right" onClick={closeForm}>Annuler</button>}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default RealtyAddEdit;