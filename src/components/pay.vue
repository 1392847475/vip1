<template>
  <div class="box">
    <div id="header">
      <span class="iconfont" @click="fanhui()">&#xe60e;</span>
      <span>私家医生(助医版)中心</span>
    </div>
    <div id="yx">{{title}}</div>
    <div id="list">
      <div class="list1">请选择支付方式</div>
      <ul class="list2">
        <li>
          <svg class="icon svg1" aria-hidden="true">
            <use xlink:href="#icon-cl-wx"></use>
          </svg>
          <span>微信支付</span>
          <svg class="icon svg2" aria-hidden="true">
            <use xlink:href="#icon-duihao-copy"></use>
          </svg>
        </li>
        <!-- <li>
          <svg class="icon svg1" aria-hidden="true">
            <use xlink:href="#icon-cl-wx"></use>
          </svg>
          <span>支付宝支付</span>
          <svg class="icon svg2" aria-hidden="true">
            <use xlink:href="#icon-yuan-active"></use>
          </svg>
          </li> -->
      </ul>
      <div class="list3">
        <span>支付金额</span>
        <span>￥{{money}}</span>
      </div>
      <p> 购买即视为同意<router-link tag="span" to="/protocol">《私家医生(助医版)用户协议》</router-link></p>
    </div>
    <div id="footer" @click="pay()">确认支付</div>
  </div>
</template>
<script>
import Vue from 'vue'
import axios from "axios"
import wx from 'weixin-js-sdk';
import { MessageBox } from 'mint-ui';
import '../assets/iconfont/iconfont.js'
export default {
  name: 'Pay',
  data () {
    return {
     base_URL : process.env.API_URL,
     base_URLL : process.env.API_URLL,
     p:true,
    }
  },
  watch: {

  },
  computed:{
    money(){
      return this.$store.state.money
    },
    title(){
      return this.$store.state.title
    },
  },
  mounted(){
    var str=location.href;
    var num=str.indexOf("=")
    str = str.substr(num+1);
    // alert(str);
    if(str == 'yes'){
      this.$router.push('succeed')
    }else if(this.$store.state.money == ''){
       this.$router.push('orderForm')
     }
  },
  methods:{
    fanhui(){
        this.$router.go(-1)
      },
      pay(){
        if(this.p){
          this.p = !this.p
           //检测环境
          if (navigator.userAgent.indexOf("MicroMessenger") != -1) {
	        this.pay_weixin();//微信浏览器支付
	    } else {
	        this.pay_other();//其他浏览器H5支付
        }
        }
     

      },
      pay_weixin(){
        let that = this
        let url = this.base_URLL+"/user/payOrder/wxPayOrder";
        axios.post(url,`orderid=${this.$store.state.id}&productid=${this.$store.state.memberid}`).then(function(res){
            console.log(res)
          if(res.data.resultCode == "000"){
                that.weixinpay(res.data.data)
            }
        })
      },
      weixinpay(data){
        let that = this;
        if (typeof WeixinJSBridge == "undefined") {
            if (document.addEventListener) {
                document.addEventListener("WeixinJSBridgeReady",that.onBridgeReady(data),false);
            } else if (document.attachEvent) {
                document.attachEvent("WeixinJSBridgeReady",that.onBridgeReady(data));
                document.attachEvent("onWeixinJSBridgeReady",that.onBridgeReady(data));
            }
        } else {
            that.onBridgeReady(data);
        }
      },
      onBridgeReady(data){
        let that = this
         WeixinJSBridge.invoke(
            "getBrandWCPayRequest",
            {
                appId: data.appId, //公众号名称，由商户传入
                timeStamp: data.timeStamp, //时间戳，自1970年以来的秒数
                nonceStr: data.nonceStr, //随机串
                package: data.package, //订单详情扩展字符串
                signType: data.signType, //微信签名方式：
                paySign: data.paySign, //微信签名
            },
            function(res) {
              console.log(res)
                if(res.err_msg == "get_brand_wcpay_request:ok"){
                  that.$store.commit('pay',{yf:""})

                    that.$router.push('succeed')
                }else if(res.err_msg == "get_brand_wcpay_request:cancel"){
                 
                    //取消
                    that.$router.go(-1)
                    
                }else if(res.err_msg == "get_brand_wcpay_request:fail"){
                   
                      //失败
                    that.$router.go(-1)
                 
                }
            }
        );
      },
      //H5支付
      pay_other(){
        let url = this.base_URLL+"/user/payOrder/wxMwebPay"
        axios.post(url,`orderid=${this.$store.state.id}&productid=${this.$store.state.memberid}`).then(res=>{
          console.log(res)
          window.location.replace(res.data.data.payUrl+'&redirect_url='+encodeURIComponent(window.location.href+'?pay=yes'))
        })
      }
      
    
  },
}
</script>

<style scoped lang="scss">
.box{
  height:100%;
  background:#fff;
}
#header{
  height:2.5rem;
  background:#fff;
  font-weight:900;
  text-align: center;
  line-height: 2.5rem;
  span:nth-child(1){
    position: absolute;
    font-size:1.1rem;
    left:1.2rem;
  }
}
#yx{
  height:2.5rem;
  background:#F3F3F3;
  line-height: 2.5rem;
  padding-left:1rem;
  font-size:.9rem;
  color:#333333;
}
#list{
  div{
    height:2.6rem;
    line-height: 2.5rem;
    font-size:.9rem;
    color:#333;
    border-bottom:1px solid #CCCCCC;
    padding:0 1rem;
    letter-spacing:0;
  }
  ul{
    li{
      position: relative;
      height:2.6rem;
    line-height: 2.5rem;
    padding:0 1rem;
    border-bottom:1px solid #CCCCCC;
    span:nth-child(2){
      letter-spacing:0;
      color:#747474;
      padding-left:2.5rem;
    }
    >svg{
      height:1.8rem;
      width:1.8rem;
      position: absolute;
    }
    >.svg1{
      top:.4rem;
    }
    >.svg2{
          height:1.2rem;
          width:1.2rem;
          top:.7rem;
          right:1rem;
        }
    }
  }
  .list1{
    border-top:1px solid #CCCCCC;
  }
  .list3{
    span{
      letter-spacing:0;
    }
    span:nth-child(2){
      float:right;
      color:#F98D3A;
    }
  }
  p{
    text-align: center;
    font-size:.7rem;
    line-height: 3rem;
    color:#333333;
    letter-spacing:0;
    span{
      color:#FE5C08;
      
    }
  }
}
#footer{
  position: fixed;
  bottom:0;
  height:2.5rem;
  width:100%;
  background:#FFB937;
  color:#fff;
  line-height: 2.5rem;
  text-align: center;
}
</style>