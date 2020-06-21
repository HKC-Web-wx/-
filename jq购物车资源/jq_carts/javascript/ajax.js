window.$_http = 'http://49.235.117.27:3000';
// window.$_ajax = function(type,url,data){
// 	url = $_http + url;
// 	return $.ajax({
// 		url: url,
// 		type: type.toUpperCase(),
// 		data: data,
// 		beforeSend:function(xhr){
// 			if(localStorage.getItem('token')){
//            		xhr.setRequestHeader("token", localStorage.getItem('token'))
//        		}
// 		},
// 	}).then(function(res){
// 			return res;
// 	})
// }

window.$_ajax = function(type,url,data){
	url = $_http + url;
	if(type == 'post'){
		data = JSON.stringify(data);
	}
	return $.ajax({
		url: url,
		type: type.toUpperCase(),
		data: data,
		contentType:"application/json",
		beforeSend:function(xhr){
			if(localStorage.getItem("token")){
           		xhr.setRequestHeader("token", localStorage.getItem("token"));
       		}
		},
	}).then(function(res){
		if(res.code == -99){
			location.href="/jq_carts/register.html";
		}else{
			return res;
		}
	})
}

//弹框提示js
window.$_global_timer = null;
window.$_hint = function(text){
	var $box;
	clearTimeout($_global_timer);
	$box = $("#no-title-hint");
	if($box.length == 1){
		console.log("提示框存在");
		$box.text(text);
		$box.css("transform","translateX(-50%) scale(1)");
	}else{
		console.log("提示不存在");
		var $box = $('<div id="no-title-hint"></div>').text(text);
		$('body').append($box);
		$box.css("transform","translateX(-50%) scale(1)");
	}
	$_global_timer = setTimeout(function(){
		$box.css("transform","translateX(-50%) scale(0)");
	},1000)
}
