import Mock from 'mockjs'

const users = [
  {
    id: 1,
    name: '该醒醒了',
    account: '947821845',
    password: '123456',
    headimg: require('../assets/images/1.jpg')
  }
]

const returnData = (opt) => {
  let { account, password } = JSON.parse(opt.body)
  let person = null
  let hasUser = users.some(item => {
    if (item.account === account && item.password === password) {
      person = JSON.parse(JSON.stringify(item))  // 深度拷贝存在的用户信息
      return true
    } else {
      return false
    }
  })

  if (hasUser) {
    return {status: 200, message: '登录成功', person}
  }
  return { status: 500, message: '用户名或密码错误' }
}


Mock.mock('/login', 'post', returnData)