const fs = require('fs');
const editJsonFile = require("edit-json-file");

class ManageParameters{
    static getParameters(userDataPath)
    {
        return new Promise (function(resolve, reject){
            let appParameters;
            if (!fs.existsSync(userDataPath + '/parameters.json')){
                appParameters = ManageParameters.getDefaultParams();
                fs.writeFile(userDataPath + '/parameters.json', JSON.stringify(appParameters), 'utf8', (err) =>{
                    if(!err)
                    {
                        resolve(appParameters);
                    }
                    else
                    {
                        reject(err);
                    }
                });

            }
            else
            {
                fs.readFile(userDataPath + '/parameters.json', 'utf8', (err, data) =>{
                    if (err){
                        reject(err);
                    } else {
                        appParameters = JSON.parse(data);
                        resolve(appParameters);
                        //console.log(appParameters);
                    }
                });
            }
        });
    }

    static setParameters(path, params){
        return new Promise (function(resolve, reject) {
            let file = editJsonFile(path + '/parameters.json');
            for (let i in params)
            {
                file.set(params[i].node, params[i].value);
                console.log(params[i].node + ' - ' + params[i].value)
            }
            file.save();
            resolve(file);
        });
    }

    static getDefaultParams()
    {
        let appParameters;
        appParameters = {
            "version": "1.0.0",
            "navToggled": true,
            "system": {
              "root_path": "",
              "upload_path": "",
              "cloud_library_path": "",
              "projects_dirs": {
                "default": {
                  "libraries": "Bibliothèque",
                  "realties": "Biens"
                },
                "user_defined": []
              },
              "realties_dirs": {
                "default": {
                  "library": "Bibliothèque"
                },
                "user_defined": []
              },
              "resize_img_delay_ratio": 0.1
            },
            "external_api": {
              "gm_key": ""
            },
            "user": {
              "login": "",
              "password": "",
              "auto_connect": false,
              "licence_key": "",
              "language": "en"
            },
            "project": {
              "project_phases": [],
              "projects_categories": []
            },
            "realty": {
              "realties_categories": []
            },
            "logs": {
              "max_logs_display": 200,
              "max_logs_stored": 10000
            },
            "libraries": {
              "images": {
                "thumb": {
                  "width": 200,
                  "height": 200,
                  "quality": 100,
                  "suffix": "_thumb"
                },
                "web_default": {
                  "width": 1920,
                  "height": 1080,
                  "quality": 100,
                  "suffix": "_web"
                }
              }
            },
            "application": {
              "default_language": "en",
              "languages": [
                {"label": "English", "code": "en"}, 
                {"label": "Nederalands", "code": "nl"}, 
                {"label": "Français", "code": "fr"}
              ]
            }
          };
        return appParameters;
    }

}

module.exports = ManageParameters;