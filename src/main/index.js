const {app, ipcMain, Notification} = require("electron");
import UpdateWindow from './services/update/update-window';
const promiseIpc =  require('electron-promise-ipc');
const log = require('electron-log');


ipcMain.on('notify', (_, message)=>{
    console.log(message)
    console.log(Notification.isSupported());
    new Notification({title:'Notification', body: message}).show();
})

promiseIpc.on('getAppVersion', (_)=>{
    return  app.getVersion();
})

promiseIpc.on('getUserDataPath', (_)=>{
    return  app.getPath('userData');
})

app.whenReady().then(() => {
    UpdateWindow.createUpdateWindow();

    require('./events');
});

app.on('window-all-closed', () => {
    log.info('window-all-closed');
});

app.on('before-quit', () => {
    log.info('before-quit');
});