import { app, ipcMain } from 'electron';
const promiseIpc =  require('electron-promise-ipc');
import UpdateWindow from '.././services/update/update-window';
import UpdateService from '.././services/update/update-service';
import MainWindow from '.././services/main/main-window';
import ManageWindow from '../services/manage-window';

const { autoUpdater } = require('electron-updater');
const log = require('electron-log');

promiseIpc.on('checkForUpdates', () => {
    log.info('checkForUpdates ipcMain');

    if (process.env.NODE_ENV === 'development' && UpdateWindow.getUpdateWindow() !== null) {
        ManageWindow.createWindow();
    } else {
        UpdateService.checkForUpdates();
    }
});

ipcMain.on('quitAndInstallUpdate', () => {
    log.info('quitAndInstallUpdate');
    app.quitting = true;
    autoUpdater.quitAndInstall();
});

autoUpdater.on('error', err => {
    // @TODO this case
    if (process.env.NODE_ENV === 'development' && err.code === 'ENOENT') {
        return;
    }
    log.info('autoUpdater error ', err);
    if (UpdateWindow.getUpdateWindow() !== null) {
        UpdateWindow.destroyUpdateWindow();
    }
});

autoUpdater.on('update-available', () => {
    log.info('update-available');
    if (UpdateWindow.getUpdateWindow() != null) {
        log.info('update-available-upd');
        UpdateWindow.getUpdateWindow().webContents.send('getAutoUpdatePercentage', 0);
    }
});

autoUpdater.on('update-not-available', () => {
    log.info('update-not-available');
    if (MainWindow.getMainWindow() == null) {
        ManageWindow.createWindow();
    }
});

autoUpdater.on('download-progress', progress => {
    log.info('download-progress');
    if (UpdateWindow.getUpdateWindow() != null) {
        log.info('download-progress-upd');
        UpdateWindow.getUpdateWindow().webContents.send('getAutoUpdatePercentage', progress.percent);
        UpdateWindow.getUpdateWindow().setProgressBar(progress.percent / progress.total);
    }
    if (MainWindow.getMainWindow() != null) {
        log.info('download-progress-app');
        MainWindow.getMainWindow().setProgressBar(progress.percent / progress.total);
    }
});

autoUpdater.on('update-downloaded', () => {
    log.info('update-downloaded');
    if (UpdateWindow.getUpdateWindow() != null) {
        log.info('update-downloaded-upd');
        UpdateWindow.getUpdateWindow().webContents.send('updateDown');
    } else {
        autoUpdater.quitAndInstall();
    }
});
