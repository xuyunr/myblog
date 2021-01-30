const router = require('koa-router')()
const Token = require('../auth/index')
const { index, post, detail, comment } = require('../controllers/blog')

router.prefix('/blog')

router.get('/detail', Token.verify, detail)
router.get('/list', Token.verify, index)
router.post('/post', Token.verify, post)
router.post('/comment', Token.verify, comment)

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
