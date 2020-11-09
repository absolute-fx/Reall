import React, {useContext, useEffect, useState} from "react";
import {useTranslation} from "react-multi-lang";
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
            setFooterLoader({active: true, message: 'Checking licence...', icon: "fa fa-spinner brand-color spin"});
            setLoading(true);
            // TEMP
            setLicence({
                valid: true, 
                licence_key: e.target.value, 
                licence_type: "full", 
                company_holder: "AfxLab", 
                end_date: "2021-12-10 00:00:00", 
                //api_link: "https://imoges-api.herokuapp.com/api/"}
                api_link: "http://127.0.0.1:4000/api/"}
            );
            saveParams().then(() => {
                setFooterLoader({active: false, message: '', icon: ''});
                history.push("/params");
            });
        }
    }

    const saveParams = async () =>{
        await electron.parametersApi.setAppParams([{node: "user.licence_key", value:licenceKey}]);
    }

    useEffect(() => {
        setFooterLoader({active: true, message: 'Checking licence...', icon: "fa fa-spinner brand-color spin"});
    }, [])

    useEffect(() => {
        if(appParams)
        {
            if(appParams.user.licence_key !== ""){
                // SI CLE
                // TEMP (check de la licence à faire)
                setLicence({
                    valid: true, 
                    licence_key: appParams.user.licence_key, 
                    licence_type: "Full", 
                    company_holder: "AfxLab", 
                    end_date: "2021-06-10 00:00:00", 
                    //api_link: "https://imoges-api.herokuapp.com/api/"}
                    api_link: "http://127.0.0.1:4000/api/"}
                );
                setFooterLoader({active: false, message: '', icon:''});
                history.push("/params");
            }else{
                setDisplayForm('');
                setFooterLoader({active: false, message: '', icon: ''});
            }
        }
    }, [appParams])

    const t = useTranslation();

    return(
        <>
            <div className="sign-in-logo">reall<small className="text-primary">©</small></div>
            <div className={"sign-in-container " + displayForm}>
                <div className="panel sign-in-panel">
                    <div className="row">
                        <div className="col mb-3">
                            <p className="text-center">
                                {t('licence_check.insert_key_message_a')} <span className="brand-font brand-color">reallEngine©</span> {t('licence_check.insert_key_message_b')}
                            </p>
                        </div>
                    </div>
                    <form onSubmit={onSubmit}>
                        <div className="row">
                            <div className="col-md-9">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder={t('licence_check.licence_key')}
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
                                <button disabled={isLoading} type="submit" className="btn btn-sm btn-primary connect-btn">{t('licence_check.save')}</button>
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