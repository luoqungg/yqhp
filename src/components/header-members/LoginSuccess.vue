<template>
  <div class="login">
    <div class="btns">
      <div class="head" v-popover:popover1>
        <a>
          <img :src="user.headimg"/>
        </a>
      </div>
      <div>
        <el-button type="success">开通绿钻豪华版</el-button>
        <el-button class="fufei">开通付费包</el-button>
      </div>
    </div>

    <el-popover ref="popover1" placement="top-start" trigger="hover" class="logout">
      <el-button type="text" @click="logout">退出登录</el-button>
    </el-popover>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: this.$store.getters.getUser,
    };
  },
  methods: {
    logout() {

      this.$store.dispatch('setUser', null) // 改变vuex中的状态

      sessionStorage.removeItem('user')  // 移除session中数据
      
      this.$store.dispatch('isLogin', false)  // 改变登录状态
    }
  }
}
</script>



<style lang="scss" scoped>

</style>

