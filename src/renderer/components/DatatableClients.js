import React from 'react';

const DatatableClients = ({onClientSelected, clients}) => {
    const getClientPage = (client, index) =>{
      onClientSelected(client, index);
    }

    return (
        <table className="table reall-datatable">
            <thead>
                <tr>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>mail</th>
                    <th>Tel</th>
                    <th>Mobile 1</th>
                    <th>Mobile 2</th>
                </tr>
            </thead>
            <tbody>
                {clients.map((client, index) => (
                    <tr key={index} onClick={() => getClientPage(client, index)}>
                        <td>{client.firstname}</td>
                        <td>{client.lastname}</td>
                        <td>{client.email}</td>
                        <td>{client.phone}</td>
                        <td>{client.mobile}</td>
                        <td>{client.mobile2}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default DatatableClients;