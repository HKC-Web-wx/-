<template>
  <div class="add container">
  	<alert v-if="alert" v-bind:message="alert"></alert>
  	<router-link to="/" class="btn btn-default"><i class="glyphicon glyphicon-arrow-left"></i> 返回</router-link>
    <h1 class="page-header">添加用户</h1>
    <form v-on:submit="addCustomer">
    	<div class="well">
    		<h4>用户信息</h4>
    		<div class="form-group">
    			<label>姓名</label>
    			<input type="text" class="form-control" placeholder="Fullname" v-model="customer.name">
    		</div>
    		<div class="form-group">
    			<label>电话</label>
    			<input type="text" class="form-control" placeholder="phone" v-model="customer.phone">
    		</div>
    		<div class="form-group">
    			<label>邮箱</label>
    			<input type="text" class="form-control" placeholder="email" v-model="customer.email">
    		</div>
    		<div class="form-group">
    			<label>学历</label>
    			<input type="text" class="form-control" placeholder="education" v-model="customer.education">
    		</div>
    		<div class="form-group">
    			<label>毕业学校</label>
    			<input type="text" class="form-control" placeholder="graduationschool" v-model="customer.graduationschool">
    		</div>
    		<div class="form-group">
    			<label>职业</label>
    			<input type="text" class="form-control" placeholder="profession" v-model="customer.profession">
    		</div>
    		<div class="form-group">
    			<label>个人简介</label>
    			<textarea rows="6" class="form-control" placeholder="介绍一下自己吧！" v-model="customer.profile"></textarea>
    		</div>
    		<button class="btn btn-primary" type="submit">提交信息</button>
    	</div>
    </form>
  </div>
</template>

<script>
import Alert from './Alert'
export default {
  name: 'add',
  data () {
    return {
      customer:{},
      alert:''
    }
  },
  methods:{
  	addCustomer(e){
  		if(!this.customer.name || !this.customer.phone || !this.customer.email){
  			this.alert="请添加对应信息"
  		}else{
  			let newCustomer = {
  				name:this.customer.name,
  				phone:this.customer.phone,
  				email:this.customer.email,
  				education:this.customer.education,
  				graduationschool:this.customer.graduationschool,
  				profession:this.customer.profession,
  				profile:this.customer.profile
  			}
  			this.$http.post("http://localhost:3000/users",newCustomer)
  			.then(function(res){
  				console.log(res)
  				if(res.ok==true){
  					this.$router.push({path:"/",query:{alert:"用户信息添加成功"}})
  				}
  			})
  			e.preventDefault();
  		}
  		e.preventDefault();
  	}
  },
  components:{
  	Alert
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
