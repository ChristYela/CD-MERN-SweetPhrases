const PostController = require("../controllers/post.controller");
const UserController = require("../controllers/user.controller");

const {authenticate} = require("../config/jwt.config");

module.exports = app => {
    app.get('/api/posts', authenticate, PostController.get_all);
    app.post('/api/posts', authenticate, PostController.create_post);
    app.get('/api/posts/:id', authenticate, PostController.get_post);
    app.put('/api/posts/:id', authenticate, PostController.update_post);
    app.delete('/api/posts/:id', authenticate, PostController.delete_post);

    app.post('/api/register', UserController.register);
    app.post('/api/login', UserController.login);
    app.get('/api/logout', UserController.logout);
}