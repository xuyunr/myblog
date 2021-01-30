const model = require('../models/user');
const Token = require('../auth/index')


module.exports = {

    async regist(ctx) {
        let { username, password, nickname } = ctx.request.body;
        if (username.trim().length == 0) {
            await ctx.render('error', {
                message: '用户名不能为空'
            })
        } else {
            let results = await model.saveUser({
                username,
                password,
                nickname
            })
            if (results.insertId) {
                ctx.body = {
                    status: 'success'
                }
            } else {
                ctx.body = {
                    status: 'fail'
                }
            }
        }
    },
    async login(ctx) {
        let { username, password } = ctx.request.body;
        let results = await model.getUserByNameAndPwd(username, password);
        if (results.length > 0) {
            ctx.session.loginUser = username;
            ctx.session.loginId = results[0].user_id;
            let load = {
                username,
                userId: results[0].user_id
            };
            let token = Token.creat(load);
            ctx.body = {
                status: 'success',
                token
            }
        } else {
            ctx.status = 404;
            ctx.body = {
                status: 'fail'
            }
        }
    },
    async detail(ctx) {
        let { content, phone, address } = ctx.request.body;
        let results = await model.saveDetail({
            content,
            phone,
            address,
            user_id: 5
        })
        if (results.insertId) {
            ctx.body = {
                status: 'success'
            }
        } else {
            ctx.status = 404
            ctx.body = {
                status: 'fail'
            }
        }

    },
    async getDetail(ctx) {
        let results = await model.getDetail(5);
        if (results.length > 0) {
            ctx.body = {
                detail: results[results.length - 1]
            }
        } else {
            ctx.status = 404;
            ctx.body = {
                status: 'fail'
            }
        }
    },
    async checkUser(ctx) {
        let { username } = ctx.request.body;
        let results = await model.getUserByName(username);
        if (results.length > 0) {
            ctx.body = 'fail'
        } else {
            ctx.body = 'success'
        }
    }
}