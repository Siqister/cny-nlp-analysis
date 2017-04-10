'use strict';

const urls = require('./config').urls,
	htmlToJson = require('./htmlToJson'),
	nlpParse = require('./nlpParse'),
	outputToFile = require('./outputToFile');

htmlToJson(urls) //Promise that resolve to an array of Docs
	.then(nlpParse, (err)=>{console.log('Error generating array of docs'); console.log(err);})
	.then(outputToFile, (err)=>{console.log('NLP parse error'); console.log(err);})
	.then((data)=>{console.log('Successfully wrote to output');})
	.catch((err)=>{console.log('Error outputting to file')});
