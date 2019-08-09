<template>
  <div class="player">
    <!-- 顶部 -->
    <div class="songlist-title">
      <a href="javascript:;" @click="goback">&lt;&nbsp;返回</a>
    </div>
    <div class="inner">
      <!-- 播放歌曲列表区域 -->
      <Main></Main>
    </div>
  </div>
</template>


<script>
import "../assets/scss/player.scss";
import Main from "../components/player-members/Main";
export default {
  components: {
    Main
  },
  methods: {
    goback() {
      this.$router.go(-1)
    }
  },
  
  //设置导航守卫
  // 路由进入时隐藏Header
  beforeRouteEnter(to, from, next) {
    //用回调方式获取该组件实例
    document
      .querySelector("body")
      .setAttribute("style", "background-color:rgb(127,78,102)");
    next(vm => {
      vm.$store.dispatch("hideHeader");
    });
  },
  //路由离开时显示Header
  beforeRouteLeave(to, from, next) {
    document.querySelector("body").removeAttribute("style");
    this.$store.dispatch("showHeader");
    // 退出该路由后title不再滚动
    clearInterval(this.timer);
    next();
  }
};
</script>

<style lang="scss" scoped>
</style>


