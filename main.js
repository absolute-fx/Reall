const {app, BrowserWindow, ipcMain, Notification} = require("electron");
const path = require('path');
const  promiseIpc =  require('electron-promise-ipc');
const isDev = !app.isPackaged;
const RCkMenu = require("electron").Menu;
const RCMenuItems = require("electron").MenuItem;
const autoUpdater = require('./src/core/AutoUpdate').autoUpdate;

let win;
let aU;

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

    //aU = new autoUpdater(win);

    win.loadFile('index.html');
    win.removeMenu();


    const ctxMenu = new RCkMenu();
    ctxMenu.append(new RCMenuItems(
        {
        label: 'Debug',
        click: () => {
            win.webContents.openDevTools();
        }
    }));
    ctxMenu.append(new RCMenuItems(
        {
            label: 'Add realty',
            click: () => {
                console.log('hello world II')
            }
        }));

    ctxMenu.append(new RCMenuItems(
        {
            label: win.webContents.getURL()
        }));

    win.webContents.on('context-menu', (e, params) => {
        ctxMenu.popup(win, params.x, params.y)
    });

    if(!isDev) {
        //win.webContents.openDevTools();
        //aU.autoUpdater.checkForUpdates();
    }


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