const path = require('path')

/**
 * `electron-packager` options
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-packager.html
 * https://github.com/electron/electron-packager/blob/master/usage.txt
 */
module.exports = {
    arch: 'x64',
    asar: true,
    dir: path.join(__dirname, '../'),
    icon: path.join(__dirname, '../build/icons/icon'),
    ignore: /(^\/(src|test|\.[a-z]+|README|yarn|static|dist\/web))|\.gitkeep/,
    out: path.join(__dirname, '../build'),
    overwrite: true,
    win32metadata: {
        "requested-execution-level": "requireAdministrator",
    },
    platform: 'win32'
}