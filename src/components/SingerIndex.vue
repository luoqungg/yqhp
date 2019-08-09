<template>
  <div class="singer-info">
    <div class="header">
      <div class="pic">
        <img :src="singerInfo.img" alt />
      </div>
      <div class="info">
        <h2>{{ singerInfo.name }}</h2>
        <div class="ps">
          <p>
            单曲:
            <a>{{ singer.total_song }}</a>
          </p>
          <p>
            专辑:
            <a>{{ singer.total_album }}</a>
          </p>
          <p>
            MV:
            <a>{{ singer.total_mv }}</a>
          </p>
        </div>
        <div class="btns">
          <el-button type="success" @click="playAll" icon="el-icon-caret-right">播放歌手热门歌曲</el-button>
          <el-button>关注{{ (singerInfo.fans / 10000).toFixed(1) }}万</el-button>
        </div>
      </div>
    </div>
    <div class="title-p">
      <span>热门歌曲</span>
      <a href="">全部&nbsp;&gt;</a>
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

    <div class="title-p">
      <span>专辑</span>
      <a href="">全部&nbsp;&gt;</a>
    </div>
  </div>
</template>

<script>
import { getSingerInfo } from "../api/api";
export default {
  data() {
    return {
      id: this.$route.params.mid,
      singerInfo: {},
      singer: {},
      songlist: []
    };
  },
  methods: {
    getInfo() {
      getSingerInfo(this.id).then(res => {
        this.singer = res.data.singer.data;
        this.singerInfo = this.singer.singer_info;
        this.singerInfo.img = `http://y.gtimg.cn/music/photo_new/T001R150x150M000${this.id}.webp`;
        this.songlist = this.singer.songlist;
      });
    },
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

      this.$router.push({ name: "player" });
    },

    playAll() {
      this.$store.dispatch("setPlayList", this.songlist);

      this.$router.push({ name: "player" });
    }
  },
  created() {
    this.getInfo();
  }
};
</script>


<style lang="scss" scoped>
.singer-info {
  width: 800px;
  margin: 0 auto;
  margin-top: 50px;
  .header {
    display: flex;
    margin-bottom: 20px;
    .pic {
      img {
        width: 250px;
        height: 250px;
        border-radius: 50%;
      }
    }
    .info {
      display: flex;
      justify-content: space-around;
      flex-direction: column;
      margin-left: 50px;
      h2 {
        font-size: 36px;
        font-weight: 400;
      }
      .ps {
        display: flex;
        p {
          margin-right: 100px;
          a {
            font-size: 32px;
          }
        }
        margin: 30px 0;
      }
      
    }
  }
  .title-p {
    display: flex;
    justify-content: space-between;
    padding-right: 20px;
    margin: 20px 0;
    span {
      font-size: 24px;
    }
    
  }
  .main {
    width: 100%;
    .songlist {
      li {
        .title,
        .album,
        .singer {
          a {
            color: #333;
          }
        }
        .index,
        .time {
          color: #ccc;
        }
      }
      & li:nth-child(2n + 1) {
        background-color: #fbfbfd;
      }
    }
  }
}
</style>
