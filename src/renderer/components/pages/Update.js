import electronPackager from "electron-packager";
import React, { useState ,useEffect } from "react";
import ProgressBar from "../ProgressBar";
import {ipcRenderer} from "electron";

const promiseIpc =  require('electron-promise-ipc');
const log = require('electron-log');


const Update = () => {

    const [progress, setProgress] = useState(0);
    const [updateMessage, setUpdateMessage] = useState('Checking for update...');
    //const [launcherRady, setLauncherRady] = useState(false);
    const [progressVisibility, setProgressVisibility] = useState('d-none');

    useEffect(() => {
        setTimeout(function(){ 
            promiseIpc.send('checkForUpdates').then(() => {}); 
        }, 2000);

        ipcRenderer.on('getAutoUpdatePercentage', (event, arg) => {
            //log.info('Renderer getAutoUpdatePercentage', Math.round(arg));
            setUpdateMessage("We have cooked some new cool stuffs for you!<br/><small>Downloading the new version of reall©...</small>");
            setProgressVisibility('');
            setProgress(Math.round(arg));
        });

        ipcRenderer.on('updateDown', () => {
            setProgress(100);
            //setLauncherRady(true);
            setUpdateMessage("Restarting and install...");
            ipcRenderer.send('quitAndInstallUpdate');
        });

    },[]);

    return(
        <>
            <div className="update-logo">reall<small className="text-primary">©</small></div>
            <div className="update-container">
                <p id="message" className="mt-5 text-center" dangerouslySetInnerHTML={{__html: updateMessage}}></p>
                <div className={progressVisibility}>
                    <ProgressBar done={progress} />
                </div>
                <div className="wave">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                </div>
            </div>
        </>
    )
}

export default Update;