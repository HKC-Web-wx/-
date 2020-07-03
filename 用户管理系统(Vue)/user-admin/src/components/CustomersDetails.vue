<template>
  <div class="details container">
    <router-link to="/" class="btn btn-default"><i class="glyphicon glyphicon-arrow-left"></i> 返回</router-link>
    <h1 class="page-header">
      {{customer.name}}
      <span class="pull-right btn-box">
        <router-link class="btn btn-primary" v-bind:to="'/edit/'+customer.id">编 辑</router-link>
        <button class="btn btn-danger" v-on:click="deleteCustomer(customer.id)">删 除</button>
      </span>
    </h1>
    <ul class="list-group">
      <li class="list-group-item"><span class="glyphicon glyphicon-phone"> 手机：</span>{{customer.phone}}</li>
      <li class="list-group-item"><span class="glyphicon glyphicon-inbox"> 邮箱：</span>{{customer.email}}</li>
      <li class="list-group-item"><span class="glyphicon glyphicon-list-alt"> 学历：</span>{{customer.education}}</li>
      <li class="list-group-item"><span class="glyphicon glyphicon-book"> 院校：</span>{{customer.graduationschool}}</li>
      <li class="list-group-item"><span class="glyphicon glyphicon-star"> 职业：</span>{{customer.profession}}</li>
      <li class="list-group-item"><span class="glyphicon glyphicon-asterisk"> 简介：</span>{{customer.profile}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'cumstomerdetails',
  data () {
    return {
      customer:""
    }
  },
  methods:{
    fetchCustomers(id){
      this.$http.get("http://localhost:3000/users/"+id)
      .then(function(res){
        console.log(res);
        this.customer=res.body
      })
    },
    deleteCustomer(id){
      if(confirm('确定要删除吗？')==true){
          this.$http.delete("http://localhost:3000/users/"+id)
        .then(function(res){
          this.$router.go(0)
        })
      }
    }
  },
  created(){
    this.fetchCustomers(this.$route.params.id)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .details li span{
    display: inline-block;
    width: 90px;
  }
  .details i{
    color: #ddd;
  }
  
</style>
