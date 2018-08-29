import * as types from '../mutation-types'
import localdb from '@/localstore'
import loginService from '@/service/LoginService';
const state = {
  loginAuth: {},//当前已经添加的照片或视频
  loginStaff: {},
  loginStaffName:'',
  loginCompanyId:0,
  loginStatus: 'init'
}
const getters = {
  getLoginAuth: state => {
    return state.loginAuth
  }
}
const mutations = {
  [types.LOGIN_AUTH](state, loginAuth) {
    state.loginAuth = loginAuth
  },
  [types.LOGIN_STAFF](state, staff) {
    state.loginStaff = staff
    state.loginStaffName = staff.staffName
    state.loginCompanyId = staff.companyId
    state.loginStatus = 'success'
    window.localStorage.setItem('loginCompanyId',staff.companyId);
  }
}
const actions = {
  setLoginAuth ({ state, commit },loginAuth) {
    loginAuth['login_time'] = Date.now()
    localdb.set('loginAuth',loginAuth);
    commit(types.LOGIN_AUTH, loginAuth)
  },
  setLoginStaff({ state, commit }, staff){
    console.log('set login staff .......... ', staff)
    localdb.set('loginStaff',staff);
    commit(types.LOGIN_STAFF, staff)
  },
  getLoginStaff({ state, commit}){
    return state.loginStaff
  },
  async findLoginStaff({ state, commit},params) {
    try{
      let {access_token,refresh_token} = params;
      loginService.setAccessToken(access_token);
      let result = await loginService.findLoginStaff();
      let loginStaff = result.data.result;
      commit(types.LOGIN_STAFF, loginStaff)
    } catch(ex){
      console.error('..............',ex);
    }
  }
}
export default {
  state,
  getters,
  mutations,
  actions
}
