import React from 'react';

const Realty = (props) => {

    return(
        <>
            <div className="row h-100">
                <div className="col-md-12" id="realtyList">
                    <div className="panel panel-100" id="projectsList">
                        <header>
                            <h1 className="d-inline-block">Biens<button className="ml-3">+</button></h1>
                            
                            <div className="float-right">
                                <input type="text" placeholder=""/>
                            </div>
                        </header>
                        <div className="panel-separator" />
                        <div className="panel-content">
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default Realty