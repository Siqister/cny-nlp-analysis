'use strict';

const cheerio = require('cheerio'),
	fs = require('fs'),
	Promise = require('Promise');

function processFile(_url){
	return loadFile(_url)
		.then(parseHtml);
}

function loadFile(_url){
	return new Promise((resolve,reject)=>{
		fs.readFile(__dirname+'/'+_url,
			'utf-8',
			(err,data)=>{
				if(err){
					reject(err);
				}else{
					resolve(data);
				}
		});
	});
}

function parseHtml(data){
	let $ = cheerio.load(data);

	return $('#REVIEWS').find('.reviewSelector').map((index,elem)=>{
		return {
			id:$(elem).attr('id').replace(/review_/,''),
			reviewer:$(elem).find('.scrname').text().replace(/(\r\n|\n|\r)/gm,""),
			location:$(elem).find('.location').text().replace(/(\r\n|\n|\r)/gm,""),
			date:Date.parse( $(elem).find('.ratingDate').text().replace(/(\r\n|\n|\r)/gm,"").replace(/Reviewed /,'') ),
			//FIXME: this is causing a parse error
			//rating:+($(elem).find('.sprite-rating_s_fill').attr('alt').charAt(0)),
			title:$(elem).find('.quote').text().replace(/(\r\n|\n|\r)/gm,""),
			body:$(elem).find('.partial_entry').text().replace(/(\r\n|\n|\r)/gm,"")
		}
	}).toArray();
}

module.exports = function(urls){
	return Promise.all(urls.map(processFile))
		.then(res => res.reduce( (results,reviews)=>results.concat(reviews),[] ) );
}


