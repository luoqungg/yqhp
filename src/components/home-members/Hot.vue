<template>
  <div class="hot">
    <div class="hot_inner">

      <div class="index_hd">
        <h2 class="index_hd_text">
          <i>歌单推荐</i>
        </h2>
      </div>

      <div class="mod_index_tab">
        <a v-for="(item, i) in tabList" :key="item.tabName" @click="change(i, item.tabUrl)" :class="{'current': i === currentIndex}"> {{ item.tabName }} </a>
      </div>

      <component :is="currentComponent"></component>
    </div>
  </div>
</template>

<script>

// 只获取了首页和睡前的数据，然后展开的
import LunBo from './hot-members/LunBo'
import BeforeSleep from './hot-members/BeforeSleep'
import L3 from './hot-members/L3'
import L4 from './hot-members/L4'
import L5 from './hot-members/L5'
import L6 from './hot-members/L6'

export default {
  data() {
    return {
      tabList: [
        { tabName: "为你推荐", tabUrl: "LunBo" },
        { tabName: "官方歌单", tabUrl: "BeforeSleep" },
        { tabName: "情歌", tabUrl: "L3" },
        { tabName: "网络歌曲", tabUrl: "L4" },
        { tabName: "经典", tabUrl: "L5" },
        { tabName: "KTV热歌", tabUrl: "L6" }  // 只有一部分 
      ],
      currentIndex: 0,
      currentComponent: 'LunBo'
    };
  },
  methods: {
    change(i, name) {
      this.currentIndex = i

      this.currentComponent = name
    }
  },
  components: {
    LunBo,
    BeforeSleep,
    L3,
    L5,
    L4,
    L6
  },
};
</script>

