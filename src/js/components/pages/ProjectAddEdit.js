import React, {useState} from 'react';


const ProjectAddEdit = (props) => {
    const mode = props.mode;
    const title = mode === "add" ? "Nouveau projet": "Modifier le projet"
    

    
    return(
        <div className="panel panel-100">
            <header>
                <h1>{title}</h1>
            </header>
            <div className="panel-separator" />
            <div className="panel-content">
                
            </div>
        </div>
    )
}

export default ProjectAddEdit;