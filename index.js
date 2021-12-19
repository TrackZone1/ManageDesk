/*

ManageDesk
by TrackZone 

Github https://github.com/TrackZoneV2

*/

var homeDir = require('os').homedir();
var fs = require('fs');
var path = require('path');

var desktopDir = `${homeDir}/Desktop`;
var documentsDir = `${homeDir}/Documents`;
var picturesDir = `${homeDir}/Pictures`;
var musicDir = `${homeDir}/Music`;
var downloadDir = `${homeDir}/Downloads`;
var videoDir = `${homeDir}/Videos`;

var extname_pictures_list = [

	"jpeg",
	"jpg",
	"png",
	"gif",

];

var extname_music_list = [

	"m4a",
	"flac",
	"mp3",
	"wav",
	"wma",
	"aac",

];

var extname_document_list = [

	"doc",
	"docx",
	"odt",
	"pdf",
	"ods",
	"txt",

];

var extname_video_list = [

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

];

fs.readdir(desktopDir, (err, files) => {
  files.forEach(file => {
  	if (path.extname(file)){
  		/*

			Remove Steam Game Shortcut

  		*/
  		if (path.extname(file).includes('url')){
  			fs.unlinkSync(desktopDir + "/" + file);
  			console.log("Remove Steam Game Shortcut =>", file);
  		}

  		/*
	
			Manage Pictures

  		*/

  		extname_pictures_list.forEach(extname => {

  			if (path.extname(file).includes(extname)){

					if (!fs.existsSync(picturesDir + "/" + extname.split(".")[0])){
					    fs.mkdirSync(picturesDir + "/" + extname.split(".")[0]);
					}

		  		fs.rename(desktopDir + "/" + file, picturesDir + "/" + extname.split(".")[0] + "/" + file, function (err) {
					  if (err) throw err
					  console.log('Move File to Windows Directory Pictures =>', file)
					});

  			}

  		});

  		/*
	
			Manage Music

  		*/

  		extname_music_list.forEach(extname => {

  		if (path.extname(file).includes(extname)){

			if (!fs.existsSync(musicDir + "/" + extname.split(".")[0])){
			    fs.mkdirSync(musicDir + "/" + extname.split(".")[0]);
			}

  		fs.rename(desktopDir + "/" + file, musicDir + "/" + extname.split(".")[0] + "/" + file, function (err) {
			  if (err) throw err
			  console.log('Move File to Windows Directory Music =>', file)
			});

  		}

  		});

  		/*
	
			Manage Documents

  		*/

  		extname_document_list.forEach(extname => {

  		if (path.extname(file).includes(extname)){

			if (!fs.existsSync(documentsDir + "/" + extname.split(".")[0])){
			    fs.mkdirSync(documentsDir + "/" + extname.split(".")[0]);
			}

  		fs.rename(desktopDir + "/" + file, documentsDir + "/" + extname.split(".")[0] + "/" + file, function (err) {
			  if (err) throw err
			  console.log('Move File to Windows Directory Documents =>', file);
			});

  		}

  		});

  		/*
	
			Manage Video

  		*/

  		extname_video_list.forEach(extname => {

  		if (path.extname(file).includes(extname)){

			if (!fs.existsSync(videoDir + "/" + extname.split(".")[0])){
			    fs.mkdirSync(videoDir + "/" + extname.split(".")[0]);
			}

  		fs.rename(desktopDir + "/" + file, videoDir + "/" + extname.split(".")[0] + "/" + file, function (err) {
			  if (err) throw err
			  console.log('Move File to Windows Directory Video =>', file);
			});

  		}

  		});	
	}
  });
});

/*

Clear Downloads Directory

*/

fs.readdir(downloadDir, (err, files) => {
  files.forEach(file => {
  	if (path.extname(file)){
  		fs.unlinkSync(downloadDir + "/" + file);
  		console.log("Delete File =>", file);
  	}else{
  		fs.rmSync(downloadDir + "/" + file, { recursive: true, force: true });
  	}
  });
});