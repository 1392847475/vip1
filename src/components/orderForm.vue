<template>
  <div class="">
    <div id="header">
      <div>
        <span @click="fanhui()" class="iconfont">&#xe60e;</span>
        <p>确认订单</p>
      </div>
      <p></p>
      <ul>
        <li :class="{'liborder':item.e}" v-for="(item , i) in list" :key="i" @click="xz(i)">
          <p>{{item.cardname}}</p>
          <div>
            <p>优惠价:<span>￥</span><span>{{item.present_price}}</span></p>
            <p><s>{{item.original_price}}</s></p>
          </div>
          <img :src="item.logourl" alt="" v-if="item.haslogo == '1'">
        </li>
      </ul>
    </div>
    <div id="footer">
    <p>应付金额<span>￥</span><span>{{yf}}</span></p>
    <p @click="pay()">去支付</p>
  </div>
  </div>
</template>
<script>
import axios from "axios"
import { MessageBox } from 'mint-ui';
export default {
  name: 'OrderForm',
  data () {
    return {
    list:"",
     yf : '',
     base_URL : process.env.API_URL,
     title:"",
     memberid:"",
     state:"",
    }
  },
  watch: {

  },
  
  mounted(){
    let that = this
    
    axios.post(this.base_URL+"/interface/getOrderForm").then(function(res){
      console.log(res)
      if(res.data.resultCode == "000"){
        for(var i=0;i<res.data.data.length;i++){
          res.data.data[i].e = false
          res.data.data[0].e = true
        }
         that.state = res.data.vipstate
          that.list = res.data.data
          that.title = that.list[0].cardname
          that.yf = that.list[0].present_price
          that.memberid = that.list[0].id
      }
    })

     if (window.history && window.history.pushState) {
    history.pushState(null, null, document.URL);
    window.addEventListener('popstate', this.fun, false);//false阻止默认事件
  }

  },
  destroyed(){
  window.removeEventListener('popstate', this.fun, false);//false阻止默认事件
},
  methods:{
     fun(){
    console.log("监听到了");
     if(this.state == 1){
        this.$router.push('xindex')
      }else{
        this.$router.push('/')
      }
  },
    fanhui(){
      if(this.state == 1){
        this.$router.push('xindex')
      }else{
        this.$router.push('/')
      }
        
      },
    xz(i){
      for(var a=0;a<this.list.length;a++){
        this.list[a].e = false
      }
      this.list[i].e = true
      this.yf = this.list[i].present_price
      this.title = this.list[i].cardname
      this.memberid = this.list[i].id
    },
    pay(){
      
      let that = this
      axios.post(this.base_URL+"/user/payOrder/toPay").then(function(res){
        console.log(res)
        if(res.data.resultCode == "000"){
          if(that.yf != ""){
             that.$store.commit('pay',{yf:that.yf,tit:that.title,orderid:res.data.data.orderid,memberid:that.memberid})

          that.$router.push({path:"/pay"})
          }else{
            MessageBox.alert('未选择订单，请刷新重试').then(action => {
              that.$router.go(-1)
            });
          }
         
        }
      })
    }
    
  },
}
</script>

<style scoped lang="scss">
#header{
  background:#f3f3f3;
 position: relative;
  >div{
    position: absolute;
    top:0;
    width:100%;
    height:2.5rem;
    line-height: 2.5rem;
    text-align: center;
    font-weight:900;
    z-index:9;
    span{
      position: absolute;
      left:1rem;
    }
  }
  >p{
    position:absolute;
    top:0;
    background:linear-gradient(to right,#DAF6F2,#E8FCF9,#DAF6F2);
    height:20rem;
    width:100%;
  }
  ul{
    padding:3rem 0 4rem 0;
    li{
      width:90%;
      margin:1rem 5%;
      background:#fff;
      border-radius:.2rem;
      height:3.5rem;
      position: relative;
      >p{
        line-height: 3.5rem;
        font-size:.8rem;
        color:#28354C;
        float:left;
        padding-left:.5rem;
        letter-spacing:.1rem;
      }
      >div{
        float:right;
        padding:.7rem 1rem .7rem 0;
       
        p:nth-child(1){
          color:#FF695C;
          font-size:.7rem;
          letter-spacing:.1rem;
          span{
            font-size:1rem;
            font-weight:900;
          }
        }
         p:nth-child(2){
           text-align: right;
           letter-spacing:.1rem;
            s{
            font-size:.6rem;
            color:#999999;
            padding-right:.6rem;
          }
         }
      }
      img{
        position: absolute;
        height:1.2rem;
        width:4rem;
        top:-.6rem;
        left:-2px;
      }
    }
    .liborder{
      border:2px solid #FC6214;
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
   //font-weight:900;
  }
  p:nth-child(1){
    color:#333;
    font-size:.77rem;
    letter-spacing:0.05rem;
    span:nth-child(1){
      font-size:.7rem;
      color:#FF695C;
    }
    span:nth-child(2){
      font-size:1.4rem;
      color:#FF695C;
    }
  }
  p:nth-child(2){
    color:#fff;
    background:#FFB937;
    font-size:1rem;
    letter-spacing:0.15rem;
  }
}
</style>