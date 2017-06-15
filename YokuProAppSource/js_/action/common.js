import axios from 'axios';
var url="http://www.dotcue.in/contentDistribution/web/manage/";

export function formPost(data,type,empid,callback) {
	


if(type == 'Onenoteimage' )
	{
	
	var sendData=data;
	var type='Onenote';
	}
else if(type == 'OnenoteLoad' )
{
var sendData=data;
}
	else
	{
	var querystring = require('querystring');
	var sendData=querystring.stringify(data);

	}
//alert(url+'manageappajax?type='+type+'&frmoapp=1&empid='+empid,sendData);
	axios.post(url+'manageappajax?type='+type+'&frmoapp=1&empid='+empid,sendData, {
		headers: { 
			"Content-Type": "application/x-www-form-urlencoded"
		},
	}).
	then(function(response) {
		callback(response.data);

	});

}





