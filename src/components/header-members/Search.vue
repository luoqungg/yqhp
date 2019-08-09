<template>
  <div class="search">
    <el-input
      placeholder="请输入内容"
      v-model="searchStr"
      @focus="showHotKeys=false"
      @blur="showHotKeys=true"
      class="search_box"
    >
      <i slot="suffix" class="el-input__icon el-icon-search"></i>
    </el-input>

    <div :class="{'hidden': showHotKeys, 'hotkey': true}">
      <ul>
        <li v-for="(item, i) in keys" :key="item.num">
          <span>{{ i + 1 }}</span>
          <span>{{ item.key }}</span>
          <span>{{ item.num }}</span>
        </li>
      </ul>

      <div class="bottom">
        <span>搜索历史</span>
        <a href="javascript:;">
          <i class="el-icon-delete"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { getHotKey } from "../../api/api";
export default {
  created() {
    getHotKey().then(res => {
      let hotKeys = res.data.data.hotkey.slice(0, 5);
      this.keys = hotKeys.map(item => {
        let key = item.k;
        let num = (item.n / 10000).toFixed(1) + "万";
        return { key, num };
      });
    });
  },
  data() {
    return {
      keys: [],
      searchStr: "",
      showHotKeys: true
    };
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
</style>

