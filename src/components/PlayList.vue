<template>
  <div class="playlist">
    <div class="category">
      <div v-for="(item, i) in categorieSon.slice(1)" :key="item[i].categoryId" class="cate-items">
        <h3>{{ categories[i+1].categoryGroupName }}</h3>

        <ul class="cate-items-detail">
          <li v-for="(item, i) in categorieSon[i+1].slice(0, 9)" :key="item.categoryId" :class="{'current': currentIndex == i && item.categoryId == categoryId}">
            <p>
              <a
                href="javascript:;"
                @click="getInfoByCategoty(item.categoryId, i)"
              >{{ item.categoryName }}</a>
            </p>
          </li>
        </ul>
      </div>
    </div>

    <!-- {{ categorieSon[1].categoryName }} -->
    <div class="title-p">
      <span>推荐歌单</span>
      <div class="btns">
        <el-button
          type="default"
          size="mini"
          :class="{'current': sortId==3}"
          @click="getInfoBySortId(3)"
        >推荐</el-button>
        <el-button
          type="default"
          size="mini"
          :class="{'current':sortId == 2}"
          @click="getInfoBySortId(2)"
        >最新</el-button>
      </div>
    </div>
    <div class="playlist_item">
      <ul>
        <li v-for="(item) in muiscList" :key="item.dissid">
          <router-link :to="'/playdetail/' + item.dissid" class="fengmian">
            <img :src="item.imgurl" alt />
          </router-link>
          <p>
            <router-link :to="'/playdetail/' + item.dissid">{{ item.dissname }}</router-link>
          </p>
          <p>
            <a href="javascript:;">{{ item.author }}</a>
          </p>
          <p>播放量: {{ (item.listennum / 10000).toFixed(1) }}万次</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getListTags, getListBy } from "../api/api";
import { makeDisc } from "../api/dealHomeInfo";

export default {
  data() {
    return {
      muiscList: [],
      categories: [],
      categorieSon: [],
      categoryId: 10000000,
      sortId: 3,
      currentIndex: -1
    };
  },
  methods: {
    getInitInfo(categoryId, sortId) {
      getListBy(categoryId, sortId).then(res => {
        let list = res.data.list;
        list = makeDisc(list);
        this.muiscList = list;
      });
    },
    // 根据分类查询歌单
    getInfoByCategoty(categoryId, index) {
      this.currentIndex = index;
      this.categoryId = categoryId;
      this.getInitInfo(categoryId, this.sortId);
    },
    // 根据最新或者最热查询歌单
    getInfoBySortId(sortId) {
      this.sortId = sortId;
      this.getInitInfo(this.categoryId, sortId);
    }
  },
  created() {
    this.getInitInfo(this.categoryId, this.sortId);
    getListTags().then(res => {
      this.categories = res.data.categories;
      this.categorieSon = this.categories.map(item => {
        return item.items;
      });

    });
  }
};
</script>


<style lang="scss" scoped>
.playlist {
  width: 1200px;
  margin: 0 auto;
  margin-top: 50px;

  .category {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    .cate-items {
      border-left: 1px solid #ccc;
      padding-left: 5px;
      flex: 1;
      &:first-child {
        border: none;
      }
      h3 {
        color: #ccc;
        font-weight: 400;
      }
      .cate-items-detail {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        margin-top: 10px;
        li {
          margin: 10px 35px 0 0;
          p {
            text-align: left;
          }
        }
      }
    }
    margin-bottom: 20px;
  }

  .current { // 点击分类显示的背景色
    background-color: rgb(16, 212, 137);
    a {
      color: #fff;
    }
  }

  .title-p {
    display: flex;
    justify-content: space-between;
    padding-right: 20px;
    margin: 10px 0;
    span {
      font-size: 24px;
    }
    .btns {
      .current {
        background-color: #31c27c;
        color: #fff;
      }
    }
  }
  a {
    text-decoration: none;
  }
  ul,
  li {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .playlist_item {
    width: 100%;
    margin: 0 auto;
    ul {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      li {
        width: 200px;
        height: 300px;
        margin-top: 10px;
        margin-right: 10px;
        .fengmian {
          width: 200px;
          height: 200px;
          display: block;
          position: relative;
          img {
            width: 100%;
          }
          .play {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: #ccc;
            z-index: 10;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            img {
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }
        }
        p {
          margin: 5px 0;
          padding: 0;
          text-align: left;
          font-size: 14px;
          a {
            color: #ccc;
            white-space: nowrap;
          }
          a:hover {
            color: #f10215;
          }
        }
      }
    }
  }
}
</style>
