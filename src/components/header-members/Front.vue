<template>
  <div class="front">
    <ul>
      <li v-for="(item, i) in headText" :key="item">
        <a href="javascript:;" @click="go(i)" :class="i == indexCurrent ? 'current': '' ">{{ item }}</a>
      </li>
      <span><img src="../../assets/mark_1.png" alt=""></span>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headText: ["音乐馆", "我的音乐", "客户端", "音乐号", "VIP"],
      indexCurrent: 0
    };
  },
  methods: {
    go(index) {
      this.indexCurrent = index;  // 排他
      if (index == 0) {
        this.$router.push({path: '/'})
      }
    }
  }
};
</script>


<style lang="scss" scoped>

</style>
