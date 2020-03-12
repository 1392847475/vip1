
<template>
  <div class="box">
    <div id="header">
      <span class="iconfont" @click="fanhui()">&#xe60e;</span>
      <span>特权详情</span>
      <!-- <span class="iconfont">&#xe60f;</span> -->
    </div>
    <div id="list">
      <ul class="listul" :style="'width:'+wid+'%'" ref="userinfo">
        <li v-for="(item , i) in list" :key="i" :style="'width:'+liwid+'%'">
          <div @click="xz(i)">
            <img :src="item.imgurl"/>
            <p :class="{'col':id == item.id}">{{item.name}}</p>
            <div v-show = 'item.c'></div>
          </div>
        </li>
      </ul>
    </div>
    <div id='yy'></div>
    <div class="content" v-html="cont">
      {{cont}}
    </div>
    
    <div id="footer">
     <router-link v-if="text == 2" tag="div" to='/orderForm'>立即开通</router-link>
      <div v-else>
        <router-link tag="p" to='/xindex'  v-if="link == null || ''">返回首页</router-link>
        <p v-else @click="qsy(link)">去使用</p>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios"
export default {
  // 权益详情
  name: 'Introduce',
  data () {
    return {
     list:"",
     id:"",
     base_URL : process.env.API_URL,
     wid:"",
     liwid:"",
     cont:"",
     text:"",
     link:"",
    }
  },
   watch: {

  },
  mounted(){ 
  //  this.$refs.userinfo.getBoundingClientRect()
  // this.$refs.userinfo.style.left = '-60%'
    let that = this;
    this.id = this.$route.params.id
    axios.post(that.base_URL+"/interface/getPrivDetails",`privilegeId=${that.id}`).then(function(res){
        console.log(res)
        if(res.data.resultCode == '000'){
           for(var i = 0;i<res.data.data.length;i++){
              res.data.data[i].c = false;
              //点进来时的权益详情
              if(that.id == res.data.data[i].id){
                that.cont = res.data.data[i].content
                that.link = res.data.data[i].link
                res.data.data[i].c = true;
                console.log(that.link,"11")
                if(res.data.data[i].state == 1){
                  that.text = 1
                }else{
                  that.text = 2
                }
              }
            }
          that.list = res.data.data
          that.wid =  that.list.length*20
          that.liwid = 100/that.list.length-1.5
        }
    })
  },
  methods:{
    fanhui(){
        this.$router.go(-1)
      },
      xz(i){
        let that = this;
        axios.post(that.base_URL+"/interface/getPrivDetails",`privilegeId=${that.list[i].id}`).then(function(res){
          console.log(res)
          that.list = res.data.data
          that.id = that.list[i].id
          that.cont = that.list[i].content
          that.link = that.list[i].link
          console.log(that.link,"11")
           for(var a =0; a<that.list.length; a++){
           that.list[a].c = false;
        }
           that.list[i].c = true;
        })
      },
      qsy(link){
        console.log(link)
         window.location.href =  link
      }
  },
}
</script>

<style scoped lang="scss">
.box{
  display: flex;
  flex-direction:column;
  height:100%;
  overflow: hidden;
}
 #header{
  height:2.5rem;
  width:100%;
  background:#fff;
  position: relative;;
  color:1.1rem;
  font-weight:900;
  text-align: center;
  line-height: 2.5rem;
  span:nth-child(1){
    position: absolute;
    font-size:1.1rem;
    left:1.2rem;
  }
  // span:nth-child(3){
  //   position: absolute;
  //   font-size:1.1rem;
  //   right:1.2rem;
  // }
}
#list{
  overflow:hidden;
  width:100%;
  overflow-x:scroll;
  background:#fff;
  ul{
    width:160%;
    margin:0 5px;
    overflow: hidden;
    z-index:99;
    li{
      width:11%;
      float:left;
      padding-right:1.5%;
      >div{
        box-sizing:border-box;
        text-align: center;
        padding-top:.2rem;
        img{
        width:1.3rem;
        height:1.3rem;
      }
      p{
        font-size:.7rem;
        color:#CAC5C1;
        padding:.6rem 0 .8rem 0;
        letter-spacing:1px;
      }
      div{
        height:2px;
        background:#16D8BC;
        border-radius:1px;
        margin:0 3px;
      }
}
.col{
  color:#16D8BC;
}
      
    }
  }
}
 #list::-webkit-scrollbar {
        display: none;
    }
    #yy{
        width:100%;
      height:.4rem;
      background:linear-gradient(to bottom,#ece8e8,#a3715600);
    }
    .content{
      flex:1;
      color:#999;
      font-size:.8rem;
      letter-spacing:5px;
      line-height: 1.1rem;
      padding:.5rem 0 3rem 0;
      overflow: scroll;
    }
    #footer{
      position: fixed;
      bottom:0;
      width:100%;
      height:3rem;
      background:#fff;
      div{
        width:92%;
        height:2.4rem;
        margin:.3rem 4%;
        background:linear-gradient(to bottom,#38e0c9,#09ceb0);
        border-radius:.3rem;
        text-align: center;
        line-height:2.4rem;
        color:#fff;
        font-size:1rem;
      }
    }
</style>