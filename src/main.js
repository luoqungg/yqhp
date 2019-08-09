// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '../src/assets/scss/base.scss'
import Vuex from 'vuex'

Vue.config.productionTip = false

// import { getHotKey, getHomeData, getMv, getList } from './api/api'
// getHomeData().then(res => {
//   console.log(res)
// })
// getMv()
// getList()

import './api/dealHomeInfo'

// Popover
import { Input, Icon, Button, Dialog, Message, Popover, Carousel, CarouselItem, MessageBox } from 'element-ui'
Vue.use(Input)
Vue.use(Icon)
Vue.use(Button)
Vue.use(Dialog)
Vue.use(Popover)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.prototype.$message = Message
Vue.prototype.$msgbox = MessageBox
// Vue.prototype.$window = window
Vue.use(Vuex)

import Axios from 'axios'
Vue.prototype.$axios = Axios


//JSON.parse(sessionStorage.getItem('user'))
const state = {
  user: JSON.parse(sessionStorage.getItem('user')),
  isLogin: false,
  playlist: [],
  showHeader: true
}
const mutations = {
  saveUser(state, user) {  // 将登录的账号保存到session中，防止f5刷新数据消失
    state.user = user
    sessionStorage.setItem('user', JSON.stringify(user))
  },
  isLogin(state, bool) { // 保存登录状态
    state.isLogin = bool
  },
  setPlayList(state, list) { // 保存播放列表所有的歌曲
    state.playlist = list
  },
  // 添加单首歌曲
  addSongToList(state, song) {
    state.playlist.push(song)
  },

  hideHeader(state) {
    state.showHeader = false
  },
  showHeader(state) {
    state.showHeader = true
  }
}
const getters = {
  isLogin(state) { // 获取登录状态
    return state.isLogin
  },
  getUser(state) { // 获取登录信息
    return state.user
  },
  getPlayList(state) { // 获取播放列表的歌曲
    return state.playlist
  },
  showHeader(state) {
    return state.showHeader
  }
}

const actions = {
  setUser(context, user) {
    context.commit('saveUser', user)
  },

  isLogin(context, bool) {
    context.commit('isLogin', bool)
  },

  setPlayList(context, list) {
    context.commit('setPlayList', list)
  },

  addSongToList(context, song) {
    context.commit('addSongToList', song)
  },

  hideHeader(context) {
    context.commit('hideHeader')
  },

  showHeader(context) {
    context.commit('showHeader')
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
