const proxyTable = {
  '/hotkey': { // 头部搜索框的热词
    target: 'https://c.y.qq.com/',
    secure: false,
    changeOrigin: true,
    pathRewrite:{
      '^/hotkey' : ''
    }
  },
  '/home': { // 主页信息
    target: 'https://u.y.qq.com/',
    secure: false,
    changeOrigin: true,
    pathRewrite: {
      '^/home' : ''
    }
  },
  '/beforeSleep': { // 主页中歌单推荐睡前信息
    target: 'https://u.y.qq.com/',
    secure: false,
    changeOrigin: true,
    pathRewrite: {
      '^/beforeSleep' : ''
    }
  },
  '/list': { // 歌单主页信息
    target: 'https://c.y.qq.com/',
    secure: false,
    changeOrigin: true,
    pathRewrite: {
      '^/list' : ''
    },
    bypass: function(req, res, proxyOptions) {
      req.headers.referer = 'https://y.qq.com/portal/playlist.html';
    }
  },

  // 歌单详情
  '/detail': {
    target: 'https://c.y.qq.com/',
    secure: false,
    changeOrigin: true,
    pathRewrite: {
      '^/detail': ''
    }
  },



  '/newAlbum': { // 新碟页面信息
    target: 'https://u.y.qq.com/',
    secure: false,
    changeOrigin: true,
    pathRewrite: {
      '^/newAlbum': ''
    }
  },
  '/albumDetail': { // 新碟详情信息
    target: 'https://c.y.qq.com/',
    secure: false,
    changeOrigin: true,
    pathRewrite: {
      '^/albumDetail': ''
    }
  },
  '/song': {
    target: 'https://u.y.qq.com/',
    secure: false,
    changeOrigin: true,
    pathRewrite: {
      '^/song': ''
    }
  }
}

module.exports = proxyTable