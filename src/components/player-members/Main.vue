<template>
  <div class="play-body">
    <div class="main">
      <ul class="first_line">
        <li>歌曲</li>
        <li>歌手</li>
        <li>专辑</li>
        <li>时长</li>
      </ul>

      <ul class="songlist">
        <li v-for="(item, i) in songlist" :key="item.id" :class="{'showColor': i == playIndex}">
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
            <a href="javascript:;" @click="play(item, i)" title="播放">
              <i :class="{'play': isPlay && playIndex === i}"></i>
            </a>
            <a href="javascript:;" title="添加到我喜欢">
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

    <!-- 播放控制区域 -->
    <div class="control" v-if="playSong">
      <!-- 上一曲，播放/暂停， 下一曲 -->
      <div class="play-pause">
        <a href="javascript:;" @click="playPrevious">
          <i></i>
        </a>
        <a href="javascript:;" @click="controlPlay">
          <i :class="{'play': isPlay}"></i>
        </a>
        <a href="javascript:;" @click="playNext">
          <i></i>
        </a>
      </div>

      <!-- 进度条 -->

      <div class="progress">
        <div class="song-info">
          <span>{{ playSong.title + '-'}}</span>
          <span>{{ playSong.singer[0].name }}</span>
        </div>

        <!-- 点击改变播放进度 -->
        <div class="length" @click="handleClick">
          <div class="cur-length">
            <i id="dot"></i>
          </div>
        </div>

        <!-- 播放时间和总时长 -->
        <span>{{ (Math.floor(curInterval / 60)).toString().padStart(2, '0') }}:{{ (Math.floor(curInterval % 60)).toString().padStart(2, '0') }}/</span>
        <span>{{ (Math.floor(playSong.interval / 60)).toString().padStart(2, '0') }}:{{ (playSong.interval % 60).toString().padStart(2, '0') }}</span>
      </div>
    </div>

    <audio
      id="audio"
      :src="playUrl"
      autoplay="false"
      ref="audio"
      @ended="end"
      @canplay="init"
      @timeupdate="updateProgressWithTime"
    ></audio>
  </div>
</template>

<script>
import { getSong } from "../../api/api";
export default {
  data() {
    return {
      playUrl: "",
      songlist: [],
      isPlay: false,
      playIndex: -1,
      playSong: null,
      interval: 0,
      curInterval: 0
    };
  },
  created() {
    let arr = this.$store.getters.getPlayList;
    let result = this.uniqObjInArray(arr);
    this.isNull(result); // 判断是否为空

    // 获取url
    result.forEach((ele, index) => {
      getSong(ele.mid).then(res => {
        // 将result的url变成可播放的
        const domain = res.data.req.data.freeflowsip[0];
        const query = res.data.req_0.data.midurlinfo[0].purl;
        const url = domain + query;
        // this.$store.getters.getPlayList[index].url = item.url = url;
        ele.url = url;
      });
    });
    this.songlist = result; // 获取播放列表
  },
  methods: {
    // 判断songlist是否为空
    isNull(arr) {
      if (arr.length == 0) {
        this.$msgbox({
          title: "提示消息",
          message: "播放列表为空，请添加歌曲",
          confirmButtonText: "确定"
        }).then(() => {
          this.$router.push({ path: "/" });
        });
      }
    },

    // 对象数组去重
    uniqObjInArray(objarray) {
      // 只针对数组内对象的键顺序是一样的
      let len = objarray.length;
      let tempJson = {};
      let res = [];
      for (let i = 0; i < len; i++) {
        //取出每一个对象
        tempJson[JSON.stringify(objarray[i])] = true;
        // 将每一个对象字符串化作为tempJson的键，因为键是唯一的，所以当两个对象相同时，则会保存后面那个对象化成字符串之后的键
      }
      let keyItems = Object.keys(tempJson); // 获取tempJson的键
      for (let j = 0; j < keyItems.length; j++) {
        res.push(JSON.parse(keyItems[j])); // 将对象放入结果数组中
      }
      return res;
    },

    // 播放
    play(item, index) {
      let audio = this.$refs.audio;
      if (item.url == "") {
        getSong(item.mid).then(res => {
          const domain = res.data.req.data.freeflowsip[0];
          const query = res.data.req_0.data.midurlinfo[0].purl;
          const url = domain + query;
          this.$store.getters.getPlayList[index].url = item.url = url;
          this.playUrl = item.url; // 给播放器设置url
        });
      }
      this.playUrl = item.url;
      this.playSong = item;

      if (audio.paused) {
        // 如果当前歌曲暂停， 点击该歌曲播放
        this.isPlay = true; // 显示暂停按钮
        this.playIndex = index;
        audio.play();
      } else if (!audio.paused && this.playIndex !== index) {
        // 歌曲正在播放， 点击其他歌曲， 播放其他歌曲
        this.isPlay = true;
        this.playIndex = index;
        audio.play();
      } else {
        // 正在播放， 点击该歌曲按钮暂停， 显示播放按钮
        this.isPlay = false;
        audio.pause();
      }
    },

    // 控制播放暂停
    controlPlay() {
      let audio = this.$refs.audio;
      if (audio.paused) {
        audio.play();
        this.isPlay = true;
      } else {
        audio.pause();
        this.isPlay = false;
      }
    },

    playPrevious() {
      let curSongList = this.songlist;
      let len = curSongList.length;

      // 更换上一曲的url
      this.playUrl =
        this.playIndex == 0
          ? curSongList[len - 1].url
          : curSongList[this.playIndex - 1].url;
      this.playIndex = this.playIndex == 0 ? len - 1 : this.playIndex - 1;

      // 更新播放歌曲信息
      this.playSong = curSongList[this.playIndex];
      this.isPlay = true;
    },

    // 播放下一曲
    playNext() {
      let curSongList = this.songlist;
      let len = curSongList.length;

      // 更换下一曲的Url
      this.playUrl =
        this.playIndex == len - 1
          ? curSongList[0].url
          : curSongList[this.playIndex + 1].url;
      this.playIndex = this.playIndex == len - 1 ? 0 : this.playIndex + 1;
      // 更新歌曲播放信息
      this.playSong = curSongList[this.playIndex];
      this.isPlay = true;
    },

    // 歌曲播放结束后，自动播放下一曲
    end() {
      this.playNext();
    },

    // 将媒体的声音设置为0.5就是一半大小
    init() {
      let audio = document.getElementById("audio");
      this.interval = audio.duration; // 总时长
      audio.volume = 0.5;
    },

    // 更新播放条的宽度
    updateProgress(x) {
      let audio = document.querySelector("#audio"),
        initPos = document.querySelector(".length"),
        curPos = document.querySelector(".cur-length"),
        progress = document.querySelector(".progress")

      let marLeft =
        parseInt(window.getComputedStyle(progress).left) -
        progress.offsetWidth / 2 +
        initPos.offsetLeft; // 点的起始位置
      let max = initPos.offsetWidth;  // 进度条最大长度

      let width = x - marLeft > max ? 0 : x - marLeft;  // 改变后位置和初始位置的差，也就是播放进度

      this.curInterval = audio.currentTime = this.interval * (width / max); // 更新播放进度

      curPos.style.width = width + "px"; // 改变进度条的长度
    },

    // 随着播放进度更新进度条
    updateProgressWithTime() {
      let cur = document.querySelector(".cur-length"),
        audio = document.querySelector("#audio");
      this.curInterval = audio.currentTime;
      cur.style.width =
        (100 * (this.curInterval / this.interval)).toFixed() + "%";
    },

    // 点击快进
    handleClick(e) {
      this.updateProgress(e.pageX);
    }

    // ... 后续更新


  }
};
</script>

