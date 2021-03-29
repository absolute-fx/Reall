const {app, ipcMain, Notification, dialog, nativeImage } = require("electron");
import UpdateWindow from './services/update/update-window';
import MainWindow from './services/main/main-window';
const fs = require('fs');
const path = require("path");
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

promiseIpc.on('setAvatar', (_)=>{
    dialog.showOpenDialog({ properties: ['openFile'] }).then(result => {
        if (result.canceled) {
            console.log("No file selected!")
        } else {
            const filePath = result.filePaths[0];
            const fileName = path.basename(filePath);
            const imgFolderPath = path.join(app.getPath('userData'), fileName);
            fs.copyFile(filePath, imgFolderPath, (err) => {
                if (err) throw err;
                log.info(fileName + ' uploaded.');
                MainWindow.getMainWindow().webContents.send('avatarChanged', fileName);
                /* setTimeout((e) => {
                    electronImageResize({
                        url: imgFolderPath,
                        width: 512,
                        height: 512
                      }).then(img => {
                        console.log('AFTER RESIZE', imgFolderPath);
                        // save it as a png file
                        writeFileSync(imgFolderPath, img.toJpeg());
                      })
                }), 1000; */
            });
        }
    });
    
})


const resizeImage = (filePath) =>{
    //thumb: 640 480
    // hd: 1280 960
    // fhd: 1920 1440
    const img = nativeImage.createFromPath(filePath);
    const imgSize = img.getSize();
    const imgW = imgSize.width;
    const imgH = imgSize.height;
    // image carrée
    if(imgW === imgH){

    }

    // image horizontale
    if(imgW > imgH){

    }

    // image Verticale
    if(imgW < imgH){

    }
}

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