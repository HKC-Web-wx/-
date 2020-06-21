//侧边栏公共js
function publicheader(){
	var str = `
    <ul class="sidebar">
        <li>
            <a href="/carts/userlist.html">用户列表</a>
        </li>
        <li>
            <a href="/carts/uploadingshop.html">上传商品</a>
        </li>
        <li>
            <a href="/carts/shoplist.html">商品列表</a>
        </li>
        <li>
            <a href="cart.html"  id="sidebar-cart">
                购物车
                <div class="cart-num">
                    <image src='./images/loading.png' class='loading-animate' style='width:18px;height:18px;'>
                </div>
            </a>
        </li>
        <li data-type="exit" id="exit">
            <a href="javascript:" >退出登录</a>
        </li>
    </ul>
    `;
    document.body.insertAdjacentHTML('beforeend', str);
}
publicheader();

//创建获取购物车内商品数量
function getCartNumber(){
	$_ajax('post','/cart/getlength').then(res=>{
		var divnumber = document.getElementsByClassName('cart-num')[0];
		if(res.state){
			divnumber.innerText = res.number;
		}else{
			divnumber.innerText = 0;
		}
	})
}
getCartNumber();

//退出登录点击事件
document.getElementById('exit').onclick = function(){
    $_ajax('get','/user/logout',{})
    .then(res=>{
        location.href="/carts/register.html?type=login"
    })
}
