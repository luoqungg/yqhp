import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import PlayList from '../components/PlayList'
import PlayDetail from '../components/PlayListDetail'
import Player from '../components/Player'
import Singer from '../components/Singer'
import SingerIndex from '../components/SingerIndex'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', redirect: '/home'},
    { path: '/home', name: 'home', component: Home },
    { path: '/playlist', component: PlayList, name: 'playlist'},
    { path: '/playdetail/:id', component: PlayDetail },
    { path: '/player', name: 'player', component: Player },
    { path: '/singer', name: 'singer', component: Singer },
    { path: '/singer/index/:mid', name: 'singerIndex', component: SingerIndex }
  ]
})
