<template>
  <div class="box">
    <div id="header">
      <div class="headtop">
        <span class="iconfont">&#xe60e;</span>
        <span>私家医生(助医版)</span>
        <span class="iconfont" @click="gengduo()">&#xe65c;</span>
      </div>
      <div class="headcenter">
        <i class="iconfont">&#xe610;</i>
        <p @click="tongzhi(true)">{{tongz}}</p>
      </div>
      <div class="headbootom">
          <img src="../assets/img/yvKang.png" alt="">
          <!-- <p>预康169Plus会员•尊享<span>{{num}}</span>项特权</p> -->
          <p>贴心就医助理服务</p>
          <router-link tag="div" to='/orderForm'>立即开通</router-link>
      </div>
      <div :style="{display:display}" class="gengduo">
        <p @click="href('http://plus.169000.net/user/order/list')">我的订单</p>
        <p @click="href('http://plus.169000.net/user/remind/toMyRemind')">我的提醒</p>
      </div>
    </div>
    <div id="content">
      <ul>
        <router-link tag="li" :to="'/introduce/'+item.id" v-for="(item,index) in list" :key="index" >
          <div>
            <img :src="item.imageurl" alt="">
            <img v-if="item.haslogo == '1'" :src="item.logourl" alt="">
          </div>
          <p>{{item.name}}</p>
        </router-link>
      </ul>
    </div>
  <router-link to="/issue" tag="div" id="issue">
     <div>
       <p class="iconfont">&#xe61f;</p>
     </div>
     <div>
       <p>常见问题答疑</p>
       <p>可以点击查看常见问题哟</p>
     </div>
     <div>
       <p class="iconfont">&#xe645;</p>
     </div>
  </router-link>
  
  <div id="footer">
    <p>￥<span>19.9</span>/月</p>
    <router-link tag="p" to='/orderForm'>立即开通</router-link>
  </div>
  <transition enter-active-class="animated zoomIn" leave-active-class="animated zoomOut" :duration="{ enter: 800, leave: 500 }">
  <div id="tongzhi"  v-show="tz" >
    <div>
    <div>
      <p>通知</p>
      <p>{{tongz}}</p>
      <p @click="tongzhi(false)">我知道了</p>
    </div>
    <p class="iconfont" @click="tongzhi(false)">&#xe60a;</p>
    </div>
  </div>
  </transition>
  </div>
</template>
<script>
import axios from "axios"
export default {
  name: 'Index',
  data () {
    return {
     tz:false,
     base_URL : process.env.API_URL,
     tongz:"",
     list:"",
     num:"",
     display:"none",
    }
  },
  watch: {

  },
  mounted(){
    let that = this
    axios.post(this.base_URL+"/interface/listHorn").then(function(res){
      console.log(res)
      if(res.data.resultCode == '000'){
        that.tongz = res.data.data.content
      }else{
         that.tongz = "暂无通知"
      }
    })

    axios.post(this.base_URL+"/interface/getPrivileges").then(function(res){
        console.log(res)
        if(res.data.resultCode == '000'){
          that.list = res.data.data
          that.num = that.list.length
        }
    })
  },
  methods:{
    tongzhi(e){
      console.log(e)
      this.tz = e
    },
    gengduo(){
      this.display = this.display == 'none'? 'block' : "none"
    },
    href(data){
      window.location.href =  data
    }
  },
}
</script>

<style scoped lang="scss">
.box{
  background:#F3F3F3;
  padding-bottom: 3.5rem;
}
#header{
  position: relative;
  width:100%;
  height:14rem;
  background:linear-gradient(to right,#DAF6F2,#E8FCF9,#DAF6F2);
  .gengduo{
    position: absolute;
    right:.3rem;
    top:2.5rem;
    background:#fff;
    line-height: 2rem;
    padding: 0 .6rem;
    text-align: center;
    font-size: .8rem;
    color: #333;
    font-weight: 900;
    border-radius: .5rem;
    z-index:99;
    p{
      border-bottom:1px solid #ccc;
    }
  }
  .headtop{
    padding:.7rem;
    color:#333;
    font-weight:600;
    font-size:1.1rem;
    text-align: center;
     position: relative;
    span:nth-child(1){
      float: left;
      
      font-size:1.3rem;
    }
    span:nth-child(2){
      letter-spacing:0.07rem;
    }
    span:nth-child(3){
      float: right;
      font-size:1.3rem;
    }
  }
  .headcenter{
    width:90%;
    margin:0 auto;
    margin-top:.7rem;
    height:1.4rem;
    border-radius:1rem;
    padding:.2rem 0;
    background:rgba(42,32,46,.3);
    color:#fff;
    font-size:.7rem;
    line-height: 1.4rem;
    position: relative;
    i{
      font-size:.8rem;
      position: absolute;
      left:.8rem;
      top:.3rem;
    }
    p{
      color:#E9EDEC;
      overflow:hidden;
      white-space:nowrap;
        text-overflow:ellipsis;
        padding-left:2rem;
    }
  }
  .headbootom{
      position: absolute;
      left:4%;
      bottom:-1.5rem;
      width:92%;
      height:10rem;
      font-size:1rem;
      background:url(../assets/img/dika1.png)no-repeat center/cover;
      border-radius:1rem;
      img{
        width:58%;
        margin:1.5rem 0 0 23%;
      }
      p{
        font-size:.75rem;
        color:#FBFBFC;
        text-align: center;
        margin:1rem 0 1.5rem 0;
      }
      div{
        font-size:.85rem;
        width:32%;
        margin:0 auto;
        font-weight:900;
        height:1.6rem;
        text-align: center;
        line-height: 1.6rem;
        color:#FBFBFC;
        border-radius: 1rem;
        border:1px solid #FBFBFC;
      }
  }
}
#content{
  background:#fff;
  padding:2rem 0 1rem 0;
  ul{
    padding:1rem;
    overflow: hidden;
    width:90%;
    margin:0 auto;
    li{
      float: left;
      width:25%;
      height:6rem;
      div{
        width:3rem;
        height:3rem;
        margin:0 auto;
        position: relative;
        background:#E4EFEE;
        border-radius:50%;
        img:nth-child(1){
          width:50%;
          height:50%;
          margin:25%;

        }
        img:nth-child(2){
          position: absolute;
         height:1rem;
         left:2rem;
         top:-.5rem;
        }
      }
      p{
        font-size:.8rem;
        color:#333;
        font-weight:900;
        margin:.6rem 0;
        text-align:center;
        letter-spacing:0.05rem;
      }
    }
  }
}
#issue{
  width:85%;
  margin:0 auto;
  background:#fff;
  margin-top:.8rem;
 
  padding:1.5rem .8rem;
  overflow: hidden;
  div{
    float:left;
  }
  div:nth-child(1){
    width:15%;
    p{
      font-size:2.2rem;
      font-weight:900;
      color:#16D8BC;
      padding-top:.2rem;
    }
  }
  div:nth-child(2){
    width:81%;
    p:nth-child(1){
      font-size:.95rem;
      line-height: 1.2rem;
      font-weight:900;
      color:#444;
      letter-spacing:0.05rem;
    }
    p:nth-child(2){
      font-size:.7rem;
      color:#999999;
      padding-top:.3rem;
    }
  }
  div:nth-child(3){
    width:4%;
    text-align: center;
    p{
      font-size:1.5rem;
      padding-top:.5rem;
      color:#666;
    }
  }
}
#footer{
  width:100%;
  height:3rem;
  background:#fff;
  position:fixed;
  bottom:0;
  p{
    width:50%;
    height:100%;
    float: left;
    text-align: center;
    line-height: 3rem;
    font-weight:900;
  }
  p:nth-child(1){
    color:#16D8BC;
    font-size:1rem;
     letter-spacing:0.05rem;
    span{
      font-size:1.6rem;
    }
  }
  p:nth-child(2){
    color:#fff;
    background:#FFB937;
    font-size:1rem;
    letter-spacing:0.15rem;
  }
}
#tongzhi{
  
  position: fixed;
  top:0;
  width:100%;
  height:100%;
  background:rgba(51,51,51,.8);
  >div{
    width:80%;
    height:20rem;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
      div{
        background:#fff;
        border-radius:1rem;
        padding-bottom:1rem;
        margin-bottom:1rem;
        color:#333;
        p:nth-child(1){
          line-height:3rem;
          text-align: center;
          font-size:1.2rem;
          font-weight:900;
          border-bottom:1px solid #ccc;
        }
        p:nth-child(2){
          color:#000;
          line-height:1.2rem;
          font-size:.75rem;
          padding:1rem;
        }
        p:nth-child(3){
          color:#fff;
          height:2.2rem;
          font-size:.95rem;
          width:48%;
          background:#16D8BC;
          border-radius:.4rem;
          margin-left:26%;
          line-height: 2.2rem;
          text-align: center;
        }
      }
      >p{
        text-align: center;
        font-size:2rem;
        color:#fff;
      }
  }
}
</style>