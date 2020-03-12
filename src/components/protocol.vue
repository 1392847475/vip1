<template>
  <div class="">
     <div id="header">
      <span class="iconfont" @click="fanhui()">&#xe60e;</span>
      <span>用户协议</span>
    </div>
    <div id="content" v-html="content">{{content}}</div>
  </div>
</template>
<script>
import axios from "axios"
export default {
  name: 'Protocol',//协议
  data () {
    return {
     base_URL : process.env.API_URL,
     content:"",
    }
  },
  mounted(){
    let that = this
    axios.post(this.base_URL+"/interface/getAgreement").then(function(res){
      console.log(res)
      if(res.data.resultCode == "000"){
        that.content = res.data.data.content
      }
    })
  },
   methods:{
    fanhui(){
        this.$router.go(-1)
      },
    
  },
}
</script>

<style scoped lang="scss">
#header{
  width:100%;
  height:2.5rem;
  background:#fff;
  font-weight:900;
  text-align: center;
  line-height: 2.5rem;
  position: fixed;
  top:0;
  span:nth-child(1){
    position: absolute;
    font-size:1.1rem;
    left:1.2rem;
  }
}
#content{
  margin-top:2.5rem;
  padding:1rem;
  font-size:.8rem;
  line-height:1.1rem;
  color:#444;
  letter-spacing:.2rem!important;
      background: #f1f1f1;

}
</style>