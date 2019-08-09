<template>
  <div class="home">
    <Hot></Hot>
  </div>
</template>

<script>
import Hot from "./home-members/Hot";
import "../assets/scss/home.scss";
import { setNewAlbum } from "../api/dealHomeInfo";
import { getNewAlbum, getAlbumDetail } from "../api/api";
export default {
  data() {
    return {
      albums: [],
      albumTags: []
    }
  },
  components: {
    Hot
  },
  created() {
    getNewAlbum().then(res => {
      let info = setNewAlbum(
        res.new_album.data.albums,
        res.new_album_tag.data.area
      );
      this.albums = info.albums
      this.albumTags = info.albumTags
    });
  },
  methods: {
    goDetail(mid) {
      getAlbumDetail(mid).then(res => {
        console.log(res)
      })
    }
  }
};
</script>

