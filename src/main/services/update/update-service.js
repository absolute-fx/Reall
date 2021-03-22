const { autoUpdater } = require('electron-updater');
const log = require('electron-log');

let updateInterval = null;

function checkForUpdates () {
    log.info('checkForUpdates');
    autoUpdater.checkForUpdates();
}

function checkAutoUpdate () {
    const minutes = 5;
    const interval = minutes * 60 * 1000;

    updateInterval = setInterval(function () {
        autoUpdater.checkForUpdates();
    }, interval);
}

function getUpdateInterval () {
    return updateInterval;
}

function clearUpdateInterval () {
    if (!updateInterval()) {
        return;
    }

    log.info('clear Update interval');
    clearInterval(updateInterval);
}

export default {
    checkForUpdates,
    checkAutoUpdate,
    clearUpdateInterval,
    getUpdateInterval
};
