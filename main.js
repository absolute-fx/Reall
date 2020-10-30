const {app, BrowserWindow, ipcMain, Notification} = require("electron");
const path = require('path');
const  promiseIpc =  require('electron-promise-ipc');
const isDev = !app.isPackaged;

let win;

function createWindow(){
    win = new BrowserWindow({
        width: 1400,
        height: 960,
        minWidth: 1200,
        minHeight: 960,
        backgroundColor: "white",
        webPreferences:{
            nodeIntegration: false,
            worldSafeExecuteJavaScript: true,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    })
    win.loadFile('index.html');
    win.removeMenu();
    if(isDev) {
        win.webContents.openDevTools();
    }

    //console.log(app.getVersion());

    /*
    // Marche pas :(
    const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');

    installExtension(REACT_DEVELOPER_TOOLS).then((name) => {
        console.log(`Added Extension:  ${name}`);
    }).catch((err) => {
            console.log('An error occurred: ', err);
        });
     */
    //console.log("URL: " + win.webContents.getURL());
}
if(isDev){
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
    })
}

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

app.whenReady().then(createWindow);