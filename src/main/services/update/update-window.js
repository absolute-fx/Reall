import { BrowserWindow, Menu } from 'electron';
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
        width: 1550,
        height: 1040,
        minWidth: 1550,
        minHeight: 1060,
        resizable: false,
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
