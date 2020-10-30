import React, {useContext} from "react";
import {FooterLoaderContext} from '../contexts/FooterLoaderContext';
import {LicenceContext} from "../contexts/LicenceContext";

const Footer = (props) => {

    const{ footerLoader, setFooterLoader} = useContext(FooterLoaderContext);
    const{ licence, setLicence} = useContext(LicenceContext);

    return (
        <>
            <footer className="footer-right">
                <div className={`container-fluid ${!footerLoader.active? "d-none": ""}`}>
                    <small id="footer-dialog" className="float-right"><span className="fa fa-spinner brand-color"/>{footerLoader.message}</small>
                </div>
            </footer>
            <footer className="footer-left">
                <div className="container-fluid">
                    <span className="text-muted brand-font">reall Engine© {props.appVersion} {(licence) ?' - Licencied to ' + licence.company_holder : ''}</span>
                </div>
            </footer>
        </>
    )
}

export default Footer;