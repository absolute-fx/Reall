import {app} from 'electron'

const promiseIpc =  require('electron-promise-ipc')
const log = require('electron-log')


promiseIpc.on('closeWindow', () => {
    log.info('close window');
    app.quit();
});