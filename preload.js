const {ipcRenderer, contextBridge} = require('electron');
const ManageParameters = require('./src/core/ManageParameters');
const  promiseIpc =  require('electron-promise-ipc');


contextBridge.exposeInMainWorld('electron', {
    notificationApi:{
        sendNotification(message) {
            ipcRenderer.send('notify', message)
        }
    },
    desktopFilesApi:{
        getAppRootDir(){
            return __dirname;
        },
        getConfigDir(){
            return "...";
        }
    },
    appDataApi:{
        getAppVersion(){
            //console.log(ipcRenderer.send('getAppVersion'))
            return new Promise((resolve, reject) => {
                promiseIpc.send('getAppVersion').then(data =>{
                    resolve(data);
                })
            });
        }
    },
    parametersApi:{
        getAppParameters(){
            return new Promise ((resolve, reject)=>{
                ManageParameters.getParameters().then(parameters =>{
                    resolve(parameters);
                });
            });
        },
        setAppParams(params){
            return new Promise ((resolve, reject)=>{
                ManageParameters.setParameters(params).then(parameters =>{
                    resolve(parameters);
                });
            });
        }
    }
});