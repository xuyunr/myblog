const query = require('../models/db');

module.exports = {

    getUserByNameAndPwd(username, password) {
        return query('SELECT * FROM t_user where username=? and password=?', [username, password])
    },
    saveUser(user) {
        return query('INSERT into t_user set ?', user)
    },
    getUserByName(username) {
        return query('SELECT * FROM t_user where username=?', username)

    },
    saveDetail(detail) {
        return query('INSERT into t_detail set ?', detail)
    },
    getDetail(userId) {
        return query('SELECT * FROM t_detail where user_id=?', userId)
    }
}