
/*

ManageDesk
by TrackZone 

Github https://github.com/TrackZoneV2

*/
const { app, BrowserWindow } = require('electron');
var homeDir = require('os').homedir();
var fs = require('fs');
var path = require('path');
var fastFolderSize = require('fast-folder-size');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1000,
    height: 500,
    autoHideMenuBar: true,
    icon: __dirname + '/kawaii-folders.ico',  
  })

  win.loadFile('main.html');
}

app.whenReady().then(() => {
  createWindow()
});

var windows_directory_list = [

    {
        "name": "Desktop",
        "directory": `${homeDir}/Desktop`
    },
    {
        "name": "Documents",
        "directory": `${homeDir}/Documents`,
        "extname_list": [

            "doc",
            "docx",
            "odt",
            "pdf",
            "ods",
            "txt",

        ]
    },
    {
        "name": "Pictures",
        "directory": `${homeDir}/Pictures`,
        "extname_list": [

            "jpeg",
            "jpg",
            "png",
            "gif",
            "webp",
            "apng",
            "bmp",
            "ico"

        ]
    },
    {
        "name": "Music",
        "directory": `${homeDir}/Music`,
        "extname_list": [

            "m4a",
            "flac",
            "mp3",
            "wav",
            "wma",
            "aac",

        ]
    },
    {
        "name": "Downloads",
        "directory": `${homeDir}/Downloads`
    },
    {
        "name": "Videos",
        "directory": `${homeDir}/Videos`,
        "extname_list": [

            "webm",
            "mkv",
            "flv",
            "vob",
            "ogv",
            "ogg",
            "drc",
            "gifv",
            "mng",
            "avi",
            "mts",
            "m2ts",
            "ts",
            "mov",
            "qt",
            "wmv",
            "yuv",
            "rm",
            "rmvb",
            "viv",
            "asf",
            "mp4",
            "m4p",
            "m4v",
            "mpg",
            "mp2",
            "mpeg",
            "mpe",
            "mpv",
            "mpg",
            "mpeg",
            "m2v",
            "svi",
            "3g2",
            "mxf",
            "roq",
            "nsv",
            "flv",
            "f4v",
            "f4p",
            "f4a",
            "f4b"

        ]
    },

];

var cache_file_name_list = [

"Roaming",
"Local",
"LocalLow"

];

var message_list = [];

function OrderDesk(foldername){

fs.readdir(homeDir + "/" + foldername, (err, files) => {
    files.forEach(file => {
        if (path.extname(file)) {

            /*
	
			Manage Files 

  		    */

            windows_directory_list.forEach(wd => {

                if (wd.extname_list) {

                    wd.extname_list.forEach(extname => {

                        if (path.extname(file).includes(extname.toLowerCase())) {

                            if (!fs.existsSync(wd.directory + "/" + extname.split(".")[0])) {
                                fs.mkdirSync(wd.directory + "/" + extname.split(".")[0]);
                            }

                            fs.rename(windows_directory_list[0].directory + "/" + file, wd.directory + "/" + extname.split(".")[0] + "/" + file, function(err) {
                                if (err) throw err
                                message_list.push(`<p class="text-success">Move <i class="fab fa-windows"></i> ${wd.name} <i class="fas fa-arrow-right"></i> ${file}</p>`);
                            });

                        }

                    });

                }

            });

        }
    });
});

}
/*

Clear Downloads Directory

*/

function CDD(){

fs.readdir(windows_directory_list[4].directory, async (err, files) => {
    files.forEach(async file => {
        if (path.extname(file)) {
            await fs.unlinkSync(windows_directory_list[4].directory + "/" + file);
            await message_list.push(`<p class="text-danger">Delete file <i class="fas fa-arrow-right"></i> ${file}</p>`);
        } else {
            await fs.rmSync(windows_directory_list[4].directory + "/" + file, {
                recursive: true,
                force: true
            });
            await message_list.push(`<p class="text-danger">Delete file <i class="fas fa-arrow-right"></i> ${file}</p>`);
        }
    });
});

}

/*

Remove Empty File Cache

*/

function REFC(){

cache_file_name_list.forEach(item => {

    fs.readdir(homeDir + "/AppData/" + item, (err, files) => {
        files.forEach(file => {
            if (!path.extname(file)) {

                if (file === "ElevatedDiagnostics") return false;

                fastFolderSize(homeDir + "/AppData/" + item + "/" + file, (err, bytes) => {
                  if (err) {
                    throw err
                  }

                    if (bytes === 0){

                        fs.rmSync(homeDir + "/AppData/" + item + "/" + file, {
                            recursive: true,
                            force: true
                        });
                        message_list.push(`<p class="text-danger">Delete file <i class="fas fa-arrow-right"></i> ${file}</p>`);
                    
                    }

                });
            }
        });
    });

});

}

/*

Remove Steam Game Shortcut

*/

function RSGS(){

fs.readdir(windows_directory_list[0].directory, async (err, files) => {
    files.forEach(async file => {
        if (path.extname(file)) {
            if (path.extname(file).includes('url')) {
                fs.unlinkSync(windows_directory_list[0].directory + "/" + file);
                message_list.push(`<p class="text-danger">Delete Steam Game Shortcut <i class="fas fa-arrow-right"></i> ${file}</p>`);
            }
        }
    });
});

}

/*

Remove Cache file 

*/

function RemoveCacheFile(filename_remove){

cache_file_name_list.forEach(item => {

    fs.readdir(homeDir + "/AppData/" + item, (err, files) => {
        files.forEach(file => {
            if (!path.extname(file)) {

                if (file === "ElevatedDiagnostics") return false;

                fastFolderSize(homeDir + "/AppData/" + item + "/" + file, (err, bytes) => {
                  if (err) {
                    throw err
                  }

                    if (file.toLowerCase() === filename_remove.toLowerCase()){

                        fs.rmSync(homeDir + "/AppData/" + item + "/" + file, {
                            recursive: true,
                            force: true
                        });
                        message_list.push(`<p class="text-danger">Delete file <i class="fas fa-arrow-right"></i> ${file}</p>`);
                    
                    }

                });
            }
        });
    });

});

}

const express = require('express');
const webapp = express();

webapp.get('/clean', async function (req, res) {
    if (req.query.cdf === "true"){
        CDD();
    }
    if (req.query.refc === "true"){
        REFC();
    }
    if (req.query.rsgs === "true"){
        RSGS();
    }
    if (req.query.reacc === "true"){
        RemoveCacheFile("EasyAntiCheat")
    }
    res.send(`<div class="spinner-border text-warning" role="status"><span class="sr-only">Loading...</span></div>`);
});

webapp.get('/organise', async function (req, res) {
    await OrderDesk(req.query.foldername);    
});

webapp.get('/data', async function (req, res) {
    if (message_list.length > 0) {
        console.log(message_list.length);
        await res.send(message_list[message_list.length - 1]);
        await console.log(message_list[message_list.length - 1]);
        await message_list.pop();
    }else{
        res.send("");
    }
});

webapp.listen(3000);
