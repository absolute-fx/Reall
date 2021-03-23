import React, { useEffect } from "react";
const promiseIpc =  require('electron-promise-ipc');
const log = require('electron-log');


const Update = () => {
    useEffect(() => {
        promiseIpc.send('checkForUpdates').then(() => {
        });


        // ipcRenderer.on('getAutoUpdatePercentage', (event, arg) => {
        //     log.info('Renderer getAutoUpdatePercentage', arg);
        //     this.updateLauncherReady = false;
        //     this.downloadPercentage = arg;
        // });
        //
        // ipcRenderer.on('updateDown', () => {
        //     this.downloadPercentage = 0;
        //     this.updateLauncherReady = true;
        //     ipcRenderer.send('quitAndInstallUpdate');
        // });
    },[]);

    return(
        <>
            <div className="sign-in-logo">reall<small className="text-primary">©</small></div>
            <div className={"sign-in-container "}>

                {/*<div className="panel update-status">*/}
                {/*    <div v-if="downloadPercentage" className="download-bar">*/}
                {/*        <div className="info">*/}
                {/*            Téléchargement en cours*/}
                {/*            <div className="wave">*/}
                {/*                <span className="dot"></span>*/}
                {/*                <span className="dot"></span>*/}
                {/*                <span className="dot"></span>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*        <div className="download-progress">*/}
                {/*            <div className="download-progress-value" style="{width: downloadPercentage  + '%'}"></div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*    <div v-else-if="updateLauncherReady">*/}
                {/*        <div className="info">Redémarrage</div>*/}
                {/*        <img className="download-icon-update" alt="finish" src="~@/assets/icons/finish-launcher-update.gif"/>*/}
                {/*    </div>*/}
                {/*    <div v-else>*/}
                {/*        Vérification de mise à jour*/}
                {/*        <div className="wave">*/}
                {/*            <span className="dot"></span>*/}
                {/*            <span className="dot"></span>*/}
                {/*            <span className="dot"></span>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        </>
    )
}

export default Update;