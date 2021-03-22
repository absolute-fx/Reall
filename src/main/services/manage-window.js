import MainWindow from './main/main-window';
import UpdateWindow from './update/update-window';
// import UpdateService from './update/update-service';

const log = require('electron-log');

async function createWindow () {
    log.info('Create Window Global');

    //Pour les tests de design update en dev, commenter les deux lignes en dessous !
    MainWindow.createMainWindow();
    UpdateWindow.destroyUpdateWindow();

    // UpdateService.checkAutoUpdate();
}

export default {
    createWindow
};
