import MainWindow from '../main/main-window';
import ManageParameters from '../../../renderer/components/services/ManageParameters';
const log = require('electron-log');
const {app,nativeImage} = require("electron");
const fs = require('fs');

class MainImages{
    constructor(){
        
    }

    resizeImage(filePath, destination, type){
        const sizes = [
            {thumb: {width: 640, height: 480}},
            {hd: {width: 640, height: 480}},
            {fhd: {width: 640, height: 480}}
        ];
    
        const img = nativeImage.createFromPath(filePath);
        const imgSize = img.getSize();
        const imgW = imgSize.width;
        const imgH = imgSize.height;
        
        // image carrée
        if(imgW === imgH){
            // resize
            console.log('WIDTH', imgW);
            console.log('HEIGHT', imgH);
        }
    
        // image horizontale
        if(imgW > imgH){
    
        }
    
        // image Verticale
        if(imgW < imgH){
    
        }
    
        fs.writeFile(destination, img.resize({width: sizes[0].thumb.width, height: sizes[0].thumb.width}).toJPEG(100), (err) => {
            if (err) throw err;
            log.info('Image saved in ' + destination + ' successfully.');

            ManageParameters.setParameters(app.getPath('userData') ,[{node: "user.avatar", value: true}]).then(parameters =>{
                log.info('Params file updated avatar: true');
                MainWindow.getMainWindow().webContents.send('avatarChanged', true);
            });
        });
    }

    getAvatar(imgPath){
        const img = nativeImage.createFromPath(imgPath).toDataURL();
        document.getElementById('avatarImage').src = img;
        //return 'img'
    }

}
export default new MainImages();