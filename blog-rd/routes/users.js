const router = require('koa-router')()

const { regist, login, detail, getDetail, checkUser } = require('../controllers/user')

router.prefix('/user')

router.post('/regist', regist)

router.post('/login', login)

router.post('/detail', detail)

router.get('/detail', getDetail)

router.post('/check', checkUser)

router.get('/list', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router
