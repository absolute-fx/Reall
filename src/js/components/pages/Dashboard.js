import React, {useContext} from "react";
import {Link, useHistory} from "react-router-dom";
import {UserContext} from "../../contexts/UserContext";
import {FooterLoaderContext} from '../../contexts/FooterLoaderContext';

const Dashboard = (props) => {

    const{ user, setUser} = useContext(UserContext);
    const{ footerLoader, setFooterLoader} = useContext(FooterLoaderContext);
    let history = useHistory();
    if (!user) history.push("/login");
    //console.log(user);
    //console.log(footerLoader);

    return(
        <>
            <h1>Dashboard</h1>
            <p>{user ? "Connecté": "Non connecté"}</p>
            {/*<button className="btn btn-block btn-light btn-sm" onClick={()=>{
                electron.notificationApi.sendNotification('Here we go!')
            }}>Notify OK?</button>*/}
        </>
    )
}

export default Dashboard;