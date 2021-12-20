/*

ManageDesk
by TrackZone 

Github https://github.com/TrackZoneV2

*/
var homeDir = require('os').homedir();
var fs = require('fs');
var path = require('path');

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
            "bmp"

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

fs.readdir(windows_directory_list[0].directory, (err, files) => {
    files.forEach(file => {
        if (path.extname(file)) {
            /*

			Remove Steam Game Shortcut

  		*/
            if (path.extname(file).includes('url')) {
                fs.unlinkSync(windows_directory_list[0].directory + "/" + file);
                console.log("Remove Steam Game Shortcut =>", file);
            }

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
                                console.log('Move File to Windows Directory ' + wd.name + ' =>', file)
                            });

                        }

                    });

                }

            });

        }
    });
});

/*

Clear Downloads Directory

*/

fs.readdir(windows_directory_list[4].directory, (err, files) => {
    files.forEach(file => {
        if (path.extname(file)) {
            fs.unlinkSync(windows_directory_list[4].directory + "/" + file);
            console.log("Delete File =>", file);
        } else {
            fs.rmSync(windows_directory_list[4].directory + "/" + file, {
                recursive: true,
                force: true
            });
        }
    });
});
