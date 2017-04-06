'use strict';

const p = require('./htmlToJson'),
	Promise = require('promise');
	

//Set up google language API client
//Installation guide: https://cloud.google.com/natural-language/docs/reference/libraries#client-libraries-install-nodejs
//NodeJs client API docs: https://googlecloudplatform.github.io/google-cloud-node/#/docs/language/0.10.0/language
const Language = require('@google-cloud/language'),
	projectId = 'cny-text-analysis-163813';

const client = Language({
	projectId:projectId,
	keyFilename:'cny-text-analysis-412d7446c375.json'
});

client.annotate(text) //returns a Promise
	.then((results)=>{
		console.log(results[0].sentiment);
		console.log(results[0].entities);
	})
	.catch((err)=>{
		console.log(err);
	});



