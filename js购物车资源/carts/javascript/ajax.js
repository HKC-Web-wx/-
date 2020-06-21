window.$_http = 'http://49.235.117.27:3000';
window.$_ajax = function(type,url,data){
	url = $_http + url;
	console.log(url);
	if(type.toUpperCase() === "GET"){
		url += '?';
		var arr = [];
		for(var i in data){
			arr.push(i+'='+data[i])
		}
		url += arr.join('&');
		data = null;
	}else{
		data = JSON.stringify(data);
	}
	return new Promise(function(resolve,reject){
        var xhr = new XMLHttpRequest();
        xhr.open(type,url);
        xhr.setRequestHeader("Content-Type",'application/json')
        if( localStorage.getItem('token') ){
            xhr.setRequestHeader("token", localStorage.getItem('token'))
        }
        xhr.send(data);
        xhr.onreadystatechange = function(){
            if( xhr.readyState === 4 && xhr.status === 200 ){
                var data = JSON.parse(xhr.responseText);
                if( data.code === -99 ){
                    location.href = data.redirect
                }else{
                    resolve( data );
                }
            }
        }
        
    })
};

//封装$_getID 获取元素对象
window.$_getID = function(obj){
	return document.getElementById(obj);
};
//弹框提示js
window.$_global_timer = null;
window.$_hint = function(text){
	var box;
	clearTimeout($_global_timer);
	box = document.getElementById('no-title-hint');
	if(box){
		box.innerText = text;
		box.style.transform = "translateX(-50%) scale(1)";
	}else{
		var box = document.createElement('div');
		box.id = 'no-title-hint';
		box.innerText = text;
		document.body.append(box);
		document.body.clientHeight;
		box.style.transform = "translateX(-50%) scale(1)";
	}
	$_global_timer = setTimeout(function(){
		box.style.transform = "translateX(-50%) scale(0)";
	},1500);
};
