<template>
  <div id="app">
    <Header v-if="show"></Header>
    <router-view/>
    <footer>

    </footer>
  </div>
</template>

<script>
import Header from './components/Header'
export default {
  name: 'App',
  components: {
    Header
  },
  computed: {
    show() {
      return this.$store.getters.showHeader
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
