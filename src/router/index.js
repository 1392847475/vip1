import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {//开通会员
      path: '/',
      name: 'Index',
      component: ()=> import('@/components/index')
    },
    {//权益详情
      path: '/introduce/:id',
      name: 'Introduce',
      component: ()=> import('@/components/introduce')
    },
    {//会员用户
      path: '/xindex',
      name: 'Xindex',
      component: ()=> import('@/components/xindex')
    },
    { //订单
      path: '/orderForm',
      name: 'OrderForm',
      component: ()=> import('@/components/OrderForm')
    },
    { //常见问题
      path: '/issue',
      name: 'Issue',
      component: ()=> import('@/components/issue')
    },
    {//协议
      path: '/protocol',
      name: 'Protocol',
      component: ()=> import('@/components/protocol')
    },
    {//支付
      path: '/pay',
      name: 'Pay',
      component: ()=> import('@/components/pay')
    },
    {//支付成功
      path: '/succeed',
      name: 'Succeed',
      component: ()=> import('@/components/succeed')
    },
  ]
})
