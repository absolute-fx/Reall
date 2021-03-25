import { BrowserWindow, Menu, MenuItem } from 'electron';
import {app} from 'electron';
const log = require('electron-log');

let mainWindow = null;

const mainWinURL = process.env.NODE_ENV === 'development'
    ? `http://localhost:9080`
    : `file://${__dirname}/index.html`;

function getMainWindow () {
    return mainWindow;
}

function createMainWindow(){
    destroyMainWindow();
    log.info('Create Main Window');
    mainWindow = new BrowserWindow({
        width: 1550,
        height: 1040,
        minWidth: 1550,
        minHeight: 1060,
        icon: "icon.ico",
        backgroundColor: "white",
        show: true,
        webPreferences:{
            nodeIntegration: true,
            webSecurity: false,
            //worldSafeExecuteJavaScript: true,
            contextIsolation: false
        }
    });
    
    mainWindow.removeMenu();

    const ctxMenu = new Menu();
    ctxMenu.append(new MenuItem(
    {
        label: 'Debug',
        click: () => {
            mainWindow.webContents.openDevTools();
        }
    }));

    mainWindow.webContents.on('context-menu', (e, params) => {
        ctxMenu.popup(mainWindow, params.x, params.y)
    });


    mainWindow.loadURL(mainWinURL);

    mainWindow.on('closed', () => {
        console.log('main window closed');
        app.quit();
    });

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });

}

function destroyMainWindow () {
    if (!mainWindow) {
        return;
    }
    log.info('destroy Main Window');

    mainWindow.close();
    mainWindow = null;
}

export default {
    getMainWindow,
    createMainWindow,
    destroyMainWindow
};
