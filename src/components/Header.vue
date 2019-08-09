<template>
  <header>
    <div class="left">
      <div id="logo">
        <h1>
          <router-link to="/">
            QQ音乐
            <img src="../assets/logo.png" alt />
          </router-link>
        </h1>
      </div>
      <Front></Front>
    </div>
    <div class="right">
      <Search></Search>

      <component :is="CurrentComponent"></component>
    </div>

    <Nav></Nav>
  </header>
</template>

<script>
import Front from "./header-members/Front";
import Login from "./header-members/Login";
import Search from "./header-members/Search";
import LoginSuccess from "./header-members/LoginSuccess";
import Nav from "./header-members/Nav";
import '../assets/scss/header.scss'

export default {
  components: {
    Front,
    Login,
    Search,
    LoginSuccess,
    Nav
  },
  computed: {
    CurrentComponent() {     
      return !(this.$store.getters.getUser) ? 'Login' : 'LoginSuccess'  // 登录成功后显示头像
    }
  }
};
</script>