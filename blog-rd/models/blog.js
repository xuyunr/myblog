const query = require('../models/db');

module.exports = {
    getBlogs() {
        return query('select * from t_blog order by post_time desc ')
    },
    getblogdetail(blogId) {
        return query('SELECT * FROM t_blog where blog_id=?', blogId)
    },
    saveblog(blog) {
        console.log(blog);
        return query('INSERT into t_blog set ?', blog)
    },
    getBlogById(blogId) {
        return query(`
        SELECT blog.*, comm.comm_id, comm.content as comm_content, comm.post_time as comm_post_time, usr.username
        FROM t_blog blog  LEFT JOIN t_comment comm 
        ON comm.blog_id=blog.blog_id 
        LEFT JOIN t_user usr ON comm.user_id=usr.user_id
        WHERE blog.blog_id=?`, [blogId]);
    },
    saveComment(comment) {
        return query("INSERT into t_comment set ?", comment)
    }
}