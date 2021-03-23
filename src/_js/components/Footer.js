import React, {useContext, useEffect, useState} from "react";
import {FooterLoaderContext} from '../contexts/FooterLoaderContext';
import {LicenceContext} from "../contexts/LicenceContext";
import moment from 'moment';

const Footer = (props) => {

    const { footerLoader, setFooterLoader} = useContext(FooterLoaderContext);
    const { licence, setLicence} = useContext(LicenceContext);
    const [footerInfos, setFooterInfos] = useState('');

    useEffect(() => {
        if(licence){
            const licTiming = moment(licence.end_date).fromNow();
            setFooterInfos(' - ' + licence.licence_type + ' licence ending ' + licTiming + ' - ' + licence.company_holder);
        }
    }, [licence])

    return (
        <>
            <footer className="footer-right">
                <div className={`container-fluid ${!footerLoader.active? "d-none": ""}`}>
                    <small id="footer-dialog" className="float-right pr-3"><span className={footerLoader.icon}/>{footerLoader.message}</small>
                </div>
            </footer>
            <footer className="footer-left">
                <div className="container-fluid">
                    <span className="text-muted brand-font pl-3">
                        reall Engine© {props.appVersion} {footerInfos}
                    </span>
                </div>
            </footer>
        </>
    )
}

export default Footer;