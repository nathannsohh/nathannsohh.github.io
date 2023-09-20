const UserModel = require("./user.model");

exports.getUserInfo = async (req, res) => {
    let response;
    try {
        const user = await UserModel.findByAuth0Id(req.query.id);
        response = {
            success: user? true : false,
            error: false,
            message: user ? "User Found!" : "User does not exist",
            user: user
        };
        res.status(200).send(response);
    } catch (e) {
        response = {
            success: false,
            error: true,
            message: e.message,
        };
        res.status(500).send(response);
    }
}

exports.createUser = async (req, res) => {
    let response;
    try {
        const user = await UserModel.findByAuth0Id(req.body.auth0_id);
        if (user) {
            response = {
                success: false,
                error: false,
                message: "User already exists!",
                user: user
            }
            return res.status(200).send(response);
        }

        const newUser = await UserModel.createUser({
            ...req.body,
            voted: false
        });
        response = {
            success: true,
            error: false,
            message: "User created!",
            user: newUser
        }
        res.status(200).send(response);
    } catch (e) {
        response = {
            success: false,
            error: true,
            message: e.message,
        };
        res.status(500).send(response);
    }
}

exports.updateUser = async (req, res) => {
    let response;
    try {
        const user = await UserModel.findByAuth0Id(req.body.auth0_id);

        if (!user) {
            response = {
                success: false,
                error: false,
                message: "User does not exist!"
            }
            return res.status(200).send(response);
        }

        await UserModel.updateUser(req.body);
        response = {
            success: true,
            error: false,
            message: "User created!",
            user: await UserModel.findByAuth0Id(req.body.auth0_id)
        }
        res.status(200).send(response);
    } catch (e) {
        response = {
            success: false,
            error: true,
            message: e.message,
        };
        res.status(500).send(response);
    }
}