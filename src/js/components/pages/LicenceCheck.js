import React, {useContext, useEffect, useState} from "react";
import {FooterLoaderContext} from "../../contexts/FooterLoaderContext";
import {AppParamsContext} from "../../contexts/AppParamsContext";
import {LicenceContext} from "../../contexts/LicenceContext";
import {useHistory} from "react-router-dom";

const LicenceCheck = () => {

    const {appParams, setAppParams} = useContext(AppParamsContext)
    const {footerLoader, setFooterLoader} = useContext(FooterLoaderContext);
    const {licence, setLicence} = useContext(LicenceContext)
    let history = useHistory();

    const [licenceKey, setLicenceKey] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [displayForm, setDisplayForm] = useState('d-none')

    const onChange = (e) => {
        setLicenceKey(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if(licenceKey !== ""){
            setFooterLoader({active: true, message: 'Checking licence...'});
            setLoading(true);
            // TEMP
            setLicence({valid: true, licence_key: e.target.value, licence_type: "full", company_holder: "AfxLab", end_date: "2021-12-10 00:00:00", api_link: "https://imoges-api.herokuapp.com/api/"});
            saveParams().then(() => {
                setFooterLoader({active: false, message: ''});
                history.push("/params");
            });
        }
    }

    const saveParams = async () =>{
        await electron.parametersApi.setAppParams([{node: "user.licence_key", value:licenceKey}]);
    }

    useEffect(() => {
        setFooterLoader({active: true, message: 'Checking licence...'});
    }, [])

    useEffect(() => {
        if(appParams)
        {
            if(appParams.user.licence_key !== ""){
                // SI CLE
                // TEMP (check de la licence à faire)
                setLicence({valid: true, licence_key: appParams.user.licence_key, licence_type: "full", company_holder: "AfxLab", end_date: "2021-12-10 00:00:00", api_link: "https://imoges-api.herokuapp.com/api/"});
                setFooterLoader({active: false, message: ''});
                history.push("/params");
            }else{
                setDisplayForm('');
                setFooterLoader({active: false, message: ''});
            }
        }
    }, [appParams])

    return(
        <>
            <div className="sign-in-logo">reall<small className="text-primary">©</small></div>
            <div className={"sign-in-container " + displayForm}>
                <div className="panel sign-in-panel">
                    <div className="row">
                        <div className="col mb-3">
                            <p className="text-center">Veuillez introduire votre clé de licence <span className="brand-font brand-color">reallEngine©</span></p>
                        </div>
                    </div>
                    <form onSubmit={onSubmit}>
                        <div className="row">
                            <div className="col-md-9">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="LICENCE KEY"
                                        value={licenceKey}
                                        name="licencekey"
                                        onChange={onChange}
                                    />
                                    <small id="passwordHelpInline" className="text-muted">
                                        ex: XXX_XXXXX_XXXXXXXXXX_XXXX
                                    </small>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <button disabled={isLoading} type="submit" className="btn btn-sm btn-primary connect-btn">SAVE</button>
                            </div>
                        </div>
                    </form>
                    <footer>
                        Real Estate managing tools & services
                    </footer>
                </div>
            </div>
        </>
    )
}

export default LicenceCheck;