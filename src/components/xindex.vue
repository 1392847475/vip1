<template>
  <div class="box">
    <div id="header">
      <div class="headtop">
        <span class="iconfont">&#xe60e;</span>
        <span>私家医生(助医版)</span>
        <span class="iconfont"  @click="gengduo()">&#xe65c;</span>
      </div>
      <div class="headcenter">
        <i class="iconfont">&#xe610;</i>
        <p @click="tongzhi(true)">{{tongz}}</p>
      </div>
      <div :style="{display:display}" class="gengduo">
        <p @click="href('http://plus.169000.net/user/order/list')">我的订单</p>
        <p @click="href('http://plus.169000.net/user/remind/toMyRemind')">我的提醒</p>
      </div>
      <div class="headbootom">
          <div>
            <div>
              <p>尊享  私家医生</p>
               <p>贴心就医助理服务</p>
              <p>有效期至{{time}}</p>
            </div>
            <div>
              <router-link tag="span" to='/orderForm'>立即续费</router-link>
            </div>
          </div>
          <ul>
            <li @click="href('http://plus.169000.net/user/collect')" >
              <p>{{followCount}}</p>
              <p>关注</p>
            </li>
            <li>
              <p>{{integral}}</p>
              <p>积分</p>
            </li>
            <!-- <li>
              <p>8</p>
              <p>优惠券</p>
            </li> -->
          </ul>
      </div>
    </div>
    <div id="content">
      <ul>
        <li  v-for="(item,index) in list" :key="index" @click ="routerr(item.id,item.name)">
          <div>
            <img :src="item.imageurl" alt="">
            <img v-if="item.haslogo == '1'" :src="item.logourl" alt="">
          </div>
          <p>{{item.name}}</p>
        </li>
      </ul>
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
      <div id="cntbot">
        <mt-swipe :auto="5000">
          <mt-swipe-item>
            <img @click="href('https://shop42414363.m.youzan.com/wscgoods/detail/35y2kcx1uke8j')" src="../assets/img/xiaobanner.jpg" alt="">
          </mt-swipe-item>
          <mt-swipe-item>
            <img @click="href('https://shop42414363.m.youzan.com/wscgoods/detail/35y2kcx1uke8j')" src="../assets/img/xiaobanner.jpg"  alt="">
          </mt-swipe-item>
          <!-- <mt-swipe-item>
            <img src="../assets/img/banner01.jpg" alt="">
          </mt-swipe-item> -->
        </mt-swipe>
      </div>
    </div>
    <!-- <div id="footer">
      <div class="fotquan">
        <p>
          会员专享券
          <span>更多></span>
        </p>
        <div>
          <ul>
            <li>
              <div>
                <p>会员专享</p>
                <p>￥<span>200</span></p>
                <p>满<span>200</span>元可用</p>
              </div>
              <div>立即领取</div>
              <div></div>
            </li>
            <li>

            </li>
            <li>

            </li>
            <li>

            </li>
        </ul>
        </div>
        
      </div>
      <div class="fothui">
        <p>
          会员特惠区
          <span>更多></span>
        </p>
        <ul>
          <li>
            <img src="../assets/img/dika1.png" alt="">
            <p class="ptop">萨莲纹丽霜 富含植物、酵母
预防妊娠纹孕妇护肤品50g</p>
            <p class="pcent">￥<span>598.00</span></p>
            <p class="pbot">原价:￥898.00</p>
          </li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </div> -->
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
  <div id="kjyy" v-show ="kjyy">
    <div>
        <div class="kjyy_header">
          选择你需要的服务
          <span class="iconfont" @click="onshow()">&#xe62b;</span>
        </div>
        <div class="kjyy_center">
          <div class="kjyy_list1">
            <p>热门专家</p>
            <ul >
              <li v-for="(item,i) in list1" :key = "i" @click="xuanze(i,1,item.expid)" :class ="{'border':isActive == i}">{{item.expName}}
                <img v-show ="isActive == i" src="../assets/img/xuanze.png">
              </li>
              
            </ul>
          </div>
          <div class="kjyy_list1 kjyy_list2">
            <p>收藏专家</p>
            <ul>
              <li v-for="(item,i) in list2" :key = "i" @click="xuanze(i,2,item.id)" :class ="{'border':iisActive == i}">{{item.name}}
                <img v-show ="iisActive == i" src="../assets/img/xuanze.png">
              </li>
              <li @click="href('http://plus.169000.net/user/collect')" >（更多）</li>
            </ul>
          </div>
          <div class="kjyy_list3">
              <p>搜索医生</p>
              <div>
                <div class="inp"> 
                  <span class="iconfont">&#xe602;</span>
                  <form @submit.prevent action="#">
                    <input  type="search" @blur="onblur()" v-model="val" @keypress="searchGoods" placeholder="请输入专家姓名" >
                  </form>
                  
                </div>
                <div class="inp2">
                  <p v-for ="(item,i) in list4" :key="i"  @click="popup(i)"><i>{{item}}</i><span  class="iconfont">&#xe60b;</span></p>
                </div>
              </div>
          </div>
        </div>
        <div class="open" @click="open()">
            进入
          </div>
    </div>
  </div>
   <mt-popup
  v-model="popupVisible"
  position="bottom"
  popup-transition="popup-fade"
 >
    <mt-picker class="boxpicker" :slots="slots" @change="onValuesChange" valueKey ="name"></mt-picker>
</mt-popup>
  </div>
</template>
<script>
import axios from "axios"
import Vue from 'vue';
import { Swipe, SwipeItem,Popup, Picker, Toast } from 'mint-ui';
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Popup.name, Popup);
Vue.component(Picker.name, Picker);
export default {
  name: 'Index',
  data () {
    return {
     tz:false,
     base_URL : process.env.API_URL,
     base_URLLL : process.env.API_URLLL,
     tongz:"",
     list:"",
     time:"",
     val:"",
     integral:"",
     followCount:"",
     display:"none",
     popupVisible:false,
     kjyy:false,
     isActive: -1,
     iisActive: -1,
     ysid:"",
     list1: "",//["张磊","赵坤","陈宇飞","张磊","赵坤","陈宇飞","张磊","赵坤"]
     list2:"",
     list3:{
       city:"",
       hospital:"",
       department:"",
       doctor:"",
     },
     list4:["城市","医院","科室","医生",],
     list5:["城市","医院","科室","医生",],
     cityid:"",
     hospitalid:"",
     departmentid:"",
     doctorid:"",
     index:-1,
      slots: [
        {
          flex: 1,
          values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
          className: 'slot1',
          textAlign: 'center'
        }
      ]
    }
  },
  watch: {
    val:function(value){//输入时清空专家ID
    //  console.log(value)
      if(value != ''){
        this.iisActive = this.isActive = -1
        this.ysid = ""
        this.doctorid = ""
        this.list4 = ["城市","医院","科室","医生"]
      }
    }
  },
  mounted(){
    let that = this
    //通知
    axios.post(this.base_URL+"/interface/listHorn").then(function(res){
     // console.log(res)
      if(res.data.resultCode == '000'){
        that.tongz = res.data.data.content
      }else{
         that.tongz = "暂无通知"
      }
    })
//列表
  axios.post(this.base_URL+"/interface/getPrivileges").then(function(res){
      //  console.log(res)
        if(res.data.resultCode == '000'){
          that.list = res.data.data
          console.log(that.list)
        }
    })
  //积分
  axios.post(this.base_URL+"/user/entrance/getMemberInfo").then(function(res){
      //  console.log(res,"1")
        if(res.data.resultCode == '000'){
           that.time = res.data.data.vipendday.substr(0,10)
           that.integral = res.data.data.integral
           that.followCount = res.data.data.followCount
        }
    })
    //快捷预约专家
    
axios.post(this.base_URL+"/interface/getHotDoctors").then(function(res){
       // console.log(res)
        if(res.data.resultCode == '000'){
         that.list1 = res.data.data
        }
    })

    //城市
axios.post(this.base_URL+"/guahao/cityList").then(function(res){
      //  console.log(res,"2")
        that.list3.city = res.data
        
    })
  },
  methods:{
    tongzhi(e){
     // console.log(e)
      this.tz = e
    },
    gengduo(){
      this.display = this.display == 'none'? 'block' : "none"
    },
    href(data){
      window.location.href =  data
    },
    routerr(id,name){
      console.log(name)
      if(name != "快捷预约"){
        this.$router.push('/introduce/'+id)
      }else{
        this.kjyy = true;
        let that = this;
           //收藏
axios.post(this.base_URL+"/interface/getSevenCollectExps").then(function(res){
      //  console.log(res)
        if(res.data.resultCode == '000'){
         that.list2 = res.data.data
        that.shoucang = false;
        }
    })
        
       
      }
    },
onblur() {
    document.body.scrollTop = 0
    window.scroll(0,0);
},
    onValuesChange(picker, values,) {
     //重新选择时 清空之后的选择
      if(this.index == 0){
         this.cityid = values[0].id
        if(this.list4[this.index] != values[0].name ){
           this.list4 = [values[0].name,"医院","科室","医生"]
          this.hospitalid = this.departmentid = this.doctorid = ""
         }else{
            this.list4[this.index] = values[0].name
         }
      }else if(this.index == 1){
        this.hospitalid = values[0].id

        // console.log(values[0].name,this.list4[this.index])
        if(this.list4[this.index] != values[0].name){
           this.list4[this.index+1] = "科室"
        this.list4[this.index+2] = "医生"
        this.departmentid = this.doctorid = ""
        this.list4[this.index] = values[0].name
        }else{
          this.list4[this.index] = values[0].name
        }
       
      }else if(this.index == 2){
        this.departmentid = values[0].id

        if(this.list4[this.index] != values[0].name){
           this.list4[this.index+1] = "医生"
        this.doctorid = ""
        this.list4[this.index] = values[0].name
        }else{
          this.list4[this.index] = values[0].name
        }
      }else if(this.index == 3){
        this.doctorid = values[0].id
        this.list4[this.index] = values[0].name
      }
      
    },
    onshow(){
      this.kjyy = false;
    },
    popup(i){
      let that = this
      //清空热门 收藏 搜索内容
      this.iisActive = this.isActive = -1
      this.val = ""
      console.log(this.list3.city)
      if(i == 0){
         //点击打开选择框
        this.popupVisible = true;
        this.index = i
        //console.log(city,"33")
       this.slots[0].values = this.list3.city
      }else if(i == 1){
        if(this.list4[i-1] != "城市"){
           //点击打开选择框
        axios.post(this.base_URL+'/guahao/hospList',`cityid=${this.cityid}`).then(function(res){
       // console.log(res,"2")
        that.index = i
        that.popupVisible = true;
        that.slots[0].values = res.data.hospitalList
       })}else{
         Toast({
            message: '请先选择城市',
            duration: 1000
          });
       }
      }else if(i == 2){
        if(this.list4[i-1] != "医院"){
           //点击打开选择框
        axios.post(this.base_URL+'/guahao/deptListForMember',`hosid=${this.hospitalid}`).then(function(res){
      //  console.log(res,"3")
        that.index = i
        that.popupVisible = true;
        that.slots[0].values = res.data.deptList
      })}else{
         Toast({
            message: '请先选择医院',
            duration: 1000
          });
       }
      }else if(i == 3){
        if(this.list4[i-1] != "科室"){
           //点击打开选择框
        axios.post(this.base_URL+'/guahao/experList',`hosid=${this.hospitalid}&deptid=${this.departmentid}`).then(function(res){
      //  console.log(res,"4")
        that.index = i
        that.popupVisible = true;
        that.slots[0].values = res.data.expertList
      })}else{
         Toast({
            message: '请先选择科室',
            duration: 1000
          });
       }
      }
    },
    //热门和收藏 选中切换
    xuanze(i,b,id){
      if(b == 1){
        this.isActive = i
        this.iisActive = -1
      }else{
        this.iisActive = i
        this.isActive = -1
      }
       this.val = ""
       this.ysid = id
       this.doctorid = ""
       this.list4 = ["城市","医院","科室","医生"]
    },
    //进入
    open(){
      //专家和热门
      if(this.ysid != ""){
        window.location.href =  `http://plus.169000.net/guahao/findexperById/${this.ysid}`
      }else if(this.val != ""){//搜索框进入
        let val = encodeURI(this.val)
        window.location.href =  `http://plus.169000.net/user/remind/search?word=${val}&jumpType=kjyy`
      }else if(this.doctorid != ""){
       window.location.href =  `http://plus.169000.net/guahao/findexperById/${this.doctorid}` 
      }else{
        Toast({
            message: '查找专家不能为空',
            duration: 1000
          });
      }
    },
    searchGoods(event) { 
      if (event.keyCode == 13) { //如果按的是enter键 13是enter 
          event.preventDefault(); //禁止默认事件（默认是换行） 
        //  console.log(event.target.value)
          if(event.target.value != ""){
            let val = encodeURI(event.target.value)
            document.activeElement.blur();
            window.location.href =  `http://plus.169000.net/user/remind/search?word=${val}&jumpType=kjyy`
          }
      } 
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
      color:#F9FEFD;
      >div{
        overflow: hidden;
        margin:1rem;
        div:nth-child(1){
          float:left;
          p:nth-child(1){
            font-size:1.2rem;
            padding-top:.3rem;
          }
          p:nth-child(2){
            font-size:.75rem;
            line-height:2.2rem;
          }
          p:nth-child(3){
            font-size:.6rem;
            color:#D0F6F1;
          }
        }
        div:nth-child(2){
          float:right;
          height:3.9rem;
          span{
            display:inline-block;
            height: 1.4rem;
            font-size:.8rem;
            font-weight:900;
            color:#09AC94;
            background:#E5F0EE;
            padding:0 1.2rem;
            line-height: 1.4rem;
            border-radius: .7rem;
            margin-top:1.3rem;
            padding-top: .2rem;
          }
        }
      }
      ul{
        overflow: hidden;
        width:80%;
        margin:.5rem 10%;
        display: flex;
        justify-content:space-around;//space-between
        li{
          text-align: center;
          line-height: 1.5rem;
          font-size:.9rem;
        }
      }
  }
}
#content{
  background:#f3f3f3;
  margin:2rem  0;
  ul{
    background:#fff;
    padding:1rem 1rem 0 1rem;
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
  background:#fff;
  margin:.8rem auto;
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
.mint-popup{
  width:100%;
}
#kjyy{
   position: fixed;
  top:0;
  width:100%;
  height:100%;
  background:rgba(51,51,51,.8);
  >div{
     width:90%;
    height:32rem;
    position: absolute;
    background:#E7EBEE;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    border-radius:1rem;
    overflow: hidden;
    .kjyy_header{
      height:8rem;
      background:url(../assets/img/banner00.png) center/cover;
      font-weight:900;
      line-height: 7rem;
      font-size:1.1rem;
      text-align:center;
      color:#000;
      span{
        position: absolute;
        padding:.5rem;
        right:.5rem;
        top:.5rem;
        line-height:1rem;
        font-size:.9rem;
        color:#797979;
      }
    }
    .kjyy_center{
      margin:0 .8rem;
      .kjyy_list1{
        display: flex;
        border-bottom:1px dashed #BFBFBF;
        padding-bottom:.5rem;
        p{
          width:1rem;
          font-weight:900;
          font-size:.95rem;
          color:#000;
          line-height:1.15rem;
        }
        ul{
          flex:1;
          li{
            letter-spacing:.1rem;
            float:left;
            width:22%;
            height:1.8rem;
            line-height: 1.8rem;
            text-align: center;
            margin-left:3%;
            margin-bottom:.6rem;
            font-size:.85rem;
            color:#999999;
            background:#fff;
            border:1px solid #DBDBDB;
            border-radius:.4rem;
            box-sizing: border-box;
            position: relative;
            img{
              position: absolute;
              bottom:0;
              right:0;
              width:.8rem;
            }
          }
          .border{
            border:1px solid #2DCCB5;
          }
        }
      }
      .kjyy_list2{
        margin-top:1rem;
        li:last-child{
          letter-spacing:.1rem;
          border:none;
          background:none;
        }
      }
      .kjyy_list3{
        margin-top:1rem;
         display: flex;
        >p{
          width:1rem;
          font-weight:900;
          font-size:.95rem;
          color:#000;
          line-height:1.15rem;
          padding-top:1rem;
        }
        >div{
          flex:1;
          padding-left:3%;
           color:#C2C2C2;
          .inp{
            width:100%;
            background:#fff;
            border:1px solid #DBDBDB;
            border-radius:.4rem;
            padding:.2rem 0;
            position: relative;
            input{
              margin-left:15%;
              width:75%;
              height:1.5rem;
              font-size:.9rem;
            }
            input::-webkit-input-placeholder { /* WebKit browsers */ 
            color: #C2C2C2; } 
            input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */ 
            color: #C2C2C2; } 
            input::-moz-placeholder { /* Mozilla Firefox 19+ */ 
            color: #C2C2C2; } 
            input:-ms-input-placeholder { /* Internet Explorer 10+ */ 
            color: #C2C2C2; } 
            input[type=search]::-webkit-search-cancel-button{
    -webkit-appearance: none;/*此处只是去掉默认的小×*/
}
            span{
              position: absolute;
              line-height: 1.5rem;
              left:4%;
            }
          }
          .inp2{
            overflow: hidden;
            p{
              width:45%;
              margin-top:.3rem;
              float: left;
              background:#fff;
              padding:.3rem .4rem;
              border:1px solid #DBDBDB;
              border-radius:.4rem;
              box-sizing: border-box;
              padding-right:1rem;
              font-size:.9rem;
              position: relative;
              i{
                overflow: hidden;
                white-space:nowrap;
                width:88%;
                display: inline-block;
                line-height:1.2rem;
                text-indent: .3rem;
                padding-top: .2rem;
              }
              span{
                position: absolute;
                color:#999999;
                font-size:1.4rem;
                right:.4rem;
              }
            }
            P:nth-child(2),P:nth-child(4){
              margin-left:10%;
            }
          }
        }
      }
    }
    .open{
        position: absolute;
        bottom:0;
        width:100%;
        line-height: 3rem;
        height:3rem;
        color:#888888;
        background:#DDE0E2;
        text-align: center;
        letter-spacing:1rem;
        font-weight:900;
      }
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
#cntbot{
  height:7.5rem;
  width:100%;
  position: relative;
  img{
    width:100%;
  }
}
#footer{
  margin-top:.3rem;
  background:#fff;
.fotquan{
  >p{
    text-align: center;
    line-height: 2rem;
    color:#464C5A;
    font-weight:900;
    span{
      position:absolute;
      right:1rem;
      color:#999999;
      font-size:.7rem;
    }
  }
 >div{
     overflow-x:scroll;
     width:100%;
     margin:1rem 0 1rem .8rem;
     ul{
       overflow: hidden;
       width:40rem;
       li{
         position: relative;
         float: left;
         width:8rem;
         background:linear-gradient(to bottom,#FBE2B4,#FEC45A);
         height:4.2rem;
         margin-left:.3rem;
         >div:nth-child(1){
           width:6.4rem;
           float:left;
           background:linear-gradient(to bottom,#FBE2B4,#FEC45A);
           p:nth-child(1){
             font-size:.6rem;
             letter-spacing:0;
             color:#FFB937;
             background:#213448;
             width:3.5rem;
             padding-left:.2rem;
             line-height: 1rem;
             border-radius: 0 0 .9rem 0;
           }
           p:nth-child(2){
             font-size:.6rem;
              color:#213448;
              padding-left:.6rem;
             line-height: 1.6rem;
            font-weight:900;
             span{
               font-size:1.2rem;
             }
           }
           p:nth-child(3) {
             font-size:.6rem;
              color:#907866;
              padding-left:.6rem;
          }
         }
         >div:nth-child(2){
           height:3.6rem;
           float:right;
           width:.8rem;
           color:#213448;
           font-size:.8rem;
           font-weight:900;
           line-height: .9rem;
           padding:.35rem .4rem;
           background:linear-gradient(to right,#F6B647,#FDD08C);
         }
         >div:nth-child(3){
           width:.7rem;
           height:.7rem;
           background:#fff;
           position:absolute;
           left:-.3rem;
           top:2rem;
           border-radius: 50%;
         }
       }
     }
 }
}
.fothui{
  >p{
    text-align: center;
    line-height: 2rem;
    color:#464C5A;
    font-weight:900;
    span{
      position:absolute;
      right:1rem;
      color:#999999;
      font-size:.7rem;
    }
  }
  ul{
    overflow: hidden;
    margin:.5rem 5% 1rem 5%;
    width:90%;
    li{
      float: left;
      width:49%;
      margin:0 2% .3rem 0;
      background:#F8F8F8;
      img{
        width:100%;
        height:9rem;
      }
    .ptop{
      margin:.4rem .4rem  0 .4rem;
      color:#000;
      font-size:.75rem;
      line-height: 1rem;
    }
    .pcent{
      color:#464C5A;
      font-size:.7rem;
      font-weight:900;
      line-height: 1.2rem;
      padding-left:.4rem;
      span{
        font-size:.85rem;
      }
    }
    .pbot{
      padding:0 0 .5rem .4rem;
      color:#999999;
      font-size:.6rem;
      line-height: 1rem;

    }

    }
  }
}
}

</style>