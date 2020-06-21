//侧边栏公共js
function publicheader(){
	var str = `
    <ul class="sidebar">
        <li>
            <a href="/jq_carts/userlist.html">用户列表</a>
        </li>
        <li>
            <a href="/jq_carts/uploadingshop.html">上传商品</a>
        </li>
        <li>
            <a href="/jq_carts/shoplist.html">商品列表</a>
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
    $('body').append(str);
}
publicheader();

//创建获取购物车内商品数量
function getCartNumber(){
    $_ajax('post','/cart/getlength').done(function(res){
        var $divnumber = $('.cart-num');
        console.log(res);
        if(res.state && res.number !== -1){
            $divnumber.text(res.number);
        }else{
            $divnumber.text(0);
        }
    })
}
getCartNumber();

//退出登录点击事件
$('#exit').click(function() {
    $_ajax('get','/user/logout').done(function(res){
        location.href="/jq_carts/register.html?type=login"
    })
});
