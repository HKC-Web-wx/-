***本地JSON-Server服务***

**GET请求**
//获取所有用户信息
http://localhost:3000/users

//获取指定ID的用户信息
http://localhost:3000/users/1

//获取公司所有信息
http://localhost:3000/companies

//获取指定公司ID的信息
http://localhost:3000/companies/1

//获取所有公司ID为3的用户信息
http://localhost:3000/companies/3/users

//根据公司名字获取信息
http://localhost:3000/companies?name=Google&name=Apple

//获取一页且是要两条数据;
http://localhost:3000/companies?_page=1&_limit=2

//根据name字段升序排序  asc升序  desc降序
http://localhost:3000/companies?_sort=name&_order=asc

//获取年龄大于等于25岁的用户信息
http://localhost:3000/users?age_gte=25

//获取年龄在24~25岁的用户信息
http://localhost:3000/users?age_gte=24&age_lte=25

//搜索用户信息
http://localhost:3000/users?q=h

**POST请求**
//添加用户数据(设置请求头)
http://localhost:3000/users
