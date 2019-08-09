<template>
   <div class="lunbo">
    <el-carousel :autoplay="false" arrow="always">
      <el-carousel-item>
        <ul class="item">
          <li v-for="(item) in list.slice(10, 15)" :key="item.tid">
            <div class="cover">
              <router-link :to="'/playDetail/' + item.tid"> 
                <img :src="item.cover_url_small" alt />
              </router-link>
            </div>
            <div class="intro">
              <a href>{{ item.title }}</a>
              <p>播放量:{{ (item.access_num / 10000).toFixed(1) }}万</p>
            </div>
          </li>
        </ul>
      </el-carousel-item>

      <el-carousel-item>
        <ul class="item">
          <li v-for="(item) in list.slice(15, 20)" :key="item.content_id">
            <div class="cover">
              <router-link :to="'/playDetail/' + item.tid"> 
                <img :src="item.cover_url_small" alt />
              </router-link>
            </div>
            <div class="intro">
              <a>{{ item.title }}</a>
              <p>播放量:{{ (item.access_num / 10000).toFixed(1) }}万</p>
            </div>
          </li>
        </ul>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>


<script>
import {beforeSleepList} from '../../../api/dealHomeInfo'
export default {
  data() {
    return {
      list: []
    }
  },
  created() {
    beforeSleepList.then(res => {
      this.list = res.beforeSleepList
    })
  }
}
</script>

