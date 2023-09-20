const UserController = require('./user.controller');

exports.routesConfig = (app) => {
    app.get('/user', [
        UserController.getUserInfo
    ]);
    app.post('/user', [
        UserController.createUser
    ])
    app.put('/user', [
        UserController.updateUser
    ])
}