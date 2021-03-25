import { BrowserWindow, Menu, MenuItem } from 'electron';
const log = require('electron-log');

let updateWindow = null;

const updateWinURL = process.env.NODE_ENV === 'development'
    ? `http://localhost:9080#update`
    : `file://${__dirname}/index.html#update`;

function getUpdateWindow () {
    return updateWindow;
}

function createUpdateWindow () {
    destroyUpdateWindow();
    log.info('Create Update Window');

    updateWindow = new BrowserWindow({
        width: 500,
        height: 500,
        frame: false,
        minWidth: 500,
        minHeight: 500,
        icon: "icon.ico",
        //resizable: false,
        show: true,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
        }
    });

    Menu.setApplicationMenu(null);
    updateWindow.setMenuBarVisibility(false);
    updateWindow.loadURL(updateWinURL);
    updateWindow.on('closed', () => {
        log.info('update window closed');
    });
    updateWindow.once('ready-to-show', () => {
        updateWindow.show();
    });

    const ctxMenu = new Menu();
    ctxMenu.append(new MenuItem(
    {
        label: 'Debug',
        click: () => {
            updateWindow.webContents.openDevTools();
        }
    }));

    updateWindow.webContents.on('context-menu', (e, params) => {
        ctxMenu.popup(updateWindow, params.x, params.y)
    });
}

function destroyUpdateWindow () {
    if (!updateWindow) {
        return;
    }
    log.info('destroy Update Window');

    updateWindow.close();
    updateWindow = null;
}

export default {
    getUpdateWindow,
    createUpdateWindow,
    destroyUpdateWindow
};
