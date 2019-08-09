<template>
  <div class="listdetail">
    <div class="inner">
      <div class="top">
        <div class="logo">
          <img :src="cdlist.logo" alt />
        </div>
        <div class="introduce">
          <h2 v-html="cdlist.dissname"></h2>
          <p>
            <i class="el-icon-user"></i>
            <a href>&nbsp;&nbsp;{{ cdlist.nick }}</a>
          </p>
          <p>
            标签：
            <a v-for="item in tags" :key="item.id">{{ item.name }}&nbsp;&nbsp;</a>
          </p>
          <p>播放量: {{ (cdlist.visitnum / 10000).toFixed(1) }}万</p>
          <p>
            <el-button type="success" class="btn" @click="playAll">
              <span class="icon_play"></span>播放全部
            </el-button>
          </p>
        </div>
      </div>

      <div class="main">
        <ul class="first_line">
          <li>歌曲</li>
          <li>歌手</li>
          <li>专辑</li>
          <li>时长</li>
        </ul>

        <ul class="songlist">
          <li v-for="(item, i) in songlist.slice(0, 10)" :key="item.id">
            <p class="index">{{ i + 1 }}</p>
            <div class="title">
              <a href>{{ item.title }}</a>
            </div>
            <div class="singer">
              <a>{{ item.singer[0].name }}</a>
            </div>
            <div class="album">
              <a>{{ item.album.name }}</a>
            </div>
            <div class="time">
              <span>{{ (Math.floor(item.interval / 60)).toString().padStart(2, '0') }}:{{ (item.interval % 60).toString().padStart(2, '0') }}</span>
            </div>
            <div class="hover">
              <a href="javascript:;" @click="playOne(item)" title="播放">
                <i></i>
              </a>
              <a href="javascript:;" @click="add(item)" title="添加到歌单">
                <i></i>
              </a>
              <a href="javascript:;" title="下载">
                <i></i>
              </a>
              <a href="javascript:;" title="分享">
                <i></i>
              </a>
            </div>
          </li>
        </ul>
      </div>

      <div class="desc">
        <h2>简介</h2>
        <p>{{ desc }}</p>
        <a href="javascript:;" v-popover:popover>[更多]</a>
      </div>

      <el-popover ref="popover" placement="left" title="简介" width="400" trigger="click">
        <p v-html="cdlist.desc"></p>
      </el-popover>
    </div>
  </div>
</template>


<script>
import "../assets/scss/play-detail.scss";
import { getDetail } from "../api/api";
import { setDetail } from "../api/dealHomeInfo";

export default {
  data() {
    return {
      cdlist: {},
      songlist: [],
      tags: [],
      disstid: this.$route.params.id,
      desc: ""
    };
  },
  created() {
    getDetail(this.disstid).then(res => {
      this.cdlist = setDetail(res.cdlist[0]);
      this.desc = this.cdlist.desc.replace(/<br(\s+)?\/?>/g, "");
      this.songlist = this.cdlist.songinfo;
      this.tags = this.cdlist.tags;
    });
  },
  methods: {
    playOne(item) {
      this.$store.dispatch("addSongToList", item); // 把要播放的这首歌放在vuex中
      this.$router.push({ name: "player" });
    },
    add(item) {
      this.$store.dispatch("addSongToList", item);

      this.$message({
        type: "success",
        message: "已添加到播放列表中",
        duration: 1000
      });

      this.$router.push({name: 'player'})
    },

    playAll() {
      this.$store.dispatch("setPlayList", this.songlist);

      this.$router.push({ name: "player" });
    }
  }
};
</script>


<style lang="scss" scoped>
</style>
