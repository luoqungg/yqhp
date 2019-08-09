<template>
  <div class="singer">
    <ul class="index">
      <li
        v-for="(item,i) in index"
        :key="item.id"
        :class="{'current': indexIndex == i}"
        @click="byIndex(i, item.id)"
      >
        <a href="javascript:;">{{ item.name }}</a>
      </li>
    </ul>
    <ul class="area">
      <li
        v-for="(item,i) in area"
        :key="item.id"
        :class="{'current': areaIndex == i}"
        @click="byArea(i, item.id)"
      >
        <a href="javascript:;">{{ item.name }}</a>
      </li>
    </ul>
    <ul class="sex">
      <li
        v-for="(item,i) in sex"
        :key="item.id"
        :class="{'current': sexIndex == i}"
        @click="bySex(i, item.id)"
      >
        <a href="javascript:;">{{ item.name }}</a>
      </li>
    </ul>
    <ul class="genre">
      <li
        v-for="(item,i) in genre"
        :key="item.id"
        :class="{'current': genreIndex == i}"
        @click="byGenre(i, item.id)"
      >
        <a href="javascript:;">{{ item.name }}</a>
      </li>
    </ul>

    <div class="singerlist" v-if="byIndexId === -100">
      <ul class="piclist">
        <li v-for="item in singerlist.slice(0,10)" :key="item.singer_id">
          <router-link :to="'/singer/index/' + item.singer_mid">
            <img :src="item.singer_pic" alt :title="item.singer_name" />
          </router-link>
          <p>{{ item.singer_name }}</p>
        </li>
      </ul>

      <ul class="name">
        <li v-for="item in singerlist.slice(10)" :key="item.singer_id">
          <router-link :to="'/singer/index/' + item.singer_mid">{{ item.singer_name }}</router-link>
        </li>
      </ul>
    </div>

    <div class="singerlist" v-if="byIndexId !== -100">
      <ul class="name">
        <li v-for="item in singerlist.slice(10)" :key="item.singer_id">
          <router-link :to="'/singer/index/' + item.singer_mid">{{ item.singer_name }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
import { getSinger } from "../api/api";
export default {
  data() {
    return {
      area: [],
      index: [],
      genre: [],
      sex: [],
      areaIndex: 0,
      indexIndex: 0,
      genreIndex: 0,
      sexIndex: 0,
      singerlist: [],
      byIndexId: -100,
      bySexId: -100,
      byGenreId: -100,
      byAreaId: -100,
    };
  },
  created() {
    this.getInfo()
  },
  methods: {
    getInfo () {
      getSinger({
      area: this.byAreaId,
      sex: this.bySexId,
      genre: this.byGenreId,
      index: this.byIndexId,
      sin: 0,
      cur_page: 1
    }).then(res => {
      let tags = res.data.singerList.data.tags;
      this.singerlist = res.data.singerList.data.singerlist;
      this.area = tags.area;
      this.sex = tags.sex;
      this.genre = tags.genre;
      this.index = tags.index;
    });
    },
    byIndex(i, id) {
      this.indexIndex = i
      this.byIndexId = id
      this.getInfo()
    },
    byArea(i, id) {
      this.areaIndex = i
      this.byAreaId = id
      this.getInfo()
    },
    byGenre(i, id) {
      this.genreIndex = i
      this.byGenreId = id
      this.getInfo()
    },
    bySex(i, id) {
      this.sexIndex = i
      this.bySexId = id
      this.getInfo()
    }
  }
};
</script>


<style lang="scss" scoped>
.singer {
  width: 1200px;
  margin: 0 auto;
  margin-top: 50px;
  .index,
  .area,
  .genre,
  .sex {
    display: flex;
    margin-bottom: 20px;
    li {
      text-align: center;
      height: 26px;
      line-height: 26px;
      margin-right: 26px;
      a {
        margin: 0 2px;
      }
    }

    .current {
      background-color: #31c27c;
      text-align: center;
      a {
        color: #fff;
      }
    }
  }

  .singerlist {
    .piclist {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      li {
        width: 150px;
        height: 150px;
        margin: 20px 26px;
        a {
          display: block;
          width: 100%;
          height: 100%;
          img {
            width: 100%;
            border-radius: 50%;
          }
        }
        p {
          text-align: center;
          margin-top: 7px;
        }
      }
    }

    .name {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      margin-top: 50px;
      li {
        width: 195px;
        padding-left: 45px;
        margin-top: 20px;
        font-size: 14px;
      }
    }
  }
}
</style>
