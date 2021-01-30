const { HOST, USER, PASSWORD, DATABASE } = require('../config/db.config');
const mysql = require("mysql");
const pool = mysql.createPool({
    connectionLimit: 10,
    host: HOST,
    user: USER,
    password: PASSWORD,
    database: DATABASE,
});

module.exports = query = function (sql, str) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                // not connected!
                reject(err);
            } else {
                connection.query(
                    //   "SELECT * FROM t_user where username='"+username+"' and password='"+password+"'",
                    sql,
                    str,
                    function (error, results) {
                        connection.release(); //释放连接，放回pool中
                        if (error) {
                            reject(err);
                        } else {
                            resolve(results)
                        }
                    }
                );
            }
        });
    });
}