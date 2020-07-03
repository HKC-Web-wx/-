<template>
  <div class="customers container">
    <alert v-if="alert" v-bind:message="alert"></alert>
    <h1 class="page-header">用户管理系统</h1>
    <input type="text" class="form-control" placeholder="搜索姓名" v-model="filterInput">
    <table class="table table-striped">
      <thead>
        <tr>
          <th>姓名</th>
          <th>电话</th>
          <th>邮箱</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="customer in filterBy(customers,filterInput)">
          <td>{{customer.name}}</td>
          <td>{{customer.phone}}</td>
          <td>{{customer.email}}</td>
          <td>
            <router-link class="btn btn-default" v-bind:to="'/customer/'+customer.id">详情</router-link>
            <button class="btn btn-danger" v-on:click="deleteCustomer(customer.id)">删除</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Alert from "./Alert.vue"
export default {
  name: 'customers',
  data () {
    return {
      customers:[],
      alert:"",
      filterInput:""
    }
  },
  methods:{
    fetchCustomers(){
      this.$http.get("http://localhost:3000/users")
      .then(function(res){
        console.log(res);
        this.customers=res.body
      })
    },
    deleteCustomer(id){
      if(confirm('确定要删除吗？')==true){
          this.$http.delete("http://localhost:3000/users/"+id)
        .then(function(res){
          this.$router.go(0)
        })
      }
    },
    filterBy(customers,filterInput){
      return customers.filter(function(customer){
        return customer.name.match(filterInput);
      })
    }
  },
  created(){
    if(this.$route.query.alert){
      this.alert = this.$route.query.alert
    }
    this.fetchCustomers();
  },
  updated(){
    // this.fetchCustomers();
  },
  components:{
    Alert
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
tbody td .btn{
  margin: 0 3px;
}
</style>
