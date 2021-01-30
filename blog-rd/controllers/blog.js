const model = require('../models/blog');
const formatTime = require('../utils/dateTimeUtils')

function exchange(item) {
	for (let i = 0; i < item.length; i++) {
		item[i].post_time = formatTime(item[i].post_time)
	}
}

module.exports = {
	async post(ctx) {
		let userId = ctx.session.loginId;
		let { title, message } = ctx.request.body;
		let results = await model.saveblog({
			title: title,
			content: message,
			user_id: userId
		});
		console.log(results);
		if (results.insertId) {
			ctx.body = {
				status: 'success'
			}
		} else {
			ctx.body = {
				status: 'fail'
			}
		}
	},
	async index(ctx) {
		let results = await model.getBlogs();
		exchange(results);
		ctx.body = {
			blogs: results
		}
	},
	async detail(ctx) {
		console.log(ctx.query);
		let { blogId } = ctx.query;
		let results = await model.getBlogById(blogId);
		exchange(results);
		if (results.length > 0) {
			let { blog_id, title, content, post_time } = results[0];
			let blogInfo = {
				blog_id,
				title,
				content,
				post_time,
			};
			blogInfo.comments = [];
			for (let i = 0; i < results.length; i++) {
				let obj = results[i];
				blogInfo.comments.push({
					comm_id: obj.comm_id,
					comm_content: obj.comm_content,
					comm_post_time: formatTime(obj.comm_post_time),
					username: obj.username
				});
			}
			console.log(blogInfo);

			ctx.body = {
				blog: blogInfo
			}
		} else {
			ctx.body = {
				status: 'fail'
			}
		}
	},
	async comment(ctx) {
		let userId = ctx.session.loginId;
		let { blogId, message } = ctx.request.body;
		let results = await model.saveComment({
			blog_id: blogId,
			content: message,
			user_id: userId
		});
		console.log(results);
		if (results.insertId) {
			ctx.body = {
				status: 'success'
			}
		} else {
			ctx.body = {
				status: 'fail'
			}
		}
	},

}