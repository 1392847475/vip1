<template>
  <div class="box">
    <div id="header">
      <span class="iconfont" @click="fanhui()">&#xe60e;</span>
      <span>购买成功</span>
    </div>
    <div class="content">
      <div class="iconfont xiao">&#xe61e;</div>
      <p>恭喜您购买成功！</p>
      <router-link tag="button" to="/xindex">立即使用</router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: 'succeed',
  data () {
    return {
     
    }
  },
watch: {

  },
  mounted(){

  },
  methods:{
    fanhui(){
        this.$router.push('xindex')
      },
  },
}
</script>

<style scoped lang="scss">
#header{
  height:2.5rem;
  background:#fff;
  font-weight:900;
  text-align: center;
  line-height: 2.5rem;
  border-bottom:1px solid #CCCCCC;
  span:nth-child(1){
    position: absolute;
    font-size:1.1rem;
    left:1.2rem;
  }
}
.box{
  height:100%;
  background:#fff;
}
.content{
  .xiao{
  color:#16D8BC;
  font-size:5rem;
  margin: 0 auto;
  width:5rem;
  padding-top:4rem;
  }
  p{
    padding:1.5rem 0 3rem 0;
    text-align: center;
    font-size:.85rem;
    color:#333333;
    font-weight:900;
  }
  button{
    background:#16D8BC;
    height:3rem;
    width:85%;
    border-radius:.5rem;
    color:#fff;
    margin:0 auto;
    display: block;
  }
}

</style>