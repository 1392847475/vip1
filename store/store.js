import Vue from 'vue';
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state:{
		money:'',
		title:"",
		id : "",
		memberid:"",
	},
	mutations:{
		pay(state,skk){
			state.money = skk.yf;
			state.title = skk.tit;
			state.id = skk.orderid;
			state.memberid = skk.memberid;
		}
	}	
})
