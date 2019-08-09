<template>
  <nav>
    <ul>
      <li v-for="(item, index) in items" :key="item.title">
        <a href="javascript:;" @click="go(index, item.name)" :class="{'current': index == currentIndex}">{{ item.title }}</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { title: "首页", name: "home" },
        { title: "歌手", name: "singer" },
        { title: "专辑", name: "" },
        { title: "排行榜", name: "" },
        { title: "分类歌单", name: "playlist" },
        { title: "电台", name: "" },
        { title: "MV", name: "" },
        { title: "数字专辑", name: "" },
        { title: "票务", name: "" }
      ],
      currentIndex: 0
    };
  },
  methods: {
    go(index, name) {
      this.currentIndex = index

      this.$router.replace({name})
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
