const jwt = require('jsonwebtoken')

module.exports = {
    async verify(ctx, next) {
        if (ctx.header.authorization) {
            let str = ctx.header.authorization.split(' ');
            let bearer = str[0];
            console.log(str);
            if (/^Bearer$/.test(bearer)) {
                try {
                    token = str[1]
                    jwt.verify(token, 'xuyunrui');
                    await next();
                } catch (error) {
                    ctx.status = 401;
                    ctx.body = 'token 过期'
                    console.log(error);
                }
            }
        }
    },
    creat(load) {
        return jwt.sign(load, 'xuyunrui', { expiresIn: '1h' })
    }
}