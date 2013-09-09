/**
 * 
 * add params in to url.
 * addParamsInUrl("helloworld.php", {foo1:bar1, foo2:bar2}) will return helloworld.php?foo1=bar1&foo2=bar2
 * 
 * if params has exist in url，new param will replace old
 * addParamsInUrl("helloworld.php?foo1=bar1", {foo1:bar2, foo2:bar2}) will return helloworld.php?foo1=bar2&foo2=bar2
 * 
 * if url is null, ""; will return querystring like:
 * addParamsInUrl("", {foo1:bar2, foo2:bar2}) will return foo1=bar2&foo2=bar2
 * 
 * if params is null, "", {}; will return the url:
 * addParamsInUrl("helloworld.php", "") will return helloworld.php
 * 
 * if params is not object, will append to url and return:
 * addParamsInUrl("hello", "world") will return hello?world
 * 
 * @param url
 * @param params json object like {foo1:bar1, foo2:bar2}
 */
function ydhlib_AddParamsInUrl(url, params){
	var queryString = [];
	if(typeof(params)=="object"){
		for(name in params){
			queryString.push( name+"="+params[name] );
		}
	}else{
		if(params){
			queryString.push(params);
		}
	}
	
	if( ! url){
		return queryString.join("&"); 
	}
	
	var urlComps = url.split("?");
	if(urlComps.length==1){
		return queryString.length>0 ? url+"?"+queryString.join("&") : url; 
	}
	
	var oldQueryString = urlComps[1].split("&");
	var oldParams = {};
	for(var i=0; i < oldQueryString.length; i++){
		var nameValue = oldQueryString[i].split("=");
		if( params[nameValue[0]]) continue;
		queryString.push(nameValue[0] + "=" + (nameValue.length < 1 ? "" : nameValue[1]));
	}
	
	return queryString.length>0 ? urlComps[0]+"?"+queryString.join("&") : urlComps[0]; 
}