const {app, ipcMain, Notification, dialog } = require("electron");
import UpdateWindow from './services/update/update-window';
import MainWindow from './services/main/main-window';
import mainImages from './services/library/MainImages';
const path = require("path");
const promiseIpc =  require('electron-promise-ipc');
const log = require('electron-log');
const fs = require('fs');


ipcMain.on('notify', (_, message)=>{
    console.log(message)
    console.log(Notification.isSupported());
    new Notification({title:'Notification', body: message}).show();
})

promiseIpc.on('getAppVersion', (_)=>{
    return  app.getVersion();
})

promiseIpc.on('setAvatar', (_)=>{
    dialog.showOpenDialog({ properties: ['openFile'] }).then(result => {
        if (result.canceled) {
            console.log("No file selected!")
        } else {
            const filePath = result.filePaths[0];
            //const fileName = path.basename(filePath);
            const destination = path.join(app.getPath('userData'), 'avatar.jpg');
            
            console.log(filePath);
            console.log(destination);
            mainImages.resizeImage(filePath, destination, 'avatar');
        }
    });
})

promiseIpc.on('isAvatarExist', (_) => {
     const file = path.join(app.getPath('userData'), 'avatar.jpg');
   return (fs.existsSync(file)) ? true: false;
    /* fs.access(file, (err) => {
        if (err) {
            console.log('AVATAR NOT EXITS');
            return false;
        } else {
            console.log('AVATAR EXITS');
            return true;
        }
    }) */
})

promiseIpc.on('getAvatar', (_)=> {
    mainImages.getAvatar(path.join(app.getPath('userData'), 'avatar.jpg'));
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