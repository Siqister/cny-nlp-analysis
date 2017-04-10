'use strict';

const Promise = require('promise');

//Set up google language API client
//Installation guide: https://cloud.google.com/natural-language/docs/reference/libraries#client-libraries-install-nodejs
//NodeJs client API docs: https://googlecloudplatform.github.io/google-cloud-node/#/docs/language/0.10.0/language
const Language = require('@google-cloud/language'),
	projectId = 'cny-text-analysis-163813';

const client = Language({
	projectId:projectId,
	keyFilename:'cny-text-analysis-412d7446c375.json'
});

function nlpAnnotate(doc){
	return client.annotate(doc.body,{encoding:'UTF8'})
		.then((results)=>{
			return Object.assign({},doc,results[0]);
		})
		.catch((err)=>{ console.log(err);});
}

module.exports = function(docs){
	return Promise.all(docs.map(nlpAnnotate));
}



