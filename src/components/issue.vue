<template>
  <div class="box">
    <div id="header">
      <span class="iconfont" @click="fanhui()">&#xe60e;</span>
      <span>常见问题</span>
    </div>
    <div id="content">
      <ul>
        <li v-for = "(item , i) in list" :key = i>
          <div @click="zk(i)">
            <span class="iconfont">&#xe61f;</span>
            <span>{{item.title}}</span>
            <span class="iconfont" :class="{'rotate' : item.c}">&#xe613;</span>
          </div>
          <p v-show = item.c>{{item.content}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import axios from "axios"
export default {
  name: 'Issue',//常见问题
  data () {
    return {
     list:"",
       base_URL : process.env.API_URL,
    }
  },
   watch: {

  },
  mounted(){
    let that = this
        axios.post(this.base_URL+"/interface/getQuestions")
        .then(function(res){
          console.log(res)
          if(res.data.resultCode == "000"){
            for(var i = 0;i<res.data.data.length;i++){
              res.data.data[i].c = false;
            }
              that.list = res.data.data
           }else{
             that.list = [{"title":"系统异常请刷新重试"}]
           }
        })
  },
  methods:{
    fanhui(){
        this.$router.go(-1)
      },
    zk(i){
      this.list[i].c = !this.list[i].c
    },
  },
}
</script>

<style scoped lang="scss">
#header{
  height:2.5rem;
  width:100%;
  background:#fff;
  position: fixed;
  font-weight:900;
  text-align: center;
  top:0;
  line-height: 2.5rem;
  z-index: 9;
  span:nth-child(1){
    position: absolute;
    font-size:1.1rem;
    left:1.2rem;
  }
}
#content{
  background:#F3F3F3;
  padding-top:3.2rem;
  ul{
    background:#fff;
    li{
      div{
        padding:1rem 1rem 1rem 0; 
        margin-left: 1rem;
        border-bottom:1px solid #ccc;
        overflow: hidden;
        display: flex;
        span:nth-child(1){
          line-height: 1.3rem;
          font-size:.9rem;
          font-weight:900;
        }
        span:nth-child(2){
          flex:1;
          font-size:.9rem;
          font-weight:900;
          padding-left:.8rem;
          margin-right:1rem;
          line-height: 1.3rem;
          word-break:break-all;
        }
        span:nth-child(3){
          position: absolute;
          right:1rem;
          font-size:.9rem;
          color:#999999;
        }
        .rotate{
          position: absolute;
          right:1rem;
          transform:rotate(180deg);
        }
      }
      p{
        padding:.6rem 1rem .6rem 2rem;
        margin-left: 1rem;
        font-size:.75rem;
        color:#999999;
        line-height:1.2rem;
        border-bottom:1px solid #999999;
        word-break:break-all;
      }
    }
  }
}
</style>