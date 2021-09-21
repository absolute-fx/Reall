import React from 'react';

const Datatable = ({onProjectSelected, projects}) => {
    
    const getPercentSold = (realties) => {
        let percent = "";
        const total = realties.length;
        if(total >= 1){
            let totalSold = 0;
            realties.forEach(r => {
                if(r.realty_status === 2) totalSold ++;
            });
            percent = Math.round((totalSold * 100) / total) + "%";
        }else{
            percent = "-"
        }
        return percent;
    }

    const getProjectPage = (project, index) =>{
        onProjectSelected(project, index);
    }

    return (
        <table className="table reall-datatable">
            <thead>
                <tr>
                    <th>Nom</th>
                    <th>Vente</th>
                    <th className="text-center"><span className="reall-table-pin">r</span></th>
                </tr>
            </thead>
            <tbody>
                {projects.map((project, index) => (
                    <tr key={index} onClick={() => getProjectPage(project, index)}>
                        <td>{project.project_title}</td>
                        <td>{getPercentSold(project.realties)}</td>
                        <td className="text-center">
                            <i className={project.project_active_online? 'fas fa-check brand-color': 'fas fa-check unactive'}></i>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Datatable;