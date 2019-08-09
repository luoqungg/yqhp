import axios from 'axios'


// 获取首页搜索框的热词
export function getHotKey() {
  const url = '/hotkey/splcloud/fcgi-bin/gethotkey.fcg'
  const params = Object.assign({}, {
    g_tk: 669682580,
    loginUin: 947821845,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq.json',
    needNewCode: 0,
  })

  return axios.get(url, {
    params
  }).then(res => {
    return Promise.resolve(res)
  })
}

// 获取首页的信息
export function getHomeData() {
  const url = '/home/cgi-bin/musicu.fcg'
  const params = Object.assign({}, {
    g_tk: '669682580',
    loginUin: '947821845',
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq.json',
    needNewCode: 0,
    data: { "comm": { "ct": 24 }, "category": { "method": "get_hot_category", "param": { "qq": "" }, "module": "music.web_category_svr" }, "recomPlaylist": { "method": "get_hot_recommend", "param": { "async": 1, "cmd": 2 }, "module": "playlist.HotRecommendServer" }, "playlist": { "method": "get_playlist_by_category", "param": { "id": 8, "curPage": 1, "size": 40, "order": 5, "titleid": 8 }, "module": "playlist.PlayListPlazaServer" }, "new_song": { "module": "newsong.NewSongServer", "method": "get_new_song_info", "param": { "type": 5 } }, "new_album": { "module": "newalbum.NewAlbumServer", "method": "get_new_album_info", "param": { "area": 1, "sin": 0, "num": 10 } }, "new_album_tag": { "module": "newalbum.NewAlbumServer", "method": "get_new_album_area", "param": {} }, "toplist": { "module": "musicToplist.ToplistInfoServer", "method": "GetAll", "param": {} }, "focus": { "module": "QQMusic.MusichallServer", "method": "GetFocus", "param": {} } }
  })

  return axios.get(url, {
    params
  }).then(res => {
    return Promise.resolve(res.data)
  }).catch(e => console.log(e))
}

// 获取首页歌单推荐中睡前信息
export function beforeSleep() {
  const url = '/beforeSleep/cgi-bin/musicu.fcg'
  const params = Object.assign({}, {
    format: 'json',
    data: { "comm": { "ct": 24 }, "playlist": { "method": "get_playlist_by_category", "param": { "id": 27, "curPage": 1, "size": 40, "order": 5, "titleid": 27 }, "module": "playlist.PlayListPlazaServer" } }
  })

  return axios.get(url, {
    params
  }).then(res => {
    // console.log(res)
    return Promise.resolve(res.data)
  })
}




// 获取首页的mv信息
export function getMv() {
  const url = '/hotkey/mv/fcgi-bin/getmv_by_tag'
  const params = Object.assign({}, {
    g_tk: 669682580,
    loginUin: 947821845,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'GB2312',
    notice: 0,
    platform: 'yqq.json',
    needNewCode: 0,
    cmd: 'shoubo',
    lan: 'all'
  })

  axios.get(url, {
    params
  }).then(res => {
    // console.log(res)
  })
}


// 获取分类歌单的歌单分类tags
export function getListTags() {
  const url = '/list/splcloud/fcgi-bin/fcg_get_diss_tag_conf.fcg'
  const params = Object.assign({}, {
    g_tk: '669682580',
    loginUin: '947821845',
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq.json',
    needNewCode: 0,
  })

  return axios.get(url, {
    params
  }).then(res => {
    return Promise.resolve(res.data)
  })
}

// 根据条件查找歌单
export function getListBy(categoryId, sortId) {
  const url = '/list/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
  const params = Object.assign({}, {
    picmid: 1,
    rnd: Math.random(),
    g_tk: 1950855356,
    loginUin: 947821845,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq.json',
    needNewCode: 0,
    categoryId: categoryId,
    sortId: sortId,
    sin: 0,
    ein: 19,
  })

  return axios.get(url, {
    params
  }).then(res => {
    return Promise.resolve(res.data)
  })
}

// 歌单详情
export function getDetail(disstid) {
  const url = '/detail/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
  const params = Object.assign({}, {
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    new_format: 1,
    disstid: disstid,
    g_tk: 1356765855,
    loginUin: 947821845,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq.json',
    needNewCode: 0,
  })

  return axios.get(url, {
    params
  }).then(res => {
    return Promise.resolve(res.data)
  })
}


//获取新碟的信息
export function getNewAlbum() {
  const url = '/newAlbum/cgi-bin/musicu.fcg'
  const params = Object.assign({}, {
    format: 'json',
    data: { "new_album": { "module": "newalbum.NewAlbumServer", "method": "get_new_album_info", "param": { "area": 1, "start": 0, "num": 20 } }, "new_album_tag": { "module": "newalbum.NewAlbumServer", "method": "get_new_album_area", "param": {} }, "comm": { "ct": 24, "cv": 0 } }
  })

  return axios.get(url, {
    params
  }).then(res => {
    // console.log(res)
    return Promise.resolve(res.data)
  })
}

// 专辑详情
export function getAlbumDetail(albummid) {
  const url = '/albumDetail/v8/fcg-bin/fcg_v8_album_info_cp.fcg'
  const params = Object.assign({}, {
    ct: 24,
    albummid,
    g_tk: 1356765855,
    loginUin: 947821845,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq.json',
    needNewCode: 0,
    song_begin: 0,
    song_num: 10,
  })

  return axios.get(url, {
    params
  }).then(res => {
    return Promise.resolve(res.data)
  })
}


//通过songmid获取歌曲信息
export function getSong(songmid) {
  const url = '/song/cgi-bin/musicu.fcg'
  const params = Object.assign({}, {
    g_tk: 1950855356,
    loginUin: 947821845,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq.json',
    needNewCode: 0,
    data: { "req": { "module": "CDN.SrfCdnDispatchServer", "method": "GetCdnDispatch", "param": { "guid": "1571038755", "calltype": 0, "userip": "" } }, "req_0": { "module": "vkey.GetVkeyServer", "method": "CgiGetVkey", "param": { "guid": "1571038755", "songmid": [songmid], "songtype": [0], "uin": "947821845", "loginflag": 1, "platform": "20" } }, "comm": { "uin": 947821845, "format": "json", "ct": 24, "cv": 0 } }
  })

  return axios.get(url, {
    params
  }).then(res => {
    return Promise.resolve(res)
  })
}


// 歌手列表
export function getSinger(param) {
  const url = '/song/cgi-bin/musicu.fcg'
  const params = Object.assign({}, {
    data: { "comm": { "ct": 24, "cv": 0 }, "singerList": { "module": "Music.SingerListServer", "method": "get_singer_list", "param": param } }
  })

  return axios.get(url, {
    params
  }).then(res => {
    return Promise.resolve(res)
  })
}

// 歌手信息
export function getSingerInfo(singermid) {
  const url = '/song/cgi-bin/musicu.fcg'
  const params = Object.assign({}, {
    data: { "comm": { "ct": 24, "cv": 0 }, "singer": { "method": "get_singer_detail_info", "param": { "sort": 5, "singermid": singermid, "sin": 0, "num": 10 }, "module": "music.web_singer_info_svr" } }
  })

  return axios.get(url, {
    params
  }).then(res => {
    return Promise.resolve(res)
  })
}