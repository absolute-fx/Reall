import React, {useEffect, useState} from 'react';

const RealtyAddEdit = (props) => {
    const mode = props.mode;
    const [realty, setRealty ] = useState(props.realty);
    const title = mode === "add" ? "Nouveau Bien": "Modifier le bien";
    const btnLabel = mode === "add" ? "Créer" : "Fermer";

    const onChange = (e) =>{
        setRealty({...props.realty, [e.target.name]:e.target.value});
    }

    useEffect(() => {
        //console.log("REALTY FROM PROPS", realty);
        //setRealty(props.realty);
    },[props.realty]);

    useEffect(() => {
        props.onChange(realty);
    },[realty]);


    const backToJproject  = () => {
        console.log('CANCEL');
    }

    const onClick = () => {
        props.onClose();
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
                                    <label htmlFor="realtyName">Référence</label>
                                    <input type="text" className="form-control form-control-sm" 
                                        name="realty_title" 
                                        id="realtyName" 
                                        placeholder="Référence" 
                                        value={props.realty.realty_title || ''}
                                        onChange={onChange}
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="realtyPrice">Prix net</label>
                                    <input type="text" className="form-control form-control-sm" 
                                        name="realty_net_price" 
                                        id="realtyPrice" 
                                        placeholder="Prix net" 
                                        value={props.realty.realty_net_price || ''}
                                        onChange={onChange}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-md-12 mt-3">
                                    <button type="button" className="btn btn-primary float-right" onClick={onClick}>{btnLabel} </button>
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