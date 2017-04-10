const fs = require('fs'),
	Path = require('path');

const outputPath = require('./config').outputPath;

function writeFile(data){
	return new Promise((resolve,reject)=>{
		fs.writeFile(Path.join(__dirname,outputPath),JSON.stringify(data),(err)=>{
			if(err){
				reject(err)
			}else{
				resolve(data);
			}
		});
	});
}

module.exports = writeFile;