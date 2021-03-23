import React from 'react';

const DatatableRealties = ({onRealtySelected, realties}) => {
	
	const contractType = ['Location', 'Vente'];
    const getRealtyPage = (realty) =>{
        onRealtySelected(realty);
    }

	const isAquired = (status) => {
		let check;
		switch(status){
			case 1 :
				check = 'fas fa-check text-warning';
				break;
			case 2 :
				check = 'fas fa-check brand-color';
				break;
			default:
				check = 'fas fa-check unactive';
		}
		return check;
	}

    return (
        <table className="table reall-datatable">
            <thead>
                <tr>
                    <th>Libellé</th>
                    <th>Prix</th>
                    <th>Superficie</th>
                    <th className="text-center">Contrat</th>
                    <th className="text-center">Acquis</th>
                    <th className="text-center"><span className="reall-table-pin">r</span></th>
                </tr>
            </thead>
            <tbody>
                {realties.map((realty, index) => (
                    <tr key={index} onClick={() => getRealtyPage(relaty)}>
                        <td>{realty.realty_title}</td>
                        <td>{realty.realty_net_price} €</td>
                        <td>{realty.realty_surface} m²</td>
                        <td className="text-center">{contractType[realty.realtycontracttypeId]}</td>
						<td className="text-center"><i className={isAquired(realty.realty_status)}></i></td>
                        <td className="text-center">
                            <i className={realty.realty_active_online? 'fas fa-check brand-color': 'fas fa-check unactive'}></i>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default DatatableRealties;