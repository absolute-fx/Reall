import React, {useContext} from "react";
import {FooterLoaderContext} from '../contexts/FooterLoaderContext';

const Footer = (props) => {

    const{ footerLoader, setFooterLoader} = useContext(FooterLoaderContext);

    return (
        <>
            <footer className="footer-right">
                <div className={`container-fluid ${!footerLoader.active? "d-none": ""}`}>
                    <small id="footer-dialog" className="float-right"><span className="fa fa-spinner"/>{footerLoader.message}</small>
                </div>
            </footer>
            <footer className="footer-left">
                <div className="container-fluid">
                    <span className="text-muted">Reall Engine© {props.appVersion}</span>
                </div>
            </footer>
        </>
    )
}

export default Footer;