import { getHomeData, beforeSleep } from '../api/api'


// 测试



// 首页

let beforeSleepList = beforeSleep().then(res => { // 首页中为你推荐的睡前标签里面的数据 ， 导出一个promise对象
  let beforeSleepList = res.playlist.data.v_playlist.map(item => {
    let { tid, title, cover_url_small, access_num } = item
    return { tid, title, cover_url_small, access_num }
  })

  return Promise.resolve({ beforeSleepList })
})

// 获取的首页数据  导出一个promise对象
let homeData = getHomeData().then(res => {
  let focus = setFocus(res.focus.data.content)
  let recomList = setRecomand(res.recomPlaylist.data.v_hot)
  return Promise.resolve({ recomList })
})

export { homeData, beforeSleepList }


function setFocus(array) {  // 精彩推荐
  let focus = array.map(item => {
    let { id, listen_num } = item
    let pic_url = item.pic_info.url
    return { id, listen_num, pic_url }
  })

  return focus
}


// 新碟的数据结构
export function setNewAlbum(newAlbums, newAlbumTags) {
  let albums = newAlbums.map(item => {
    let { id, mid, name, release_time, singers } = item
    return { id, mid, name, release_time, singers }
  })

  let albumTags = newAlbumTags.map(item => {
    let { id, name } = item
    return { id, name }
  })

  return { albums, albumTags }
}


// 歌单信息

// 歌单推荐  需要的数据结构 （playlist页面的）
export function setRecomand(recomList) {
  let list = recomList.map(item => {
    let { content_id, cover, title, listen_num } = item
    return { content_id, cover, title, listen_num }
  })

  return list
}


// 处理歌单详情的数据
export function setDetail(cdlist) {
  let { dissid, disstid, dissname, desc, logo, nick, songlist, tags, visitnum } = cdlist

  let songinfo = songlist.map(item => {
    let { id, album, interval, mid, title, singer } = item
    let url = ''
    return { id, album, interval, mid, title, singer, url }
  })
  return { dissid, disstid, dissname, desc, logo, nick, tags, songinfo, visitnum }
}

// 处理歌单的信息
export function makeDisc(disc) {
  let info = disc.map(item => {
    let [dissid, imgurl, dissname, author, listennum] = [item.dissid, item.imgurl, item.dissname, item.creator.name, item.listennum]
    return {dissid, imgurl, dissname, author, listennum}
  })

  return info
}