<template>
  <div class="lunbo">
    <el-carousel :autoplay="false" arrow="always">
      <el-carousel-item>
        <ul class="item">
          <li v-for="(item) in recomList.slice(10, 15)" :key="item.content_id">
            <div class="cover">
              <router-link :to=" '/playDetail/' + item.content_id">
                <img :src="item.cover" alt />
              </router-link>
            </div>
            <div class="intro">
              <a href>{{ item.title }}</a>
              <p>播放量:{{ (item.listen_num / 10000).toFixed(1) }}万</p>
            </div>
          </li>
        </ul>
      </el-carousel-item>

      <el-carousel-item>
        <ul class="item">
          <li v-for="(item) in recomList.slice(15, 20)" :key="item.content_id">
            <div class="cover">
             <router-link :to=" '/playDetail/' + item.content_id">
                <img :src="item.cover" alt />
              </router-link>
            </div>
            <div class="intro">
              <a>{{ item.title }}</a>
              <p>播放量:{{ item.listen_num }}</p>
            </div>
          </li>
        </ul>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>


<script>
import { homeData } from "../../../api/dealHomeInfo";
export default {
  data() {
    return {
      recomList: []
    };
  },
  created() {
    homeData.then(res => {
      this.recomList = res.recomList;
    });
  }
};
</script>

<style lang="scss" scoped>

</style>

